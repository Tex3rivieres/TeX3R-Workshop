/**
 * scratchblocks v3.6.3
 * https://scratchblocks.github.io/
 * Render scratchblocks code to SVG images.
 *
 * Copyright 2013–2023, Tim Radvan
 * @license MIT
 */

/*
    When a new extension is added:
    1) Add it to extensions object
    2) Add its blocks to commands.js
    3) Add icon width/height to scratch3/blocks.js IconView
    4) Add icon to scratch3/style.js
*/

// Moved extensions: key is scratch3, value is scratch2
const movedExtensions = {
  pen: "pen",
  video: "sensing",
  music: "sound",
};

const extensions = {
  ...movedExtensions,
  tts: "tts",
  translate: "translate",
  microbit: "microbit",
  wedo: "wedo",
  makeymakey: "makeymakey",
  ev3: "ev3",
  boost: "boost",
  gdxfor: "gdxfor",
};

// Alias extensions: unlike movedExtensions, this is handled for both scratch2 and scratch3.
// Key is alias, value is real extension name
const aliasExtensions = {
  wedo2: "wedo",
  text2speech: "tts",
};

var scratchCommands = [
  {
    id: "MOTION_MOVESTEPS",
    selector: "forward:",
    spec: "move %1 steps",
    inputs: ["%n"],
    shape: "stack",
    category: "motion",
  },
  {
    id: "MOTION_TURNRIGHT",
    selector: "turnRight:",
    spec: "turn @turnRight %1 degrees",
    inputs: ["%n"],
    shape: "stack",
    category: "motion",
  },
  {
    id: "MOTION_TURNLEFT",
    selector: "turnLeft:",
    spec: "turn @turnLeft %1 degrees",
    inputs: ["%n"],
    shape: "stack",
    category: "motion",
  },
  {
    id: "MOTION_POINTINDIRECTION",
    selector: "heading:",
    spec: "point in direction %1",
    inputs: ["%d.direction"],
    shape: "stack",
    category: "motion",
  },
  {
    id: "MOTION_POINTTOWARDS",
    selector: "pointTowards:",
    spec: "point towards %1",
    inputs: ["%m.spriteOrMouse"],
    shape: "stack",
    category: "motion",
  },
  {
    id: "MOTION_GOTOXY",
    selector: "gotoX:y:",
    spec: "go to x:%1 y:%2",
    inputs: ["%n", "%n"],
    shape: "stack",
    category: "motion",
  },
  {
    id: "MOTION_GOTO",
    selector: "gotoSpriteOrMouse:",
    spec: "go to %1",
    inputs: ["%m.location"],
    shape: "stack",
    category: "motion",
  },
  {
    id: "MOTION_GLIDESECSTOXY",
    selector: "glideSecs:toX:y:elapsed:from:",
    spec: "glide %1 secs to x:%2 y:%3",
    inputs: ["%n", "%n", "%n"],
    shape: "stack",
    category: "motion",
  },
  {
    id: "MOTION_GLIDETO",
    spec: "glide %1 secs to %2",
    inputs: ["%n", "%m.location"],
    shape: "stack",
    category: "motion",
  },
  {
    id: "MOTION_CHANGEXBY",
    selector: "changeXposBy:",
    spec: "change x by %1",
    inputs: ["%n"],
    shape: "stack",
    category: "motion",
  },
  {
    id: "MOTION_SETX",
    selector: "xpos:",
    spec: "set x to %1",
    inputs: ["%n"],
    shape: "stack",
    category: "motion",
  },
  {
    id: "MOTION_CHANGEYBY",
    selector: "changeYposBy:",
    spec: "change y by %1",
    inputs: ["%n"],
    shape: "stack",
    category: "motion",
  },
  {
    id: "MOTION_SETY",
    selector: "ypos:",
    spec: "set y to %1",
    inputs: ["%n"],
    shape: "stack",
    category: "motion",
  },
  {
    id: "MOTION_SETROTATIONSTYLE",
    selector: "setRotationStyle",
    spec: "set rotation style %1",
    inputs: ["%m.rotationStyle"],
    shape: "stack",
    category: "motion",
  },
  {
    id: "LOOKS_SAYFORSECS",
    selector: "say:duration:elapsed:from:",
    spec: "say %1 for %2 seconds",
    inputs: ["%s", "%n"],
    shape: "stack",
    category: "looks",
  },
  {
    id: "LOOKS_SAY",
    selector: "say:",
    spec: "say %1",
    inputs: ["%s"],
    shape: "stack",
    category: "looks",
  },
  {
    id: "LOOKS_THINKFORSECS",
    selector: "think:duration:elapsed:from:",
    spec: "think %1 for %2 seconds",
    inputs: ["%s", "%n"],
    shape: "stack",
    category: "looks",
  },
  {
    id: "LOOKS_THINK",
    selector: "think:",
    spec: "think %1",
    inputs: ["%s"],
    shape: "stack",
    category: "looks",
  },
  {
    id: "LOOKS_SHOW",
    selector: "show",
    spec: "show",
    inputs: [],
    shape: "stack",
    category: "looks",
  },
  {
    id: "LOOKS_HIDE",
    selector: "hide",
    spec: "hide",
    inputs: [],
    shape: "stack",
    category: "looks",
  },
  {
    id: "LOOKS_SWITCHCOSTUMETO",
    selector: "lookLike:",
    spec: "switch costume to %1",
    inputs: ["%m.costume"],
    shape: "stack",
    category: "looks",
  },
  {
    id: "LOOKS_NEXTCOSTUME",
    selector: "nextCostume",
    spec: "next costume",
    inputs: [],
    shape: "stack",
    category: "looks",
  },
  {
    id: "LOOKS_NEXTBACKDROP_BLOCK",
    selector: "nextScene",
    spec: "next backdrop",
    inputs: [],
    shape: "stack",
    category: "looks",
  },
  {
    id: "LOOKS_SWITCHBACKDROPTO",
    selector: "startScene",
    spec: "switch backdrop to %1",
    inputs: ["%m.backdrop"],
    shape: "stack",
    category: "looks",
  },
  {
    id: "LOOKS_SWITCHBACKDROPTOANDWAIT",
    selector: "startSceneAndWait",
    spec: "switch backdrop to %1 and wait",
    inputs: ["%m.backdrop"],
    shape: "stack",
    category: "looks",
  },
  {
    id: "LOOKS_CHANGEEFFECTBY",
    selector: "changeGraphicEffect:by:",
    spec: "change %1 effect by %2",
    inputs: ["%m.effect", "%n"],
    shape: "stack",
    category: "looks",
  },
  {
    id: "LOOKS_SETEFFECTTO",
    selector: "setGraphicEffect:to:",
    spec: "set %1 effect to %2",
    inputs: ["%m.effect", "%n"],
    shape: "stack",
    category: "looks",
  },
  {
    id: "LOOKS_CLEARGRAPHICEFFECTS",
    selector: "filterReset",
    spec: "clear graphic effects",
    inputs: [],
    shape: "stack",
    category: "looks",
  },
  {
    id: "LOOKS_CHANGESIZEBY",
    selector: "changeSizeBy:",
    spec: "change size by %1",
    inputs: ["%n"],
    shape: "stack",
    category: "looks",
  },
  {
    id: "LOOKS_SETSIZETO",
    selector: "setSizeTo:",
    spec: "set size to %1%",
    inputs: ["%n"],
    shape: "stack",
    category: "looks",
  },
  {
    selector: "comeToFront",
    spec: "go to front",
    inputs: [],
    shape: "stack",
    category: "looks",
  },
  {
    id: "LOOKS_GOTOFRONTBACK",
    spec: "go to %1 layer",
    inputs: ["%m"],
    shape: "stack",
    category: "looks",
  },
  {
    selector: "goBackByLayers:",
    spec: "go back %1 layers",
    inputs: ["%n"],
    shape: "stack",
    category: "looks",
  },
  {
    id: "LOOKS_GOFORWARDBACKWARDLAYERS",
    spec: "go %1 %2 layers",
    inputs: ["%m", "%n"],
    shape: "stack",
    category: "looks",
  },
  {
    id: "SOUND_PLAY",
    selector: "playSound:",
    spec: "start sound %1",
    inputs: ["%m.sound"],
    shape: "stack",
    category: "sound",
  },
  {
    id: "SOUND_CHANGEEFFECTBY",
    spec: "change %1 effect by %2",
    inputs: ["%m", "%n"],
    shape: "stack",
    category: "sound",
  },
  {
    id: "SOUND_SETEFFECTO", // sic
    spec: "set %1 effect to %2",
    inputs: ["%m", "%n"],
    shape: "stack",
    category: "sound",
  },
  {
    id: "SOUND_CLEAREFFECTS",
    spec: "clear sound effects",
    inputs: [],
    shape: "stack",
    category: "sound",
  },
  {
    id: "SOUND_PLAYUNTILDONE",
    selector: "doPlaySoundAndWait",
    spec: "play sound %1 until done",
    inputs: ["%m.sound"],
    shape: "stack",
    category: "sound",
  },
  {
    id: "SOUND_STOPALLSOUNDS",
    selector: "stopAllSounds",
    spec: "stop all sounds",
    inputs: [],
    shape: "stack",
    category: "sound",
  },
  {
    id: "music.playDrumForBeats",
    selector: "playDrum",
    spec: "play drum %1 for %2 beats",
    inputs: ["%d.drum", "%n"],
    shape: "stack",
    category: "music",
  },
  {
    id: "music.restForBeats",
    selector: "rest:elapsed:from:",
    spec: "rest for %1 beats",
    inputs: ["%n"],
    shape: "stack",
    category: "music",
  },
  {
    id: "music.playNoteForBeats",
    selector: "noteOn:duration:elapsed:from:",
    spec: "play note %1 for %2 beats",
    inputs: ["%d.note", "%n"],
    shape: "stack",
    category: "music",
  },
  {
    id: "music.setInstrument",
    selector: "instrument:",
    spec: "set instrument to %1",
    inputs: ["%d.instrument"],
    shape: "stack",
    category: "music",
  },
  {
    id: "SOUND_CHANGEVOLUMEBY",
    selector: "changeVolumeBy:",
    spec: "change volume by %1",
    inputs: ["%n"],
    shape: "stack",
    category: "sound",
  },
  {
    id: "SOUND_SETVOLUMETO",
    selector: "setVolumeTo:",
    spec: "set volume to %1%",
    inputs: ["%n"],
    shape: "stack",
    category: "sound",
  },
  {
    id: "music.changeTempo",
    selector: "changeTempoBy:",
    spec: "change tempo by %1",
    inputs: ["%n"],
    shape: "stack",
    category: "music",
  },
  {
    selector: "setTempoTo:",
    spec: "set tempo to %1 bpm",
    inputs: ["%n"],
    shape: "stack",
    category: "sound",
  },
  {
    id: "music.setTempo",
    selector: "setTempoTo:",
    spec: "set tempo to %1",
    inputs: ["%n"],
    shape: "stack",
    category: "music",
  },
  {
    id: "pen.clear",
    selector: "clearPenTrails",
    spec: "erase all",
    inputs: [],
    shape: "stack",
    category: "pen",
  },
  {
    id: "pen.stamp",
    selector: "stampCostume",
    spec: "stamp",
    inputs: [],
    shape: "stack",
    category: "pen",
  },
  {
    id: "pen.penDown",
    selector: "putPenDown",
    spec: "pen down",
    inputs: [],
    shape: "stack",
    category: "pen",
  },
  {
    id: "pen.penUp",
    selector: "putPenUp",
    spec: "pen up",
    inputs: [],
    shape: "stack",
    category: "pen",
  },
  {
    id: "pen.setColor",
    selector: "penColor:",
    spec: "set pen color to %1",
    inputs: ["%c"],
    shape: "stack",
    category: "pen",
  },
  {
    id: "pen.changeHue",
    selector: "changePenHueBy:",
    spec: "change pen color by %1",
    inputs: ["%n"],
    shape: "stack",
    category: "pen",
  },
  {
    id: "pen.setColorParam",
    spec: "set pen %1 to %2",
    inputs: ["%m.color", "%c"],
    shape: "stack",
    category: "pen",
  },
  {
    id: "pen.changeColorParam",
    spec: "change pen %1 by %2",
    inputs: ["%m.color", "%n"],
    shape: "stack",
    category: "pen",
  },
  {
    id: "pen.setHue",
    selector: "setPenHueTo:",
    spec: "set pen color to %1",
    inputs: ["%n"],
    shape: "stack",
    category: "pen",
  },
  {
    id: "pen.changeShade",
    selector: "changePenShadeBy:",
    spec: "change pen shade by %1",
    inputs: ["%n"],
    shape: "stack",
    category: "pen",
  },
  {
    id: "pen.setShade",
    selector: "setPenShadeTo:",
    spec: "set pen shade to %1",
    inputs: ["%n"],
    shape: "stack",
    category: "pen",
  },
  {
    id: "pen.changeSize",
    selector: "changePenSizeBy:",
    spec: "change pen size by %1",
    inputs: ["%n"],
    shape: "stack",
    category: "pen",
  },
  {
    id: "pen.setSize",
    selector: "penSize:",
    spec: "set pen size to %1",
    inputs: ["%n"],
    shape: "stack",
    category: "pen",
  },
  {
    id: "EVENT_WHENFLAGCLICKED",
    selector: "whenGreenFlag",
    spec: "when @greenFlag clicked",
    inputs: [],
    shape: "hat",
    category: "events",
  },
  {
    id: "EVENT_WHENKEYPRESSED",
    selector: "whenKeyPressed",
    spec: "when %1 key pressed",
    inputs: ["%m.key"],
    shape: "hat",
    category: "events",
  },
  {
    id: "EVENT_WHENTHISSPRITECLICKED",
    selector: "whenClicked",
    spec: "when this sprite clicked",
    inputs: [],
    shape: "hat",
    category: "events",
  },
  {
    id: "EVENT_WHENSTAGECLICKED",
    spec: "when stage clicked",
    inputs: [],
    shape: "hat",
    category: "events",
  },
  {
    id: "EVENT_WHENBACKDROPSWITCHESTO",
    selector: "whenSceneStarts",
    spec: "when backdrop switches to %1",
    inputs: ["%m.backdrop"],
    shape: "hat",
    category: "events",
  },
  {
    id: "EVENT_WHENGREATERTHAN",
    selector: "whenSensorGreaterThan",
    spec: "when %1 > %2",
    inputs: ["%m.triggerSensor", "%n"],
    shape: "hat",
    category: "events",
  },
  {
    id: "EVENT_WHENBROADCASTRECEIVED",
    selector: "whenIReceive",
    spec: "when I receive %1",
    inputs: ["%m.broadcast"],
    shape: "hat",
    category: "events",
  },
  {
    id: "EVENT_BROADCAST",
    selector: "broadcast:",
    spec: "broadcast %1",
    inputs: ["%m.broadcast"],
    shape: "stack",
    category: "events",
  },
  {
    id: "EVENT_BROADCASTANDWAIT",
    selector: "doBroadcastAndWait",
    spec: "broadcast %1 and wait",
    inputs: ["%m.broadcast"],
    shape: "stack",
    category: "events",
  },
  {
    id: "CONTROL_WAIT",
    selector: "wait:elapsed:from:",
    spec: "wait %1 seconds",
    inputs: ["%n"],
    shape: "stack",
    category: "control",
  },
  {
    id: "CONTROL_REPEAT",
    selector: "doRepeat",
    spec: "repeat %1",
    inputs: ["%n"],
    shape: "c-block",
    category: "control",
    hasLoopArrow: true,
  },
  {
    id: "CONTROL_FOREVER",
    selector: "doForever",
    spec: "forever",
    inputs: [],
    shape: "c-block cap",
    category: "control",
    hasLoopArrow: true,
  },
  {
    id: "CONTROL_IF",
    selector: "doIf",
    spec: "if %1 then",
    inputs: ["%b"],
    shape: "c-block",
    category: "control",
  },
  {
    id: "CONTROL_WAITUNTIL",
    selector: "doWaitUntil",
    spec: "wait until %1",
    inputs: ["%b"],
    shape: "stack",
    category: "control",
  },
  {
    id: "CONTROL_REPEATUNTIL",
    selector: "doUntil",
    spec: "repeat until %1",
    inputs: ["%b"],
    shape: "c-block",
    category: "control",
    hasLoopArrow: true,
  },
  {
    id: "CONTROL_STOP",
    selector: "stopScripts",
    spec: "stop %1",
    inputs: ["%m.stop"],
    shape: "cap",
    category: "control",
  },
  {
    id: "CONTROL_STARTASCLONE",
    selector: "whenCloned",
    spec: "when I start as a clone",
    inputs: [],
    shape: "hat",
    category: "control",
  },
  {
    id: "CONTROL_CREATECLONEOF",
    selector: "createCloneOf",
    spec: "create clone of %1",
    inputs: ["%m.spriteOnly"],
    shape: "stack",
    category: "control",
  },
  {
    id: "CONTROL_DELETETHISCLONE",
    selector: "deleteClone",
    spec: "delete this clone",
    inputs: [],
    shape: "cap",
    category: "control",
  },
  {
    id: "SENSING_ASKANDWAIT",
    selector: "doAsk",
    spec: "ask %1 and wait",
    inputs: ["%s"],
    shape: "stack",
    category: "sensing",
  },
  {
    id: "videoSensing.videoToggle",
    selector: "setVideoState",
    spec: "turn video %1",
    inputs: ["%m.videoState"],
    shape: "stack",
    category: "video",
  },
  {
    id: "videoSensing.setVideoTransparency",
    selector: "setVideoTransparency",
    spec: "set video transparency to %1%",
    inputs: ["%n"],
    shape: "stack",
    category: "video",
  },
  {
    id: "videoSensing.whenMotionGreaterThan",
    spec: "when video motion > %1",
    inputs: ["%n"],
    shape: "hat",
    category: "video",
  },
  {
    id: "SENSING_RESETTIMER",
    selector: "timerReset",
    spec: "reset timer",
    inputs: [],
    shape: "stack",
    category: "sensing",
  },
  {
    id: "DATA_SETVARIABLETO",
    selector: "setVar:to:",
    spec: "set %1 to %2",
    inputs: ["%m.var", "%s"],
    shape: "stack",
    category: "variables",
  },
  {
    id: "DATA_CHANGEVARIABLEBY",
    selector: "changeVar:by:",
    spec: "change %1 by %2",
    inputs: ["%m.var", "%n"],
    shape: "stack",
    category: "variables",
  },
  {
    id: "DATA_SHOWVARIABLE",
    selector: "showVariable:",
    spec: "show variable %1",
    inputs: ["%m.var"],
    shape: "stack",
    category: "variables",
  },
  {
    id: "DATA_HIDEVARIABLE",
    selector: "hideVariable:",
    spec: "hide variable %1",
    inputs: ["%m.var"],
    shape: "stack",
    category: "variables",
  },
  {
    id: "DATA_ADDTOLIST",
    selector: "append:toList:",
    spec: "add %1 to %2",
    inputs: ["%s", "%m.list"],
    shape: "stack",
    category: "list",
  },
  {
    id: "DATA_DELETEOFLIST",
    selector: "deleteLine:ofList:",
    spec: "delete %1 of %2",
    inputs: ["%d.listDeleteItem", "%m.list"],
    shape: "stack",
    category: "list",
  },
  {
    id: "DATA_DELETEALLOFLIST",
    spec: "delete all of %1",
    inputs: ["%m.list"],
    shape: "stack",
    category: "list",
  },
  {
    id: "MOTION_IFONEDGEBOUNCE",
    selector: "bounceOffEdge",
    spec: "if on edge, bounce",
    inputs: [],
    shape: "stack",
    category: "motion",
  },
  {
    id: "DATA_INSERTATLIST",
    selector: "insert:at:ofList:",
    spec: "insert %1 at %2 of %3",
    inputs: ["%s", "%d.listItem", "%m.list"],
    shape: "stack",
    category: "list",
  },
  {
    id: "DATA_REPLACEITEMOFLIST",
    selector: "setLine:ofList:to:",
    spec: "replace item %1 of %2 with %3",
    inputs: ["%d.listItem", "%m.list", "%s"],
    shape: "stack",
    category: "list",
  },
  {
    id: "DATA_SHOWLIST",
    selector: "showList:",
    spec: "show list %1",
    inputs: ["%m.list"],
    shape: "stack",
    category: "list",
  },
  {
    id: "DATA_HIDELIST",
    selector: "hideList:",
    spec: "hide list %1",
    inputs: ["%m.list"],
    shape: "stack",
    category: "list",
  },
  {
    id: "SENSING_OF_XPOSITION",
    selector: "xpos",
    spec: "x position",
    inputs: [],
    shape: "reporter",
    category: "motion",
  },
  {
    id: "SENSING_OF_YPOSITION",
    selector: "ypos",
    spec: "y position",
    inputs: [],
    shape: "reporter",
    category: "motion",
  },
  {
    id: "SENSING_OF_DIRECTION",
    selector: "heading",
    spec: "direction",
    inputs: [],
    shape: "reporter",
    category: "motion",
  },
  {
    id: "SENSING_OF_COSTUMENUMBER",
    selector: "costumeIndex",
    spec: "costume #",
    inputs: [],
    shape: "reporter",
    category: "looks",
  },
  {
    id: "LOOKS_COSTUMENUMBERNAME",
    selector: "LOOKS_COSTUMENUMBERNAME",
    spec: "costume %1",
    inputs: ["%m"],
    shape: "reporter",
    category: "looks",
  },
  {
    id: "SENSING_OF_SIZE",
    selector: "scale",
    spec: "size",
    inputs: [],
    shape: "reporter",
    category: "looks",
  },
  {
    id: "SENSING_OF_BACKDROPNAME",
    selector: "sceneName",
    spec: "backdrop name",
    inputs: [],
    shape: "reporter",
    category: "looks",
  },
  {
    id: "LOOKS_BACKDROPNUMBERNAME",
    spec: "backdrop %1",
    inputs: ["%m"],
    shape: "reporter",
    category: "looks",
  },
  {
    id: "SENSING_OF_BACKDROPNUMBER",
    selector: "backgroundIndex",
    spec: "backdrop #",
    inputs: [],
    shape: "reporter",
    category: "looks",
  },
  {
    id: "SOUND_VOLUME",
    selector: "volume",
    spec: "volume",
    inputs: [],
    shape: "reporter",
    category: "sound",
  },
  {
    id: "music.getTempo",
    selector: "tempo",
    spec: "tempo",
    inputs: [],
    shape: "reporter",
    category: "music",
  },
  {
    id: "SENSING_TOUCHINGOBJECT",
    selector: "touching:",
    spec: "touching %1?",
    inputs: ["%m.touching"],
    shape: "boolean",
    category: "sensing",
  },
  {
    id: "SENSING_TOUCHINGCOLOR",
    selector: "touchingColor:",
    spec: "touching color %1?",
    inputs: ["%c"],
    shape: "boolean",
    category: "sensing",
  },
  {
    id: "SENSING_COLORISTOUCHINGCOLOR",
    selector: "color:sees:",
    spec: "color %1 is touching %2?",
    inputs: ["%c", "%c"],
    shape: "boolean",
    category: "sensing",
  },
  {
    id: "SENSING_DISTANCETO",
    selector: "distanceTo:",
    spec: "distance to %1",
    inputs: ["%m.spriteOrMouse"],
    shape: "reporter",
    category: "sensing",
  },
  {
    id: "SENSING_ANSWER",
    selector: "answer",
    spec: "answer",
    inputs: [],
    shape: "reporter",
    category: "sensing",
  },
  {
    id: "SENSING_KEYPRESSED",
    selector: "keyPressed:",
    spec: "key %1 pressed?",
    inputs: ["%m.key"],
    shape: "boolean",
    category: "sensing",
  },
  {
    id: "SENSING_MOUSEDOWN",
    selector: "mousePressed",
    spec: "mouse down?",
    inputs: [],
    shape: "boolean",
    category: "sensing",
  },
  {
    id: "SENSING_MOUSEX",
    selector: "mouseX",
    spec: "mouse x",
    inputs: [],
    shape: "reporter",
    category: "sensing",
  },
  {
    id: "SENSING_MOUSEY",
    selector: "mouseY",
    spec: "mouse y",
    inputs: [],
    shape: "reporter",
    category: "sensing",
  },
  {
    id: "SENSING_SETDRAGMODE",
    spec: "set drag mode %1",
    inputs: ["%m"],
    shape: "stack",
    category: "sensing",
  },
  {
    id: "SENSING_LOUDNESS",
    selector: "soundLevel",
    spec: "loudness",
    inputs: [],
    shape: "reporter",
    category: "sensing",
  },
  {
    id: "videoSensing.videoOn",
    selector: "senseVideoMotion",
    spec: "video %1 on %2",
    inputs: ["%m.videoMotionType", "%m.stageOrThis"],
    shape: "reporter",
    category: "video",
  },
  {
    id: "SENSING_TIMER",
    selector: "timer",
    spec: "timer",
    inputs: [],
    shape: "reporter",
    category: "sensing",
  },
  {
    id: "SENSING_OF",
    selector: "getAttribute:of:",
    spec: "%1 of %2",
    inputs: ["%m.attribute", "%m.spriteOrStage"],
    shape: "reporter",
    category: "sensing",
  },
  {
    id: "SENSING_CURRENT",
    selector: "timeAndDate",
    spec: "current %1",
    inputs: ["%m.timeAndDate"],
    shape: "reporter",
    category: "sensing",
  },
  {
    id: "SENSING_DAYSSINCE2000",
    selector: "timestamp",
    spec: "days since 2000",
    inputs: [],
    shape: "reporter",
    category: "sensing",
  },
  {
    id: "SENSING_USERNAME",
    selector: "getUserName",
    spec: "username",
    inputs: [],
    shape: "reporter",
    category: "sensing",
  },
  {
    id: "OPERATORS_ADD",
    selector: "+",
    spec: "%1 + %2",
    inputs: ["%n", "%n"],
    shape: "reporter",
    category: "operators",
  },
  {
    id: "OPERATORS_SUBTRACT",
    selector: "-",
    spec: "%1 - %2",
    inputs: ["%n", "%n"],
    shape: "reporter",
    category: "operators",
  },
  {
    id: "OPERATORS_MULTIPLY",
    selector: "*",
    spec: "%1 * %2",
    inputs: ["%n", "%n"],
    shape: "reporter",
    category: "operators",
  },
  {
    id: "OPERATORS_DIVIDE",
    selector: "/",
    spec: "%1 / %2",
    inputs: ["%n", "%n"],
    shape: "reporter",
    category: "operators",
  },
  {
    id: "OPERATORS_RANDOM",
    selector: "randomFrom:to:",
    spec: "pick random %1 to %2",
    inputs: ["%n", "%n"],
    shape: "reporter",
    category: "operators",
  },
  {
    id: "OPERATORS_LT",
    selector: "<",
    spec: "%1 < %2",
    inputs: ["%s", "%s"],
    shape: "boolean",
    category: "operators",
  },
  {
    id: "OPERATORS_EQUALS",
    selector: "=",
    spec: "%1 = %2",
    inputs: ["%s", "%s"],
    shape: "boolean",
    category: "operators",
  },
  {
    id: "OPERATORS_GT",
    selector: ">",
    spec: "%1 > %2",
    inputs: ["%s", "%s"],
    shape: "boolean",
    category: "operators",
  },
  {
    id: "OPERATORS_AND",
    selector: "&",
    spec: "%1 and %2",
    inputs: ["%b", "%b"],
    shape: "boolean",
    category: "operators",
  },
  {
    id: "OPERATORS_OR",
    selector: "|",
    spec: "%1 or %2",
    inputs: ["%b", "%b"],
    shape: "boolean",
    category: "operators",
  },
  {
    id: "OPERATORS_NOT",
    selector: "not",
    spec: "not %1",
    inputs: ["%b"],
    shape: "boolean",
    category: "operators",
  },
  {
    id: "OPERATORS_JOIN",
    selector: "concatenate:with:",
    spec: "join %1 %2",
    inputs: ["%s", "%s"],
    shape: "reporter",
    category: "operators",
  },
  {
    id: "OPERATORS_LETTEROF",
    selector: "letter:of:",
    spec: "letter %1 of %2",
    inputs: ["%n", "%s"],
    shape: "reporter",
    category: "operators",
  },
  {
    id: "OPERATORS_LENGTH",
    selector: "stringLength:",
    spec: "length of %1",
    inputs: ["%s"],
    shape: "reporter",
    category: "operators",
  },
  {
    id: "OPERATORS_MOD",
    selector: "%",
    spec: "%1 mod %2",
    inputs: ["%n", "%n"],
    shape: "reporter",
    category: "operators",
  },
  {
    id: "OPERATORS_ROUND",
    selector: "rounded",
    spec: "round %1",
    inputs: ["%n"],
    shape: "reporter",
    category: "operators",
  },
  {
    id: "OPERATORS_MATHOP",
    selector: "computeFunction:of:",
    spec: "%1 of %2",
    inputs: ["%m.mathOp", "%n"],
    shape: "reporter",
    category: "operators",
  },
  {
    id: "OPERATORS_CONTAINS",
    spec: "%1 contains %2?",
    inputs: ["%s", "%s"],
    shape: "boolean",
    category: "operators",
  },
  {
    id: "DATA_ITEMOFLIST",
    selector: "getLine:ofList:",
    spec: "item %1 of %2",
    inputs: ["%d.listItem", "%m.list"],
    shape: "reporter",
    category: "list",
  },
  {
    id: "DATA_ITEMNUMOFLIST",
    spec: "item # of %1 in %2",
    inputs: ["%s", "%m.list"],
    shape: "reporter",
    category: "list",
  },
  {
    id: "DATA_LENGTHOFLIST",
    selector: "lineCountOfList:",
    spec: "length of %1",
    inputs: ["%m.list"],
    shape: "reporter",
    category: "list",
  },
  {
    id: "DATA_LISTCONTAINSITEM",
    selector: "list:contains:",
    spec: "%1 contains %2?",
    inputs: ["%m.list", "%s"],
    shape: "boolean",
    category: "list",
  },
  {
    id: "CONTROL_ELSE",
    spec: "else",
    inputs: [],
    shape: "celse",
    category: "control",
  },
  {
    id: "scratchblocks:end",
    spec: "end",
    inputs: [],
    shape: "cend",
    category: "control",
  },
  {
    id: "scratchblocks:ellipsis",
    spec: ". . .",
    inputs: [],
    shape: "stack",
    category: "grey",
  },
  {
    id: "scratchblocks:addInput",
    spec: "%1 @addInput",
    inputs: ["%n"],
    shape: "ring",
    category: "grey",
  },
  {
    id: "SENSING_USERID",
    spec: "user id",
    inputs: [],
    shape: "reporter",
    category: "obsolete",
  },
  {
    selector: "doIf",
    spec: "if %1",
    inputs: ["%b"],
    shape: "c-block",
    category: "obsolete",
  },
  {
    selector: "doForeverIf",
    spec: "forever if %1",
    inputs: ["%b"],
    shape: "c-block cap",
    category: "obsolete",
  },
  {
    selector: "doReturn",
    spec: "stop script",
    inputs: [],
    shape: "cap",
    category: "obsolete",
  },
  {
    selector: "stopAll",
    spec: "stop all",
    inputs: [],
    shape: "cap",
    category: "obsolete",
  },
  {
    selector: "lookLike:",
    spec: "switch to costume %1",
    inputs: ["%m.costume"],
    shape: "stack",
    category: "obsolete",
  },
  {
    selector: "nextScene",
    spec: "next background",
    inputs: [],
    shape: "stack",
    category: "obsolete",
  },
  {
    selector: "startScene",
    spec: "switch to background %1",
    inputs: ["%m.backdrop"],
    shape: "stack",
    category: "obsolete",
  },
  {
    selector: "backgroundIndex",
    spec: "background #",
    inputs: [],
    shape: "reporter",
    category: "obsolete",
  },
  {
    id: "SENSING_LOUD",
    selector: "isLoud",
    spec: "loud?",
    inputs: [],
    shape: "boolean",
    category: "obsolete",
  },
  // TODO define
  {
    id: "text2speech.speakAndWaitBlock",
    spec: "speak %1",
    inputs: ["%s"],
    shape: "stack",
    category: "tts",
  },
  {
    id: "text2speech.setVoiceBlock",
    spec: "set voice to %1",
    inputs: ["%m"],
    shape: "stack",
    category: "tts",
  },
  {
    id: "text2speech.setLanguageBlock",
    spec: "set language to %1",
    inputs: ["%m"],
    shape: "stack",
    category: "tts",
  },
  {
    id: "translate.translateBlock",
    spec: "translate %1 to %2",
    inputs: ["%s", "%m"],
    shape: "reporter",
    category: "translate",
  },
  {
    id: "translate.viewerLanguage",
    spec: "language",
    shape: "reporter",
    category: "translate",
  },
  {
    id: "makeymakey.whenKeyPressed",
    spec: "when %1 key pressed",
    inputs: ["%m"], // this is not %m.key
    shape: "hat",
    category: "makeymakey",
  },
  {
    id: "makeymakey.whenKeysPressedInOrder",
    spec: "when %1 pressed in order",
    inputs: ["%m"],
    shape: "hat",
    category: "makeymakey",
  },
  {
    id: "microbit.whenButtonPressed",
    spec: "when %1 button pressed",
    inputs: ["%m"],
    shape: "hat",
    category: "microbit",
  },
  {
    id: "microbit.isButtonPressed",
    spec: "%1 button pressed?",
    inputs: ["%m"],
    shape: "boolean",
    category: "microbit",
  },
  {
    id: "microbit.whenGesture",
    spec: "when %1",
    inputs: ["%m"],
    shape: "hat",
    category: "microbit",
  },
  {
    id: "microbit.displaySymbol",
    spec: "display %1",
    inputs: ["%m"], // TODO add matrix support
    shape: "stack",
    category: "microbit",
  },
  {
    id: "microbit.displayText",
    spec: "display text %1",
    inputs: ["%s"],
    shape: "stack",
    category: "microbit",
  },
  {
    id: "microbit.clearDisplay",
    spec: "clear display",
    shape: "stack",
    category: "microbit",
  },
  {
    id: "microbit.whenTilted",
    spec: "when tilted %1",
    inputs: ["%m"],
    shape: "hat",
    category: "microbit",
  },
  {
    id: "microbit.isTilted",
    spec: "tilted %1?",
    inputs: ["%m"],
    shape: "boolean",
    category: "microbit",
  },
  {
    id: "microbit.tiltAngle",
    spec: "tilt angle %1",
    inputs: ["%m"],
    shape: "reporter",
    category: "microbit",
  },
  {
    id: "microbit.whenPinConnected",
    spec: "when pin %1 connected",
    inputs: ["%m"],
    shape: "hat",
    category: "microbit",
  },
  {
    id: "ev3.motorTurnClockwise",
    spec: "motor %1 turn this way for %2 seconds",
    inputs: ["%m", "%n"],
    shape: "stack",
    category: "ev3",
  },
  {
    id: "ev3.motorTurnCounterClockwise",
    spec: "motor %1 turn that way for %2 seconds",
    inputs: ["%m", "%n"],
    shape: "stack",
    category: "ev3",
  },
  {
    id: "ev3.motorSetPower",
    spec: "motor %1 set power %2%",
    inputs: ["%m", "%n"],
    shape: "stack",
    category: "ev3",
  },
  {
    id: "ev3.getMotorPosition",
    spec: "motor %1 position",
    inputs: ["%m"],
    shape: "reporter",
    category: "ev3",
  },
  {
    id: "ev3.whenButtonPressed",
    spec: "when button %1 pressed",
    inputs: ["%m"],
    shape: "hat",
    category: "ev3",
  },
  {
    id: "ev3.whenDistanceLessThan",
    spec: "when distance < %1",
    inputs: ["%n"],
    shape: "hat",
    category: "ev3",
  },
  {
    id: "ev3.whenBrightnessLessThan",
    spec: "when brightness < %1",
    inputs: ["%n"],
    shape: "hat",
    category: "ev3",
  },
  {
    id: "ev3.buttonPressed",
    spec: "button %1 pressed?",
    inputs: ["%m"],
    shape: "boolean",
    category: "ev3",
  },
  {
    id: "ev3.getDistance",
    spec: "distance",
    shape: "reporter",
    category: "ev3",
  },
  {
    id: "ev3.getBrightness",
    spec: "brightness",
    shape: "reporter",
    category: "ev3",
  },
  {
    id: "ev3.beepNote",
    spec: "beep note %1 for %2 secs",
    inputs: ["%d.note", "%n"], // we can use %d.note here
    shape: "stack",
    category: "ev3",
  },
  {
    id: "wedo2.motorOn",
    spec: "turn %1 on",
    inputs: ["%m.motor"],
    shape: "stack",
    category: "wedo",
  },
  {
    id: "wedo2.motorOff",
    spec: "turn %1 off",
    inputs: ["%m.motor"],
    shape: "stack",
    category: "wedo",
  },
  {
    id: "wedo2.startMotorPower",
    spec: "set %1 power to %2",
    inputs: ["%m.motor", "%n"],
    shape: "stack",
    category: "wedo",
  },
  {
    id: "wedo2.setMotorDirection",
    spec: "set %1 direction to %2",
    inputs: ["%m.motor2", "%m.motorDirection"],
    shape: "stack",
    category: "wedo",
  },
  {
    id: "wedo2.whenDistance",
    spec: "when distance %1 %2",
    inputs: ["%m.lessMore", "%n"],
    shape: "hat",
    category: "wedo",
  },
  {
    id: "wedo2.getDistance",
    spec: "distance",
    inputs: [],
    shape: "reporter",
    category: "wedo",
  },
  {
    id: "wedo2.motorOnFor",
    spec: "turn %1 on for %2 seconds",
    inputs: ["%m.motor", "%n"],
    shape: "stack",
    category: "wedo",
  },
  {
    id: "wedo2.setLightHue",
    spec: "set light color to %1",
    inputs: ["%n"],
    shape: "stack",
    category: "wedo",
  },
  {
    id: "wedo2.playNoteFor",
    spec: "play note %1 for %2 seconds",
    inputs: ["%n", "%n"],
    shape: "stack",
    category: "wedo",
  },
  {
    id: "wedo2.whenTilted",
    spec: "when tilted %1",
    inputs: ["%m.xxx"],
    shape: "hat",
    category: "wedo",
  },
  {
    id: "wedo2.isTilted",
    spec: "tilted %1?",
    inputs: ["%m"],
    shape: "boolean",
    category: "wedo",
  },
  {
    id: "wedo2.getTiltAngle",
    spec: "tilt angle %1",
    inputs: ["%m.xxx"],
    shape: "reporter",
    category: "wedo",
  },
  {
    id: "gdxfor.whenGesture",
    spec: "when %1",
    inputs: ["%m"],
    shape: "hat",
    category: "gdxfor",
  },
  {
    id: "gdxfor.whenForcePushedOrPulled",
    spec: "when force sensor %1",
    inputs: ["%m"],
    shape: "hat",
    category: "gdxfor",
  },
  {
    id: "gdxfor.getForce",
    spec: "force",
    shape: "reporter",
    category: "gdxfor",
  },
  {
    id: "gdxfor.whenTilted",
    spec: "when tilted %1",
    inputs: ["%m"],
    shape: "hat",
    category: "gdxfor",
  },
  {
    id: "gdxfor.isTilted",
    spec: "tilted %1?",
    inputs: ["%m"],
    shape: "boolean",
    category: "gdxfor",
  },
  {
    id: "gdxfor.getTilt",
    spec: "tilt angle %1",
    inputs: ["%m"],
    shape: "reporter",
    category: "gdxfor",
  },
  {
    id: "gdxfor.isFreeFalling",
    spec: "falling?",
    shape: "boolean",
    category: "gdxfor",
  },
  {
    id: "gdxfor.getSpin",
    spec: "spin speed %1",
    inputs: ["%m"],
    shape: "reporter",
    category: "gdxfor",
  },
  {
    id: "gdxfor.getAcceleration",
    spec: "acceleration %1",
    inputs: ["%m"],
    shape: "reporter",
    category: "gdxfor",
  },
  {
    id: "boost.motorOnFor",
    spec: "turn motor %1 for %2 seconds",
    inputs: ["%m", "%n"],
    shape: "stack",
    category: "boost",
  },
  {
    id: "boost.motorOnForRotation",
    spec: "turn motor %1 for %2 rotations",
    inputs: ["%m", "%n"],
    shape: "stack",
    category: "boost",
  },
  {
    id: "boost.motorOn",
    spec: "turn motor %1 on",
    inputs: ["%m"],
    shape: "stack",
    category: "boost",
  },
  {
    id: "boost.motorOff",
    spec: "turn motor %1 off",
    inputs: ["%m"],
    shape: "stack",
    category: "boost",
  },
  {
    id: "boost.setMotorPower",
    spec: "set motor %1 speed to %2%",
    inputs: ["%m", "%n"],
    shape: "stack",
    category: "boost",
  },
  {
    id: "boost.setMotorDirection",
    spec: "set motor %1 direction %2",
    inputs: ["%m", "%m"],
    shape: "stack",
    category: "boost",
  },
  {
    id: "boost.getMotorPosition",
    spec: "motor %1 position",
    inputs: ["%m"],
    shape: "reporter",
    category: "boost",
  },
  {
    id: "boost.whenColor",
    spec: "when %1 brick seen",
    inputs: ["%m"],
    shape: "hat",
    category: "boost",
  },
  {
    id: "boost.seeingColor",
    spec: "seeing %1 brick?",
    inputs: ["%m"],
    shape: "boolean",
    category: "boost",
  },
  {
    id: "boost.whenTilted",
    spec: "when tilted %1",
    inputs: ["%m"],
    shape: "hat",
    category: "boost",
  },
  {
    id: "boost.getTiltAngle",
    spec: "tilt angle %1",
    inputs: ["%m"],
    shape: "reporter",
    category: "boost",
  },
  {
    id: "boost.setLightHue",
    spec: "set light color to %1",
    inputs: ["%n"],
    shape: "stack",
    category: "boost",
  },
];

