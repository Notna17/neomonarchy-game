const out = document.getElementById('output')
const input = document.getElementById('input')
const consolename = document.getElementById('console-name')
window.out = out;
window.input = input;
window.consolename = consolename;

function logger(text, cls) {
    const p = document.createElement('p');
    if (cls) p.className = cls;
    p.innerHTML = text;
    out.appendChild(p);
    while (out.children.length > 20) {out.removeChild(out.firstChild)};
    out.scrollTop = out.scrollHeight}

const commandObjects = {}; // name -> { name, commands: [{name, aliases, fn, desc}] }
let activeCO = null;
window.commandObjects = commandObjects;
window.activeCO = activeCO;

function createCO(name, title, commands) {
    // commands: array of {name, aliases:[], fn}
    commandObjects[name] = { name, title, commands: commands || [] };
    return commandObjects[name]}

function activateCO(name) {
    if (!commandObjects[name]) {return false}
    activeCO = name;
    const CO = commandObjects[name];
    consolename.textContent = CO.title;
    logger(`Ввімкнено ` + CO.title, 'success-message')
    return true}

function findCommand(input) {
    if (!activeCO) return null;
    const CO = commandObjects[activeCO];
    const lc = ('' + input).trim().toLowerCase();
    for (const cmd of CO.commands) {
        for (const alias of cmd.aliases || []) {
            if (lc === alias.toLowerCase()) return cmd;
        }
    }
    return null}

function helpActive() {
    if (!activeCO) return [];
    const CO = commandObjects[activeCO];
    if (!CO) return [];
    const helpinfo = CO.commands.map(c => c.name + ' [' + (c.aliases || []).join(', ') + ']');
    if (helpinfo.length) {logger('Доступні команди:<br> ' + helpinfo.join('<br>') + `<br>Для активації команди введи один з її перелічених псевдонімів`, 'item')};
    }
    
function processCommand(cmd) {
    if (!cmd) return;
    logger('> ' + cmd, 'command');
    const found = findCommand(cmd);
    if (found && typeof found.fn === 'function') {
        try {
            found.fn(cmd);
        } catch (e) {
            logger('Помилка виконання команди: ' + e.message, 'error-message');
        }
        return;
    }
    logger('Команда ' + cmd + ' не доступна в поточному контексті або не розпізнана. Спробуйте help', 'error-message');}
    

function enterCommand() {
    const val = input.value.trim();
    if (val) processCommand(val);
    input.value = '';
    input.focus()}

window.createCO = createCO;
window.activateCO = activateCO;
window.processCommand = processCommand;
window.enterCommand = enterCommand;
window.logger = logger;
window.helpActive = helpActive;
