import * as vscode from 'vscode'
import * as envpair from '../components/envpair'
import {Extension} from '../main'
import {tokenizer} from './tokenizer'

export class HoverProvider implements vscode.HoverProvider {
    extension: Extension

    constructor(extension: Extension) {
        this.extension = extension
    }

    public provideHover(document: vscode.TextDocument, position: vscode.Position, _token: vscode.CancellationToken) :
    Thenable<vscode.Hover> {
        return new Promise((resolve, _reject) => {
            const configuration = vscode.workspace.getConfiguration('latex-workshop')
            const hov = configuration.get('hoverPreview.enabled') as boolean
            if (hov && this.extension.panel) {
                const tr = this.findHoverOnTex(document, position)
                if (tr) {
                    const scale = configuration.get('hoverPreview.scale') as number
                    const [tex, range] = tr
                    const panel = this.extension.panel
                    const d = panel.webview.onDidReceiveMessage( message => {
                        resolve( new vscode.Hover(new vscode.MarkdownString( "![equation](" + message.dataurl + ")" ), range ) )
                        d.dispose()
                    })
                    panel.webview.postMessage({
                        text: tex,
                        scale: scale,
                        need_dataurl: "1"
                    })
                    return
                }
            }
            const token = tokenizer(document, position)
            if (token === undefined) {
                resolve()
                return
            }
            if (token in this.extension.completer.reference.referenceData) {
                resolve(new vscode.Hover(
                    {language: 'latex', value: this.extension.completer.reference.referenceData[token].text }
                ))
                return
            }
            if (token in this.extension.completer.citation.citationData) {
                resolve(new vscode.Hover(
                    this.extension.completer.citation.citationData[token].text
                ))
                return
            }
            resolve()
        })
    }

