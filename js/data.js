// Ментальність і темперамент
const mentalityInPlay = {};
window.mentalityInPlay = mentalityInPlay;

function createM (name, desc, effect) {mentalityInPlay[name] = { desc,  effect }};
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