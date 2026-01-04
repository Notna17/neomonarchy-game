//Сценарії
const planetname = document.getElementById('planet');

function setup(data) {
    for (let m of data.mentality) {
        createM(m.name, m.desc, m.effect);
    }
    for (let n of data.nations) {
        createNO(n.name, n.color, n.icon, n.desc, n.mentality, n.pop, n.land);
    }
    createGMO();
    for (let ma of data.markets) {
        if (ma.nation !== undefined) {createNationalMO(ma.name, ma.nation, ma.flowToGlobal, ma.tradeLoss)}
        else {createMO(ma.name, ma.icon, ma.color, ma.members, ma.flowToGlobal, ma.tradeDisturb, ma.tradeLoss, ma.leader)}
    }
};

function colonySelect() {
    const colonyData = {
        mentality: [
            {name: 'Допитливість', desc: 'Базис людської натури', tag: 'Ядро',
                effect: {temper: {thinker: 30, explorer: 20}, exploringMult: 2, tradeDisturb: -0.1}},
            {name: 'Гарт', desc: 'Цей народ потребує лише мінімум для виживання і за потреби готовий жити без благ. Одиниця населення цієї нації виробляє одиницю праці та споживає одиницю їжі, води та житла', tag: 'Потреби',
                effect: {resoursePerPop: {food: -1, water: -1, habitat: -1, labor: 1}, supportLaw: {stratocracy: 10, organisation: -10}, temper: {officer: 25, champion: 15, explorer: 5}}},
            {name: 'Неомонархізм', desc: 'Ідеологія цієї нації, яка вірить у абсолютну владу Неомонарха', tag: 'Ідеологія',
                effect: {supportLaw: {onemanrule: 50, oligarchy: 20, election: -20}, temper: {narcissist: 25, plutocrat: 15, melancholic: 15, officer: 10}}},
            {name: 'Консюмеризм', desc: 'Ця нація звикла до переваг життя, які дають технології. Одиниця населення цієї нації виробляє одиницю праці та споживає одиницю їжі, води, житла, електрики та послуг', tag: 'Потреби',
                effect: {resoursePerPop: {food: -1, water: -1, habitat: -1, electricity: -1, service: -1, labor: 1}}},
        ],
        nations: [
            {name: 'Колоністи', color: '#b234b2ff', icon: '🔭', desc: 'Колоністи з Неомонархії, які заселили і бажають експлуатувати нову планету', mentality: ['Допитливість', 'Гарт', 'Неомонархізм'], pop: 20, land: 30},
        ],
        markets: [
            {name: 'Володіння Намісника', icon: '👑️', color: '#a3008bff', members: ['Колоністи'], flowToGlobal: 200, tradeDisturb: 0.1, tradeLoss: 0.03, leader: 'Лескоп'}
        ],
    };
    setup(colonyData);
    displayPNM();
    planetname.innerHTML = 'Колонія NMY';
    logger('Обрано початок у колонії NMY', 'success-message');
};

createCO('select-planet', 'Консоль', [
    { name: 'Запуск сценарію NMY', aliases: ['1', 'NMY', 'select 1', 'select NMY'], fn: colonySelect,},
    { name: 'Допомога', aliases: ['help', '?'], fn: helpActive},
]);

//Нації
function nationCOpop() {
    if (!activeNO) {
        let total = 0;
        for (let n of Object.values(nationObjects)) {
            total += n.pop
        };
        logger(`Всього на планеті проживає ${total} одиниць населення`, 'success-message');
    } else {
        let n = activeNO;
        logger(`Чисельність нації <span style="color:${n.color};">"${n.name}"</span> складає ${n.pop} одиниць населення`, 'success-message')
    }
};

function nationCOland() {
    if (!activeNO) {
        let total = 0;
        for (let n of Object.values(nationObjects)) {
            total += n.land
        };
        logger(`На планеті привласнено ${total} одиниць придатної площі`, 'success-message');
    } else {
        let n = activeNO;
        logger(`Нації <span style="color:${n.color};">"${n.name}"</span> належить ${n.land} одиниць придатної площі`, 'success-message')
    }
};

function nationCOmentality() {
    if (!activeNO) {logger('Обери націю для перегляду її менталітету, натиснувши на неї', 'error-message')}
    else {
        let n = activeNO;
        let str = '';
        logger(`Менталітет нації <span style="color:${n.color};">"${n.name}"</span>`, 'success-message');
        for (let m of n.mentality) {str += `${m}: ` + mentalityInPlay[m].desc + `<br>`, 'item'};
        logger(str, 'item');
    }
};



createCO('nation', 'Консоль: нації', [
    { name: 'Перегляд менталітету', aliases: ['m', 'mental', `mentality`], fn: nationCOmentality},
    { name: 'Перегляд населення', aliases: ['pop', 'population'], fn: nationCOpop},
    { name: 'Перегляд земель', aliases: ['land'], fn: nationCOland},
    { name: 'Статистика планети', aliases: ['p', 'planet'], fn: () => {activeNO = null; logger('Статистика тепер буде про всю планету. Для вибору конкретної нації натисни на неї', 'success-message')}},
    { name: 'Меню торгівлі', aliases: ['trade', 'menu trade', 'menu t'], fn: displayTM},
    { name: 'Допомога', aliases: ['help', 'h', '?'], fn: helpActive},
]);

//Ринки




createCO('trade', 'Консоль: торгівля', [
    { name: 'Меню націй', aliases: ['nations', 'menu nations', 'menu n'], fn: displayPNM},
    { name: 'Допомога', aliases: ['help', 'h', '?'], fn: helpActive},
]);

//Старт гри
activateCO('select-planet');
logger('Ви запустили Неомонархію. Оберіть один з доступних сценаріїв', 'item');
logger('1. <b>Колонія NMY</b>. Після тривалої гібернації на колонізаторському човні, група поселенців з Неомонархії почала розроблювати землі нової планети під строгим управлінням Намісника Неомонархії. Тобі вирішувати, чи віддалена земля перевинайде для себе демократію, чи залишить режим заради економічного процвітання, чи будь-який інший спосіб утворення її майбутнього)', 'nmy-message')