// List of classes we're allowed to override.

const overrideCategories = [
  "motion",
  "looks",
  "sound",
  "variables",
  "list",
  "events",
  "control",
  "sensing",
  "operators",
  "custom",
  "custom-arg",
  "extension",
  "grey",
  "obsolete",
  ...Object.keys(extensions),
  ...Object.keys(aliasExtensions),
];

const overrideShapes = [
  "hat",
  "cap",
  "stack",
  "boolean",
  "reporter",
  "ring",
  "cat",
];

// languages that should be displayed right to left
const rtlLanguages = ["ar", "ckb", "fa", "he"];

const inputNumberPat = /%([0-9]+)/;
const inputPat = /(%[a-zA-Z0-9](?:\.[a-zA-Z0-9]+)?)/;
const inputPatGlobal = new RegExp(inputPat.source, "g");
const iconPat = /(@[a-zA-Z]+)/;
const splitPat = new RegExp(`${inputPat.source}|${iconPat.source}| +`, "g");

const hexColorPat = /^#(?:[0-9a-fA-F]{3}){1,2}?$/;

function parseInputNumber(part) {
  const m = inputNumberPat.exec(part);
  return m ? +m[1] : 0
}

// used for procDefs
function parseSpec(spec) {
  const parts = spec.split(splitPat).filter(x => x);
  const inputs = parts.filter(p => inputPat.test(p));
  return {
    spec: spec,
    parts: parts,
    inputs: inputs,
    hash: hashSpec(spec),
  }
}

function hashSpec(spec) {
  return minifyHash(spec.replace(inputPatGlobal, " _ "))
}

function minifyHash(hash) {
  return hash
    .replace(/_/g, " _ ")
    .replace(/ +/g, " ")
    .replace(/[,%?:]/g, "")
    .replace(/ß/g, "ss")
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(". . .", "...")
    .replace(/^…$/, "...")
    .trim()
    .toLowerCase()
}

const blocksById = {};
const allBlocks = scratchCommands.map(def => {
  if (!def.id) {
    if (!def.selector) {
      throw new Error(`Missing ID: ${def.spec}`)
    }
    def.id = `sb2:${def.selector}`;
  }
  if (!def.spec) {
    throw new Error(`Missing spec: ${def.id}`)
  }

  const info = {
    id: def.id, // Used for Scratch 3 translations
    spec: def.spec, // Used for Scratch 2 translations
    parts: def.spec.split(splitPat).filter(x => x),
    selector: def.selector || `sb3:${def.id}`, // Used for JSON marshalling
    inputs: def.inputs == null ? [] : def.inputs,
    shape: def.shape,
    category: def.category,
    hasLoopArrow: !!def.hasLoopArrow,
  };
  if (blocksById[info.id]) {
    throw new Error(`Duplicate ID: ${info.id}`)
  }
  blocksById[info.id] = info;
  return info
});

const unicodeIcons = {
  "@greenFlag": "⚑",
  "@turnRight": "↻",
  "@turnLeft": "↺",
  "@addInput": "▸",
  "@delInput": "◂",
};

const allLanguages = {};
function loadLanguage(code, language) {
  const blocksByHash = (language.blocksByHash = {});

  Object.keys(language.commands).forEach(blockId => {
    const nativeSpec = language.commands[blockId];
    const block = blocksById[blockId];

    const nativeHash = hashSpec(nativeSpec);
    if (!blocksByHash[nativeHash]) {
      blocksByHash[nativeHash] = [];
    }
    blocksByHash[nativeHash].push(block);

    // fallback image replacement, for languages without aliases
    const m = iconPat.exec(block.spec);
    if (m) {
      const image = m[0];
      const hash = nativeHash.replace(hashSpec(image), unicodeIcons[image]);
      if (!blocksByHash[hash]) {
        blocksByHash[hash] = [];
      }
      blocksByHash[hash].push(block);
    }
  });

  language.nativeAliases = {};
  Object.keys(language.aliases).forEach(alias => {
    const blockId = language.aliases[alias];
    const block = blocksById[blockId];
    if (block === undefined) {
      throw new Error(`Invalid alias '${blockId}'`)
    }
    const aliasHash = hashSpec(alias);
    if (!blocksByHash[aliasHash]) {
      blocksByHash[aliasHash] = [];
    }
    blocksByHash[aliasHash].push(block);

    if (!language.nativeAliases[blockId]) {
      language.nativeAliases[blockId] = [];
    }
    language.nativeAliases[blockId].push(alias);
  });

  // Some English blocks were renamed between Scratch 2 and Scratch 3. Wire them
  // into language.blocksByHash
  Object.keys(language.renamedBlocks || {}).forEach(alt => {
    const id = language.renamedBlocks[alt];
    if (!blocksById[id]) {
      throw new Error(`Unknown ID: ${id}`)
    }
    const block = blocksById[id];
    const hash = hashSpec(alt);
    if (!english.blocksByHash[hash]) {
      english.blocksByHash[hash] = [];
    }
    english.blocksByHash[hash].push(block);
  });

  language.nativeDropdowns = {};
  Object.keys(language.dropdowns).forEach(name => {
    const nativeName = language.dropdowns[name];
    language.nativeDropdowns[nativeName] = name;
  });

  language.code = code;
  allLanguages[code] = language;
}
function loadLanguages(languages) {
  Object.keys(languages).forEach(code => loadLanguage(code, languages[code]));
}

const english = {
  aliases: {
    "turn ccw %1 degrees": "MOTION_TURNLEFT",
    "turn left %1 degrees": "MOTION_TURNLEFT",
    "turn cw %1 degrees": "MOTION_TURNRIGHT",
    "turn right %1 degrees": "MOTION_TURNRIGHT",
    "when flag clicked": "EVENT_WHENFLAGCLICKED",
    "when gf clicked": "EVENT_WHENFLAGCLICKED",
    "when green flag clicked": "EVENT_WHENFLAGCLICKED",
  },

  renamedBlocks: {
    "say %1 for %2 secs": "LOOKS_SAYFORSECS",
    "think %1 for %2 secs": "LOOKS_THINKFORSECS",
    "play sound %1": "SOUND_PLAY",
    "wait %1 secs": "CONTROL_WAIT",
    clear: "pen.clear",
  },

  definePrefix: ["define"],
  defineSuffix: [],

  // For ignoring the lt sign in the "when distance < _" block
  ignorelt: ["when distance"],

  // Valid arguments to "of" dropdown, for resolving ambiguous situations
  math: [
    "abs",
    "floor",
    "ceiling",
    "sqrt",
    "sin",
    "cos",
    "tan",
    "asin",
    "acos",
    "atan",
    "ln",
    "log",
    "e ^",
    "10 ^",
  ],

  // Valid arguments to "sound effect" dropdown, for resolving ambiguous situations
  soundEffects: ["pitch", "pan left/right"],

  // Valid arguments to "microbit when" dropdown
  microbitWhen: ["moved", "shaken", "jumped"],

  // For detecting the "stop" cap / stack block
  osis: ["other scripts in sprite", "other scripts in stage"],

  dropdowns: {},

  commands: {},
};
allBlocks.forEach(info => {
  english.commands[info.id] = info.spec;
});
loadLanguages({
  en: english,
});

/*****************************************************************************/

function registerCheck(id, func) {
  if (!blocksById[id]) {
    throw new Error(`Unknown ID: ${id}`)
  }
  blocksById[id].accepts = func;
}

function specialCase(id, func) {
  if (!blocksById[id]) {
    throw new Error(`Unknown ID: ${id}`)
  }
  blocksById[id].specialCase = func;
}

function disambig(id1, id2, test) {
  registerCheck(id1, (_, children, lang) => {
    return test(children, lang)
  });
  registerCheck(id2, (_, children, lang) => {
    return !test(children, lang)
  });
}

disambig("OPERATORS_MATHOP", "SENSING_OF", (children, lang) => {
  // Operators if math function, otherwise sensing "attribute of" block
  const first = children[0];
  if (!first.isInput) {
    return
  }
  const name = first.value;
  return lang.math.includes(name)
});

disambig("SOUND_CHANGEEFFECTBY", "LOOKS_CHANGEEFFECTBY", (children, lang) => {
  // Sound if sound effect, otherwise default to graphic effect
  for (const child of children) {
    if (child.shape === "dropdown") {
      const name = child.value;
      for (const effect of lang.soundEffects) {
        if (minifyHash(effect) === minifyHash(name)) {
          return true
        }
      }
    }
  }
  return false
});

disambig("SOUND_SETEFFECTO", "LOOKS_SETEFFECTTO", (children, lang) => {
  // Sound if sound effect, otherwise default to graphic effect
  for (const child of children) {
    if (child.shape === "dropdown") {
      const name = child.value;
      for (const effect of lang.soundEffects) {
        if (minifyHash(effect) === minifyHash(name)) {
          return true
        }
      }
    }
  }
  return false
});

disambig("DATA_LENGTHOFLIST", "OPERATORS_LENGTH", (children, _lang) => {
  // List block if dropdown, otherwise operators
  const last = children[children.length - 1];
  if (!last.isInput) {
    return
  }
  return last.shape === "dropdown"
});

disambig("DATA_LISTCONTAINSITEM", "OPERATORS_CONTAINS", (children, _lang) => {
  // List block if dropdown, otherwise operators
  const first = children[0];
  if (!first.isInput) {
    return
  }
  return first.shape === "dropdown"
});

disambig("pen.setColor", "pen.setHue", (children, _lang) => {
  // Color block if color input, otherwise numeric
  const last = children[children.length - 1];
  // If variable, assume color input, since the RGBA hack is common.
  // TODO fix Scratch :P
  return (last.isInput && last.isColor) || last.isBlock
});

disambig("microbit.whenGesture", "gdxfor.whenGesture", (children, lang) => {
  for (const child of children) {
    if (child.shape === "dropdown") {
      const name = child.value;
      // Yes, "when shaken" gdxfor block exists. But microbit is more common.
      for (const effect of lang.microbitWhen) {
        if (minifyHash(effect) === minifyHash(name)) {
          return true
        }
      }
    }
  }
  return false
});

// This block does not need disambiguation in English;
// however, many other languages do require that.
disambig("ev3.buttonPressed", "microbit.isButtonPressed", (children, _lang) => {
  for (const child of children) {
    if (child.shape === "dropdown") {
      // EV3 "button pressed" block uses numeric identifier
      // and does not support "any".
      switch (minifyHash(child.value)) {
        case "1":
        case "2":
        case "3":
        case "4":
          return true
      }
    }
  }
  return false
});

specialCase("CONTROL_STOP", (_, children, lang) => {
  // Cap block unless argument is "other scripts in sprite"
  const last = children[children.length - 1];
  if (!last.isInput) {
    return
  }
  const value = last.value;
  if (lang.osis.includes(value)) {
    return { ...blocksById.CONTROL_STOP, shape: "stack" }
  }
});

function lookupHash(hash, info, children, languages) {
  for (const lang of languages) {
    if (Object.prototype.hasOwnProperty.call(lang.blocksByHash, hash)) {
      const collisions = lang.blocksByHash[hash];
      for (let block of collisions) {
        if (
          info.shape === "reporter" &&
          block.shape !== "reporter" &&
          block.shape !== "ring"
        ) {
          continue
        }
        if (info.shape === "boolean" && block.shape !== "boolean") {
          continue
        }
        if (collisions.length > 1) {
          // Only check in case of collision;
          // perform "disambiguation"
          if (block.accepts && !block.accepts(info, children, lang)) {
            continue
          }
        }
        if (block.specialCase) {
          block = block.specialCase(info, children, lang) || block;
        }
        return { type: block, lang: lang }
      }
    }
  }
}

function lookupDropdown(name, languages) {
  for (const lang of languages) {
    if (Object.prototype.hasOwnProperty.call(lang.nativeDropdowns, name)) {
      return lang.nativeDropdowns[name]
    }
  }
}

function applyOverrides(info, overrides) {
  for (const name of overrides) {
    if (hexColorPat.test(name)) {
      info.color = name;
      info.category = "";
      info.categoryIsDefault = false;
    } else if (overrideCategories.includes(name)) {
      info.category = name;
      info.categoryIsDefault = false;
    } else if (overrideShapes.includes(name)) {
      info.shape = name;
    } else if (name === "loop") {
      info.hasLoopArrow = true;
    } else if (name === "+" || name === "-") {
      info.diff = name;
    }
  }
}

function blockName(block) {
  const words = [];
  for (const child of block.children) {
    if (!child.isLabel) {
      return
    }
    words.push(child.value);
  }
  return words.join(" ")
}

function assert$2(bool, message) {
  if (!bool) {
    throw new Error(`Assertion failed! ${message || ""}`)
  }
}

function indent(text) {
  return text
    .split("\n")
    .map(line => {
      return `  ${line}`
    })
    .join("\n")
}

class Label {
  constructor(value, cls) {
    this.value = value;
    this.cls = cls || "";
    this.el = null;
    this.height = 12;
    this.metrics = null;
    this.x = 0;
  }
  get isLabel() {
    return true
  }

  stringify() {
    if (this.value === "<" || this.value === ">") {
      return this.value
    }
    return this.value.replace(/([<>[\](){}])/g, "\\$1")
  }
}

class Icon {
  constructor(name) {
    this.name = name;
    this.isArrow = name === "loopArrow";

    assert$2(Icon.icons[name], `no info for icon ${name}`);
  }
  get isIcon() {
    return true
  }

  static get icons() {
    return {
      greenFlag: true,
      stopSign: true,
      turnLeft: true,
      turnRight: true,
      loopArrow: true,
      addInput: true,
      delInput: true,
      list: true,
    }
  }

  stringify() {
    return unicodeIcons[`@${this.name}`] || ""
  }
}

class Input {
  constructor(shape, value, menu) {
    this.shape = shape;
    this.value = value;
    this.menu = menu || null;

    this.isRound = shape === "number" || shape === "number-dropdown";
    this.isBoolean = shape === "boolean";
    this.isStack = shape === "stack";
    this.isInset =
      shape === "boolean" || shape === "stack" || shape === "reporter";
    this.isColor = shape === "color";
    this.hasArrow = shape === "dropdown" || shape === "number-dropdown";
    this.isDarker =
      shape === "boolean" || shape === "stack" || shape === "dropdown";
    this.isSquare =
      shape === "string" || shape === "color" || shape === "dropdown";

    this.hasLabel = !(this.isColor || this.isInset);
    this.label = this.hasLabel
      ? new Label(value, `literal-${this.shape}`)
      : null;
    this.x = 0;
  }
  get isInput() {
    return true
  }

  stringify() {
    if (this.isColor) {
      assert$2(this.value[0] === "#");
      return `[${this.value}]`
    }
    // Order sensitive; see #439
    let text = (this.value ? String(this.value) : "")
      .replace(/([\]\\])/g, "\\$1")
      .replace(/ v$/, " \\v");
    if (this.hasArrow) {
      text += " v";
    }
    return this.isRound
      ? `(${text})`
      : this.isSquare
      ? `[${text}]`
      : this.isBoolean
      ? "<>"
      : this.isStack
      ? "{}"
      : text
  }

  translate(_lang) {
    if (this.hasArrow) {
      const value = this.menu || this.value;
      this.value = value; // TODO translate dropdown value
      this.label = new Label(this.value, `literal-${this.shape}`);
    }
  }
}

