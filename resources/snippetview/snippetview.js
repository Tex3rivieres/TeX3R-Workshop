const mathSymbols = [];
const mathSymbolCategories = ['All'];
const grid = document.querySelector('#Symbols .grid');
var vscodeApi;

(function() {
    vscodeApi = acquireVsCodeApi();
    tikzInitialise();
    TeX3RInitialise(); // Ajout pour initialisation snippet TeX3R
    TkzEuclInitialise(); // Ajout pour initialisation snippet tkz-eucl
    ScratchInitialise(); // Ajout pour initialisation snippet scratch
})();

async function loadMathSymbols() {
    const res = await fetch(mathSymbolsJsonUrl);
    const mathSymbols = (await res.json()).mathSymbols;
    for (const category in mathSymbols) {
        for (const index in mathSymbols[category]) {
            const symbol = mathSymbols[category][index];
            processMathSymbol({category, ...symbol});
        }
    }
}
loadMathSymbols();

function processMathSymbol(mathSymbol) {
    mathSymbol.searchText = getSearchText(mathSymbol);
    mathSymbol.category = mathSymbol.category.replace(/^-/, '');
    mathSymbols.push(mathSymbol);

    if (mathSymbolCategories.indexOf(mathSymbol.category) === -1) {
        mathSymbolCategories.push(mathSymbol.category);
        document.querySelector('#Symbols .header select').innerHTML = mathSymbolCategories
            .map(category => `<option>${category}</option>`)
            .join('\n');
    }

    const symbolDiv = document.createElement('div');
    symbolDiv.className = 'snippet';
    symbolDiv.setAttribute('data-snippet', mathSymbol.snippet);
    symbolDiv.innerHTML = mathSymbol.svg;
    symbolDiv.addEventListener('click', _evt => {
        vscodeApi.postMessage({
            type: 'insertSnippet',
            snippet: symbolDiv.getAttribute('data-snippet') + ' '
        });
    });

    mathSymbol.div = symbolDiv;
    grid.appendChild(symbolDiv);
}

let lastSymbol;
function mathSymbolSearch() {
    const searchStr = document.querySelector('#Symbols .header input').value;
    let category = document.querySelector('#Symbols .header select').value;
    category = category === 'All' ? '' : category;

    if (lastSymbol) {
        lastSymbol.div.style = '';
        lastSymbol = undefined;
    }

    mathSymbols.forEach(mathSymbol => {
        if (category && mathSymbol.category !== category) {
            mathSymbol.div.style.display = 'none';
            return;
        }
        if (mathSymbol.searchText.toLowerCase().indexOf(searchStr.toLowerCase()) === -1) {
            mathSymbol.div.style.display = 'none';
        } else {
            mathSymbol.div.style.display = '';
            lastSymbol = mathSymbol;
        }
    });

    if (lastSymbol) {
        lastSymbol.div.style = 'margin-right: auto;';
    }
}

function getSearchText(symbol) {
    let searchText = symbol.name + symbol.keywords;
    if (!symbol.category.match(/^-/)) {
        searchText += symbol.category;
    }
    return searchText;
}

function tikzInitialise() {
    document.querySelectorAll('#TikZ a.cmd').forEach(elem => {
        elem.addEventListener('click', _evt => {
            vscodeApi.postMessage({
                type: 'insertSnippet',
                snippet: elem.getAttribute('data-snippet').replace(/\\n/g, '\n')
            });
        });
    });
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.className += ' active';
    window.scrollTo(0, 0);
}

// fonction insertion snippet TeX3R
function TeX3RInitialise() {
    document.querySelectorAll('#TeX3R a.cmd').forEach(elem => {
        elem.addEventListener('click', _evt => {
            vscodeApi.postMessage({
                type: 'insertSnippet',
                snippet: elem.getAttribute('data-snippet').replace(/\\n/g, '\n')
            });
        });
    });
}
// Fin ajout fonction TeX3R

// fonction insertion snippet tkz-eucl
function TkzEuclInitialise() {
    document.querySelectorAll('#tkz-eucl a.cmd').forEach(elem => {
        elem.addEventListener('click', _evt => {
            vscodeApi.postMessage({
                type: 'insertSnippet',
                snippet: elem.getAttribute('data-snippet').replace(/\\n/g, '\n')
            });
        });
    });
}
// Fin ajout fonction tkz-eucl

// fonction insertion snippet scratch
function ScratchInitialise() {
    document.querySelectorAll('#scratch a.cmd').forEach(elem => {
        elem.addEventListener('click', _evt => {
            vscodeApi.postMessage({
                type: 'insertSnippet',
                snippet: elem.getAttribute('data-snippet').replace(/\\n/g, '\n')
            });
        });
    });
}
// Fin ajout fonction scratch

document.querySelector('.tablinks.active').click();