    // Test whether cursor is in tex command strings
    // like \begin{...} \end{...} \xxxx{ \[ \] \( \) or \\
    private isCursorInTeXCommand(document: vscode.TextDocument) : boolean {
        const editor = vscode.window.activeTextEditor
        if (!editor) {
            return false
        }
        const cursor = editor.selection.active
        const r = document.getWordRangeAtPosition(cursor, /\\(?:begin|end)\{.*?\}|\\[a-zA-Z]+\{?|\\[\(\)\[\]]|\\\\/)
        if (r && r.start.isBefore(cursor) && r.end.isAfter(cursor) ) {
            return true
        }
        return false
    }

    private renderCursor(document: vscode.TextDocument, range: vscode.Range) : string {
        const editor = vscode.window.activeTextEditor
        const configuration = vscode.workspace.getConfiguration('latex-workshop')
        const conf = configuration.get('hoverPreview.cursor.enabled') as boolean
        if (editor && conf && !this.isCursorInTeXCommand(document)) {
            const cursor = editor.selection.active
            const symbol = configuration.get('hoverPreview.cursor.symbol') as string
            const color = configuration.get('hoverPreview.cursor.color') as string
            let sym = `{${symbol}}`
            if (color != 'auto') {
                sym = `{\\color{${color}}${symbol}}`
            }
            if (range.contains(cursor)) {
                return document.getText( new vscode.Range(range.start, cursor) ) + sym + document.getText( new vscode.Range(cursor, range.end))
            }
        }
        return document.getText(range)
    }

    private mathjaxify(tex: string, envname: string) : string {
        let s = tex.replace(/^\s*%.*\r?\n/mg, '')
        s = s.replace(/^((?:\\.|[^%])*).*$/mg, '$1')
        s = s.replace(/\\label\{.*?\}/g, '')
        if (envname.match(/^(aligned|alignedat|array|Bmatrix|bmatrix|cases|CD|gathered|matrix|pmatrix|smallmatrix|split|subarray|Vmatrix|vmatrix)$/)) {
            s = '\\begin{equation}' + s + '\\end{equation}'
        }
        return s
    }

    private findHoverOnTex(document: vscode.TextDocument, position: vscode.Position) : [string, vscode.Range] | undefined {
        const envBeginPat = /\\begin\{(align|align\*|alignat|alignat\*|aligned|alignedat|array|Bmatrix|bmatrix|cases|CD|eqnarray|eqnarray\*|equation|equation\*|gather|gather\*|gathered|matrix|multline|multline\*|pmatrix|smallmatrix|split|subarray|Vmatrix|vmatrix)\}/
        let r = document.getWordRangeAtPosition(position, envBeginPat)
        if (r) {
            const envname = this.getFirstRmemberedSubstring(document.getText(r), envBeginPat)
            return this.findHoverOnEnv(document, envname, r.start)
        }
        const parenBeginPat = /(\\\[|\\\()/
        r = document.getWordRangeAtPosition(position, parenBeginPat)
        if (r) {
            const paren = this.getFirstRmemberedSubstring(document.getText(r), parenBeginPat)
            return this.findHoverOnParen(document, paren, r.start)
        }
        return this.findHoverOnInline(document, position)
    }

    private getFirstRmemberedSubstring(s: string, pat: RegExp) : string {
        const m = s.match(pat)
        if (m && m[1]) {
            return m[1]
        }
        return "never return here"
    }

    private removeComment(line: string) : string {
        return line.replace(/^((?:\\.|[^%])*).*$/, '$1')
    }

    private findEndPair(document: vscode.TextDocument, pat: RegExp, startPos: vscode.Position) : vscode.Position | undefined {
        const current_line = document.lineAt(startPos).text.substring(startPos.character)
        const l = this.removeComment(current_line)
        let m  = l.match(pat)
        if (m && m.index != null) {
            return new vscode.Position(startPos.line, startPos.character + m.index + m[0].length)
        }

        let lineNum = startPos.line + 1
        while (lineNum <= document.lineCount) {
            let l = document.lineAt(lineNum).text
            l = this.removeComment(l)
            let m  = l.match(pat)
            if (m && m.index != null) {
                return new vscode.Position(lineNum, m.index + m[0].length)
            }
            lineNum += 1
        }
        return undefined
    }

    private findHoverOnEnv(document: vscode.TextDocument, envname: string, startPos: vscode.Position) : [string, vscode.Range] | undefined {
        const pattern = new RegExp('\\\\end\\{' + envpair.escapeRegExp(envname) + '\\}')
        const startPos1 = new vscode.Position(startPos.line, startPos.character + envname.length + '\\begin{}'.length)
        const endPos = this.findEndPair(document, pattern, startPos1)
        if ( endPos ) {
            const range = new vscode.Range(startPos, endPos)
            const ret = this.mathjaxify( this.renderCursor(document, range), envname )
            return [ret, range]
        }
        return undefined
    }

    private findHoverOnParen(document: vscode.TextDocument, envname: string, startPos: vscode.Position) : [string, vscode.Range] | undefined {
        const pattern = envname == '\\[' ? /\\\]/ : /\\\)/
        const startPos1 = new vscode.Position(startPos.line, startPos.character + envname.length)
        const endPos = this.findEndPair(document, pattern, startPos1)
        if ( endPos ) {
            const range = new vscode.Range(startPos, endPos)
            const ret = this.mathjaxify( this.renderCursor(document, range), envname )
            return [ret, range]
        }
        return undefined
    }

    private findHoverOnInline(document: vscode.TextDocument, position: vscode.Position) : [string, vscode.Range] | undefined {
        let m : RegExpMatchArray | null
        const current_line = document.lineAt(position.line).text
        let s = current_line
        let base = 0
        while (m = s.match(/\$(?:\\.|[^\\])+?\$|\\\(.+?\\\)/)) {
            if (m && m.index != null) {
                const matchStart = base + m.index
                const matchEnd = base + m.index + m[0].length
                if ( matchStart <= position.character && position.character <= matchEnd ) {
                    const range = new vscode.Range(position.line, matchStart, position.line, matchEnd)
                    const ret = this.mathjaxify( this.renderCursor(document, range), '$' )
                    return [ret, range]
                }else{
                    base = matchEnd
                    s = current_line.substring(base)
                }
            }else{
                break
            }
        }
        return undefined
    }

}