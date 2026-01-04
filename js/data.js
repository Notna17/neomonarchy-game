// Ментальність і темперамент
const mentalityInPlay = {};
window.mentalityInPlay = mentalityInPlay;

function createM (name, desc, tag, effect) {mentalityInPlay[name] = { desc, tag,  effect }};
window.createM = createM;

const temperamentInPlay = {};
window.temperamentInPlay = temperamentInPlay;

// Нації
const nationObjects = {};
let activeNO = null;
window.nationObjects = nationObjects;
window.activeNO = activeNO;

function createNO (name, color, icon, desc, mentality = [], pop, land) {nationObjects[name] = { name, color, icon, desc, mentality, pop, land }};

window.createNO = createNO;

// Ринки
const marketObjects = {};
let activeMO = null;
window.marketObjects = marketObjects;
window.activeMO = activeMO;

function createMO (name, icon, color, members, flowToGlobal, tradeDisturb, tradeLoss, leader) {marketObjects[name] = { name, icon, color, members, flowToGlobal, tradeDisturb, tradeLoss, leader }};
function createNationalMO (name, nation, baseFlowToGlobal, tradeLoss) {
    const icon = nationObjects[nation].icon;
    const color = nationObjects[nation].color;
    let flowToGlobal = baseFlowToGlobal;
    let tradeDisturb = 0;
    const nm = nationObjects[nation].mentality;
    for (let m in nm) {
        const effect = mentalityInPlay[m].effect
        tradeDisturb += effect.tradeDisturb; 
    }
    if (tradeDisturb < 0) {tradeDisturb = 0}
    for (let b of Object.values({})) {
        const o = b.owner
        if (o = nation || {}[o].nation === nation) {flowToGlobal += b.output.logistic}
    }
    createMO(name, icon, color, [nation], flowToGlobal, tradeDisturb, tradeLoss, nation);
};
function createGMO () {createMO('Планетарний ринок', '💱️', '#b69620', [], Infinity, 0, 0.01, null)};
window.createMO = createMO;
window.createGMO = createGMO;
window.createNationalMO = createNationalMO;