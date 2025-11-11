const nationObjects = {};
const mentalityInPlay = {};
let activeNO = null;
window.nationObjects = nationObjects;
window.mentalityInPlay = mentalityInPlay;
window.activeNO = activeNO;

function createNO (name, color, icon, desc, mentalities = [], pop, land) {
    nationObjects[name] = { name, color, icon, desc, mentalities, pop, land };
    return nationObjects[name];
};

window.createNO = createNO;