class Block {
  constructor(info, children, comment) {
    assert$2(info);
    this.info = { ...info };
    this.children = children;
    this.comment = comment || null;
    this.diff = null;

    const shape = this.info.shape;
    this.isHat = shape === "hat" || shape === "cat" || shape === "define-hat";
    this.hasPuzzle =
      shape === "stack" ||
      shape === "hat" ||
      shape === "cat" ||
      shape === "c-block";
    this.isFinal = /cap/.test(shape);
    this.isCommand = shape === "stack" || shape === "cap" || /block/.test(shape);
    this.isOutline = shape === "outline";
    this.isReporter = shape === "reporter";
    this.isBoolean = shape === "boolean";

    this.isRing = shape === "ring";
    this.hasScript = /block/.test(shape);
    this.isElse = shape === "celse";
    this.isEnd = shape === "cend";
  }
  get isBlock() {
    return true
  }

  stringify(extras) {
    let firstInput = null;
    let checkAlias = false;
    let text = this.children
      .map(child => {
        if (child.isIcon) {
          checkAlias = true;
        }
        if (!firstInput && !(child.isLabel || child.isIcon)) {
          firstInput = child;
        }
        return child.isScript
          ? `\n${indent(child.stringify())}\n`
          : child.stringify().trim() + " "
      })
      .join("")
      .trim();

    const lang = this.info.language;
    if (checkAlias && lang && this.info.selector) {
      const aliases = lang.nativeAliases[this.info.id];
      if (aliases && aliases.length) {
        let alias = aliases[0];
        // TODO make translate() not in-place, and use that
        if (inputPat.test(alias) && firstInput) {
          alias = alias.replace(inputPat, firstInput.stringify());
        }
        return alias
      }
    }

    let overrides = extras || "";
    if (
      this.info.categoryIsDefault === false ||
      (this.info.category === "custom-arg" &&
        (this.isReporter || this.isBoolean)) ||
      (this.info.category === "custom" && this.info.shape === "stack")
    ) {
      if (overrides) {
        overrides += " ";
      }
      overrides += this.info.category;
    }
    if (overrides) {
      text += ` :: ${overrides}`;
    }
    return this.hasScript
      ? text + "\nend"
      : this.info.shape === "reporter"
      ? `(${text})`
      : this.info.shape === "boolean"
      ? `<${text}>`
      : text
  }

  translate(lang, isShallow) {
    if (!lang) {
      throw new Error("Missing language")
    }

    const id = this.info.id;
    if (!id) {
      return
    }

    if (id === "PROCEDURES_DEFINITION") {
      // Find the first 'outline' child (there should be exactly one).
      const outline = this.children.find(child => child.isOutline);

      this.children = [];
      for (const word of lang.definePrefix) {
        this.children.push(new Label(word));
      }
      this.children.push(outline);
      for (const word of lang.defineSuffix) {
        this.children.push(new Label(word));
      }
      return
    }

    const oldSpec = this.info.language.commands[id];

    const nativeSpec = lang.commands[id];
    if (!nativeSpec) {
      return
    }
    const nativeInfo = parseSpec(nativeSpec);

    const rawArgs = this.children.filter(
      child => !child.isLabel && !child.isIcon,
    );

    if (!isShallow) {
      rawArgs.forEach(child => child.translate(lang));
    }

    // Work out indexes of existing children
    const oldParts = parseSpec(oldSpec).parts;
    const oldInputOrder = oldParts
      .map(part => parseInputNumber(part))
      .filter(x => x);

    let highestNumber = 0;
    const args = oldInputOrder.map(number => {
      highestNumber = Math.max(highestNumber, number);
      return rawArgs[number - 1]
    });
    const remainingArgs = rawArgs.slice(highestNumber);

    // Get new children by index
    this.children = nativeInfo.parts
      .map(part => {
        part = part.trim();
        if (!part) {
          return
        }
        const number = parseInputNumber(part);
        if (number) {
          return args[number - 1]
        }
        return iconPat.test(part) ? new Icon(part.slice(1)) : new Label(part)
      })
      .filter(x => x);

    // Push any remaining children, so we pick up C block bodies
    remainingArgs.forEach((arg, index) => {
      if (index === 1 && this.info.id === "CONTROL_IF") {
        this.children.push(new Label(lang.commands.CONTROL_ELSE));
      }
      this.children.push(arg);
    });

    this.info.language = lang;
    this.info.isRTL = rtlLanguages.includes(lang.code);
    this.info.categoryIsDefault = true;
  }
}

class Comment {
  constructor(value, hasBlock) {
    this.label = new Label(value, "comment-label");
    this.width = null;
    this.hasBlock = hasBlock;
  }
  get isComment() {
    return true
  }

  stringify() {
    return `// ${this.label.value}`
  }
}

class Glow {
  constructor(child) {
    assert$2(child);
    this.child = child;
    if (child.isBlock) {
      this.shape = child.info.shape;
      this.info = child.info;
    } else {
      this.shape = "stack";
    }
  }
  get isGlow() {
    return true
  }

  stringify() {
    if (this.child.isBlock) {
      return this.child.stringify("+")
    }
    const lines = this.child.stringify().split("\n");
    return lines.map(line => `+ ${line}`).join("\n")
  }

  translate(lang) {
    this.child.translate(lang);
  }
}

class Script {
  constructor(blocks) {
    this.blocks = blocks;
    this.isEmpty = !blocks.length;
    this.isFinal = !this.isEmpty && blocks[blocks.length - 1].isFinal;
  }
  get isScript() {
    return true
  }

  stringify() {
    return this.blocks
      .map(block => {
        let line = block.stringify();
        if (block.comment) {
          line += ` ${block.comment.stringify()}`;
        }
        return line
      })
      .join("\n")
  }

  translate(lang) {
    this.blocks.forEach(block => block.translate(lang));
  }
}

class Document {
  constructor(scripts) {
    this.scripts = scripts;
  }

  stringify() {
    return this.scripts.map(script => script.stringify()).join("\n\n")
  }

  translate(lang) {
    this.scripts.forEach(script => script.translate(lang));
  }
}

function assert$1(bool, message) {
  if (!bool) {
    throw new Error(`Assertion failed! ${message || ""}`)
  }
}

function paintBlock(info, children, languages) {
  let overrides = [];
  if (Array.isArray(children[children.length - 1])) {
    overrides = children.pop();
  }

  // build hash
  const words = [];
  for (const child of children) {
    if (child.isLabel) {
      words.push(child.value);
    } else if (child.isIcon) {
      words.push(`@${child.name}`);
    } else {
      words.push("_");
    }
  }
  const string = words.join(" ");
  const shortHash = (info.hash = minifyHash(string));

  // paint
  const o = lookupHash(shortHash, info, children, languages);
  let lang;
  let type;
  if (o) {
    lang = o.lang;
    type = o.type;
    info.language = lang;
    info.isRTL = rtlLanguages.includes(lang.code);

    if (
      type.shape === "ring" ? info.shape === "reporter" : info.shape === "stack"
    ) {
      info.shape = type.shape;
    }
    info.category = type.category;
    info.categoryIsDefault = true;
    // store selector, used for translation among other things
    if (type.selector) {
      info.selector = type.selector;
    }
    if (type.id) {
      info.id = type.id;
    }
    info.hasLoopArrow = type.hasLoopArrow;

    // ellipsis block
    if (type.spec === ". . .") {
      children = [new Label(". . .")];
    }
  } else {
    // The block was not recognised, so we check if it's a define block.
    //
    // We check for built-in blocks first to avoid ambiguity, e.g. the
    // `defina o tamanho como (100) %` block in pt_BR.
    for (const lang of languages) {
      if (!isDefineBlock(children, lang)) {
        continue
      }

      // Setting the shape also triggers some logic in recogniseStuff.
      info.shape = "define-hat";
      info.category = "custom";

      // Move the children of the define block into an "outline", transforming
      // () and [] shapes as we go.
      const outlineChildren = children
        .splice(
          lang.definePrefix.length,
          children.length - lang.defineSuffix.length,
        )
        .map(child => {
          if (child.isInput && child.isBoolean) {
            // Convert empty boolean slot to empty boolean argument.
            child = paintBlock(
              {
                shape: "boolean",
                argument: "boolean",
                category: "custom-arg",
              },
              [new Label("")],
              languages,
            );
          } else if (
            child.isInput &&
            (child.shape === "string" || child.shape === "number")
          ) {
            // Convert string inputs to string arguments, number inputs to number arguments.
            const labels = child.value.split(/ +/g).map(word => new Label(word));
            child = paintBlock(
              {
                shape: "reporter",
                argument: child.shape === "string" ? "string" : "number",
                category: "custom-arg",
              },
              labels,
              languages,
            );
          } else if (child.isReporter || child.isBoolean) {
            // Convert variables to number arguments, predicates to boolean arguments.
            if (child.info.categoryIsDefault) {
              child.info.category = "custom-arg";
              child.info.argument = child.isBoolean ? "boolean" : "number";
            }
          }
          return child
        });

      const outlineInfo = {
        shape: "outline",
        category: "custom",
        categoryIsDefault: true,
        hasLoopArrow: false,
      };
      const outline = new Block(outlineInfo, outlineChildren);
      children.splice(lang.definePrefix.length, 0, outline);
      break
    }
  }

  // Apply overrides.
  applyOverrides(info, overrides);

  // loop arrows
  if (info.hasLoopArrow) {
    children.push(new Icon("loopArrow"));
  }

  const block = new Block(info, children);

  // image replacement
  if (type && iconPat.test(type.spec)) {
    block.translate(lang, true);
  }

  // diffs
  if (info.diff === "+") {
    return new Glow(block)
  }
  block.diff = info.diff;

  return block
}

function isDefineBlock(children, lang) {
  if (children.length < lang.definePrefix.length) {
    return false
  }
  if (children.length < lang.defineSuffix.length) {
    return false
  }

  for (let i = 0; i < lang.definePrefix.length; i++) {
    const defineWord = lang.definePrefix[i];
    const child = children[i];
    if (!child.isLabel || minifyHash(child.value) !== minifyHash(defineWord)) {
      return false
    }
  }

  for (let i = 1; i <= lang.defineSuffix.length; i++) {
    const defineWord = lang.defineSuffix[lang.defineSuffix.length - i];
    const child = children[children.length - i];
    if (!child.isLabel || minifyHash(child.value) !== minifyHash(defineWord)) {
      return false
    }
  }

  return true
}

function parseLines(code, languages) {
  let tok = code[0];
  let index = 0;
  function next() {
    tok = code[++index];
  }
  function peek() {
    return code[index + 1]
  }
  function peekNonWs() {
    for (let i = index + 1; i < code.length; i++) {
      if (code[i] !== " ") {
        return code[i]
      }
    }
  }
  let sawNL;

  let define = [];
  languages.map(lang => {
    define = define.concat(lang.define);
  });

  function makeBlock(shape, children) {
    const hasInputs = children.filter(x => !x.isLabel).length;

    const info = {
      shape: shape,
      category: shape === "reporter" && !hasInputs ? "variables" : "obsolete",
      categoryIsDefault: true,
      hasLoopArrow: false,
    };

    return paintBlock(info, children, languages)
  }

  function makeMenu(shape, value) {
    const menu = lookupDropdown(value, languages) || value;
    return new Input(shape, value, menu)
  }

  function pParts(end) {
    const children = [];
    let label;
    while (tok && tok !== "\n") {
      // So that comparison operators `<()<()>` and `<()>()>` don't need the
      // central <> escaped, we interpret it as a label if particular
      // conditions are met.
      if (
        (tok === "<" || tok === ">") &&
        end === ">" && // We're parsing a predicate.
        children.length === 1 && // There's exactly one AST node behind us.
        !children[children.length - 1].isLabel // That node is not a label.
      ) {
        const c = peekNonWs();
        // The next token starts some kind of input.
        if (c === "[" || c === "(" || c === "<" || c === "{") {
          label = null;
          children.push(new Label(tok));
          next();
          continue
        }
      }
      if (tok === end) {
        break
      }
      if (tok === "/" && peek() === "/" && !end) {
        break
      }

      switch (tok) {
        case "[":
          label = null;
          children.push(pString());
          break
        case "(":
          label = null;
          children.push(pReporter());
          break
        case "<":
          label = null;
          children.push(pPredicate());
          break
        case "{":
          label = null;
          children.push(pEmbedded());
          break
        case " ":
        case "\t":
          next(); // Skip over whitespace.
          label = null;
          break
        case "◂":
        case "▸":
          children.push(pIcon());
          label = null;
          break
        case "@": {
          next();
          let name = "";
          while (tok && /[a-zA-Z]/.test(tok)) {
            name += tok;
            next();
          }
          if (name === "cloud") {
            children.push(new Label("☁"));
          } else {
            children.push(
              Object.prototype.hasOwnProperty.call(Icon.icons, name)
                ? new Icon(name)
                : new Label(`@${name}`),
            );
          }
          label = null;
          break
        }
        case "\\":
          next(); // escape character
        // fallthrough
        case ":":
          if (tok === ":" && peek() === ":") {
            children.push(pOverrides(end));
            return children
          }
        // fallthrough
        default:
          if (!label) {
            children.push((label = new Label("")));
          }
          label.value += tok;
          next();
      }
    }
    return children
  }

  function pString() {
    next(); // '['
    let s = "";
    let escapeV = false;
    while (tok && tok !== "]" && tok !== "\n") {
      if (tok === "\\") {
        next();
        if (tok === "v") {
          escapeV = true;
        }
        if (!tok) {
          break
        }
      } else {
        escapeV = false;
      }
      s += tok;
      next();
    }
    if (tok === "]") {
      next();
    }
    if (hexColorPat.test(s)) {
      return new Input("color", s)
    }
    return !escapeV && / v$/.test(s)
      ? makeMenu("dropdown", s.slice(0, s.length - 2))
      : new Input("string", s)
  }

  function pBlock(end) {
    const children = pParts(end);
    if (tok && tok === "\n") {
      sawNL = true;
      next();
    }
    if (children.length === 0) {
      return
    }

    // standalone reporters
    if (children.length === 1) {
      const child = children[0];
      if (
        child.isBlock &&
        (child.isReporter || child.isBoolean || child.isRing)
      ) {
        return child
      }
    }

    return makeBlock("stack", children)
  }

  function pReporter() {
    next(); // '('

    // empty number-dropdown
    if (tok === " ") {
      next();
      if (tok === "v" && peek() === ")") {
        next();
        next();
        return new Input("number-dropdown", "")
      }
    }

    const children = pParts(")");
    if (tok && tok === ")") {
      next();
    }

    // empty numbers
    if (children.length === 0) {
      return new Input("number", "")
    }

    // number
    if (children.length === 1 && children[0].isLabel) {
      const value = children[0].value;
      if (/^[0-9e.-]*$/.test(value)) {
        return new Input("number", value)
      }
      if (hexColorPat.test(value)) {
        return new Input("color", value)
      }
    }

    // number-dropdown
    if (children.length > 1 && children.every(child => child.isLabel)) {
      const last = children[children.length - 1];
      if (last.value === "v") {
        children.pop();
        const value = children.map(l => l.value).join(" ");
        return makeMenu("number-dropdown", value)
      }
    }

    const block = makeBlock("reporter", children);

    // rings
    if (block.info && block.info.shape === "ring") {
      const first = block.children[0];
      if (
        first &&
        first.isInput &&
        first.shape === "number" &&
        first.value === ""
      ) {
        block.children[0] = new Input("reporter");
      } else if (
        (first && first.isScript && first.isEmpty) ||
        (first && first.isBlock && !first.children.length)
      ) {
        block.children[0] = new Input("stack");
      }
    }

    return block
  }

  function pPredicate() {
    next(); // '<'
    const children = pParts(">");
    if (tok && tok === ">") {
      next();
    }
    if (children.length === 0) {
      return new Input("boolean")
    }
    return makeBlock("boolean", children)
  }

  function pEmbedded() {
    next(); // '{'

    sawNL = false;
    const f = function () {
      while (tok && tok !== "}") {
        const block = pBlock("}");
        if (block) {
          return block
        }
      }
    };
    const scripts = parseScripts(f);
    let blocks = [];
    scripts.forEach(script => {
      blocks = blocks.concat(script.blocks);
    });

    if (tok === "}") {
      next();
    }
    if (!sawNL) {
      assert$1(blocks.length <= 1);
      return blocks.length ? blocks[0] : makeBlock("stack", [])
    }
    return new Script(blocks)
  }

  function pIcon() {
    const c = tok;
    next();
    switch (c) {
      case "▸":
        return new Icon("addInput")
      case "◂":
        return new Icon("delInput")
      default:
        return
    }
  }

  function pOverrides(end) {
    next();
    next();
    const overrides = [];
    let override = "";
    while (tok && tok !== "\n" && tok !== end) {
      if (tok === " ") {
        if (override) {
          overrides.push(override);
          override = "";
        }
      } else if (tok === "/" && peek() === "/") {
        break
      } else {
        override += tok;
      }
      next();
    }
    if (override) {
      overrides.push(override);
    }
    return overrides
  }

  function pComment(end) {
    next();
    next();
    let comment = "";
    while (tok && tok !== "\n" && tok !== end) {
      comment += tok;
      next();
    }
    if (tok && tok === "\n") {
      next();
    }
    return new Comment(comment, true)
  }

  function pLine() {
    let diff;
    if (tok === "+" || tok === "-") {
      diff = tok;
      next();
    }
    const block = pBlock();
    if (tok === "/" && peek() === "/") {
      const comment = pComment();
      comment.hasBlock = block && block.children.length;
      if (!comment.hasBlock) {
        return comment
      }
      block.comment = comment;
    }
    if (block) {
      block.diff = diff;
    }
    return block
  }

  return () => {
    if (!tok) {
      return undefined
    }
    const line = pLine();
    return line || "NL"
  }
}

/* * */

function parseScripts(getLine) {
  let line = getLine();
  function next() {
    line = getLine();
  }

  function pFile() {
    while (line === "NL") {
      next();
    }
    const scripts = [];
    while (line) {
      let blocks = [];
      while (line && line !== "NL") {
        let b = pLine();
        const isGlow = b.diff === "+";
        if (isGlow) {
          b.diff = null;
        }

        if (b.isElse || b.isEnd) {
          b = new Block({ ...b.info, shape: "stack" }, b.children);
        }

        if (isGlow) {
          const last = blocks[blocks.length - 1];
          let children = [];
          if (last && last.isGlow) {
            blocks.pop();
            children = last.child.isScript ? last.child.blocks : [last.child];
          }
          children.push(b);
          blocks.push(new Glow(new Script(children)));
        } else if (b.isHat) {
          if (blocks.length) {
            scripts.push(new Script(blocks));
          }
          blocks = [b];
        } else if (b.isFinal) {
          blocks.push(b);
          break
        } else if (b.isCommand) {
          blocks.push(b);
        } else {
          // reporter or predicate
          if (blocks.length) {
            scripts.push(new Script(blocks));
          }
          scripts.push(new Script([b]));
          blocks = [];
          break
        }
      }
      if (blocks.length) {
        scripts.push(new Script(blocks));
      }
      while (line === "NL") {
        next();
      }
    }
    return scripts
  }

  function pLine() {
    const b = line;
    next();

    if (b.hasScript) {
      while (true) {
        const blocks = pMouth();
        b.children.push(new Script(blocks));
        if (line && line.isElse) {
          for (const child of line.children) {
            b.children.push(child);
          }
          next();
          continue
        }
        if (line && line.isEnd) {
          next();
        }
        break
      }
    }
    return b
  }

  function pMouth() {
    const blocks = [];
    while (line) {
      if (line === "NL") {
        next();
        continue
      }
      if (!line.isCommand) {
        return blocks
      }

      const b = pLine();
      const isGlow = b.diff === "+";
      if (isGlow) {
        b.diff = null;
      }

      if (isGlow) {
        const last = blocks[blocks.length - 1];
        let children = [];
        if (last && last.isGlow) {
          blocks.pop();
          children = last.child.isScript ? last.child.blocks : [last.child];
        }
        children.push(b);
        blocks.push(new Glow(new Script(children)));
      } else {
        blocks.push(b);
      }
    }
    return blocks
  }

  return pFile()
}

/* * */

function eachBlock(x, cb) {
  if (x.isScript) {
    x.blocks = x.blocks.map(block => {
      eachBlock(block, cb);
      return cb(block) || block
    });
  } else if (x.isBlock) {
    x.children = x.children.map(child => {
      eachBlock(child, cb);
      return cb(child) || child
    });
  } else if (x.isGlow) {
    eachBlock(x.child, cb);
  }
}

const listBlocks = {
  "append:toList:": 1,
  "deleteLine:ofList:": 1,
  "insert:at:ofList:": 2,
  "setLine:ofList:to:": 1,
  "showList:": 0,
  "hideList:": 0,
};

function recogniseStuff(scripts) {
  const customBlocksByHash = Object.create(null);
  const listNames = new Set();

  scripts.forEach(script => {
    const customArgs = new Set();

    eachBlock(script, block => {
      if (!block.isBlock) {
        return
      }

      // custom blocks
      if (block.info.shape === "define-hat") {
        // There should be exactly one `outline` child, added in paintBlock.
        const outline = block.children.find(child => child.isOutline);
        if (!outline) {
          return
        }

        const names = [];
        const parts = [];
        for (const child of outline.children) {
          if (child.isLabel) {
            parts.push(child.value);
          } else if (child.isBlock) {
            if (!child.info.argument) {
              return
            }
            parts.push(
              {
                number: "%n",
                string: "%s",
                boolean: "%b",
              }[child.info.argument],
            );

            const name = blockName(child);
            names.push(name);
            customArgs.add(name);
          }
        }
        const spec = parts.join(" ");
        const hash = hashSpec(spec);

        const info = {
          spec: spec,
          names: names,
        };
        if (!customBlocksByHash[hash]) {
          customBlocksByHash[hash] = info;
        }
        block.info.id = "PROCEDURES_DEFINITION";
        block.info.selector = "procDef";
        block.info.call = info.spec;
        block.info.names = info.names;
        block.info.category = "custom";

        // custom arguments
      } else if (
        block.info.categoryIsDefault &&
        (block.isReporter || block.isBoolean)
      ) {
        const name = blockName(block);
        if (customArgs.has(name)) {
          block.info.category = "custom-arg";
          block.info.categoryIsDefault = false;
          block.info.selector = "getParam";
        }

        // list names
      } else if (
        Object.prototype.hasOwnProperty.call(listBlocks, block.info.selector)
      ) {
        const argIndex = listBlocks[block.info.selector];
        const inputs = block.children.filter(child => !child.isLabel);
        const input = inputs[argIndex];
        if (input && input.isInput) {
          listNames.add(input.value);
        }
      }
    });
  });

  scripts.forEach(script => {
    eachBlock(script, block => {
      if (
        block.info &&
        block.info.categoryIsDefault &&
        block.info.category === "obsolete"
      ) {
        // custom blocks
        const info = customBlocksByHash[block.info.hash];
        if (info) {
          block.info.selector = "call";
          block.info.call = info.spec;
          block.info.names = info.names;
          block.info.category = "custom";
        }
        return
      }

      let name, info;
      if (
        block.isReporter &&
        block.info.category === "variables" &&
        block.info.categoryIsDefault
      ) {
        // We set the selector here for some reason
        block.info.selector = "readVariable";
        name = blockName(block);
        info = block.info;
      }
      if (!name) {
        return
      }

      // list reporters
      if (listNames.has(name)) {
        info.category = "list";
        info.categoryIsDefault = false;
        info.selector = "contentsOfList:";
      }

      return // already done
    });
  });
}

function parse(code, options) {
  options = {
    inline: false,
    languages: ["en"],
    ...options,
  };

  if (options.dialect) {
    throw new Error("Option 'dialect' no longer supported")
  }

  code = code.replace(/&lt;/g, "<");
  code = code.replace(/&gt;/g, ">");
  if (options.inline) {
    code = code.replace(/\n/g, " ");
  }

  const languages = options.languages.map(code => {
    const lang = allLanguages[code];
    if (!lang) {
      throw new Error(`Unknown language: '${code}'`)
    }
    return lang
  });

  /* * */

  const f = parseLines(code, languages);
  const scripts = parseScripts(f);
  recogniseStuff(scripts);
  return new Document(scripts)
}

/* for constructing SVGs */

function assert(bool, message) {
  if (!bool) {
    throw new Error(`Assertion failed! ${message || ""}`)
  }
}

// set by SVG.init
let document$1;
let xml$1;

const directProps$1 = {
  textContent: true,
};

