// Ментальність і темперамент
const mentalityInPlay = {};
window.mentalityInPlay = mentalityInPlay;

const temperamentInPlay = {};
window.temperamentInPlay = temperamentInPlay;

// Нації
const nationObjects = {};
let activeNO = null;
window.nationObjects = nationObjects;
window.activeNO = activeNO;

function createNO (name, color, icon, desc, mentality = [], pop, land) {
    nationObjects[name] = { name, color, icon, desc, mentality, pop, land };
    return nationObjects[name];
};

window.createNO = createNO;

// Ринки