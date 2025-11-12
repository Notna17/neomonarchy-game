function clearMenuRoots() {
    const root = document.getElementById('menu-root');
    const actions = document.getElementById('menu-actions-root');
    if (root) root.innerHTML = '';
    if (actions) actions.innerHTML = ''}

function displayMenu(menuItems = [], actions = []) {
    // menuItems: [{icon, color, name, desc, onClick}]
    // actions: [{label, command}]
    clearMenuRoots();
    const root = document.getElementById('menu-root');
    const actionsRoot = document.getElementById('menu-actions-root');
    if (!root) return;

    const grid = document.createElement('div');
    grid.className = 'menu-grid';
    for (const item of menuItems) {
        const it = document.createElement('div');
        it.className = 'menu-item';
        if (item.color !== 'default') {it.style.backgroundColor = item.color};
        const icon = document.createElement('div');
        icon.className = 'menu-icon';
        icon.innerHTML = item.icon;
        const name = document.createElement('div');
        name.className = 'menu-name';
        name.innerHTML = item.name;
        const desc = document.createElement('div');
        desc.className = 'menu-desc';
        desc.innerHTML = item.desc;
        it.appendChild(icon);
        it.appendChild(name);
        it.appendChild(desc);
        it.style.cursor = 'pointer';
        it.addEventListener('click', () => {
            if (typeof item.onClick === 'function') item.onClick(item);
        });
        grid.appendChild(it);
    }
    root.appendChild(grid);

    if (actionsRoot && actions.length) {
        const actWrap = document.createElement('div');
        actWrap.className = 'menu-actions';
        for (const a of actions) {
            const b = document.createElement('button');
            b.className = 'btn';
            b.textContent = a.label;
            b.addEventListener('click', () => {
                if (a.command) processCommand(a.command);
            });
            actWrap.appendChild(b);
        }
        actionsRoot.appendChild(actWrap);
    }
}

function displayPNM() {
    const PNMactions = [
    {label: 'Менталітет', command: 'mental'},
    {label: 'Загальна статистика', command: 'planet'},
    {label: 'Ринки >', command: 'economy'},
    {label: 'Допомога', command: 'help'},
    ];
    const PNMitems = [];
    for (const n of Object.values(nationObjects)) {PNMitems.push({
            icon: n.icon,
            color: n.color,
            name: n.name,
            desc: n.desc + `. <br>Чисельність у ${n.pop} одиниць населення. <br>Володіють землею у розмірі ${n.land} одиниць.`,
            onClick: () => {activeNO = n; logger(`Статистика тепер буде про націю <span style="color:${n.color};">"${n.name}"</span>`, 'success-message')},
        })};
    displayMenu(PNMitems, PNMactions);
    activateCO('nation');
}

window.displayPNM = displayPNM;