let SVG$1 = class SVG {
  static init(window) {
    document$1 = window.document;
    const DOMParser = window.DOMParser;
    xml$1 = new DOMParser().parseFromString("<xml></xml>", "application/xml");
    SVG.XMLSerializer = window.XMLSerializer;
  }

  static makeCanvas() {
    return document$1.createElement("canvas")
  }

  static cdata(content) {
    return xml$1.createCDATASection(content)
  }

  static el(name, props) {
    const el = document$1.createElementNS("http://www.w3.org/2000/svg", name);
    return SVG.setProps(el, props)
  }

  static setProps(el, props) {
    for (const key in props) {
      const value = String(props[key]);
      if (directProps$1[key]) {
        el[key] = value;
      } else if (
        props[key] != null &&
        Object.prototype.hasOwnProperty.call(props, key)
      ) {
        el.setAttributeNS(null, key, value);
      }
    }
    return el
  }

  static withChildren(el, children) {
    for (const child of children) {
      el.appendChild(child);
    }
    return el
  }

  static group(children) {
    return SVG.withChildren(SVG.el("g"), children)
  }

  static newSVG(width, height, scale) {
    return SVG.el("svg", {
      version: "1.1",
      width: width * scale,
      height: height * scale,
      viewBox: `0 0 ${width} ${height}`,
    })
  }

  static polygon(props) {
    return SVG.el("polygon", { ...props, points: props.points.join(" ") })
  }

  static path(props) {
    return SVG.el("path", { ...props, path: null, d: props.path.join(" ") })
  }

  static text(x, y, content, props) {
    const text = SVG.el("text", { ...props, x: x, y: y, textContent: content });
    return text
  }

  static symbol(href) {
    return SVG.el("use", {
      href: href,
    })
  }

  static move(dx, dy, el) {
    SVG.setProps(el, {
      transform: `translate(${dx} ${dy})`,
    });
    return el
  }

  // translatePath takes a path string such as "M 0 0 L 0 10 L 10 0 Z", fins
  // the individual X/Y components, and translates them by dx/dy, so as to
  // "move" the path.
  //
  // This is not a particularly good way of doing this, but given we control
  // the inputs to it it works well enough I guess?
  static translatePath(dx, dy, path) {
    let isX = true;
    const parts = path.split(/\s+/);
    const out = [];
    for (let i = 0; i < parts.length; i++) {
      let part = parts[i];
      if (part === "A") {
        const j = i + 5;
        out.push("A");
        while (i < j) {
          out.push(parts[++i]);
        }
        continue
      } else if (/[A-Za-z]/.test(part)) {
        // This assertion means the path was not a valid sequence of
        // [operation, X coordinate, Y coordinate, ...].
        //
        // It could indicate missing whitespace between the coordinates and the
        // operation.
        assert(isX, "translatePath: invalid argument");
      } else {
        part = +part;
        part += isX ? dx : dy;
        isX = !isX;
      }
      out.push(part);
    }
    return out.join(" ")
  }

  /* shapes */

  static rect(w, h, props) {
    return SVG.el("rect", { ...props, x: 0, y: 0, width: w, height: h })
  }

  static ellipse(w, h, props) {
    return SVG.el("ellipse", {
      ...props,
      cx: w / 2,
      cy: h / 2,
      rx: w / 2,
      ry: h / 2,
    })
  }

  static arc(p1x, p1y, p2x, p2y, rx, ry) {
    return `L ${p1x} ${p1y} A ${rx} ${ry} 0 0 1 ${p2x} ${p2y}`
  }

  static arcw(p1x, p1y, p2x, p2y, rx, ry) {
    return `L ${p1x} ${p1y} A ${rx} ${ry} 0 0 0 ${p2x} ${p2y}`
  }

  static roundedPath(w, h) {
    const r = h / 2;
    return [
      "M",
      r,
      0,
      SVG.arc(w - r, 0, w - r, h, r, r),
      SVG.arc(r, h, r, 0, r, r),
      "Z",
    ]
  }

  static roundedRect(w, h, props) {
    return SVG.path({ ...props, path: SVG.roundedPath(w, h) })
  }

  static pointedPath(w, h) {
    const r = h / 2;
    return [
      "M",
      r,
      0,
      "L",
      w - r,
      0,
      w,
      r,
      "L",
      w,
      r,
      w - r,
      h,
      "L",
      r,
      h,
      0,
      r,
      "L",
      0,
      r,
      r,
      0,
      "Z",
    ]
  }

  static pointedRect(w, h, props) {
    return SVG.path({ ...props, path: SVG.pointedPath(w, h) })
  }

  static getTop(w) {
    return `M 0 3
      L 3 0
      L 13 0
      L 16 3
      L 24 3
      L 27 0
      L ${w - 3} 0
      L ${w} 3`
  }

  static getRingTop(w) {
    return `M 0 3
      L 3 0
      L 7 0
      L 10 3
      L 16 3
      L 19 0
      L ${w - 3} 0
      L ${w} 3`
  }

  static getRightAndBottom(w, y, hasNotch, inset) {
    if (typeof inset === "undefined") {
      inset = 0;
    }
    let arr = ["L", w, y - 3, "L", w - 3, y];
    if (hasNotch) {
      arr = arr.concat([
        "L",
        inset + 27,
        y,
        "L",
        inset + 24,
        y + 3,
        "L",
        inset + 16,
        y + 3,
        "L",
        inset + 13,
        y,
      ]);
    }
    if (inset > 0) {
      arr = arr.concat(["L", inset + 2, y, "L", inset, y + 2]);
    } else {
      arr = arr.concat(["L", inset + 3, y, "L", 0, y - 3]);
    }
    return arr.join(" ")
  }

  static getArm(w, armTop) {
    return `L 15 ${armTop - 2}
      L 17 ${armTop}
      L ${w - 3} ${armTop}
      L ${w} ${armTop + 3}`
  }

  static stackRect(w, h, props) {
    return SVG.path({
      ...props,
      path: [SVG.getTop(w), SVG.getRightAndBottom(w, h, true, 0), "Z"],
    })
  }

  static capPath(w, h) {
    return [SVG.getTop(w), SVG.getRightAndBottom(w, h, false, 0), "Z"]
  }

  static capRect(w, h, props) {
    return SVG.path({ ...props, path: SVG.capPath(w, h) })
  }

  static hatRect(w, h, props) {
    return SVG.path({
      ...props,
      path: [
        "M",
        0,
        12,
        SVG.arc(0, 12, 80, 10, 80, 80),
        "L",
        w - 3,
        10,
        "L",
        w,
        10 + 3,
        SVG.getRightAndBottom(w, h, true),
        "Z",
      ],
    })
  }

  static curve(p1x, p1y, p2x, p2y, roundness) {
    roundness = roundness || 0.42;
    const midX = (p1x + p2x) / 2.0;
    const midY = (p1y + p2y) / 2.0;
    const cx = Math.round(midX + roundness * (p2y - p1y));
    const cy = Math.round(midY - roundness * (p2x - p1x));
    return `${cx} ${cy} ${p2x} ${p2y}`
  }

  static procHatBase(w, h, archRoundness, props) {
    // TODO use arc()
    archRoundness = Math.min(0.2, 35 / w);
    return SVG.path({
      ...props,
      path: [
        "M",
        0,
        15,
        "Q",
        SVG.curve(0, 15, w, 15, archRoundness),
        SVG.getRightAndBottom(w, h, true),
        "M",
        -1,
        13,
        "Q",
        SVG.curve(-1, 13, w + 1, 13, archRoundness),
        "Q",
        SVG.curve(w + 1, 13, w, 16, 0.6),
        "Q",
        SVG.curve(w, 16, 0, 16, -archRoundness),
        "Q",
        SVG.curve(0, 16, -1, 13, 0.6),
        "Z",
      ],
    })
  }

  static procHatCap(w, h, archRoundness) {
    // TODO use arc()
    // TODO this doesn't look quite right
    return SVG.path({
      path: [
        "M",
        -1,
        13,
        "Q",
        SVG.curve(-1, 13, w + 1, 13, archRoundness),
        "Q",
        SVG.curve(w + 1, 13, w, 16, 0.6),
        "Q",
        SVG.curve(w, 16, 0, 16, -archRoundness),
        "Q",
        SVG.curve(0, 16, -1, 13, 0.6),
        "Z",
      ],
      class: "sb-define-hat-cap",
    })
  }

  static procHatRect(w, h, props) {
    const q = 52;
    const y = h - q;

    const archRoundness = Math.min(0.2, 35 / w);

    return SVG.move(
      0,
      y,
      SVG.group([
        SVG.procHatBase(w, q, archRoundness, props),
        SVG.procHatCap(w, q, archRoundness),
      ]),
    )
  }

  static mouthRect(w, h, isFinal, lines, props) {
    let y = lines[0].height;
    const p = [SVG.getTop(w), SVG.getRightAndBottom(w, y, true, 15)];
    for (let i = 1; i < lines.length; i += 2) {
      const isLast = i + 2 === lines.length;

      y += lines[i].height - 3;
      p.push(SVG.getArm(w, y));

      const hasNotch = !(isLast && isFinal);
      const inset = isLast ? 0 : 15;
      y += lines[i + 1].height + 3;
      p.push(SVG.getRightAndBottom(w, y, hasNotch, inset));
    }
    return SVG.path({ ...props, path: p })
  }

  static ringRect(w, h, cy, cw, ch, shape, props) {
    const r = 8;
    const func =
      shape === "reporter"
        ? SVG.roundedPath
        : shape === "boolean"
        ? SVG.pointedPath
        : SVG.capPath;
    return SVG.path({
      ...props,
      path: [
        "M",
        r,
        0,
        SVG.arcw(r, 0, 0, r, r, r),
        SVG.arcw(0, h - r, r, h, r, r),
        SVG.arcw(w - r, h, w, h - r, r, r),
        SVG.arcw(w, r, w - r, 0, r, r),
        "Z",
        SVG.translatePath(4, cy || 4, func(cw, ch).join(" ")),
      ],
      "fill-rule": "even-odd",
    })
  }

  static commentRect(w, h, props) {
    const r = 6;
    return SVG.path({
      ...props,
      class: "sb-comment",
      path: [
        "M",
        r,
        0,
        SVG.arc(w - r, 0, w, r, r, r),
        SVG.arc(w, h - r, w - r, h, r, r),
        SVG.arc(r, h, 0, h - r, r, r),
        SVG.arc(0, r, r, 0, r, r),
        "Z",
      ],
    })
  }

  static commentLine(width, props) {
    return SVG.move(
      -width,
      9,
      SVG.rect(width, 2, { ...props, class: "sb-comment-line" }),
    )
  }

  static strikethroughLine(w, props) {
    return SVG.path({
      ...props,
      path: ["M", 0, 0, "L", w, 0],
      class: "sb-diff sb-diff-del",
    })
  }
};

class Filter {
  constructor(id, props) {
    this.el = SVG$1.el("filter", {
      ...props,
      id: id,
      x0: "-50%",
      y0: "-50%",
      width: "200%",
      height: "200%",
    });
    this.highestId = 0;
  }

  fe(name, props, children) {
    const shortName = name.toLowerCase().replace(/gaussian|osite/, "");
    const id = `${shortName}-${++this.highestId}`;
    this.el.appendChild(
      SVG$1.withChildren(
        SVG$1.el(`fe${name}`, { ...props, result: id }),
        children || [],
      ),
    );
    return id
  }

  comp(op, in1, in2, props) {
    return this.fe("Composite", { ...props, operator: op, in: in1, in2: in2 })
  }

  subtract(in1, in2) {
    return this.comp("arithmetic", in1, in2, { k2: +1, k3: -1 })
  }

  offset(dx, dy, in1) {
    return this.fe("Offset", {
      in: in1,
      dx: dx,
      dy: dy,
    })
  }

  flood(color, opacity, in1) {
    return this.fe("Flood", {
      in: in1,
      "flood-color": color,
      "flood-opacity": opacity,
    })
  }

  blur(dev, in1) {
    return this.fe("GaussianBlur", {
      in: in1,
      stdDeviation: `${dev} ${dev}`,
    })
  }

  colorMatrix(in1, values) {
    return this.fe("ColorMatrix", {
      in: in1,
      type: "matrix",
      values: values.join(" "),
    })
  }

  merge(children) {
    this.fe(
      "Merge",
      {},
      children.map(name =>
        SVG$1.el("feMergeNode", {
          in: name,
        }),
      ),
    );
  }
}

var cssContent$1 = "\n.sb-label {\n  font-family: Lucida Grande, Verdana, Arial, DejaVu Sans, sans-serif;\n  font-weight: bold;\n  fill: #fff;\n  font-size: 10px;\n  word-spacing: +1px;\n}\n\n.sb-obsolete {\n  fill: #d42828;\n}\n.sb-motion {\n  fill: #4a6cd4;\n}\n.sb-looks {\n  fill: #8a55d7;\n}\n.sb-sound {\n  fill: #bb42c3;\n}\n.sb-pen {\n  fill: #0e9a6c;\n}\n.sb-events {\n  fill: #c88330;\n}\n.sb-control {\n  fill: #e1a91a;\n}\n.sb-sensing {\n  fill: #2ca5e2;\n}\n.sb-operators {\n  fill: #5cb712;\n}\n.sb-variables {\n  fill: #ee7d16;\n}\n.sb-list {\n  fill: #cc5b22;\n}\n.sb-custom {\n  fill: #632d99;\n}\n.sb-custom-arg {\n  fill: #5947b1;\n}\n.sb-extension {\n  fill: #4b4a60;\n}\n.sb-grey {\n  fill: #969696;\n}\n\n.sb-bevel {\n  filter: url(#bevelFilter);\n}\n\n.sb-input {\n  filter: url(#inputBevelFilter);\n}\n.sb-input-number,\n.sb-input-string,\n.sb-input-number-dropdown {\n  fill: #fff;\n}\n.sb-literal-number,\n.sb-literal-string,\n.sb-literal-number-dropdown,\n.sb-literal-dropdown {\n  font-weight: normal;\n  font-size: 9px;\n  word-spacing: 0;\n}\n.sb-literal-number,\n.sb-literal-string,\n.sb-literal-number-dropdown {\n  fill: #000;\n}\n\n.sb-darker {\n  filter: url(#inputDarkFilter);\n}\n\n.sb-outline {\n  stroke: #fff;\n  stroke-opacity: 0.2;\n  stroke-width: 2;\n  fill: none;\n}\n\n.sb-define-hat-cap {\n  stroke: #632d99;\n  stroke-width: 1;\n  fill: #8e2ec2;\n}\n\n.sb-comment {\n  fill: #ffffa5;\n  stroke: #d0d1d2;\n  stroke-width: 1;\n}\n.sb-comment-line {\n  fill: #ffff80;\n}\n.sb-comment-label {\n  font-family: Helvetica, Arial, DejaVu Sans, sans-serif;\n  font-weight: bold;\n  fill: #5c5d5f;\n  word-spacing: 0;\n  font-size: 12px;\n}\n\n.sb-diff {\n  fill: none;\n  stroke: #000;\n}\n.sb-diff-ins {\n  stroke-width: 2px;\n}\n.sb-diff-del {\n  stroke-width: 3px;\n}\n";

let Style$1 = class Style {
  static get cssContent() {
    return cssContent$1
  }

  static makeIcons() {
    return [
      SVG$1.el("path", {
        d: "M1.504 21L0 19.493 4.567 0h1.948l-.5 2.418s1.002-.502 3.006 0c2.006.503 3.008 2.01 6.517 2.01 3.508 0 4.463-.545 4.463-.545l-.823 9.892s-2.137 1.005-5.144.696c-3.007-.307-3.007-2.007-6.014-2.51-3.008-.502-4.512.503-4.512.503L1.504 21z",
        fill: "#3f8d15",
        id: "greenFlag",
      }),
      SVG$1.el("polygon", {
        points:
          "6.3,0.4725 12.516,0.4725 18.585,6.3 18.585,12.495 12.495,18.585 6.3,18.585 0.483,12.495 0.483,6.3  ",
        fill: "#bb0010",
        id: "stopSign",
      }),
      SVG$1.el("path", {
        d: "M6.724 0C3.01 0 0 2.91 0 6.5c0 2.316 1.253 4.35 3.14 5.5H5.17v-1.256C3.364 10.126 2.07 8.46 2.07 6.5 2.07 4.015 4.152 2 6.723 2c1.14 0 2.184.396 2.993 1.053L8.31 4.13c-.45.344-.398.826.11 1.08L15 8.5 13.858.992c-.083-.547-.514-.714-.963-.37l-1.532 1.172A6.825 6.825 0 0 0 6.723 0z",
        fill: "#fff",
        id: "turnRight",
      }),
      SVG$1.el("path", {
        d: "M3.637 1.794A6.825 6.825 0 0 1 8.277 0C11.99 0 15 2.91 15 6.5c0 2.316-1.253 4.35-3.14 5.5H9.83v-1.256c1.808-.618 3.103-2.285 3.103-4.244 0-2.485-2.083-4.5-4.654-4.5-1.14 0-2.184.396-2.993 1.053L6.69 4.13c.45.344.398.826-.11 1.08L0 8.5 1.142.992c.083-.547.514-.714.963-.37l1.532 1.172z",
        fill: "#fff",
        id: "turnLeft",
      }),
      SVG$1.el("path", {
        d: "M0 0L4 4L0 8Z",
        fill: "#111",
        id: "addInput",
      }),
      SVG$1.el("path", {
        d: "M4 0L4 8L0 4Z",
        fill: "#111",
        id: "delInput",
      }),
      SVG$1.setProps(
        SVG$1.group([
          SVG$1.el("path", {
            d: "M8 0l2 -2l0 -3l3 0l-4 -5l-4 5l3 0l0 3l-8 0l0 2",
            fill: "#000",
            opacity: "0.3",
          }),
          SVG$1.move(
            -1,
            -1,
            SVG$1.el("path", {
              d: "M8 0l2 -2l0 -3l3 0l-4 -5l-4 5l3 0l0 3l-8 0l0 2",
              fill: "#fff",
              opacity: "0.9",
            }),
          ),
        ]),
        {
          id: "loopArrow",
        },
      ),
      SVG$1.setProps(
        SVG$1.group([
          SVG$1.el("rect", {
            x: "0",
            y: "0",
            width: "12",
            height: "14",
            fill: "#000",
            opacity: "0.25",
          }),
          SVG$1.el("rect", {
            x: "1",
            y: "1",
            width: "1",
            height: "13",
            fill: "#fff",
          }),
          SVG$1.el("rect", {
            x: "11",
            y: "1",
            width: "1",
            height: "13",
            fill: "#fff",
          }),
          SVG$1.el("rect", {
            x: "2",
            y: "1",
            width: "9",
            height: "1",
            fill: "#fff",
          }),
          SVG$1.el("rect", {
            x: "2",
            y: "5",
            width: "9",
            height: "1",
            fill: "#fff",
          }),
          SVG$1.el("rect", {
            x: "2",
            y: "9",
            width: "9",
            height: "1",
            fill: "#fff",
          }),
          SVG$1.el("rect", {
            x: "2",
            y: "13",
            width: "9",
            height: "1",
            fill: "#fff",
          }),
          SVG$1.el("rect", {
            x: "2",
            y: "2",
            width: "9",
            height: "2",
            fill: "#ea8d1c",
          }),
          SVG$1.el("rect", {
            x: "2",
            y: "6",
            width: "9",
            height: "2",
            fill: "#ea8d1c",
          }),
          SVG$1.el("rect", {
            x: "2",
            y: "10",
            width: "9",
            height: "2",
            fill: "#ea8d1c",
          }),
          SVG$1.el("rect", {
            x: "11",
            y: "0",
            width: "1",
            height: "1",
            fill: "#ea8d1c",
          }),
          SVG$1.el("rect", {
            x: "0",
            y: "13",
            width: "1",
            height: "1",
            fill: "#ea8d1c",
          }),
        ]),
        {
          id: "list",
        },
      ),
    ]
  }

  static makeStyle() {
    const style = SVG$1.el("style");
    style.appendChild(SVG$1.cdata(Style.cssContent));
    return style
  }

  static bevelFilter(id, inset) {
    const f = new Filter(id);

    const alpha = "SourceAlpha";
    const s = inset ? -1 : 1;
    const blur = f.blur(1, alpha);

    f.merge([
      "SourceGraphic",
      f.comp(
        "in",
        f.flood("#fff", 0.15),
        f.subtract(alpha, f.offset(+s, +s, blur)),
      ),
      f.comp(
        "in",
        f.flood("#000", 0.7),
        f.subtract(alpha, f.offset(-s, -s, blur)),
      ),
    ]);

    return f.el
  }

  static darkFilter(id) {
    const f = new Filter(id);

    f.merge([
      "SourceGraphic",
      f.comp("in", f.flood("#000", 0.2), "SourceAlpha"),
    ]);

    return f.el
  }

  static darkRect(w, h, category, el) {
    return SVG$1.setProps(
      SVG$1.group([
        SVG$1.setProps(el, {
          class: `sb-${category} sb-darker`,
        }),
      ]),
      { width: w, height: h },
    )
  }

  static get defaultFontFamily() {
    return "Lucida Grande, Verdana, Arial, DejaVu Sans, sans-serif"
  }
};

const {
  defaultFontFamily,
  makeStyle: makeStyle$3,
  makeIcons,
  darkRect,
  bevelFilter,
  darkFilter,
} = Style$1;

let LabelView$1 = class LabelView {
  constructor(label) {
    Object.assign(this, label);

    this.el = null;
    this.height = 12;
    this.metrics = null;
    this.x = 0;
  }

  get isLabel() {
    return true
  }

  draw() {
    return this.el
  }

  get width() {
    return this.metrics.width
  }

  measure() {
    const value = this.value;
    const cls = `sb-${this.cls}`;
    this.el = SVG$1.text(0, 10, value, {
      class: `sb-label ${cls}`,
    });

    let cache = LabelView.metricsCache[cls];
    if (!cache) {
      cache = LabelView.metricsCache[cls] = Object.create(null);
    }

    if (Object.hasOwnProperty.call(cache, value)) {
      this.metrics = cache[value];
    } else {
      const font = /comment-label/.test(this.cls)
        ? "bold 12px Helvetica, Arial, DejaVu Sans, sans-serif"
        : /literal/.test(this.cls)
        ? `normal 9px ${defaultFontFamily}`
        : `bold 10px ${defaultFontFamily}`;
      this.metrics = cache[value] = LabelView.measure(value, font);
      // TODO: word-spacing? (fortunately it seems to have no effect!)
    }
  }

  static measure(value, font) {
    const context = LabelView.measuring;
    context.font = font;
    const textMetrics = context.measureText(value);
    const width = (textMetrics.width + 0.5) | 0;
    return { width: width }
  }
};

LabelView$1.metricsCache = {};
LabelView$1.toMeasure = [];

let IconView$1 = class IconView {
  constructor(icon) {
    Object.assign(this, icon);

    const info = IconView.icons[this.name];
    if (!info) {
      throw new Error(`no info for icon: ${this.name}`)
    }
    Object.assign(this, info);
  }

  get isIcon() {
    return true
  }

  draw() {
    return SVG$1.symbol(`#${this.name}`, {
      width: this.width,
      height: this.height,
    })
  }

  static get icons() {
    return {
      greenFlag: { width: 20, height: 21, dy: -2 },
      stopSign: { width: 20, height: 20 },
      turnLeft: { width: 15, height: 12, dy: +1 },
      turnRight: { width: 15, height: 12, dy: +1 },
      loopArrow: { width: 14, height: 11 },
      addInput: { width: 4, height: 8 },
      delInput: { width: 4, height: 8 },
      list: { width: 12, height: 14 },
    }
  }
};

let InputView$1 = class InputView {
  constructor(input) {
    Object.assign(this, input);
    if (input.label) {
      this.label = newView$1(input.label);
    }

    this.x = 0;
  }

  measure() {
    if (this.hasLabel) {
      this.label.measure();
    }
  }

  static get shapes() {
    return {
      string: SVG$1.rect,
      number: SVG$1.roundedRect,
      "number-dropdown": SVG$1.roundedRect,
      color: SVG$1.rect,
      dropdown: SVG$1.rect,

      boolean: SVG$1.pointedRect,
      stack: SVG$1.stackRect,
      reporter: SVG$1.roundedRect,
    }
  }

  draw(parent) {
    let w;
    let label;
    if (this.hasLabel) {
      label = this.label.draw();
      w = Math.max(
        14,
        this.label.width +
          (this.shape === "string" || this.shape === "number-dropdown" ? 6 : 9),
      );
    } else {
      w = this.isInset ? 30 : this.isColor ? 13 : null;
    }
    if (this.hasArrow) {
      w += 10;
    }
    this.width = w;

    const h = (this.height = this.isRound || this.isColor ? 13 : 14);

    let el = InputView.shapes[this.shape](w, h);
    if (this.isColor) {
      SVG$1.setProps(el, {
        fill: this.value,
      });
    } else if (this.isDarker) {
      el = darkRect(w, h, parent.info.category, el);
      if (parent.info.color) {
        SVG$1.setProps(el, {
          fill: parent.info.color,
        });
      }
    }

    const result = SVG$1.group([
      SVG$1.setProps(el, {
        class: `sb-input sb-input-${this.shape}`,
      }),
    ]);
    if (this.hasLabel) {
      const x = this.isRound ? 5 : 4;
      result.appendChild(SVG$1.move(x, 0, label));
    }
    if (this.hasArrow) {
      const y = this.shape === "dropdown" ? 5 : 4;
      result.appendChild(
        SVG$1.move(
          w - 10,
          y,
          SVG$1.polygon({
            points: [7, 0, 3.5, 4, 0, 0],
            fill: "#000",
            opacity: "0.6",
          }),
        ),
      );
    }
    return result
  }
};

let BlockView$1 = class BlockView {
  constructor(block) {
    Object.assign(this, block);
    this.children = block.children.map(newView$1);
    this.comment = this.comment ? newView$1(this.comment) : null;

    if (
      Object.prototype.hasOwnProperty.call(aliasExtensions, this.info.category)
    ) {
      // handle aliases first
      this.info.category = aliasExtensions[this.info.category];
    }
    if (
      Object.prototype.hasOwnProperty.call(movedExtensions, this.info.category)
    ) {
      this.info.category = movedExtensions[this.info.category];
    } else if (
      Object.prototype.hasOwnProperty.call(extensions, this.info.category)
    ) {
      this.info.category = "extension";
    }

    this.x = 0;
    this.width = null;
    this.height = null;
    this.firstLine = null;
    this.innerWidth = null;
  }

  get isBlock() {
    return true
  }

  measure() {
    for (const child of this.children) {
      if (child.measure) {
        child.measure();
      }
    }
    if (this.comment) {
      this.comment.measure();
    }
  }

  static get shapes() {
    return {
      stack: SVG$1.stackRect,
      "c-block": SVG$1.stackRect,
      "if-block": SVG$1.stackRect,
      celse: SVG$1.stackRect,
      cend: SVG$1.stackRect,

      cap: SVG$1.capRect,
      reporter: SVG$1.roundedRect,
      boolean: SVG$1.pointedRect,
      hat: SVG$1.hatRect,
      cat: SVG$1.hatRect,
      "define-hat": SVG$1.procHatRect,
      ring: SVG$1.roundedRect,
    }
  }

  drawSelf(w, h, lines) {
    // mouths
    if (lines.length > 1) {
      return SVG$1.mouthRect(w, h, this.isFinal, lines, {
        class: `sb-${this.info.category} sb-bevel`,
      })
    }

    // outlines
    if (this.info.shape === "outline") {
      return SVG$1.setProps(SVG$1.stackRect(w, h), {
        class: "sb-outline",
      })
    }

    // rings
    if (this.isRing) {
      const child = this.children[0];
      // We use isStack for InputView; isBlock for BlockView; isScript for ScriptView.
      if (child && (child.isStack || child.isBlock || child.isScript)) {
        const shape = child.isScript
          ? "stack"
          : child.isStack
          ? child.shape
          : child.info.shape;
        return SVG$1.ringRect(w, h, child.y, child.width, child.height, shape, {
          class: `sb-${this.info.category} sb-bevel`,
        })
      }
    }

    const func = BlockView.shapes[this.info.shape];
    if (!func) {
      throw new Error(`no shape func: ${this.info.shape}`)
    }
    return func(w, h, {
      class: `sb-${this.info.category} sb-bevel`,
    })
  }

  minDistance(child) {
    if (this.isBoolean) {
      return child.isReporter
        ? (4 + child.height / 4) | 0
        : child.isLabel
        ? (5 + child.height / 2) | 0
        : child.isBoolean || child.shape === "boolean"
        ? 5
        : (2 + child.height / 2) | 0
    }
    if (this.isReporter) {
      return (child.isInput && child.isRound) ||
        ((child.isReporter || child.isBoolean) && !child.hasScript)
        ? 0
        : child.isLabel
        ? (2 + child.height / 2) | 0
        : (-2 + child.height / 2) | 0
    }
    return 0
  }

  static get padding() {
    return {
      hat: [15, 6, 2],
      cat: [15, 6, 2],
      "define-hat": [21, 8, 9],
      reporter: [3, 4, 1],
      boolean: [3, 4, 2],
      cap: [6, 6, 2],
      "c-block": [3, 6, 2],
      "if-block": [3, 6, 2],
      ring: [4, 4, 2],
      null: [4, 6, 2],
    }
  }

  draw() {
    const isDefine = this.info.shape === "define-hat";
    let children = this.children;

    const padding = BlockView.padding[this.info.shape] || BlockView.padding.null;
    let pt = padding[0];
    const px = padding[1];
    const pb = padding[2];

    let y = 0;
    const Line = function (y) {
      this.y = y;
      this.width = 0;
      this.height = y ? 13 : 16;
      this.children = [];
    };

    let innerWidth = 0;
    let scriptWidth = 0;
    let line = new Line(y);
    const pushLine = isLast => {
      if (lines.length === 0) {
        line.height += pt + pb;
      } else {
        line.height += isLast ? 0 : +2;
        line.y -= 1;
      }
      y += line.height;
      lines.push(line);
    };

    if (this.info.isRTL) {
      let start = 0;
      const flip = () => {
        children = children
          .slice(0, start)
          .concat(children.slice(start, i).reverse())
          .concat(children.slice(i));
      };
      let i;
      for (i = 0; i < children.length; i++) {
        if (children[i].isScript) {
          flip();
          start = i + 1;
        }
      }
      if (start < i) {
        flip();
      }
    }

    const lines = [];
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      child.el = child.draw(this);

      if (child.isScript && this.isCommand) {
        this.hasScript = true;
        pushLine();
        child.y = y;
        lines.push(child);
        scriptWidth = Math.max(scriptWidth, Math.max(1, child.width));
        child.height = Math.max(12, child.height) + 3;
        y += child.height;
        line = new Line(y);
      } else if (child.isArrow) {
        line.children.push(child);
      } else {
        const cmw = i > 0 ? 30 : 0; // 27
        const md = this.isCommand ? 0 : this.minDistance(child);
        const mw = this.isCommand
          ? child.isBlock || child.isInput
            ? cmw
            : 0
          : md;
        if (mw && !lines.length && line.width < mw - px) {
          line.width = mw - px;
        }
        child.x = line.width;
        line.width += child.width;
        innerWidth = Math.max(innerWidth, line.width + Math.max(0, md - px));
        line.width += 4;
        if (!child.isLabel) {
          line.height = Math.max(line.height, child.height);
        }
        line.children.push(child);
      }
    }
    pushLine(true);

    innerWidth = Math.max(
      innerWidth + px * 2,
      this.isHat || this.hasScript
        ? 83
        : this.isCommand || this.isOutline || this.isRing
        ? 39
        : 20,
    );
    this.height = y;
    this.width = scriptWidth
      ? Math.max(innerWidth, 15 + scriptWidth)
      : innerWidth;
    if (isDefine) {
      const p = Math.min(26, (3.5 + 0.13 * innerWidth) | 0) - 18;
      this.height += p;
      pt += 2 * p;
    }
    this.firstLine = lines[0];
    this.innerWidth = innerWidth;

    const objects = [];

    for (const line of lines) {
      if (line.isScript) {
        objects.push(SVG$1.move(15, line.y, line.el));
        continue
      }

      const h = line.height;

      for (const child of line.children) {
        if (child.isArrow) {
          objects.push(SVG$1.move(innerWidth - 15, this.height - 3, child.el));
          continue
        }

        let y = pt + (h - child.height - pt - pb) / 2 - 1;
        if (isDefine && child.isLabel) {
          y += 3;
        } else if (child.isIcon) {
          y += child.dy | 0;
        }
        if (this.isRing) {
          child.y = (line.y + y) | 0;
          if (child.isInset) {
            continue
          }
        }
        objects.push(SVG$1.move(px + child.x, (line.y + y) | 0, child.el));

        if (child.diff === "+") {
          const ellipse = SVG$1.insEllipse(child.width, child.height);
          objects.push(SVG$1.move(px + child.x, (line.y + y) | 0, ellipse));
        }
      }
    }

    const el = this.drawSelf(innerWidth, this.height, lines);
    objects.splice(0, 0, el);
    if (this.info.color) {
      SVG$1.setProps(el, {
        fill: this.info.color,
      });
    }

    return SVG$1.group(objects)
  }
};

let CommentView$1 = class CommentView {
  constructor(comment) {
    Object.assign(this, comment);
    this.label = newView$1(comment.label);

    this.width = null;
  }

  get isComment() {
    return true
  }

  static get lineLength() {
    return 12
  }

  get height() {
    return 20
  }

  measure() {
    this.label.measure();
  }

  draw() {
    const labelEl = this.label.draw();

    this.width = this.label.width + 16;
    return SVG$1.group([
      SVG$1.commentLine(this.hasBlock ? CommentView.lineLength : 0, 6),
      SVG$1.commentRect(this.width, this.height, {
        class: "sb-comment",
      }),
      SVG$1.move(8, 4, labelEl),
    ])
  }
};

let GlowView$1 = class GlowView {
  constructor(glow) {
    Object.assign(this, glow);
    this.child = newView$1(glow.child);

    this.width = null;
    this.height = null;
    this.y = 0;
  }

  get isGlow() {
    return true
  }

  measure() {
    this.child.measure();
  }

  drawSelf() {
    const c = this.child;
    let el;
    const w = this.width;
    const h = this.height - 1;
    if (c.isScript) {
      if (!c.isEmpty && c.blocks[0].isHat) {
        el = SVG$1.hatRect(w, h);
      } else if (c.isFinal) {
        el = SVG$1.capRect(w, h);
      } else {
        el = SVG$1.stackRect(w, h);
      }
    } else {
      el = c.drawSelf(w, h, []);
    }
    return SVG$1.setProps(el, {
      class: "sb-diff sb-diff-ins",
    })
  }
  // TODO how can we always raise Glows above their parents?

  draw() {
    const c = this.child;
    const el = c.isScript ? c.draw(true) : c.draw();

    this.width = c.width;
    this.height = (c.isBlock && c.firstLine.height) || c.height;

    // encircle
    return SVG$1.group([el, this.drawSelf()])
  }
};

let ScriptView$1 = class ScriptView {
  constructor(script) {
    Object.assign(this, script);
    this.blocks = script.blocks.map(newView$1);

    this.y = 0;
  }

  get isScript() {
    return true
  }

  measure() {
    for (const block of this.blocks) {
      block.measure();
    }
  }

  draw(inside) {
    const children = [];
    let y = 0;
    this.width = 0;
    for (const block of this.blocks) {
      const x = inside ? 0 : 2;
      const child = block.draw();
      children.push(SVG$1.move(x, y, child));
      this.width = Math.max(this.width, block.width);

      const diff = block.diff;
      if (diff === "-") {
        const dw = block.width;
        const dh = block.firstLine.height || block.height;
        children.push(SVG$1.move(x, y + dh / 2 + 1, SVG$1.strikethroughLine(dw)));
        this.width = Math.max(this.width, block.width);
      }

      y += block.height;

      const comment = block.comment;
      if (comment) {
        const line = block.firstLine;
        const cx = block.innerWidth + 2 + CommentView$1.lineLength;
        const cy = y - block.height + line.height / 2;
        const el = comment.draw();
        children.push(SVG$1.move(cx, cy - comment.height / 2, el));
        this.width = Math.max(this.width, cx + comment.width);
      }
    }
    this.height = y;
    if (!inside && !this.isFinal) {
      this.height += 3;
    }
    const lastBlock = this.blocks[this.blocks.length - 1];
    if (!inside && lastBlock.isGlow) {
      this.height += 2; // TODO unbreak this
    }
    return SVG$1.group(children)
  }
};

let DocumentView$1 = class DocumentView {
  constructor(doc, options) {
    Object.assign(this, doc);
    this.scripts = doc.scripts.map(newView$1);

    this.width = null;
    this.height = null;
    this.el = null;
    this.defs = null;
    this.scale = options.scale;
  }

  measure() {
    this.scripts.forEach(script => script.measure());
  }

  render(cb) {
    if (typeof cb === "function") {
      throw new Error("render() no longer takes a callback")
    }

    // measure strings
    this.measure();

    // TODO: separate layout + render steps.
    // render each script
    let width = 0;
    let height = 0;
    const elements = [];
    for (const script of this.scripts) {
      if (height) {
        height += 10;
      }
      script.y = height;
      elements.push(SVG$1.move(0, height, script.draw()));
      height += script.height;
      width = Math.max(width, script.width + 4);
    }
    this.width = width;
    this.height = height;

    // return SVG
    const svg = SVG$1.newSVG(width, height, this.scale);
    svg.appendChild(
      (this.defs = SVG$1.withChildren(SVG$1.el("defs"), [
        bevelFilter("bevelFilter", false),
        bevelFilter("inputBevelFilter", true),
        darkFilter("inputDarkFilter"),
        ...makeIcons(),
      ])),
    );

    svg.appendChild(SVG$1.group(elements));
    this.el = svg;
    return svg
  }

  /* Export SVG image as XML string */
  exportSVGString() {
    if (this.el == null) {
      throw new Error("call draw() first")
    }

    const style = makeStyle$3();
    this.defs.appendChild(style);
    const xml = new SVG$1.XMLSerializer().serializeToString(this.el);
    this.defs.removeChild(style);
    return xml
  }

  /* Export SVG image as data URI */
  exportSVG() {
    const xml = this.exportSVGString();
    return `data:image/svg+xml;utf8,${xml.replace(/[#]/g, encodeURIComponent)}`
  }

  toCanvas(cb, exportScale) {
    exportScale = exportScale || 1.0;

    const canvas = SVG$1.makeCanvas();
    canvas.width = Math.max(1, this.width * exportScale * this.scale);
    canvas.height = Math.max(1, this.height * exportScale * this.scale);
    const context = canvas.getContext("2d");

    const image = new Image();
    image.src = this.exportSVG();
    image.onload = () => {
      context.save();
      context.scale(exportScale, exportScale);
      context.drawImage(image, 0, 0);
      context.restore();

      cb(canvas);
    };
  }

  exportPNG(cb, scale) {
    this.toCanvas(canvas => {
      if (URL && URL.createObjectURL && Blob && canvas.toBlob) {
        canvas.toBlob(blob => {
          cb(URL.createObjectURL(blob));
        }, "image/png");
      } else {
        cb(canvas.toDataURL("image/png"));
      }
    }, scale);
  }
};

const viewFor$1 = node => {
  switch (node.constructor) {
    case Label:
      return LabelView$1
    case Icon:
      return IconView$1
    case Input:
      return InputView$1
    case Block:
      return BlockView$1
    case Comment:
      return CommentView$1
    case Glow:
      return GlowView$1
    case Script:
      return ScriptView$1
    case Document:
      return DocumentView$1
    default:
      throw new Error(`no view for ${node.constructor.name}`)
  }
};

const newView$1 = (node, options) => new (viewFor$1(node))(node, options);

function init$2(window) {
  SVG$1.init(window);

  LabelView$1.measuring = SVG$1.makeCanvas().getContext("2d");
}

const makeStyle$2 = Style$1.makeStyle;

/* for constructing SVGs */

// set by SVG.init
let document;
let xml;

const directProps = {
  textContent: true,
};

class SVG {
  static init(window) {
    document = window.document;
    const DOMParser = window.DOMParser;
    xml = new DOMParser().parseFromString("<xml></xml>", "application/xml");
    SVG.XMLSerializer = window.XMLSerializer;
  }

  static makeCanvas() {
    return document.createElement("canvas")
  }

  static cdata(content) {
    return xml.createCDATASection(content)
  }

  static el(name, props) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", name);
    return SVG.setProps(el, props)
  }

  static setProps(el, props) {
    for (const key in props) {
      const value = String(props[key]);
      if (directProps[key]) {
        el[key] = value;
      } else if (
        props[key] != null &&
        Object.prototype.hasOwnProperty.call(props, key)
      ) {
        el.setAttributeNS(null, key, value);
      }
    }
    return el
  }

  static withChildren(el, children) {
    for (const child of children) {
      el.appendChild(child);
    }
    return el
  }

  static group(children) {
    return SVG.withChildren(SVG.el("g"), children)
  }

  static newSVG(width, height, scale) {
    return SVG.el("svg", {
      version: "1.1",
      width: width * scale,
      height: height * scale,
      viewBox: `0 0 ${width * scale} ${height * scale}`,
    })
  }

  static polygon(props) {
    return SVG.el("polygon", { ...props, points: props.points.join(" ") })
  }

  static path(props) {
    return SVG.el("path", { ...props, path: null, d: props.path.join(" ") })
  }

  static text(x, y, content, props) {
    const text = SVG.el("text", { ...props, x: x, y: y, textContent: content });
    return text
  }

  static symbol(href) {
    return SVG.el("use", {
      href: href,
    })
  }

  static move(dx, dy, el) {
    SVG.setProps(el, {
      transform: `translate(${dx} ${dy})`,
    });
    return el
  }

  /* shapes */

  static rect(w, h, props) {
    return SVG.el("rect", { ...props, x: 0, y: 0, width: w, height: h })
  }

  static roundRect(w, h, props) {
    return SVG.rect(w, h, { ...props, rx: 4, ry: 4 })
  }

  static pillRect(w, h, props) {
    const r = h / 2;
    return SVG.rect(w, h, { ...props, rx: r, ry: r })
  }

  static pointedPath(w, h) {
    const r = h / 2;
    return [
      `M ${r} 0`,
      `L ${w - r} 0 ${w} ${r}`,
      `L ${w} ${r} ${w - r} ${h}`,
      `L ${r} ${h} 0 ${r}`,
      `L 0 ${r} ${r} 0`,
      "Z",
    ]
  }

  static pointedRect(w, h, props) {
    return SVG.path({ ...props, path: SVG.pointedPath(w, h) })
  }

  static topNotch(w, y) {
    return `c 2 0 3 1 4 2
      l 4 4
      c 1 1 2 2 4 2
      h 12
      c 2 0 3 -1 4 -2
      l 4 -4
      c 1 -1 2 -2 4 -2
      L ${w - 4} ${y}
      a 4 4 0 0 1 4 4`
  }

  static getTop(w) {
    return `M 0 4
      A 4 4 0 0 1 4 0
      H 12 ${SVG.topNotch(w, 0)}`
  }

  static getRingTop(w) {
    return `M 0 3
      L 3 0
      L 7 0
      L 10 3
      L 16 3
      L 19 0
      L ${w - 3} 0
      L ${w} 3`
  }

  static getRightAndBottom(w, y, hasNotch, inset) {
    if (typeof inset === "undefined") {
      inset = 0;
    }

    let arr = [`L ${w} ${y - 4}`, `a 4 4 0 0 1 -4 4`];

    if (hasNotch) {
      arr = arr.concat([
        `L ${inset + 48} ${y}`,
        "c -2 0 -3 1 -4 2",
        "l -4 4",
        "c -1 1 -2 2 -4 2",
        "h -12",
        "c -2 0 -3 -1 -4 -2",
        "l -4 -4",
        "c -1 -1 -2 -2 -4 -2",
      ]);
    }
    if (inset === 0) {
      arr.push("L", inset + 4, y);
      arr.push("a 4 4 0 0 1 -4 -4");
    } else {
      arr.push("L", inset + 4, y);
      arr.push("a 4 4 0 0 0 -4 4");
    }
    return arr.join(" ")
  }

  static getArm(w, armTop) {
    return `L 16 ${armTop - 4}
      a 4 4 0 0 0 4 4
      L 28 ${armTop} ${SVG.topNotch(w, armTop)}`
  }

  static getArmNoNotch(w, armTop) {
    return `L 16 ${armTop - 4}
      a 4 4 0 0 0 4 4
      L 28 ${armTop} L ${w - 4} ${armTop}
      a 4 4 0 0 1 4 4`
  }

  static stackRect(w, h, props) {
    return SVG.path({
      ...props,
      path: [SVG.getTop(w), SVG.getRightAndBottom(w, h, true, 0), "Z"],
    })
  }

  static capPath(w, h) {
    return [SVG.getTop(w), SVG.getRightAndBottom(w, h, false, 0), "Z"]
  }

  static capRect(w, h, props) {
    return SVG.path({ ...props, path: SVG.capPath(w, h) })
  }

  static getHatTop(w) {
    return `M 0 16 c 25,-22 71,-22 96,0 L ${w - 4} 16 a 4 4 0 0 1 4 4`
  }

  static getCatTop(w) {
    return `M 0 32
      c2.6,-2.3 5.5,-4.3 8.5,-6.2c-1,-12.5 5.3,-23.3 8.4,-24.8c3.7,-1.8 16.5,13.1 18.4,15.4c8.4,-1.3 17,-1.3 25.4,0c1.9,-2.3 14.7,-17.2 18.4,-15.4c3.1,1.5 9.4,12.3 8.4,24.8c3,1.8 5.9,3.9 8.5,6.1
      L ${w - 4} 32
      a 4 4 0 0 1 4 4`
  }

  static hatRect(w, h, props) {
    return SVG.path({
      ...props,
      path: [SVG.getHatTop(w), SVG.getRightAndBottom(w, h, true, 0), "Z"],
    })
  }

  static catHat(w, h, props) {
    return SVG.group([
      SVG.path({
        ...props,
        path: [SVG.getCatTop(w), SVG.getRightAndBottom(w, h, true, 0), "Z"],
      }),
      SVG.move(
        0,
        32,
        SVG.setProps(
          SVG.group([
            SVG.el("circle", {
              cx: 29.1,
              cy: -3.3,
              r: 3.4,
            }),
            SVG.el("circle", {
              cx: 59.2,
              cy: -3.3,
              r: 3.4,
            }),
            SVG.el("path", {
              d: "M45.6,0.1c-0.9,0-1.7-0.3-2.3-0.9c-0.6,0.6-1.3,0.9-2.2,0.9c-0.9,0-1.8-0.3-2.3-0.9c-1-1.1-1.1-2.6-1.1-2.8c0-0.5,0.5-1,1-1l0,0c0.6,0,1,0.5,1,1c0,0.4,0.1,1.7,1.4,1.7c0.5,0,0.7-0.2,0.8-0.3c0.3-0.3,0.4-1,0.4-1.3c0-0.1,0-0.1,0-0.2c0-0.5,0.5-1,1-1l0,0c0.5,0,1,0.4,1,1c0,0,0,0.1,0,0.2c0,0.3,0.1,0.9,0.4,1.2C44.8-2.2,45-2,45.5-2s0.7-0.2,0.8-0.3c0.3-0.4,0.4-1.1,0.3-1.3c0-0.5,0.4-1,0.9-1.1c0.5,0,1,0.4,1.1,0.9c0,0.2,0.1,1.8-0.8,2.8C47.5-0.4,46.8,0.1,45.6,0.1z",
            }),
          ]),
          {
            fill: "#000",
            "fill-opacity": 0.6,
          },
        ),
      ),
      SVG.move(
        0,
        32,
        SVG.el("path", {
          d: "M73.1-15.6c1.7-4.2,4.5-9.1,5.8-8.5c1.6,0.8,5.4,7.9,5,15.4c0,0.6-0.7,0.7-1.1,0.5c-3-1.6-6.4-2.8-8.6-3.6C72.8-12.3,72.4-13.7,73.1-15.6z",
          fill: "#FFD5E6",
          transform: "translate(0, 32)",
        }),
      ),
      SVG.move(
        0,
        32,
        SVG.el("path", {
          d: "M22.4-15.6c-1.7-4.2-4.5-9.1-5.8-8.5c-1.6,0.8-5.4,7.9-5,15.4c0,0.6,0.7,0.7,1.1,0.5c3-1.6,6.4-2.8,8.6-3.6C22.8-12.3,23.2-13.7,22.4-15.6z",
          fill: "#FFD5E6",
          transform: "translate(0, 32)",
        }),
      ),
    ])
  }

  static getProcHatTop(w) {
    return `M 0 20 a 20 20 0 0 1 20 -20 L ${w - 20} 0 a 20,20 0 0,1 20,20`
  }

  static procHatRect(w, h, props) {
    return SVG.path({
      ...props,
      path: [SVG.getProcHatTop(w), SVG.getRightAndBottom(w, h, true, 0), "Z"],
    })
  }

  static mouthRect(w, h, isFinal, lines, props) {
    let y = lines[0].height;
    const p = [SVG.getTop(w), SVG.getRightAndBottom(w, y, true, 16)];
    for (let i = 1; i < lines.length; i += 2) {
      const isLast = i + 2 === lines.length;

      const line = lines[i];
      y += line.height - 3;

      if (line.isFinal) {
        p.push(SVG.getArmNoNotch(w, y));
      } else {
        p.push(SVG.getArm(w, y));
      }

      const hasNotch = !(isLast && isFinal);
      const inset = isLast ? 0 : 16;
      y += lines[i + 1].height + 3;
      p.push(SVG.getRightAndBottom(w, y, hasNotch, inset));
    }
    p.push("Z");
    return SVG.path({ ...props, path: p })
  }

  static commentRect(w, h, props) {
    return SVG.roundRect(w, h, { ...props, class: "sb3-comment" })
  }

  static commentLine(width, props) {
    return SVG.move(
      -width,
      9,
      SVG.rect(width, 2, { ...props, class: "sb3-comment-line" }),
    )
  }

  static strikethroughLine(w, props) {
    return SVG.path({
      ...props,
      path: ["M", 0, 0, "L", w, 0],
      class: "sb3-diff sb3-diff-del",
    })
  }
}

var cssContent = "\n.sb3-label {\n  font: 500 12pt Helvetica Neue, Helvetica, sans-serif;\n  word-spacing: +1pt;\n}\n\n.sb3-literal-number,\n.sb3-literal-string,\n.sb3-literal-number-dropdown,\n.sb3-literal-dropdown {\n  word-spacing: 0;\n}\n\n/* Note: comment colors are different from Scratch. */\n\n.sb3-comment {\n  fill: #ffffa5;\n  stroke: #d0d1d2;\n  stroke-width: 1;\n}\n.sb3-comment-line {\n  fill: #ffff80;\n}\n.sb3-comment-label {\n  font: 400 12pt Helvetica Neue, Helvetica, sans-serif;\n  fill: #000;\n  word-spacing: 0;\n}\n\n.sb3-diff {\n  fill: none;\n  stroke: #000;\n}\n.sb3-diff-ins {\n  stroke-width: 2px;\n}\n.sb3-diff-del {\n  stroke-width: 3px;\n}\n\n\nsvg .sb3-motion {\n  fill: #4c97ff;\n  stroke: #3373cc;\n}\nsvg .sb3-motion-alt {\n  fill: #4280d7;\n}\nsvg .sb3-motion-dark {\n  fill: #3373cc;\n}\n\n\nsvg .sb3-looks {\n  fill: #9966ff;\n  stroke: #774dcb;\n}\nsvg .sb3-looks-alt {\n  fill: #855cd6;\n}\nsvg .sb3-looks-dark {\n  fill: #774dcb;\n}\n\n\nsvg .sb3-sound {\n  fill: #cf63cf;\n  stroke: #bd42bd;\n}\nsvg .sb3-sound-alt {\n  fill: #c94fc9;\n}\nsvg .sb3-sound-dark {\n  fill: #bd42bd;\n}\n\n\nsvg .sb3-control {\n  fill: #ffab19;\n  stroke: #cf8b17;\n}\nsvg .sb3-control-alt {\n  fill: #ec9c13;\n}\nsvg .sb3-control-dark {\n  fill: #cf8b17;\n}\n\n\nsvg .sb3-events {\n  fill: #ffbf00;\n  stroke: #cc9900;\n}\nsvg .sb3-events-alt {\n  fill: #e6ac00;\n}\nsvg .sb3-events-dark {\n  fill: #cc9900;\n}\n\n\nsvg .sb3-sensing {\n  fill: #5cb1d6;\n  stroke: #2e8eb8;\n}\nsvg .sb3-sensing-alt {\n  fill: #47a8d1;\n}\nsvg .sb3-sensing-dark {\n  fill: #2e8eb8;\n}\n\n\nsvg .sb3-operators {\n  fill: #59c059;\n  stroke: #389438;\n}\nsvg .sb3-operators-alt {\n  fill: #46b946;\n}\nsvg .sb3-operators-dark {\n  fill: #389438;\n}\n\n\nsvg .sb3-variables {\n  fill: #ff8c1a;\n  stroke: #db6e00;\n}\nsvg .sb3-variables-alt {\n  fill: #ff8000;\n}\nsvg .sb3-variables-dark {\n  fill: #db6e00;\n}\n\n\nsvg .sb3-list {\n  fill: #ff661a;\n  stroke: #e64d00;\n}\nsvg .sb3-list-alt {\n  fill: #ff5500;\n}\nsvg .sb3-list-dark {\n  fill: #e64d00;\n}\n\n\nsvg .sb3-custom {\n  fill: #ff6680;\n  stroke: #ff3355;\n}\nsvg .sb3-custom-alt {\n  fill: #ff4d6a;\n}\nsvg .sb3-custom-dark {\n  fill: #ff3355;\n}\n\n\nsvg .sb3-extension {\n  fill: #0fbd8c;\n  stroke: #0b8e69;\n}\nsvg .sb3-extension-alt {\n  fill: #0da57a;\n}\nsvg .sb3-extension-dark {\n  fill: #0b8e69;\n}\n\n\nsvg .sb3-obsolete {\n  fill: #ed4242;\n  stroke: #ca2b2b;\n}\nsvg .sb3-obsolete-alt {\n  fill: #db3333;\n}\nsvg .sb3-obsolete-dark {\n  fill: #ca2b2b;\n}\n\n\nsvg .sb3-grey {\n  fill: #bfbfbf;\n  stroke: #909090;\n}\nsvg .sb3-grey-alt {\n  fill: #b2b2b2;\n}\nsvg .sb3-grey-dark {\n  fill: #909090;\n}\n\n\nsvg .sb3-label {\n  fill: #fff;\n}\n\nsvg .sb3-input-color {\n  stroke: #fff;\n}\n\nsvg .sb3-input-number,\nsvg .sb3-input-string {\n  fill: #fff;\n}\nsvg .sb3-literal-number,\nsvg .sb3-literal-string {\n  fill: #575e75;\n}\n\n\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-motion {\n  fill: #80b5ff;\n  stroke: #3373cc;\n}\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-motion-alt {\n  fill: #b3d2ff;\n}\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-motion-dark {\n  fill: #3373cc;\n}\n\n\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-looks {\n  fill: #ccb3ff;\n  stroke: #774dcb;\n}\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-looks-alt {\n  fill: #ddccff;\n}\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-looks-dark {\n  fill: #774dcb;\n}\n\n\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-sound {\n  fill: #e19de1;\n  stroke: #bd42bd;\n}\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-sound-alt {\n  fill: #ffb3ff;\n}\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-sound-dark {\n  fill: #bd42bd;\n}\n\n\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-control {\n  fill: #ffbe4c;\n  stroke: #cf8b17;\n}\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-control-alt {\n  fill: #ffda99;\n}\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-control-dark {\n  fill: #cf8b17;\n}\n\n\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-events {\n  fill: #ffd966;\n  stroke: #cc9900;\n}\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-events-alt {\n  fill: #ffecb3;\n}\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-events-dark {\n  fill: #cc9900;\n}\n\n\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-sensing {\n  fill: #85c4e0;\n  stroke: #2e8eb8;\n}\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-sensing-alt {\n  fill: #aed8ea;\n}\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-sensing-dark {\n  fill: #2e8eb8;\n}\n\n\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-operators {\n  fill: #7ece7e;\n  stroke: #389438;\n}\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-operators-alt {\n  fill: #b5e3b5;\n}\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-operators-dark {\n  fill: #389438;\n}\n\n\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-variables {\n  fill: #ffa54c;\n  stroke: #db6e00;\n}\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-variables-alt {\n  fill: #ffcc99;\n}\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-variables-dark {\n  fill: #db6e00;\n}\n\n\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-list {\n  fill: #ff9966;\n  stroke: #e64d00;\n}\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-list-alt {\n  fill: #ffcab0;\n}\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-list-dark {\n  fill: #e64d00;\n}\n\n\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-custom {\n  fill: #ff99aa;\n  stroke: #e64d00;\n}\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-custom-alt {\n  fill: #ffccd5;\n}\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-custom-dark {\n  fill: #e64d00;\n}\n\n\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-extension {\n  fill: #13ecaf;\n  stroke: #0b8e69;\n}\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-extension-alt {\n  fill: #75f0cd;\n}\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-extension-dark {\n  fill: #0b8e69;\n}\n\n\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-obsolete {\n  fill: #fc6666;\n  stroke: #d32121;\n}\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-obsolete-alt {\n  fill: #fcb0b0;\n}\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-obsolete-dark {\n  fill: #d32121;\n}\n\n\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-grey {\n  fill: #bfbfbf;\n  stroke: #959595;\n}\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-grey-alt {\n  fill: #b2b2b2;\n}\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-grey-dark {\n  fill: #959595;\n}\n\n\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-label {\n  fill: #000;\n}\n\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-input-color {\n  stroke: #fff;\n}\n\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-input-number,\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-input-string {\n  fill: #fff;\n}\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-literal-number,\nsvg.scratchblocks-style-scratch3-high-contrast .sb3-literal-string {\n  fill: #000;\n}\n";

// Need to define here, as we cannot reference Style#makeNewIcons
// during JS loading phase.
const highContrastIcons = new Set([
  "dropdownArrow",
  "turnRight",
  "turnLeft",
  "loopArrow",
  "musicBlock",
  "penBlock",
  "videoBlock",
  "ttsBlock",
  "translationBlock",
]);

class Style {
  static get cssContent() {
    return cssContent
  }

  static makeCommonIcons() {
    return [
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M20.8 3.7c-.4-.2-.9-.1-1.2.2-2 1.6-4.8 1.6-6.8 0-2.3-1.9-5.6-2.3-8.3-1v-.4c0-.6-.5-1-1-1s-1 .4-1 1v18.8c0 .5.5 1 1 1h.1c.5 0 1-.5 1-1v-6.4c1-.7 2.1-1.2 3.4-1.3 1.2 0 2.4.4 3.4 1.2 2.9 2.3 7 2.3 9.8 0 .3-.2.4-.5.4-.9V4.7c0-.5-.3-.9-.8-1zm-.3 10.2C18 16 14.4 16 11.9 14c-1.1-.9-2.5-1.4-4-1.4-1.2.1-2.3.5-3.4 1.1V4c2.5-1.4 5.5-1.1 7.7.6 2.4 1.9 5.7 1.9 8.1 0h.2l.1.1-.1 9.2z",
            fill: "#45993d",
          }),
          SVG.el("path", {
            d: "M20.6 4.8l-.1 9.1v.1c-2.5 2-6.1 2-8.6 0-1.1-.9-2.5-1.4-4-1.4-1.2.1-2.3.5-3.4 1.1V4c2.5-1.4 5.5-1.1 7.7.6 2.4 1.9 5.7 1.9 8.1 0h.2c0 .1.1.1.1.2z",
            fill: "#4cbf56",
          }),
        ]),
        {
          id: "sb3-greenFlag",
        },
      ),

      SVG.setProps(
        SVG.el("polygon", {
          points:
            "6.6,0.5 13.12,0.5 19.5,6.6 19.5,13.12 13.12,19.5 6.6,19.5 0.5,13.12 0.5,6.6 ",
          fill: "#ec5959",
          stroke: "#b84848",
          "stroke-linejoin": "round",
          "stroke-linecap": "round",
        }),
        {
          id: "sb3-stopSign",
        },
      ),

      SVG.el("path", {
        d: "M0 0L4 4L0 8Z",
        fill: "#111",
        id: "sb3-addInput",
      }),
      SVG.el("path", {
        d: "M4 0L4 8L0 4Z",
        fill: "#111",
        id: "sb3-delInput",
      }),

      SVG.setProps(
        SVG.group([
          SVG.el("rect", {
            x: "0",
            y: "0",
            width: "15",
            height: "18",
            fill: "#fff",
          }),
          SVG.el("rect", {
            x: "1",
            y: "1",
            width: "13",
            height: "4",
            fill: "#ff920f",
          }),
          SVG.el("rect", {
            x: "1",
            y: "7",
            width: "13",
            height: "4",
            fill: "#ff920f",
          }),
          SVG.el("rect", {
            x: "1",
            y: "13",
            width: "13",
            height: "4",
            fill: "#ff920f",
          }),
        ]),
        {
          id: "sb3-list",
        },
      ),

      SVG.el("image", {
        id: "sb3-microbitBlock",
        width: "40px",
        height: "40px",
        href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAACmlBMVEUAAAArKysrIB8lJCNBRlY2O0U9X48sKCvOoBQzKzMnJyfrswi/xdDRoxN2dnbToxPosgnmsAq/lxo6MSq0kCLOoRXKnhbEmhc7LRooJCTcqQ7OoBXstAjpsgi9lhuvjCCPdSd4Zyg2NjZMi+Slhyq8lR5CR1fZqBG+lh3ttQjFnBnLnhbDmhqZore3kh5ARlW2kR6qiCGcfyU6QEtyYyd4ZSDSoxOGdDedgizLnhfgrA25kx9YXWqbgCxMUWDfqwzcqg/VphBBR1ecpLmcgSzHmxijq77BmRprYkOOlKZARlVGdbabo7m3kRxGcrKwjB9ARVSIjaCZobuVeyahgh+VdyE8XIOLayBIOydBR1f/vwBMl//m5+g+Q1JlanY6P0uCiJjj5OU9QVBARVQ/RFP9vgBFZpjk5ebwtgbzuAR0eotARlZITl3d3+KNlKRQVmRNUmGxs7mRlJtUW2nLnhfInRfpsQn1uQS/wsa0t7qlp62doKeKjpeBg41YXmxCSlvGyMtHb6xCUGlCTGBJgdJDSFVobXlMlPhLhtq/wchIesFGbqpDVXRXXGxCTGNiXEe+lh1LjuzP0dRJg9RIfslJfMW9v8RGbKRFY5Jzd4NdYm88QE1+bjrQpCHQohTxtwVLkPDa3OHd3t9If826vMCusLZHcrGIj6F6gpaDho9ESlpITFOQeTLcqhnEmhnqsw34uwVKkfNNhdi6vMRLUWBPUFC7lzDWpx31uQjutQj6vAP5+frZ29zZ2dvW2NtHc7JGbKVFaJx/hpl/hpdxd4hzd4JDWHpDUm5UWWiZhEh3aT6WfC/EnSqtiyW/lxzBmRpKi+VQgMhRermqq7BSdrCLjpVEXYVEW4A/SFtOT1BaV0pxZUCpjT2xkTcYNOUYAAAAWXRSTlMADBgV5DRLEdcIE+3Z2QLt6unOI/zp1dEcDf7z7eu9qVtFBPv7+/fx7u3p3NnOzcq0lXZENzD6+fj39vTm5uXk4t3c2tbS0c/NvrCopKKcm4yLbGpiTUA3JzDAPbYAAAQqSURBVFjD7dX1fxJhHMDxE+MIRRFrdnd3d3fr9ziwhsVsmC2K6HRTtzlb0ens2uzu7m79X3z4HufdwTNvj/qbfPYaPDe+vMf23AEXL168/6bBTfoWx5r0GskxVMhsoDfg3Lb12LlzIwz0zKZYzzy0lkPVKtXdutXw++o2a5UQ7SUMcqibGpA8kD09slX0azRkazwISB5Inn4D+ShwrNYjIHpQQA96mqPAYlqPgOhBAT0oUpgGyh6C6EHYWz11e7jbO9hAxUMQPezR6+wtW0nBlJzV7CB62nIyN/mB5H/ouM0G0j3ITIXsAMDUVMjcygbSPQgqrzCNDaR7sCEzO2cLKSvlLNP/ED1qgbRbh0m37viBAUSPvU/BYFZWcAMFRI+9HW/fOFLSgAaixw6erZWS5qeBVG+XKwlghWsuwALXHIA5rgUAc10r1KADvViwKNDaLO4EWCQuA5gnLgVYKs4DWCYuUoPoFRhcKa4FWCwuB1gizgeYLy4BWC4uBqWPq9Cjg55EJ5bogUi7J0wBmDwhMXzjBHBOmAyQSG4wnPd4cJ4Kejbem4gdTQL9NPN00Hlk0jRs//0p+puinaeDs0XxwMFtk8RZM6fob4pmPl/wxtqkOcemIai7Kco8HTx/88Ns8dBxgMcrEdTfFKcyP/9m1xhwwbV30sBGCdTPqczPu9Y5BoTzZODAg6S5kT9Zf1PU8+fz25TrTJuizOd32kjtL9CmaOfpJ/Zd5UTV3RTtfP6X3mfl0tNNuVSpILYp5xHL25ccFUQv9cwGhrcvPZB4jgiovyn6IHrrZFB/U/RBf6rD8f4sgqzRwTtZQfKZGPiXm4Kxb8rff6awgf9sU5jTB9O79G63BqTW1C5baQ9geNSwvnIEJ8s2PCkPXqhTtlM6HUxvWpiv3h6kyozmDY2egnzUkjc3/3X0bAjPt3gW+VWVxvFtSn6hgi9acxzfeI001yiBs46pI7/AkjzHVSgjg5XIkwvXB+xbcxNnGraHCmZUr8nxJS/g3AlC1KzujQgnOpo5axufDFasYLUa2gK2p2ohzlTtJB2sV6NCNSECCtUq1Kj3CxSq2luXlY8gufF4e9PkCLiwpWFULg38+qKiILgFYe9Lr++07zSur4SXr7zeV5Gj0z5vxt69GVcFt1vI874kS6/0pDIZsWB6crLgzhNI+wRhOrm7Sr5n4HIhWeW5yRJ/EBYuS4+5yUN5Vy9fuewT6GDouQq8qAFDITX4/XmuDF788eTJRQpoD4PTT6nAXA14KVcNhshgBDx16VTokk9oZo4Czf0JiEkgpoCYApJkEPMJwxOiQFONDn8DlrRbuWjRXrWEzWKzlOhnLNfHWN5S2Va5cndjufLG8uWMpRs0sFmqdMNliRKlS1nIlw2Xxh5kWaVKC0NNLiarqdAfZ+LixYsX77f9BFJt17cXqnnkAAAAAElFTkSuQmCC",
      }),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M23.513 11.17h-.73c-.319 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M24.91 11.17h-.73c-.319 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479z",
          }),
          SVG.el("path", {
            d: "M9.54 11.17h-.728c-.32 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.257-.479-.577-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M10.938 11.17h-.729c-.32 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.257-.479-.577-.479z",
          }),
          SVG.el("path", {
            d: "M26.305 11.17h-.73c-.318 0-.574.213-.574.478v1.08h1.882v-1.08c0-.265-.26-.479-.578-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M27.702 11.17h-.73c-.318 0-.574.213-.574.478v1.08h1.882v-1.08c0-.265-.26-.479-.578-.479z",
          }),
          SVG.el("path", {
            d: "M29.101 11.17h-.73c-.318 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M30.498 11.17h-.73c-.318 0-.576.213-.576.478v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479z",
          }),
          SVG.el("path", {
            d: "M17.925 11.17h-.73c-.319 0-.577.213-.577.478v1.08h1.883v-1.08c0-.265-.258-.479-.576-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M19.322 11.17h-.73c-.319 0-.577.213-.577.478v1.08h1.883v-1.08c0-.265-.258-.479-.576-.479z",
          }),
          SVG.el("path", {
            d: "M20.717 11.17h-.73c-.319 0-.575.213-.575.478v1.08h1.883v-1.08c0-.265-.26-.479-.578-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M22.114 11.17h-.73c-.319 0-.575.213-.575.478v1.08h1.883v-1.08c0-.265-.26-.479-.578-.479z",
          }),
          SVG.el("path", {
            d: "M15.129 11.17H14.4c-.32 0-.576.213-.576.478v1.08h1.883v-1.08c0-.265-.258-.479-.578-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M16.526 11.17h-.729c-.32 0-.576.213-.576.478v1.08h1.883v-1.08c0-.265-.258-.479-.578-.479z",
          }),
          SVG.el("path", {
            d: "M12.335 11.17h-.73c-.319 0-.575.213-.575.478v1.08h1.882v-1.08c0-.265-.26-.479-.577-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M13.732 11.17h-.73c-.319 0-.575.213-.575.478v1.08h1.883v-1.08c0-.265-.26-.479-.578-.479z",
          }),
          SVG.el("path", {
            d: "M31.893 11.17h-.73c-.318 0-.574.213-.574.478v1.08h1.882v-1.08c0-.265-.26-.479-.578-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M33.29 11.17h-.73c-.318 0-.574.213-.574.478v1.08h1.882v-1.08c0-.265-.26-.479-.578-.479z",
          }),
          SVG.el("path", {
            d: "M33.647 28.407H15.765V12.533h17.882c.52 0 .941.445.941.992v13.89c0 .547-.421.992-.94.992",
            fill: "#FFF",
          }),
          SVG.el("path", {
            d: "M33.647 28.407H15.765V12.533h17.882c.52 0 .941.445.941.992v13.89c0 .547-.421.992-.94.992z",
            stroke: "#7C87A5",
            "stroke-width": ".893",
          }),
          SVG.el("path", {
            d: "M15.765 28.407H5.412c-.52 0-.941-.445-.941-.993V16.502c0-2.19 1.686-3.969 3.764-3.969h15.06-3.766c-2.078 0-3.764 1.778-3.764 3.969v11.905z",
            fill: "#FFF",
          }),
          SVG.el("path", {
            d: "M15.765 28.407H5.412c-.52 0-.941-.445-.941-.993V16.502c0-2.19 1.686-3.969 3.764-3.969h15.06-3.766c-2.078 0-3.764 1.778-3.764 3.969v11.905z",
            stroke: "#7C87A5",
            "stroke-width": ".893",
          }),
          SVG.el("path", {
            d: "M12.941 12.533H11.06c-1.559 0-2.824 1.334-2.824 2.977v1.986c0 .547.422.992.941.992H12c.52 0 .941-.445.941-.992V15.51c0-1.643 1.265-2.977 2.824-2.977h.94-3.764z",
            fill: "#4C97FF",
          }),
          SVG.el("path", {
            d: "M12.941 12.533H11.06c-1.559 0-2.824 1.334-2.824 2.977v1.986c0 .547.422.992.941.992H12c.52 0 .941-.445.941-.992V15.51c0-1.643 1.265-2.977 2.824-2.977h.94-3.764z",
            stroke: "#3D79CC",
            "stroke-width": ".893",
          }),
          SVG.el("path", {
            stroke: "#7C87A5",
            "stroke-width": ".893",
            d: "M4.47 20.474h27.961l2.157 2.974",
          }),
          SVG.el("path", {
            d: "M15.765 28.407H5.412c-.52 0-.941-.445-.941-.993V16.502c0-2.19 1.686-3.969 3.764-3.969h15.06-3.766c-2.078 0-3.764 1.778-3.764 3.969v11.905z",
            stroke: "#7C87A5",
            "stroke-width": ".893",
          }),
          SVG.el("path", {
            d: "M21.307 18.964h-.73c-.319 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M21.307 18.964h-.73c-.319 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.258-.479-.576-.479z",
          }),
          SVG.el("path", {
            d: "M24.178 18.964h-.728c-.32 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.258-.479-.578-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M24.178 18.964h-.728c-.32 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.258-.479-.578-.479z",
          }),
          SVG.el("path", {
            d: "M27.051 18.964h-.73c-.318 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.257-.479-.576-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M27.051 18.964h-.73c-.318 0-.576.214-.576.479v1.08h1.882v-1.08c0-.265-.257-.479-.576-.479z",
          }),
          SVG.el("path", {
            d: "M29.923 18.964h-.729c-.32 0-.576.214-.576.479v1.08h1.883v-1.08c0-.265-.258-.479-.578-.479",
            fill: "#7C87A5",
          }),
          SVG.el("path", {
            d: "M29.923 18.964h-.729c-.32 0-.576.214-.576.479v1.08h1.883v-1.08c0-.265-.258-.479-.578-.479z",
          }),
          SVG.el("path", {
            d: "M33.647 28.407H15.765V20.47H32.43l2.157 2.978v3.966c0 .548-.421.993-.94.993",
            fill: "#E6E7E8",
          }),
          SVG.el("path", {
            d: "M33.647 28.407H15.765V20.47H32.43l2.157 2.978v3.966c0 .548-.421.993-.94.993z",
            stroke: "#7C87A5",
            "stroke-width": ".893",
          }),
          SVG.el("path", {
            d: "M15.765 28.407H5.412c-.52 0-.941-.445-.941-.993V20.47h11.294v7.937z",
            fill: "#E6E7E8",
          }),
          SVG.el("path", {
            d: "M15.765 28.407H5.412c-.52 0-.941-.445-.941-.993V20.47h11.294v7.937z",
            stroke: "#7C87A5",
            "stroke-width": ".893",
          }),
          SVG.el("path", {
            fill: "#E6E7E8",
            d: "M19.53 24.438h11.294V20.47H19.529z",
          }),
          SVG.el("path", {
            stroke: "#7C87A5",
            "stroke-width": ".893",
            d: "M19.53 24.438h11.294V20.47H19.529zm12.902-3.964l2.157-2.794",
          }),
        ]),
        {
          id: "sb3-wedoBlock",
          fill: "none",
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("rect", {
            stroke: "#7C87A5",
            fill: "#FFF",
            x: ".5",
            y: "3.59",
            width: "28",
            height: "25.81",
            rx: "1",
          }),
          SVG.el("rect", {
            stroke: "#7C87A5",
            fill: "#E6E7E8",
            x: "2.5",
            y: ".5",
            width: "24",
            height: "32",
            rx: "1",
          }),
          SVG.el("path", {
            stroke: "#7C87A5",
            fill: "#FFF",
            d: "M2.5 14.5h24v13h-24z",
          }),
          SVG.el("path", {
            d: "M14.5 10.5v4",
            stroke: "#7C87A5",
            fill: "#E6E7E8",
          }),
          SVG.el("rect", {
            fill: "#414757",
            x: "4.5",
            y: "2.5",
            width: "20",
            height: "10",
            rx: "1",
          }),
          SVG.el("rect", {
            fill: "#7C87A5",
            opacity: ".5",
            x: "13.5",
            y: "20.13",
            width: "2",
            height: "2",
            rx: ".5",
          }),
          SVG.el("path", {
            d: "M9.06 20.13h1.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1.5a1 1 0 0 1 0-2zM19.93 22.13h-1.51a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1.5a1 1 0 0 1 .01 2zM8.23 17.5H5a.5.5 0 0 1-.5-.5v-2.5h6l-1.85 2.78a.51.51 0 0 1-.42.22zM18.15 18.85l-.5.5a.49.49 0 0 0-.15.36V20a.5.5 0 0 1-.5.5h-.5a.5.5 0 0 1-.5-.5.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5H12a.5.5 0 0 1-.5-.5v-.29a.49.49 0 0 0-.15-.36l-.5-.5a.51.51 0 0 1 0-.71l1.51-1.49a.47.47 0 0 1 .35-.15h3.58a.47.47 0 0 1 .35.15l1.51 1.49a.51.51 0 0 1 0 .71zM10.85 23.45l.5-.5a.49.49 0 0 0 .15-.36v-.29a.5.5 0 0 1 .5-.5h.5a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h.5a.5.5 0 0 1 .5.5v.29a.49.49 0 0 0 .15.36l.5.5a.5.5 0 0 1 0 .7l-1.51 1.5a.47.47 0 0 1-.35.15h-3.58a.47.47 0 0 1-.35-.15l-1.51-1.5a.5.5 0 0 1 0-.7z",
            fill: "#7C87A5",
            opacity: ".5",
          }),
          SVG.el("path", {
            d: "M21.5 27.5h5v4a1 1 0 0 1-1 1h-4v-5z",
            stroke: "#CC4C23",
            fill: "#F15A29",
          }),
        ]),
        {
          transform: "translate(5.5 3.5)",
          id: "sb3-ev3Block",
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M35 28H5a1 1 0 0 1-1-1V12c0-.6.4-1 1-1h30c.5 0 1 .4 1 1v15c0 .5-.5 1-1 1z",
            fill: "#fff",
          }),
          SVG.el("path", {
            fill: "red",
            d: "M4 25h32v2.7H4zm9-1h-2.2a1 1 0 0 1-1-1v-9.7c0-.6.4-1 1-1H13c.6 0 1 .4 1 1V23c0 .6-.5 1-1 1z",
          }),
          SVG.el("path", {
            fill: "red",
            d: "M6.1 19.3v-2.2c0-.5.4-1 1-1h9.7c.5 0 1 .5 1 1v2.2c0 .5-.5 1-1 1H7.1a1 1 0 0 1-1-1z",
          }),
          SVG.el("circle", { fill: "red", cx: "22.8", cy: "18.2", r: "3.4" }),
          SVG.el("circle", { fill: "red", cx: "30.6", cy: "18.2", r: "3.4" }),
          SVG.el("path", { fill: "red", d: "M4.2 27h31.9v.7H4.2z" }),
          SVG.el("circle", {
            fill: "#e0e0e0",
            cx: "22.8",
            cy: "18.2",
            r: "2.3",
          }),
          SVG.el("circle", {
            fill: "#e0e0e0",
            cx: "30.6",
            cy: "18.2",
            r: "2.3",
          }),
          SVG.el("path", {
            fill: "#e0e0e0",
            d: "M12.5 22.9h-1.2c-.3 0-.5-.2-.5-.5V14c0-.3.2-.5.5-.5h1.2c.3 0 .5.2.5.5v8.4c0 .3-.2.5-.5.5z",
          }),
          SVG.el("path", {
            fill: "#e0e0e0",
            d: "M7.2 18.7v-1.2c0-.3.2-.5.5-.5h8.4c.3 0 .5.2.5.5v1.2c0 .3-.2.5-.5.5H7.7c-.3 0-.5-.2-.5-.5zM4 26h32v2H4z",
          }),
          SVG.el("path", {
            stroke: "#666",
            "stroke-width": ".5",
            d: "M35.2 27.9H4.8a1 1 0 0 1-1-1V12.1c0-.6.5-1 1-1h30.5c.5 0 1 .4 1 1V27a1 1 0 0 1-1.1.9z",
          }),
          SVG.el("path", {
            stroke: "#666",
            "stroke-width": ".5",
            d: "M35.2 27.9H4.8a1 1 0 0 1-1-1V12.1c0-.6.5-1 1-1h30.5c.5 0 1 .4 1 1V27a1 1 0 0 1-1.1.9z",
          }),
        ]),
        {
          id: "sb3-makeymakeyBlock",
          fill: "none",
        },
      ),
      SVG.el("image", {
        id: "sb3-gdxforBlock",
        width: "40px",
        height: "40px",
        href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAABAlBMVEUAAAABAQEAAAB9h6YAAAAAAAAAAAB8iKZ7iKaAjKvm5+h+iqhcXFxGR0d8iKbj5OV9iKZ8h6be3+Db3d19h6acnJ0AAAB7nrDh4uPh4uN9iabZ2tt9iKbX19nJycnExsZ8iKe+wMC7vL2Eka/g4ePU1dV8iKZ9iKZ9iKd+iKitra2RkZGLjo5wcHCLi7l0oqJV//9csdZ8h6WFkq//vwDm5+iEka79vgJ6iql9iaaHk6tgq9Btm71+iadmo8dzk7OCj6yAjKp/iqhiqc1qnsB4jKtgrNFwl7d1tLTgtCxpocN0krJ2j65ossWNtZSbt4LAulHWsDnasTTuvhXzvg9zk7TzqAfaAAAAMXRSTlMAJiLoFBwI8q4a+0c4M/nr3tnQwKxYDAnk2726tbGMh4J9dinXq56ddG9nT01ACwsDk/+seAAAAidJREFUWMPt2Olu2kAUhuE5NvuaBAhZm7TpvufgMXaBbmAghOzp/d9KD7RW6yaqPeL7YVV9/471aBgfCXnUH7ULNhtkF96qv1dgwwoxoM08cDsJcwfMdgwonoiJPRFjQXkscQM3Adhxk4NuJwkoDx0nSp5NDTiae958NEaBwzkvC4YYcOxx7fCoeJhnrwcBv7H9TklFm08R4JD5SEkiMg8B4IjXwsV1HgHAPu+EizsQcMbr2B0OufZz7X0NcIZSwC9+rD3nADI2/fCtrHEfAvZ8Liqp6PuIwZZO+ZmSnspcY8AZ55WU5xkElDwuK1Vm7xgFTjhfLud5AgPHAUvBGARKvYnnTXpp/gvAg9PLyykSPLt1nNszIHjuSOdAcNp1nO4UeYYXNzcX0UH62P+0AnjH8lgCgL8s/+uXzwZgrOV2JAMwxpIMwRjLHIyxzMEYyxyMWgAwYiHAzm99iLQ6eOJEul4d7Ea6WhG8W7rAE+fertHgVXp+clpB9Oet64M/wH2TKwI/FrRFTH6JIZ6NvmZpxoDtptlFULOtzGPWy+4/r//gvwKGgcC90NtTqIg2dIuyClaWDvTjKlDMLba4UaUMcIuVbd0gyiGwjGVlFuKWfkQZhEfSQnypd8mCvOHGvkA5quo6EQSs6yrlNumN3obs0KKGHJ70QD+hLOQMW7r0sFI5KJVeY+bGkr1JopKlEG0StXbrW/uvQGMookXLLPFAZYTMJju/7z6rRW1MZcnIAAAAAElFTkSuQmCC",
      }),
      SVG.el("image", {
        id: "sb3-boostBlock",
        width: "40px",
        height: "40px",
        href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAAKlBMVEUAAAD///98h6Xm5+iVnrb/Zhq+w9L5hk73+Pnf4eSQmbLr7Ozo39vp184hSCf6AAAAAXRSTlMAQObYZgAAAOFJREFUSMftlDEOgjAUhonhAi1sLvIk7NDJDTYu0LhzBzcXruHoDTyFB/BCNi30KU3InzioSb++hAS+vPfKa5pEIpHvk7a8gpf8ISWINtlg4i7ZFOKVTBlqsUR+ItYZJG7VzQQgMqGYd7zWRArpULEAe5Q/J9JMj4rluC7uleNw7TFRXcoREDnlinjX57eUsvRTn8+AE0/6OKV0g5buYTTyWFFr/XAp3aDzed4yFJWnKbhPbtaXXohDNYlDJWz4zSxEokkkEjb496AiVtqAbIYgYNGWBmhgES+NX6SRSORfeAJMWajr95DdqQAAAABJRU5ErkJggg==",
      }),
    ]
  }
  static makeOriginalIcons() {
    return [
      ...Style.makeCommonIcons(),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M12.71 2.44A2.41 2.41 0 0 1 12 4.16L8.08 8.08a2.45 2.45 0 0 1-3.45 0L.72 4.16A2.42 2.42 0 0 1 0 2.44 2.48 2.48 0 0 1 .71.71C1 .47 1.43 0 6.36 0s5.39.46 5.64.71a2.44 2.44 0 0 1 .71 1.73z",
            fill: "#231f20",
            opacity: ".1",
          }),
          SVG.el("path", {
            d: "M6.36 7.79a1.43 1.43 0 0 1-1-.42L1.42 3.45a1.44 1.44 0 0 1 0-2c.56-.56 9.31-.56 9.87 0a1.44 1.44 0 0 1 0 2L7.37 7.37a1.43 1.43 0 0 1-1.01.42z",
            fill: "#fff",
          }),
        ]),
        {
          id: "sb3-dropdownArrow",
          transform: "scale(0.944)",
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M22.68 12.2a1.6 1.6 0 0 1-1.27.63h-7.69a1.59 1.59 0 0 1-1.16-2.58l1.12-1.41a4.82 4.82 0 0 0-3.14-.77 4.31 4.31 0 0 0-2 .8A4.25 4.25 0 0 0 7.2 10.6a5.06 5.06 0 0 0 .54 4.62A5.58 5.58 0 0 0 12 17.74a2.26 2.26 0 0 1-.16 4.52A10.25 10.25 0 0 1 3.74 18a10.14 10.14 0 0 1-1.49-9.22 9.7 9.7 0 0 1 2.83-4.14A9.92 9.92 0 0 1 9.66 2.5a10.66 10.66 0 0 1 7.72 1.68l1.08-1.35a1.57 1.57 0 0 1 1.24-.6 1.6 1.6 0 0 1 1.54 1.21l1.7 7.37a1.57 1.57 0 0 1-.26 1.39z",
            fill: "#3d79cc",
          }),
          SVG.el("path", {
            d: "M21.38 11.83h-7.61a.59.59 0 0 1-.43-1l1.75-2.19a5.9 5.9 0 0 0-4.7-1.58 5.07 5.07 0 0 0-4.11 3.17A6 6 0 0 0 7 15.77a6.51 6.51 0 0 0 5 2.92 1.31 1.31 0 0 1-.08 2.62 9.3 9.3 0 0 1-7.35-3.82 9.16 9.16 0 0 1-1.4-8.37A8.51 8.51 0 0 1 5.71 5.4a8.76 8.76 0 0 1 4.11-1.92 9.71 9.71 0 0 1 7.75 2.07l1.67-2.1a.59.59 0 0 1 1 .21L22 11.08a.59.59 0 0 1-.62.75z",
            fill: "#fff",
          }),
        ]),
        {
          id: "sb3-turnRight",
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M20.34 18.21a10.24 10.24 0 0 1-8.1 4.22 2.26 2.26 0 0 1-.16-4.52 5.58 5.58 0 0 0 4.25-2.53 5.06 5.06 0 0 0 .54-4.62A4.25 4.25 0 0 0 15.55 9a4.31 4.31 0 0 0-2-.8 4.82 4.82 0 0 0-3.15.8l1.12 1.41A1.59 1.59 0 0 1 10.36 13H2.67a1.56 1.56 0 0 1-1.26-.63A1.54 1.54 0 0 1 1.13 11l1.72-7.43A1.59 1.59 0 0 1 4.38 2.4a1.57 1.57 0 0 1 1.24.6L6.7 4.35a10.66 10.66 0 0 1 7.72-1.68A9.88 9.88 0 0 1 19 4.81 9.61 9.61 0 0 1 21.83 9a10.08 10.08 0 0 1-1.49 9.21z",
            fill: "#3d79cc",
          }),
          SVG.el("path", {
            d: "M19.56 17.65a9.29 9.29 0 0 1-7.35 3.83 1.31 1.31 0 0 1-.08-2.62 6.53 6.53 0 0 0 5-2.92 6.05 6.05 0 0 0 .67-5.51 5.32 5.32 0 0 0-1.64-2.16 5.21 5.21 0 0 0-2.48-1A5.86 5.86 0 0 0 9 8.84L10.74 11a.59.59 0 0 1-.43 1H2.7a.6.6 0 0 1-.6-.75l1.71-7.42a.59.59 0 0 1 1-.21l1.67 2.1a9.71 9.71 0 0 1 7.75-2.07 8.84 8.84 0 0 1 4.12 1.92 8.68 8.68 0 0 1 2.54 3.72 9.14 9.14 0 0 1-1.33 8.36z",
            fill: "#fff",
          }),
        ]),
        {
          id: "sb3-turnLeft",
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M23.3 11c-.3.6-.9 1-1.5 1h-1.6c-.1 1.3-.5 2.5-1.1 3.6-.9 1.7-2.3 3.2-4.1 4.1-1.7.9-3.6 1.2-5.5.9-1.8-.3-3.5-1.1-4.9-2.3-.7-.7-.7-1.9 0-2.6.6-.6 1.6-.7 2.3-.2H7c.9.6 1.9.9 2.9.9s1.9-.3 2.7-.9c1.1-.8 1.8-2.1 1.8-3.5h-1.5c-.9 0-1.7-.7-1.7-1.7 0-.4.2-.9.5-1.2l4.4-4.4c.7-.6 1.7-.6 2.4 0L23 9.2c.5.5.6 1.2.3 1.8z",
            fill: "#cf8b17",
          }),
          SVG.el("path", {
            d: "M21.8 11h-2.6c0 1.5-.3 2.9-1 4.2-.8 1.6-2.1 2.8-3.7 3.6-1.5.8-3.3 1.1-4.9.8-1.6-.2-3.2-1-4.4-2.1-.4-.3-.4-.9-.1-1.2.3-.4.9-.4 1.2-.1 1 .7 2.2 1.1 3.4 1.1s2.3-.3 3.3-1c.9-.6 1.6-1.5 2-2.6.3-.9.4-1.8.2-2.8h-2.4c-.4 0-.7-.3-.7-.7 0-.2.1-.3.2-.4l4.4-4.4c.3-.3.7-.3.9 0L22 9.8c.3.3.4.6.3.9s-.3.3-.5.3z",
            fill: "#fff",
          }),
        ]),
        {
          id: "sb3-loopArrow",
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M28.456 21.675c-.009-.312-.087-.825-.256-1.702-.096-.495-.612-3.022-.753-3.73-.395-1.98-.76-3.92-1.142-6.113-.732-4.223-.693-6.05.344-6.527.502-.23 1.06-.081 1.842.35.413.227 2.181 1.365 2.07 1.296 1.993 1.243 3.463 1.775 4.928 1.549 1.527-.237 2.505-.06 2.877.618.348.635.015 1.416-.729 2.18-1.473 1.516-3.976 2.514-5.849 2.023-.822-.218-1.238-.464-2.38-1.266a9.737 9.737 0 0 0-.095-.066c.047.593.264 1.74.717 3.803.294 1.336 2.079 9.187 2.637 11.674l.002.012c.529 2.637-1.872 4.724-5.235 4.724-3.29 0-6.363-1.988-6.862-4.528-.53-2.64 1.873-4.734 5.233-4.734a8.411 8.411 0 0 1 2.65.437zM11.46 27.666c-.01-.319-.091-.84-.266-1.738-.09-.46-.595-2.937-.753-3.727-.39-1.96-.752-3.892-1.131-6.07-.732-4.224-.692-6.052.344-6.527.502-.23 1.06-.082 1.841.349.414.228 2.181 1.365 2.07 1.296 1.992 1.243 3.461 1.775 4.925 1.549 1.525-.24 2.504-.064 2.876.614.348.635.015 1.415-.728 2.18-1.474 1.517-3.977 2.513-5.847 2.017-.822-.218-1.237-.463-2.38-1.266a9.729 9.729 0 0 0-.094-.065c.047.593.264 1.74.717 3.802.294 1.337 2.078 9.19 2.636 11.675l.003.013c.517 2.638-1.884 4.732-5.234 4.732-3.286 0-6.359-1.993-6.87-4.54-.518-2.639 1.885-4.73 5.242-4.73.904 0 1.802.15 2.65.436z",
            stroke: "#000",
            "stroke-opacity": ".1",
          }),
          SVG.el("path", {
            d: "M32.18 25.874C32.636 28.157 30.512 30 27.433 30c-3.07 0-5.923-1.843-6.372-4.126-.458-2.285 1.665-4.136 4.743-4.136.647 0 1.283.084 1.89.234a7 7 0 0 1 .938.302c.87-.02-.104-2.294-1.835-12.229-2.134-12.303 3.06-1.87 8.768-2.753 5.708-.885.076 4.82-3.65 3.844-3.724-.987-4.65-7.153.263 14.738zm-16.998 5.99C15.63 34.148 13.507 36 10.439 36c-3.068 0-5.92-1.852-6.379-4.136-.448-2.284 1.674-4.135 4.751-4.135 1.002 0 1.974.197 2.854.544.822-.055-.15-2.377-1.862-12.228-2.133-12.303 3.059-1.87 8.764-2.753 5.706-.894.076 4.821-3.648 3.834-3.723-.987-4.648-7.152.263 14.738z",
            fill: "#FFF",
          }),
        ]),
        {
          id: "sb3-musicBlock",
          fill: "none",
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M8.753 34.602l-4.251 1.779 1.784-4.236c1.218-2.892 2.907-5.423 5.03-7.538L31.066 4.93c.846-.842 2.65-.41 4.032.967 1.38 1.375 1.816 3.173.97 4.015L16.318 29.59c-2.123 2.116-4.664 3.799-7.565 5.012",
            fill: "#FFF",
          }),
          SVG.el("path", {
            d: "M29.41 6.111s-4.45-2.379-8.202 5.771c-1.734 3.766-4.35 1.546-4.35 1.546",
          }),
          SVG.el("path", {
            d: "M36.42 8.825c0 .463-.14.873-.432 1.164l-9.335 9.301c.282-.29.41-.668.41-1.12 0-.874-.507-1.963-1.406-2.868-1.362-1.358-3.147-1.8-4.002-.99L30.99 5.01c.844-.84 2.65-.41 4.035.96.898.904 1.396 1.982 1.396 2.855M10.515 33.774a23.74 23.74 0 0 1-1.764.83L4.5 36.382l1.786-4.235c.258-.604.529-1.186.833-1.757.69.183 1.449.625 2.109 1.282.659.658 1.102 1.412 1.287 2.102",
            fill: "#4C97FF",
          }),
          SVG.el("path", {
            d: "M36.498 8.748c0 .464-.141.874-.433 1.165l-19.742 19.68c-2.131 2.111-4.673 3.793-7.572 5.01L4.5 36.381l.974-2.317 1.925-.808c2.899-1.218 5.441-2.899 7.572-5.01l19.742-19.68c.292-.292.432-.702.432-1.165 0-.647-.27-1.4-.779-2.123.249.172.498.377.736.614.898.905 1.396 1.983 1.396 2.856",
            fill: "#575E75",
            opacity: ".15",
          }),
          SVG.el("path", {
            d: "M18.45 12.831a.904.904 0 1 1-1.807 0 .904.904 0 0 1 1.807 0z",
            fill: "#575E75",
          }),
        ]),
        {
          id: "sb3-penBlock",
          stroke: "#575E75",
          fill: "none",
          "stroke-linejoin": "round",
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("circle", {
            opacity: 0.25,
            cx: 32,
            cy: 16,
            r: 4.5,
          }),
          SVG.el("circle", {
            opacity: 0.5,
            cx: 32,
            cy: 12,
            r: 4.5,
          }),
          SVG.el("circle", {
            opacity: 0.75,
            cx: 32,
            cy: 8,
            r: 4.5,
          }),
          SVG.el("circle", {
            cx: 32,
            cy: 4,
            r: 4.5,
          }),
          SVG.el("path", {
            d: "M22.672 4.42l-6.172 4V6.1c0-2.01-1.563-3.6-3.5-3.6H4.1C2.076 2.5.5 4.076.5 6.1V14c0 1.927 1.584 3.512 3.6 3.6H13c1.902 0 3.5-1.653 3.5-3.6v-2.283l6.257 3.754.097.075c.02.02.098.054.146.054.267 0 .5-.217.5-.5V4.8c0 .037-.056-.094-.129-.243-.145-.242-.43-.299-.7-.137z",
            fill: "#4D4D4D",
            "stroke-linejoin": "round",
          }),
        ]),
        {
          id: "sb3-videoBlock",
          stroke: "#000",
          fill: "#FFF",
          "stroke-opacity": 0.15,
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M25.644 20.5c-1.667 1.937-4.539 3.429-5.977 3.429a1.25 1.25 0 0 1-.557-.137c-.372-.186-.61-.542-.61-1.03 0-.105.017-.207.05-.308.076-.236.624-.986.727-1.173.27-.484.462-1.075.566-1.865A8.5 8.5 0 0 1 24 3.5h4a8.5 8.5 0 1 1 0 17h-2.356z",
            fill: "#FFF",
          }),
          SVG.el("path", {
            d: "M15.5 21.67c0-1.016-1.494-1.586-2.387-.782l-2.7 2.163A5.958 5.958 0 0 1 6.7 24.33h-.4c-1.035 0-1.8.69-1.8 1.573v4.235c0 .883.765 1.572 1.8 1.572h.4c1.458 0 2.754.423 3.82 1.287l2.598 2.161c.908.75 2.382.188 2.382-.876V21.67z",
            fill: "#4D4D4D",
          }),
        ]),
        {
          id: "sb3-ttsBlock",
          stroke: "#000",
          "stroke-opacity": 0.15,
        },
      ),

      SVG.el("image", {
        id: "sb3-translateBlock",
        width: "40px",
        height: "40px",
        href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAA21BMVEUAAAAAAAAAAAAAAADS0tIAAABHR0cAAADX19cAAAAAAACkpKRqamq2traurq6WlpbV1dWEhITHx8fPz8/Ly8vDw8O9vb0AAABMTEz////Z2dlXXnVMl//g4ODu7u7m5ub4+PhPmf/x8fH09PT6+vri4uNRmv/r6+1uqv/0+P9Ynv/p8v+rrrphZ33S5f+51v9ho/+1uMKBhpfH3v+Wmqhrcoacxf+Pvv/KzNSgpLGLkKDd6/+rzf9npv/AwsuDtv98s/90rv9jpP9GieeOrtm5ubl2fI7Z4u56otk5hEFfAAAAGXRSTlMAJhgM1wYyHvIkEWpBhXhc5U+uybyhk0YvleQYgwAABDpJREFUWMPtmNl6mzAQhQMCBAYbvLX1GIwxi7e2TtosTdKk+/L+T1QBVoQtJHDby5yLROYTPzOagSM4e9az6oVUrDgKxh39//Bwb+QBkTZ2VL3hypYilKWicpY6gmWcTCbxIoSh0xHjOkZXA4m0rlGcrcBsslcSmrYq4qm2GczmE6Hms6A8W4GQHZ1BTxXweuTCErGz1TEEaTpLymML6HVq87VhIWPRs21yNu679guNXn9hOnWVMUwanzxG0yCTdYQQts195umwJmnUDSatFHQRPaVvljkl4CAuRlWrCfD9uiZEbR+ObrnjfRDhwHUtdAi0gK/vLtts+VqDVfIMjZSmLEycBuD1D4kK8MHc+Ju3/FFQaHdXc4rBU/8NiCE+OJyAIQKuz32qjA7O1xzwqMtiUETAXeRzinZcyoPgsPpDcco3q9WD729WhTI/e1itbriUzwwtqPI0Q5et4ZoA6SDj1pCWOeB44qJ88aOiIB8j/xMH5IiUJwG+jfyHPMCNH20FQEpkPGnbnBeFuI78Fd82VWJCeTyQCzHb3pMCb8VAQhxBCkPKkzf2Z9J9mR9dCxqb3tBO17EoTw4ky0f0VXSnUCGE6LDp1tvlwK0cyNQMJA1DlL3Px8TenvTjpcAN5cD7VVSsoR992c4oS+aGcuDbzxFBfVqvv5L/375DCzeUAXfnOW5TJHudffvdzg3FwPdZvnbX6/LXr+9t3ZCzAAaMNh/X9BdAWzcUm9T2vnrpk91QbqOhLEDeDZuNHkBSX94Nm7ciAJOWAkW8WZIDl1MikAD57ZwceJsDL0VAfsPJwgzzO5cHvsmBb2IJkAlhB5InntlXlJcc8MO00GMzsHTbsMJDdU+hOxIeCfKuXYQu7ZJ5oDmExwPjfAEvyZ9lGyDW9tOWMH6l1z4nLwjrQ572RRugAvMS57mq4MH7czq9Kgpz1QZoDcI4DsHrWUjw4E1JbLeTSZ5z2gLYMTTwBnaOEwBvS1Ke86UUyF7isKpLrIHkSvVGBORdUQx8nFb0KAUy38aSCO8I510hMrhrBOrGEFIYGToPZM+Fn+XwiraiAMh2Uwnb+3DAC9Z/t3TIA2W7MwZkYbH+uZIC+f0jD3z9+vXF05hIAJTtcK3TLIDnMSLnhqeZlDo8eksYqH/3UskWPz7aCuDTX3urMiA5ejHCp7+YV4W9gxBnMFJP/XRwKNT3IEhLZpIGQMp86seNY6LlutRQgrFr6dLPLyELjm44eemIWt6C+JP0A1HffCIm4GDEw2jvpNTxbIwQ0kUTUYUYkgYTSXfMBU1Ee+G6fSwkOlpA/RFcJCR2erRHkllKSjNWhdd+NQbqkJrgunyPhKBIprpeiZyLZtEeCRNWQdlUZPU8yF1yYJ1J1HGGEC5iknS8pN0tRtoDDzTSNDLpqjMu2s4b9fBZg/TcJVHjrA7GSl/JZz7rWbX6A0ZzUfwVEqfrAAAAAElFTkSuQmCC",
      }),
    ]
  }

  static makeHighContrastIcons() {
    // Make sure to update the highContrastIcons set above!
    return [
      ...Style.makeCommonIcons(),
      // https://github.com/scratchfoundation/scratch-gui/tree/beta/src/lib/themes/high-contrast/blocks-media
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M12.71 2.44A2.41 2.41 0 0 1 12 4.16L8.08 8.08a2.45 2.45 0 0 1-3.45 0L.72 4.16A2.42 2.42 0 0 1 0 2.44 2.48 2.48 0 0 1 .71.71C1 .47 1.43 0 6.36 0s5.39.46 5.64.71a2.44 2.44 0 0 1 .71 1.73z",
            fill: "#231f20",
            opacity: ".1",
          }),
          SVG.el("path", {
            d: "M6.36 7.79a1.43 1.43 0 0 1-1-.42L1.42 3.45a1.44 1.44 0 0 1 0-2c.56-.56 9.31-.56 9.87 0a1.44 1.44 0 0 1 0 2L7.37 7.37a1.43 1.43 0 0 1-1.01.42z",
            fill: "#000",
          }),
        ]),
        {
          id: "sb3-dropdownArrow-high-contrast",
          transform: "scale(0.944)",
        },
      ),

      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M22.68 12.2a1.6 1.6 0 0 1-1.27.63h-7.69a1.59 1.59 0 0 1-1.16-2.58l1.12-1.41a4.82 4.82 0 0 0-3.14-.77 4.31 4.31 0 0 0-2 .8A4.25 4.25 0 0 0 7.2 10.6a5.06 5.06 0 0 0 .54 4.62A5.58 5.58 0 0 0 12 17.74a2.26 2.26 0 0 1-.16 4.52A10.25 10.25 0 0 1 3.74 18a10.14 10.14 0 0 1-1.49-9.22 9.7 9.7 0 0 1 2.83-4.14A9.92 9.92 0 0 1 9.66 2.5a10.66 10.66 0 0 1 7.72 1.68l1.08-1.35a1.57 1.57 0 0 1 1.24-.6 1.6 1.6 0 0 1 1.54 1.21l1.7 7.37a1.57 1.57 0 0 1-.26 1.39z",
            fill: "#000",
          }),
          SVG.el("path", {
            d: "M21.38 11.83h-7.61a.59.59 0 0 1-.43-1l1.75-2.19a5.9 5.9 0 0 0-4.7-1.58 5.07 5.07 0 0 0-4.11 3.17A6 6 0 0 0 7 15.77a6.51 6.51 0 0 0 5 2.92 1.31 1.31 0 0 1-.08 2.62 9.3 9.3 0 0 1-7.35-3.82 9.16 9.16 0 0 1-1.4-8.37A8.51 8.51 0 0 1 5.71 5.4a8.76 8.76 0 0 1 4.11-1.92 9.71 9.71 0 0 1 7.75 2.07l1.67-2.1a.59.59 0 0 1 1 .21L22 11.08a.59.59 0 0 1-.62.75z",
            fill: "#000",
          }),
        ]),
        {
          id: "sb3-turnRight-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M20.34 18.21a10.24 10.24 0 0 1-8.1 4.22 2.26 2.26 0 0 1-.16-4.52 5.58 5.58 0 0 0 4.25-2.53 5.06 5.06 0 0 0 .54-4.62A4.25 4.25 0 0 0 15.55 9a4.31 4.31 0 0 0-2-.8 4.82 4.82 0 0 0-3.15.8l1.12 1.41A1.59 1.59 0 0 1 10.36 13H2.67a1.56 1.56 0 0 1-1.26-.63A1.54 1.54 0 0 1 1.13 11l1.72-7.43A1.59 1.59 0 0 1 4.38 2.4a1.57 1.57 0 0 1 1.24.6L6.7 4.35a10.66 10.66 0 0 1 7.72-1.68A9.88 9.88 0 0 1 19 4.81 9.61 9.61 0 0 1 21.83 9a10.08 10.08 0 0 1-1.49 9.21z",
            fill: "#000",
          }),
          SVG.el("path", {
            d: "M19.56 17.65a9.29 9.29 0 0 1-7.35 3.83 1.31 1.31 0 0 1-.08-2.62 6.53 6.53 0 0 0 5-2.92 6.05 6.05 0 0 0 .67-5.51 5.32 5.32 0 0 0-1.64-2.16 5.21 5.21 0 0 0-2.48-1A5.86 5.86 0 0 0 9 8.84L10.74 11a.59.59 0 0 1-.43 1H2.7a.6.6 0 0 1-.6-.75l1.71-7.42a.59.59 0 0 1 1-.21l1.67 2.1a9.71 9.71 0 0 1 7.75-2.07 8.84 8.84 0 0 1 4.12 1.92 8.68 8.68 0 0 1 2.54 3.72 9.14 9.14 0 0 1-1.33 8.36z",
            fill: "#000",
          }),
        ]),
        {
          id: "sb3-turnLeft-high-contrast",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M23.3 11c-.3.6-.9 1-1.5 1h-1.6c-.1 1.3-.5 2.5-1.1 3.6-.9 1.7-2.3 3.2-4.1 4.1-1.7.9-3.6 1.2-5.5.9-1.8-.3-3.5-1.1-4.9-2.3-.7-.7-.7-1.9 0-2.6.6-.6 1.6-.7 2.3-.2H7c.9.6 1.9.9 2.9.9s1.9-.3 2.7-.9c1.1-.8 1.8-2.1 1.8-3.5h-1.5c-.9 0-1.7-.7-1.7-1.7 0-.4.2-.9.5-1.2l4.4-4.4c.7-.6 1.7-.6 2.4 0L23 9.2c.5.5.6 1.2.3 1.8z",
            fill: "#000",
          }),
          SVG.el("path", {
            d: "M21.8 11h-2.6c0 1.5-.3 2.9-1 4.2-.8 1.6-2.1 2.8-3.7 3.6-1.5.8-3.3 1.1-4.9.8-1.6-.2-3.2-1-4.4-2.1-.4-.3-.4-.9-.1-1.2.3-.4.9-.4 1.2-.1 1 .7 2.2 1.1 3.4 1.1s2.3-.3 3.3-1c.9-.6 1.6-1.5 2-2.6.3-.9.4-1.8.2-2.8h-2.4c-.4 0-.7-.3-.7-.7 0-.2.1-.3.2-.4l4.4-4.4c.3-.3.7-.3.9 0L22 9.8c.3.3.4.6.3.9s-.3.3-.5.3z",
            fill: "#000",
          }),
        ]),
        {
          id: "sb3-loopArrow-high-contrast",
        },
      ),

      // https://github.com/scratchfoundation/scratch-gui/tree/beta/src/lib/themes/high-contrast/extensions
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M28.456 21.675c-.009-.312-.087-.825-.256-1.702-.096-.495-.612-3.022-.753-3.73-.395-1.98-.76-3.92-1.142-6.113-.732-4.223-.693-6.05.344-6.527.502-.23 1.06-.081 1.842.35.413.227 2.181 1.365 2.07 1.296 1.993 1.243 3.463 1.775 4.928 1.549 1.527-.237 2.505-.06 2.877.618.348.635.015 1.416-.729 2.18-1.473 1.516-3.976 2.514-5.849 2.023-.822-.218-1.238-.464-2.38-1.266a9.737 9.737 0 0 0-.095-.066c.047.593.264 1.74.717 3.803.294 1.336 2.079 9.187 2.637 11.674l.002.012c.529 2.637-1.872 4.724-5.235 4.724-3.29 0-6.363-1.988-6.862-4.528-.53-2.64 1.873-4.734 5.233-4.734a8.411 8.411 0 0 1 2.65.437zM11.46 27.666c-.01-.319-.091-.84-.266-1.738-.09-.46-.595-2.937-.753-3.727-.39-1.96-.752-3.892-1.131-6.07-.732-4.224-.692-6.052.344-6.527.502-.23 1.06-.082 1.841.349.414.228 2.181 1.365 2.07 1.296 1.992 1.243 3.461 1.775 4.925 1.549 1.525-.24 2.504-.064 2.876.614.348.635.015 1.415-.728 2.18-1.474 1.517-3.977 2.513-5.847 2.017-.822-.218-1.237-.463-2.38-1.266a9.729 9.729 0 0 0-.094-.065c.047.593.264 1.74.717 3.802.294 1.337 2.078 9.19 2.636 11.675l.003.013c.517 2.638-1.884 4.732-5.234 4.732-3.286 0-6.359-1.993-6.87-4.54-.518-2.639 1.885-4.73 5.242-4.73.904 0 1.802.15 2.65.436z",
            stroke: "#000",
          }),
          SVG.el("path", {
            d: "M32.18 25.874C32.636 28.157 30.512 30 27.433 30c-3.07 0-5.923-1.843-6.372-4.126-.458-2.285 1.665-4.136 4.743-4.136.647 0 1.283.084 1.89.234a7 7 0 0 1 .938.302c.87-.02-.104-2.294-1.835-12.229-2.134-12.303 3.06-1.87 8.768-2.753 5.708-.885.076 4.82-3.65 3.844-3.724-.987-4.65-7.153.263 14.738zm-16.998 5.99C15.63 34.148 13.507 36 10.439 36c-3.068 0-5.92-1.852-6.379-4.136-.448-2.284 1.674-4.135 4.751-4.135 1.002 0 1.974.197 2.854.544.822-.055-.15-2.377-1.862-12.228-2.133-12.303 3.059-1.87 8.764-2.753 5.706-.894.076 4.821-3.648 3.834-3.723-.987-4.648-7.152.263 14.738z",
            fill: "#000",
          }),
        ]),
        {
          id: "sb3-musicBlock-high-contrast",
          fill: "none",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M8.753 34.602l-4.251 1.779 1.784-4.236c1.218-2.892 2.907-5.423 5.03-7.538L31.066 4.93c.846-.842 2.65-.41 4.032.967 1.38 1.375 1.816 3.173.97 4.015L16.318 29.59c-2.123 2.116-4.664 3.799-7.565 5.012",
            fill: "#FFF",
          }),
          SVG.el("path", {
            d: "M29.41 6.111s-4.45-2.379-8.202 5.771c-1.734 3.766-4.35 1.546-4.35 1.546",
          }),
          SVG.el("path", {
            d: "M36.42 8.825c0 .463-.14.873-.432 1.164l-9.335 9.301c.282-.29.41-.668.41-1.12 0-.874-.507-1.963-1.406-2.868-1.362-1.358-3.147-1.8-4.002-.99L30.99 5.01c.844-.84 2.65-.41 4.035.96.898.904 1.396 1.982 1.396 2.855M10.515 33.774a23.74 23.74 0 0 1-1.764.83L4.5 36.382l1.786-4.235c.258-.604.529-1.186.833-1.757.69.183 1.449.625 2.109 1.282.659.658 1.102 1.412 1.287 2.102",
            fill: "#4C97FF",
          }),
          SVG.el("path", {
            d: "M36.498 8.748c0 .464-.141.874-.433 1.165l-19.742 19.68c-2.131 2.111-4.673 3.793-7.572 5.01L4.5 36.381l.974-2.317 1.925-.808c2.899-1.218 5.441-2.899 7.572-5.01l19.742-19.68c.292-.292.432-.702.432-1.165 0-.647-.27-1.4-.779-2.123.249.172.498.377.736.614.898.905 1.396 1.983 1.396 2.856",
            fill: "#0b8e69",
            opacity: ".15",
          }),
          SVG.el("path", {
            d: "M18.45 12.831a.904.904 0 1 1-1.807 0 .904.904 0 0 1 1.807 0z",
            fill: "#0b8e69",
          }),
        ]),
        {
          id: "sb3-penBlock-high-contrast",
          stroke: "#0b8e69",
          fill: "none",
          "stroke-linejoin": "round",
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("circle", {
            opacity: 0.25,
            cx: 32,
            cy: 16,
            r: 4.5,
          }),
          SVG.el("circle", {
            opacity: 0.5,
            cx: 32,
            cy: 12,
            r: 4.5,
          }),
          SVG.el("circle", {
            opacity: 0.75,
            cx: 32,
            cy: 8,
            r: 4.5,
          }),
          SVG.el("circle", {
            cx: 32,
            cy: 4,
            r: 4.5,
          }),
          SVG.el("path", {
            d: "M22.672 4.42l-6.172 4V6.1c0-2.01-1.563-3.6-3.5-3.6H4.1C2.076 2.5.5 4.076.5 6.1V14c0 1.927 1.584 3.512 3.6 3.6H13c1.902 0 3.5-1.653 3.5-3.6v-2.283l6.257 3.754.097.075c.02.02.098.054.146.054.267 0 .5-.217.5-.5V4.8c0 .037-.056-.094-.129-.243-.145-.242-.43-.299-.7-.137z",
            fill: "#000",
            "stroke-linejoin": "round",
          }),
        ]),
        {
          id: "sb3-videoBlock-high-contrast",
          stroke: "#0b8e69",
          fill: "#FFF",
          "stroke-opacity": 0.15,
        },
      ),
      SVG.setProps(
        SVG.group([
          SVG.el("path", {
            d: "M25.644 20.5c-1.667 1.937-4.539 3.429-5.977 3.429a1.25 1.25 0 0 1-.557-.137c-.372-.186-.61-.542-.61-1.03 0-.105.017-.207.05-.308.076-.236.624-.986.727-1.173.27-.484.462-1.075.566-1.865A8.5 8.5 0 0 1 24 3.5h4a8.5 8.5 0 1 1 0 17h-2.356z",
            fill: "#FFF",
            stroke: "#0b8e69",
          }),
          SVG.el("path", {
            d: "M15.5 21.67c0-1.016-1.494-1.586-2.387-.782l-2.7 2.163A5.958 5.958 0 0 1 6.7 24.33h-.4c-1.035 0-1.8.69-1.8 1.573v4.235c0 .883.765 1.572 1.8 1.572h.4c1.458 0 2.754.423 3.82 1.287l2.598 2.161c.908.75 2.382.188 2.382-.876V21.67z",
            fill: "#000",
          }),
        ]),
        {
          id: "sb3-ttsBlock-high-contrast",
          "stroke-opacity": 0.15,
        },
      ),

      // The original icon is in PNG, but the high contrast version uses SVG.
      // For consistency we use PNG in both places.
      // https://github.com/scratchfoundation/scratch-gui/blob/beta/src/lib/themes/high-contrast/extensions/translateIcon.svg
      // Exported via Inkscape and compressed
      SVG.el("image", {
        id: "sb3-translateBlock-high-contrast",
        width: "40px",
        height: "40px",
        href: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAxoAAARjCAMAAADfFKLnAAABhlBMVEUAAAALjWkOj2oLjmkAAAAQj2wkmnkYlHILj2kLjmkAAAAAAABsu6VouaIJjmgimncAAAAAAAALjml0v6kAAAAAAAAAAAAATzhjt6A9pogVk28XlHAVk28ZlHEAAAAAAAAAAAANj2oAAAAJj2oAAAAAAAByvahsu6VVsZcqnXwAAAAAAAAAAAAMj2oQkWsAAAAPkGwAAABHqo4AAAAclnMcl3MKj2kXlHIXk3EAAAALj2gAAAD///8AAAB9w6+ExrONyrmHyLWrzv/3+/r8/v6Fx7VpqP/0+fh7s/9Ml//4/PvK59/4+//u9f/l8P/V5v9vrP9an/9Smv/o6OjMzMwrKysDAwPp8//e7P+w0f+axf9xrf9kpf9jpP9ho/9Nl//e3t7E5Nu+4dfT09OUzb2QzLuZmZlMrJKGhoYpnHxlZWVgYGBCQkINDQ30+P/J4P/D3P+11P+Nvf90rv9Jlvby8vLc3Nyl1cik1ce+vr6DxrKlpaWfn58xnJZBpJWJiYl+fn4fHx9PedmHAAAAPHRSTlMAd4OAxg/0wohyDv78+Tj16Ik6+ux+WAb79e7mvbCemW1rZDYXC/n39PTw39u8t7RVNvX11NLDm5qOWx0x5AFdAAAGd0lEQVR42uzbV3faQBCG4XGChMEU4wLujntv6WXXIUAwxd3Gvfea3nv+eQaBcgS5ztV8zwWMfsB7js7uiAAAAAAAAP6fgKfCwRMg1l49OBzqJgC5DLfZO+nQa7oNovq2Ia2rJwhArFZ/QpVI+Fspr57b8BKAUAEzrgpmXhSHjBmgvDGtQwQglKdWFaU27KnWQ0TekEvruvYwAYh08ym3ML0ei8V2NvlnfZofn98gorC2DBKASFYaq8md9MLW1kJ6O7lqp9Hj0qzqFgGIxGlYtjeUepPkwU6D20AZIJidRmxhZnbxtTMN8rpQBshlpzGdTL2dTzjSYJEnBCCVnYaaS++uqb9pAEhnpzGXXFycn1PZo2g0ejpiL410EYBQhTRepnZTs2vz776f+yYd/EG3QQAiWVd+s+nNV/yX+NEQVyXiDS0EIFKNmeAEZlRe9jyuysSDNQQgkrsvo4qOfOofvgoCEMloNWs/cgNTx9FT+7RqaUV/KI7PcFoFYgVG+7iMxpbK+19UwU+tfyENEC/SvK+yAw8cdxy5XO53AmmAdI8bD/qbxh13HMv67Ex/RhogXVfzvQ6DHGlc6L09fYk0AJgjjalrza7fIw2QrjtSksZXfXFycqm/IQ0QrrPK5XWmcbWylD+/vUIaIFtnldaFNjx+lbd8qNjhMq78QDQug7l6eAwE46pMxsSiCAhVpy1hYu7y9cKM300AMoXbOQ5XyEvMaAn6opbjKQ7jkw9L6SBZSOsxe66pqLSMNnIb/hG8TYFk3mqt66nMw4Gs2m+OEIBgE9zGcFtZHeNN/Qe3OwhAsu5HQ3fq2qiU0XG3Cd+GAwAAAAD8YQ8OBAAAAACA/F8bQVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVYQ8OBAAAAACA/F8bQVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV2IMDAQAAAAAg/9dGUFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUV9uBAAAAAAADI/7URVFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWFPTgQAAAAAADyf20EVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVhDw4EAAAAAID8XxtBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVXYgwMBAAAAACD/10ZQVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVRX24EAAAAAAAMj/tRFUVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVYU9OBAAAAAAAPJ/bQRVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWEPDgQAAAAAgPxfG0FVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVdiDAwEAAAAAIP/XRlBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVFfbgQAAAAAAAyP+1EVRVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVhT04EAAAAAAA8n9tBFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVYQ8OBAAAAACA/F8bQVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV2oNDAgAAAABB/1/7wgQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMArKwCvdMdAc1YAAAAASUVORK5CYII=",
      }),
    ]
  }

  /**
   * @return the icon name with suffix, if a high contrast icon is defined
   */
  static iconName(name, iconStyle) {
    if (iconStyle === "high-contrast" && highContrastIcons.has(name)) {
      return `${name}-high-contrast`
    }

    return name
  }

  static makeStyle() {
    const style = SVG.el("style");
    style.appendChild(SVG.cdata(Style.cssContent));
    return style
  }

  static get defaultFont() {
    return "500 12pt Helvetica Neue, Helvetica, sans-serif"
  }
  static get commentFont() {
    return "400 12pt Helvetica Neue, Helvetica, sans-serif"
  }
}

const {
  defaultFont,
  commentFont,
  makeStyle: makeStyle$1,
  makeOriginalIcons,
  makeHighContrastIcons,
  iconName,
} = Style;

class LabelView {
  constructor(label) {
    Object.assign(this, label);

    this.el = null;
    this.height = 12;
    this.metrics = null;
    this.x = 0;
  }

  get isLabel() {
    return true
  }

  draw(_iconStyle) {
    return this.el
  }

  get width() {
    return this.metrics.width
  }

  measure() {
    const value = this.value;
    const cls = `sb3-${this.cls}`;
    this.el = SVG.text(0, 13, value, {
      class: `sb3-label ${cls}`,
    });

    let cache = LabelView.metricsCache[cls];
    if (!cache) {
      cache = LabelView.metricsCache[cls] = Object.create(null);
    }

    if (Object.hasOwnProperty.call(cache, value)) {
      this.metrics = cache[value];
    } else {
      const font = /comment-label/.test(this.cls) ? commentFont : defaultFont;
      this.metrics = cache[value] = LabelView.measure(value, font);
      // TODO: word-spacing? (fortunately it seems to have no effect!)
    }
  }

  static measure(value, font) {
    const context = LabelView.measuring;
    context.font = font;
    const textMetrics = context.measureText(value);
    const width = (textMetrics.width + 0.5) | 0;
    return { width: width }
  }
}

LabelView.metricsCache = {};
LabelView.toMeasure = [];

class IconView {
  constructor(icon) {
    Object.assign(this, icon);

    const info = IconView.icons[this.name];
    if (!info) {
      throw new Error(`no info for icon: ${this.name}`)
    }
    Object.assign(this, info);
  }

  get isIcon() {
    return true
  }

  draw(iconStyle) {
    return SVG.symbol(`#sb3-${iconName(this.name, iconStyle)}`, {
      width: this.width,
      height: this.height,
    })
  }

  static get icons() {
    return {
      greenFlag: { width: 20, height: 21, dy: -2 },
      stopSign: { width: 20, height: 20 },
      turnLeft: { width: 24, height: 24 },
      turnRight: { width: 24, height: 24 },
      loopArrow: { width: 24, height: 24 },
      addInput: { width: 4, height: 8 },
      delInput: { width: 4, height: 8 },
      list: { width: 15, height: 18 },
      musicBlock: { width: 40, height: 40 },
      penBlock: { width: 40, height: 40 },
      videoBlock: { width: 40, height: 40, dy: 10 },
      ttsBlock: { width: 40, height: 40 },
      translateBlock: { width: 40, height: 40 },
      wedoBlock: { width: 40, height: 40 },
      ev3Block: { width: 40, height: 40 },
      microbitBlock: { width: 40, height: 40 },
      makeymakeyBlock: { width: 40, height: 40 },
      gdxforBlock: { width: 40, height: 40 },
      boostBlock: { width: 40, height: 40 },
    }
  }
}

class LineView {
  constructor() {
    this.width = 1;
    this.height = 40;
    this.x = 0;
  }

  get isLine() {
    return true
  }

  measure() {}

  draw(_iconStyle, parent) {
    const category = parent.info.category;
    return SVG.el("line", {
      class: `sb3-${category}-line`,
      "stroke-linecap": "round",
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 40,
    })
  }
}

class InputView {
  constructor(input) {
    Object.assign(this, input);
    if (input.label) {
      this.label = newView(input.label);
    }
    this.isBoolean = this.shape === "boolean";
    this.isDropdown = this.shape === "dropdown";
    this.isRound = !(this.isBoolean || this.isDropdown);

    this.x = 0;
  }

  get isInput() {
    return true
  }

  measure() {
    if (this.hasLabel) {
      this.label.measure();
    }
  }

  static get shapes() {
    return {
      string: SVG.pillRect,
      number: SVG.pillRect,
      "number-dropdown": SVG.pillRect,
      color: SVG.pillRect,
      dropdown: SVG.roundRect,

      boolean: SVG.pointedRect,
      stack: SVG.stackRect,
      reporter: SVG.pillRect,
    }
  }

  draw(iconStyle, parent) {
    let w;
    let label;
    if (this.isBoolean) {
      w = 48;
    } else if (this.isColor) {
      w = 40;
    } else if (this.hasLabel) {
      label = this.label.draw(iconStyle);
      // Minimum padding of 11
      // Minimum width of 40, at which point we center the label
      const px = this.label.width >= 18 ? 11 : (40 - this.label.width) / 2;
      w = this.label.width + 2 * px;
      label = SVG.move(px, 9, label);
    } else {
      w = this.isInset ? 30 : null;
    }
    if (this.hasArrow) {
      w += 20;
    }
    this.width = w;

    const h = (this.height = 32);

    const el = InputView.shapes[this.shape](w, h);
    SVG.setProps(el, {
      class: `${
        this.isColor ? "" : `sb3-${parent.info.category}`
      } sb3-input sb3-input-${this.shape}`,
    });

    if (this.isColor) {
      SVG.setProps(el, {
        fill: this.value,
      });
    } else if (this.shape === "dropdown") {
      // custom colors
      if (parent.info.color) {
        SVG.setProps(el, {
          fill: parent.info.color,
          stroke: "rgba(0, 0, 0, 0.2)",
        });
      }
    } else if (this.shape === "number-dropdown") {
      el.classList.add(`sb3-${parent.info.category}-alt`);

      // custom colors
      if (parent.info.color) {
        SVG.setProps(el, {
          fill: "rgba(0, 0, 0, 0.1)",
          stroke: "rgba(0, 0, 0, 0.15)", // combines with fill...
        });
      }
    } else if (this.shape === "boolean") {
      el.classList.remove(`sb3-${parent.info.category}`);
      el.classList.add(`sb3-${parent.info.category}-dark`);

      // custom colors
      if (parent.info.color) {
        SVG.setProps(el, {
          fill: "rgba(0, 0, 0, 0.15)",
        });
      }
    }

    const result = SVG.group([el]);
    if (this.hasLabel) {
      result.appendChild(label);
    }
    if (this.hasArrow) {
      result.appendChild(
        SVG.move(
          w - 24,
          13,
          SVG.symbol(
            iconStyle === "high-contrast"
              ? "#sb3-dropdownArrow-high-contrast"
              : "#sb3-dropdownArrow",
            {},
          ),
        ),
      );
    }
    return result
  }
}

class BlockView {
  constructor(block) {
    Object.assign(this, block);
    this.children = block.children.map(newView);
    this.comment = this.comment ? newView(this.comment) : null;
    this.isRound = this.isReporter;

    // Avoid accidental mutation
    this.info = { ...block.info };
    if (
      Object.prototype.hasOwnProperty.call(aliasExtensions, this.info.category)
    ) {
      this.info.category = aliasExtensions[this.info.category];
    }
    if (Object.prototype.hasOwnProperty.call(extensions, this.info.category)) {
      this.children.unshift(new LineView());
      this.children.unshift(
        new IconView({ name: this.info.category + "Block" }),
      );
      this.info.category = "extension";
    }

    this.x = 0;
    this.width = null;
    this.height = null;
    this.firstLine = null;
    this.innerWidth = null;
  }

  get isBlock() {
    return true
  }

  measure() {
    for (const child of this.children) {
      if (child.measure) {
        child.measure();
      }
    }
    if (this.comment) {
      this.comment.measure();
    }
  }

  static get shapes() {
    return {
      stack: SVG.stackRect,
      "c-block": SVG.stackRect,
      "if-block": SVG.stackRect,
      celse: SVG.stackRect,
      cend: SVG.stackRect,

      cap: SVG.capRect,
      reporter: SVG.pillRect,
      boolean: SVG.pointedRect,
      hat: SVG.hatRect,
      cat: SVG.catHat,
      "define-hat": SVG.procHatRect,
      ring: SVG.pillRect,
    }
  }

  drawSelf(iconStyle, w, h, lines) {
    // mouths
    if (lines.length > 1) {
      return SVG.mouthRect(w, h, this.isFinal, lines, {
        class: `sb3-${this.info.category}`,
      })
    }

    // outlines
    if (this.info.shape === "outline") {
      return SVG.setProps(SVG.stackRect(w, h), {
        class: `sb3-${this.info.category} sb3-${this.info.category}-alt`,
      })
    }

    // rings
    if (this.isRing) {
      const child = this.children[0];
      if (child && (child.isInput || child.isBlock || child.isScript)) {
        return SVG.roundRect(w, h, {
          class: `sb3-${this.info.category}`,
        })
      }
    }

    const func = BlockView.shapes[this.info.shape];
    if (!func) {
      throw new Error(`no shape func: ${this.info.shape}`)
    }
    return func(w, h, {
      class: `sb3-${this.info.category}`,
    })
  }

  static get padding() {
    return {
      hat: [24, 8],
      cat: [24, 8],
      "define-hat": [20, 16],
      null: [4, 4],
    }
  }

  horizontalPadding(child) {
    if (this.isRound) {
      if (child.isIcon) {
        return 16
      } else if (child.isLabel) {
        return 12 // text in circle: 3 units
      } else if (child.isDropdown) {
        return 12 // square in circle: 3 units
      } else if (child.isBoolean) {
        return 12 // hexagon in circle: 3 units
      } else if (child.isRound) {
        return 4 // circle in circle: 1 unit
      }
    } else if (this.isBoolean) {
      if (child.isIcon) {
        return 24 // icon in hexagon: ???
      } else if (child.isLabel) {
        return 20 // text in hexagon: 5 units
      } else if (child.isDropdown) {
        return 20 // square in hexagon: 5 units
      } else if (child.isRound && child.isBlock) {
        return 24 // circle in hexagon: 5 + 1 units
      } else if (child.isRound) {
        return 20 // circle in hexagon: 5 units
      } else if (child.isBoolean) {
        return 8 // hexagon in hexagon: 2 units
      }
    }
    return 8 // default: 2 units
  }

  marginBetween(a, b) {
    // Consecutive labels should be rendered as a single text element.
    // For now, approximate the size of one space
    if (a.isLabel && b.isLabel) {
      return 5
    }

    return 8 // default: 2 units
  }

  draw(iconStyle) {
    const isDefine = this.info.shape === "define-hat";
    let children = this.children;
    const isCommand = this.isCommand;

    const padding = BlockView.padding[this.info.shape] || BlockView.padding.null;
    const pt = padding[0],
      pb = padding[1];

    let y = this.info.shape === "cat" ? 16 : 0;
    const Line = function (y) {
      this.y = y;
      this.width = 0;
      this.height = isCommand ? 40 : 32;
      this.children = [];
    };

    let innerWidth = 0;
    let scriptWidth = 0;
    let line = new Line(y);
    const pushLine = () => {
      if (lines.length === 0) {
        line.height += pt + pb;
      } else {
        line.height -= 11;
        line.y -= 2;
      }
      y += line.height;
      lines.push(line);
    };

    if (this.info.isRTL) {
      let start = 0;
      const flip = () => {
        children = children
          .slice(0, start)
          .concat(children.slice(start, i).reverse())
          .concat(children.slice(i));
      };
      let i;
      for (i = 0; i < children.length; i++) {
        if (children[i].isScript) {
          flip();
          start = i + 1;
        }
      }
      if (start < i) {
        flip();
      }
    }

    const lines = [];
    let previousChild;
    let lastChild;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      child.el = child.draw(iconStyle, this);

      if (child.isScript && this.isCommand) {
        this.hasScript = true;
        pushLine();
        child.y = y - 1;
        lines.push(child);
        scriptWidth = Math.max(scriptWidth, Math.max(1, child.width));
        child.height = Math.max(29, child.height + 3) - 2;
        y += child.height;
        line = new Line(y);
        previousChild = null;
      } else if (child.isArrow) {
        line.children.push(child);
        previousChild = child;
      } else {
        // Remember the last child on the first line
        if (!lines.length) {
          lastChild = child;
        }

        // Leave space between inputs
        if (previousChild) {
          line.width += this.marginBetween(previousChild, child);
        }

        // Align first input with right of notch
        if (children[0] != null) {
          const cmw = 48 - this.horizontalPadding(children[0]);
          if (
            (this.isCommand || this.isOutline) &&
            !child.isLabel &&
            !child.isIcon &&
            line.width < cmw
          ) {
            line.width = cmw;
          }
        }

        // Align extension category icons below notch
        if (child.isIcon && i === 0 && this.isCommand) {
          line.height = Math.max(line.height, child.height + 8);
        }

        child.x = line.width;
        line.width += child.width;
        innerWidth = Math.max(innerWidth, line.width);
        if (!child.isLabel) {
          line.height = Math.max(line.height, child.height);
        }
        line.children.push(child);
        previousChild = child;
      }
    }
    pushLine();

    let padLeft = children.length ? this.horizontalPadding(children[0]) : 0;
    const padRight = children.length ? this.horizontalPadding(lastChild) : 0;
    innerWidth += padLeft + padRight;

    // Commands have a minimum width
    // The hat min-width is arbitrary (not sure of Scratch 3 value)
    // Outline min-width is deliberately higher (because Scratch 3 looks silly)
    const originalInnerWidth = innerWidth;
    innerWidth = Math.max(
      this.hasScript
        ? 160
        : this.isHat
        ? 108
        : this.isCommand || this.isOutline
        ? 64
        : this.isReporter
        ? 48
        : 0,
      innerWidth,
    );

    // Center the label text inside small reporters.
    if (this.isReporter) {
      padLeft += (innerWidth - originalInnerWidth) / 2;
    }

    this.height = y;

    this.width = scriptWidth
      ? Math.max(innerWidth, 15 + scriptWidth)
      : innerWidth;
    this.firstLine = lines[0];
    this.innerWidth = innerWidth;

    const objects = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.isScript) {
        objects.push(SVG.move(16, line.y, line.el));
        continue
      }

      const h = line.height;

      for (let j = 0; j < line.children.length; j++) {
        const child = line.children[j];
        if (child.isArrow) {
          objects.push(SVG.move(innerWidth - 32, this.height - 28, child.el));
          continue
        }

        let y = pt + (h - child.height - pt - pb) / 2;
        if (child.isLabel && i === 0) {
          // We only do this for the first line so that the `else` label is
          // correctly aligned
          y -= 1;
        } else if (isDefine && child.isLabel) {
          y += 3;
        } else if (child.isIcon) {
          y += child.dy | 0;
          if (this.isCommand && i === 0 && j === 0) {
            y += 4;
          }
        }

        let x = padLeft + child.x;
        if (child.dx) {
          x += child.dx;
        }

        objects.push(SVG.move(x, (line.y + y) | 0, child.el));
      }
    }

    const el = this.drawSelf(iconStyle, innerWidth, this.height, lines);
    objects.splice(0, 0, el);
    if (this.info.color) {
      SVG.setProps(el, {
        fill: this.info.color,
        stroke: "rgba(0, 0, 0, 0.2)",
      });
    }

    return SVG.group(objects)
  }
}

class CommentView {
  constructor(comment) {
    Object.assign(this, comment);
    this.label = newView(comment.label);

    this.width = null;
  }

  get isComment() {
    return true
  }

  static get lineLength() {
    return 12
  }

  get height() {
    return 20
  }

  measure() {
    this.label.measure();
  }

  draw(iconStyle) {
    const labelEl = this.label.draw(iconStyle);

    this.width = this.label.width + 16;
    return SVG.group([
      SVG.commentLine(this.hasBlock ? CommentView.lineLength : 0, 6),
      SVG.commentRect(this.width, this.height, {
        class: "sb3-comment",
      }),
      SVG.move(8, 4, labelEl),
    ])
  }
}

class GlowView {
  constructor(glow) {
    Object.assign(this, glow);
    this.child = newView(glow.child);

    this.width = null;
    this.height = null;
    this.y = 0;
  }

  get isGlow() {
    return true
  }

  measure() {
    this.child.measure();
  }

  drawSelf() {
    const c = this.child;
    let el;
    const w = this.width;
    const h = this.height - 1;
    if (c.isScript) {
      if (!c.isEmpty && c.blocks[0].isHat) {
        el = SVG.hatRect(w, h);
      } else if (c.isFinal) {
        el = SVG.capRect(w, h);
      } else {
        el = SVG.stackRect(w, h);
      }
    } else {
      el = c.drawSelf(w, h, []);
    }
    return SVG.setProps(el, {
      class: "sb3-diff sb3-diff-ins",
    })
  }
  // TODO how can we always raise Glows above their parents?

  draw(iconStyle) {
    const c = this.child;
    const el = c.isScript ? c.draw(iconStyle, true) : c.draw(iconStyle);

    this.width = c.width;
    this.height = (c.isBlock && c.firstLine.height) || c.height;

    // encircle
    return SVG.group([el, this.drawSelf()])
  }
}

class ScriptView {
  constructor(script) {
    Object.assign(this, script);
    this.blocks = script.blocks.map(newView);

    this.y = 0;
  }

  get isScript() {
    return true
  }

  measure() {
    for (const block of this.blocks) {
      block.measure();
    }
  }

  draw(iconStyle, inside) {
    const children = [];
    let y = 1;
    this.width = 0;
    for (const block of this.blocks) {
      const x = inside ? 0 : 2;
      const child = block.draw(iconStyle);
      children.push(SVG.move(x, y, child));
      this.width = Math.max(this.width, block.width);

      const diff = block.diff;
      if (diff === "-") {
        const dw = block.width;
        const dh = block.firstLine.height || block.height;
        children.push(SVG.move(x, y + dh / 2 + 1, SVG.strikethroughLine(dw)));
        this.width = Math.max(this.width, block.width);
      }

      y += block.height;

      const comment = block.comment;
      if (comment) {
        const line = block.firstLine;
        const cx = block.innerWidth + 2 + CommentView.lineLength;
        const cy = y - block.height + line.height / 2;
        const el = comment.draw(iconStyle);
        children.push(SVG.move(cx, cy - comment.height / 2, el));
        this.width = Math.max(this.width, cx + comment.width);
      }
    }
    const lastBlock = this.blocks[this.blocks.length - 1];
    this.height = y + 1;
    if (!inside && !this.isFinal) {
      this.height += lastBlock.hasPuzzle ? 8 : 0;
    }
    if (!inside && lastBlock.isGlow) {
      this.height += 7; // TODO unbreak this
    }
    return SVG.group(children)
  }
}

class DocumentView {
  constructor(doc, options) {
    Object.assign(this, doc);
    this.scripts = doc.scripts.map(newView);

    this.width = null;
    this.height = null;
    this.el = null;
    this.defs = null;
    this.scale = options.scale;
    this.iconStyle = options.style.replace("scratch3-", "");
  }

  measure() {
    this.scripts.forEach(script => {
      script.measure();
    });
  }

  render(cb) {
    if (typeof cb === "function") {
      throw new Error("render() no longer takes a callback")
    }

    // measure strings
    this.measure();

    // TODO: separate layout + render steps.
    // render each script
    let width = 0;
    let height = 0;
    const elements = [];
    for (let i = 0; i < this.scripts.length; i++) {
      const script = this.scripts[i];
      if (height) {
        height += 10;
      }
      script.y = height;
      elements.push(SVG.move(0, height, script.draw(this.iconStyle)));
      height += script.height;
      if (i !== this.scripts.length - 1) {
        height += 36;
      }
      width = Math.max(width, script.width + 4);
    }
    this.width = width;
    this.height = height;

    // return SVG
    const svg = SVG.newSVG(width, height, this.scale);
    const icons =
      this.iconStyle === "high-contrast"
        ? makeHighContrastIcons()
        : makeOriginalIcons();
    svg.appendChild((this.defs = SVG.withChildren(SVG.el("defs"), icons)));

    svg.appendChild(
      SVG.setProps(SVG.group(elements), {
        style: `transform: scale(${this.scale})`,
      }),
    );
    this.el = svg;
    return svg
  }

  /* Export SVG image as XML string */
  exportSVGString() {
    if (this.el == null) {
      throw new Error("call draw() first")
    }

    const style = makeStyle$1();
    this.defs.appendChild(style);
    const xml = new SVG.XMLSerializer().serializeToString(this.el);
    this.defs.removeChild(style);
    return xml
  }

  /* Export SVG image as data URI */
  exportSVG() {
    const xml = this.exportSVGString();
    return `data:image/svg+xml;utf8,${xml.replace(/[#]/g, encodeURIComponent)}`
  }

  toCanvas(cb, exportScale) {
    exportScale = exportScale || 1.0;

    const canvas = SVG.makeCanvas();
    canvas.width = Math.max(1, this.width * exportScale * this.scale);
    canvas.height = Math.max(1, this.height * exportScale * this.scale);
    const context = canvas.getContext("2d");

    const image = new Image();
    image.src = this.exportSVG();
    image.onload = () => {
      context.save();
      context.scale(exportScale, exportScale);
      context.drawImage(image, 0, 0);
      context.restore();

      cb(canvas);
    };
  }

  exportPNG(cb, scale) {
    this.toCanvas(canvas => {
      if (URL && URL.createObjectURL && Blob && canvas.toBlob) {
        canvas.toBlob(blob => {
          cb(URL.createObjectURL(blob));
        }, "image/png");
      } else {
        cb(canvas.toDataURL("image/png"));
      }
    }, scale);
  }
}

const viewFor = node => {
  switch (node.constructor) {
    case Label:
      return LabelView
    case Icon:
      return IconView
    case Input:
      return InputView
    case Block:
      return BlockView
    case Comment:
      return CommentView
    case Glow:
      return GlowView
    case Script:
      return ScriptView
    case Document:
      return DocumentView
    default:
      throw new Error(`no view for ${node.constructor.name}`)
  }
};

const newView = (node, options) => new (viewFor(node))(node, options);

function init$1(window) {
  SVG.init(window);

  LabelView.measuring = SVG.makeCanvas().getContext("2d");
}

const makeStyle = Style.makeStyle;

/*
 * scratchblocks
 * http://scratchblocks.github.io/
 *
 * Copyright 2013-2016, Tim Radvan
 * @license MIT
 * http://opensource.org/licenses/MIT
 */

function init (window) {
  const document = window.document;

  init$2(window);
  init$1(window);

  function appendStyles() {
    document.head.appendChild(makeStyle$2());
    document.head.appendChild(makeStyle());
  }

  function newView$2(doc, options) {
    options = {
      style: "scratch2",
      ...options,
    };

    options.scale = options.scale || 1;

    if (options.style === "scratch2") {
      return newView$1(doc, options)
    } else if (/^scratch3($|-)/.test(options.style)) {
      return newView(doc, options)
    }

    throw new Error(`Unknown style: ${options.style}`)
  }

  function render(doc, options) {
    if (typeof options === "function") {
      throw new Error("render() no longer takes a callback")
    }
    const view = newView$2(doc, options);
    const svg = view.render();
    // Used in high contrast theme
    svg.classList.add(`scratchblocks-style-${options.style}`);
    return svg
  }

  /*****************************************************************************/

  /*** Render ***/

  // read code from a DOM element
  function readCode(el, options) {
    options = {
      inline: false,
      ...options,
    };

    const html = el.innerHTML.replace(/<br>\s?|\n|\r\n|\r/gi, "\n");
    const pre = document.createElement("pre");
    pre.innerHTML = html;
    let code = pre.textContent;
    if (options.inline) {
      code = code.replace("\n", "");
    }
    return code
  }

  // insert 'svg' into 'el', with appropriate wrapper elements
  function replace(el, svg, doc, options) {
    let container;
    if (options.inline) {
      container = document.createElement("span");
      let cls = "scratchblocks scratchblocks-inline";
      if (doc.scripts[0] && !doc.scripts[0].isEmpty) {
        cls += ` scratchblocks-inline-${doc.scripts[0].blocks[0].shape}`;
      }
      container.className = cls;
      container.style.display = "inline-block";
      container.style.verticalAlign = "middle";
    } else {
      container = document.createElement("div");
      container.className = "scratchblocks";
    }
    container.appendChild(svg);

    el.innerHTML = "";
    el.appendChild(container);
  }

  /* Render all matching elements in page to shiny scratch blocks.
   * Accepts a CSS selector as an argument.
   *
   *  scratchblocks.renderMatching("pre.blocks");
   *
   * Like the old 'scratchblocks2.parse().
   */
  const renderMatching = function (selector, options) {
    selector = selector || "pre.blocks";
    options = {
      // Default values for the options
      style: "scratch2",
      inline: false,
      languages: ["en"],
      scale: 1,

      read: readCode, // function(el, options) => code
      parse: parse, // function(code, options) => doc
      render: render, // function(doc) => svg
      replace: replace, // function(el, svg, doc, options)

      ...options,
    };

    // find elements
    const results = [].slice.apply(document.querySelectorAll(selector));
    results.forEach(el => {
      const code = options.read(el, options);

      const doc = options.parse(code, options);

      const svg = options.render(doc, options);

      options.replace(el, svg, doc, options);
    });
  };

  return {
    allLanguages: allLanguages, // read-only
    loadLanguages: loadLanguages,

    stringify: function (doc) {
      return doc.stringify()
    },

    Label,
    Icon,
    Input,
    Block,
    Comment,
    Script,
    Document,

    newView: newView$2,
    read: readCode,
    parse: parse,
    replace: replace,
    render: render,
    renderMatching: renderMatching,

    appendStyles: appendStyles,
  }
}

const scratchblocks = init(window);

// add our CSS to the page
scratchblocks.appendStyles();

export { scratchblocks as default };
//# sourceMappingURL=scratchblocks.min.es.js.map
