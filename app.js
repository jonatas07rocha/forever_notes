// --- CONSTANTES ---
const STORAGE_KEY = 'forever_v3_data';
const PREFS_KEY = 'forever_v3_prefs';

const ENTRY_TYPES = {
    note: { id: 'note', label: 'Nota', icon: 'align-left', symbol: '—', color: 'text-stone-600', limit: null }, 
    task: { id: 'task', label: 'Tarefa', icon: 'check-square', symbol: '•', color: 'text-black', limit: 140 }, 
    event: { id: 'event', label: 'Evento', icon: 'calendar', symbol: '○', color: 'text-black', limit: 140 },
    reflection: { id: 'reflection', label: 'Reflexão', icon: 'moon', symbol: '>', color: 'text-black', limit: 280 }, 
    idea: { id: 'idea', label: 'Ideia', icon: 'lightbulb', symbol: '!', color: 'text-black', limit: 140 }, 
};

// --- ESTADO ---
let state = {
    entries: [],
    hubs: [],
    activeTab: 'home',
    
    // Navegação
    activeJournalPeriod: 'Todos', // 'Hoje', 'Todos', 'Futuro'
    journalDate: new Date(),
    
    // Contextos
    activeHubId: null, 
    activeTag: null,
    
    // Rastreamento
    tagUsage: {}, 
    
    // Edição
    editingEntryId: null, // ID da entrada que está sendo editada

    searchQuery: '',
    viewMode: 'visual', 
    calendarMonth: new Date(),
    
    // Inputs
    inputText: '',
    inputDate: null, 
    selectedType: 'task', 
    
    // Menus Flutuantes
    showSlashMenu: false, 
    showLinkMenu: false,
};

// --- INICIALIZAÇÃO ---
function init() {
    loadData();
    const prefs = JSON.parse(localStorage.getItem(PREFS_KEY) || '{}');
    if (prefs.viewMode) state.viewMode = prefs.viewMode;
    
    if (typeof state.journalDate === 'string') state.journalDate = new Date(state.journalDate);
    
    if (state.hubs.length === 0) {
        state.hubs = [
            { id: 1, name: "✱ Pessoal", icon: "user", count: 0 },
            { id: 2, name: "✱ Trabalho", icon: "briefcase", count: 0 }
        ];
    }
    render();
    
    // Adiciona listener de teclado para o Slash Command Global
    window.addEventListener('keydown', handleGlobalKeydown);
}

function loadData() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"entries":[], "hubs":[], "tagUsage":{}}');
    state.entries = data.entries || [];
    state.hubs = data.hubs || [];
    state.tagUsage = data.tagUsage || {}; 
    updateHubCounts();
}

function saveData() {
    updateHubCounts();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ 
        entries: state.entries, 
        hubs: state.hubs,
        tagUsage: state.tagUsage 
    }));
    localStorage.setItem(PREFS_KEY, JSON.stringify({ viewMode: state.viewMode }));
}

function updateHubCounts() {
    state.hubs.forEach(h => {
        h.count = state.entries.filter(e => e.hubId == h.id && !e.completed).length;
    });
}

// --- LÓGICA DE EDIÇÃO INLINE ---

function startEditEntry(id) {
    state.editingEntryId = id;
    render();
    
    // Foca na textarea e move o cursor para o final
    setTimeout(() => {
        const textarea = document.getElementById(`edit-content-${id}`);
        if(textarea) {
            textarea.focus();
            textarea.setSelectionRange(textarea.value.length, textarea.value.length);
        }
    }, 50);
}

function saveEditEntry(id, newContent) {
    const entry = state.entries.find(e => e.id === id);
    if (entry) {
        const oldContent = entry.content;
        entry.content = newContent.trim();
        state.editingEntryId = null; 
        
        // Remove tags antigas e boosa as novas
        const oldTags = extractTags(oldContent);
        const newTags = extractTags(entry.content);
        
        // Adiciona boost apenas para tags realmente novas ou ativas
        newTags.forEach(t => boostTagRelevance(t));

        saveData();
        render();
    }
}


// --- LÓGICA DE LINKS ---

function insertLink(text) {
    const input = document.getElementById('entry-input');
    if (!input) return;

    let current = state.inputText;
    if (current.endsWith('>>')) {
        state.inputText = current.slice(0, -2) + '>>' + text + ' ';
    } else if (current.endsWith('>> ')) {
        state.inputText = current + text + ' ';
    } else {
        state.inputText += `>>${text} `;
    }

    state.showLinkMenu = false;
    setTimeout(() => {
        const len = state.inputText.length;
        input.focus();
        input.setSelectionRange(len, len);
    }, 10);
    render();
}

function handleLinkClick(linkText) {
    // 1. Verifica se é um HUB
    const hub = state.hubs.find(h => h.name === linkText || h.name.replace('✱ ', '').trim() === linkText.trim());

    if (hub) {
        openHub(hub.id); 
        return;
    }

    // 2. Se não for Hub, executa uma BUSCA GLOBAL
    state.searchQuery = linkText;
    setActiveTab('home');
    
    showModal('Busca Rápida', `Filtrando itens relacionados a: "${linkText}"`);
}

function clearSearch() {
    state.searchQuery = '';
    setActiveTab('home');
}

// --- LÓGICA DE TAGS E COLEÇÕES ---

function extractTags(content) {
    const regex = /#[\w\u00C0-\u00FF]+/g; 
    return content.match(regex) || [];
}

function boostTagRelevance(tagName) {
    if (!state.tagUsage[tagName]) state.tagUsage[tagName] = 0;
    state.tagUsage[tagName]++;
    saveData();
}

function getUniqueTags() {
    const tags = {};
    state.entries.forEach(e => {
        const found = extractTags(e.content);
        found.forEach(tag => {
            if (!tags[tag]) tags[tag] = 0;
            if (!e.completed) tags[tag]++; 
        });
    });
    return Object.entries(tags)
        .map(([name, count]) => ({ name, count, usage: state.tagUsage[name] || 0 }))
        .sort((a,b) => {
            if (b.usage !== a.usage) return b.usage - a.usage;
            return b.count - a.count;
        });
}

function openCollection(tagName) {
    state.activeTag = tagName;
    boostTagRelevance(tagName); 
    setActiveTab('collections');
}

function closeCollection() {
    state.activeTag = null;
    render();
}

// --- LÓGICA DE HUBS ---

function createNewHub() {
    const name = prompt("Nome do novo Hub (ex: Estudos):");
    if (name && name.trim()) {
        const newHub = {
            id: Date.now(),
            name: `✱ ${name.trim().replace('✱', '').trim()}`,
            icon: 'hash', 
            count: 0
        };
        state.hubs.push(newHub);
        saveData();
        render();
    }
}

function openHub(hubId) {
    state.activeHubId = hubId;
    state.activeTag = null; 
    state.searchQuery = ''; 
    setActiveTab('hubs');
}

function closeHub() {
    state.activeHubId = null;
    render();
}

function deleteHub(hubId) {
    const hub = state.hubs.find(h => h.id == hubId);
    if (!hub) return;
    showModal("Excluir Hub?", `Deseja excluir "${hub.name}"?`, () => {
        state.hubs = state.hubs.filter(h => h.id != hubId);
        state.entries = state.entries.map(e => {
            if (e.hubId == hubId) return { ...e, hubId: null };
            return e;
        });
        state.activeHubId = null;
        saveData();
        render();
    });
}

// --- GESTÃO DE DATAS E ENTRADAS ---

function selectEntryType(typeId) {
    state.selectedType = typeId;
    state.showSlashMenu = false;
    
    if (state.inputText.startsWith('/')) {
        state.inputText = state.inputText.substring(1).trim();
    }
    
    render();
    setTimeout(() => {
        const input = document.getElementById('entry-input');
        if(input) {
            input.focus();
            const len = input.value.length;
            input.setSelectionRange(len, len);
        }
    }, 50);
}

function addNewEntry() {
    if (!state.inputText.trim()) return;

    const nlpResult = handleNaturalLanguageDate(state.inputText);
    let content = nlpResult.text;
    let type = state.selectedType;
    let targetDate = nlpResult.date;
    
    if (content.startsWith('/')) {
         content = content.replace(/^\/\w*\s?/, '');
    }

    const config = ENTRY_TYPES[type];
    if (config.limit && content.length > config.limit) {
        showModal('Texto muito longo', `Para o modo BuJo, ${config.label} deve ter no máximo 140 caracteres. Para textos longos, use o tipo "Nota".`);
        return;
    }

    let targetHubId = state.activeTab === 'hubs' ? state.activeHubId : (state.activeHubId || null);
    
    if (state.activeTab === 'collections' && state.activeTag) {
        if (!content.includes(state.activeTag)) {
            content += ` ${state.activeTag}`;
        }
    }
    
    const foundTags = extractTags(content);
    foundTags.forEach(t => boostTagRelevance(t));

    state.entries.unshift({
        id: Date.now(),
        type,
        content,
        completed: false,
        hubId: targetHubId,
        targetDate: targetDate, 
        recurring: nlpResult.recurring
    });

    state.inputText = '';
    state.inputDate = null; 
    state.showSlashMenu = false;
    state.showLinkMenu = false;
    saveData();
    
    const viewedDate = new Date(); // Usamos a data atual para comparação rápida.
    viewedDate.setHours(0,0,0,0);
    const addedDate = new Date(targetDate);
    addedDate.setHours(0,0,0,0);
    
    if (targetDate && addedDate.getTime() !== viewedDate.getTime() && state.activeTab !== 'home') {
        showModal('Item Agendado', `Item salvo em ${addedDate.toLocaleDateString('pt-BR')}.`);
    }

    render();
}

function toggleEntry(id) {
    const entry = state.entries.find(e => e.id === id);
    if (entry) {
        entry.completed = !entry.completed;
        if (entry.completed && entry.recurring === 'daily') {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            state.entries.unshift({
                ...entry,
                id: Date.now(),
                completed: false,
                targetDate: tomorrow.getTime()
            });
        }
        saveData();
        render();
    }
}

function deleteEntry(id) {
    showModal("Excluir item?", "Deseja remover este item permanentemente?", () => {
        state.entries = state.entries.filter(e => e.id !== id);
        saveData();
        render();
    });
}

// --- LÓGICA DO GLOBAL SLASH COMMAND ---

function handleGlobalKeydown(e) {
    if (e.key === '/') {
        // Ignora se já estamos em um campo de texto ativo (para não dar conflito com slash command local)
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
            return; 
        }
        e.preventDefault();
        openGlobalInput();
    }
}

function openGlobalInput() {
    state.inputText = '';
    state.inputDate = null;
    state.selectedType = 'task';
    state.showSlashMenu = false; 
    
    // Limpa a edição inline, caso esteja ativa
    state.editingEntryId = null; 

    const modal = document.getElementById('global-input-modal');
    // Verifica se o elemento existe (pois ele foi adicionado no HTML)
    if (!modal) {
        console.error("Global input modal not found. Ensure index.html is updated.");
        return;
    }
    
    modal.classList.remove('hidden');
    
    // Atualiza a UI do input global e foca
    renderGlobalInput();
    setupGlobalInputHandler();
    
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        const container = document.getElementById('global-input-container');
        if (container) container.classList.remove('scale-95');
        const input = document.getElementById('global-entry-input');
        if (input) input.focus();
    }, 10);
}

function closeGlobalInput() {
    const modal = document.getElementById('global-input-modal');
    if(!modal) return;
    
    modal.classList.add('opacity-0');
    const container = document.getElementById('global-input-container');
    if (container) container.classList.add('scale-95');

    setTimeout(() => {
        modal.classList.add('hidden');
    }, 200);
}

function renderGlobalInput() {
    const input = document.getElementById('global-entry-input');
    const menu = document.getElementById('global-slash-menu');
    const typeIcon = document.getElementById('global-type-icon');
    const typeLabel = document.getElementById('global-type-label');
    const charCountEl = document.getElementById('global-char-count');
    const dateBtn = document.getElementById('global-date-button');
    const datePicker = document.getElementById('global-date-picker-native');

    if (!input || !menu) return;
    
    const config = ENTRY_TYPES[state.selectedType];
    const charCount = state.inputText.length;
    const limit = config.limit;
    const isOver = limit && charCount > limit;

    // Atualiza o texto do input
    input.value = state.inputText;

    // Atualiza o contador de caracteres
    charCountEl.innerText = limit ? `${charCount}/${limit}` : charCount;
    charCountEl.classList.toggle('text-red-600', isOver);
    charCountEl.classList.toggle('font-bold', isOver);
    charCountEl.classList.toggle('hidden', !limit);
    
    // Atualiza tipo
    if (typeIcon) typeIcon.setAttribute('data-lucide', config.icon);
    if (typeLabel) typeLabel.innerText = config.label;
    
    // Atualiza menu
    const typeOptions = Object.values(ENTRY_TYPES).map(t => `<button onclick="selectGlobalEntryType('${t.id}')" class="w-full text-left flex items-center gap-3 p-2 hover:bg-stone-100 transition-colors ${state.selectedType === t.id ? 'bg-stone-50 font-bold' : ''}"><i data-lucide="${t.icon}" class="w-4 h-4 text-black"></i><span class="text-sm text-black">${t.label}</span></button>`).join('');
    menu.innerHTML = typeOptions;
    menu.classList.toggle('hidden', !state.showSlashMenu);
    
    // Atualiza Data Picker
    if (dateBtn && datePicker) {
        if (state.inputDate) {
            dateBtn.classList.add('text-black', 'font-bold');
            datePicker.value = new Date(state.inputDate).toISOString().split('T')[0];
        } else {
            dateBtn.classList.remove('text-black', 'font-bold');
            datePicker.value = '';
        }
    }
    
    lucide.createIcons(); // Re-renderiza ícones
}

function selectGlobalEntryType(typeId) {
    state.selectedType = typeId;
    state.showSlashMenu = false;
    
    // Limpa o prefixo '/' se existir
    if (state.inputText.startsWith('/')) {
        state.inputText = state.inputText.substring(1).trim();
    }
    
    renderGlobalInput();
    
    // Foca no input e reposiciona o cursor
    setTimeout(() => {
        const input = document.getElementById('global-entry-input');
        if(input) {
            input.focus();
            const len = input.value.length;
            input.setSelectionRange(len, len);
        }
    }, 50);
}

function addNewGlobalEntry() {
    if (!state.inputText.trim()) return;

    const nlpResult = handleNaturalLanguageDate(state.inputText);
    let content = nlpResult.text;
    let type = state.selectedType;
    let targetDate = nlpResult.date;
    
    const config = ENTRY_TYPES[type];
    if (config.limit && content.length > config.limit) {
        showModal('Texto muito longo', `Para o modo BuJo, ${config.label} deve ter no máximo ${config.limit} caracteres.`);
        return;
    }

    const foundTags = extractTags(content);
    foundTags.forEach(t => boostTagRelevance(t));

    state.entries.unshift({
        id: Date.now(),
        type,
        content,
        completed: false,
        hubId: null, // Global input não atribui Hub
        targetDate: targetDate, 
        recurring: nlpResult.recurring
    });

    closeGlobalInput();
    saveData();
    render(); 
    
    showModal('Item Salvo', `O item foi adicionado como "${config.label}".`);
}

function setupGlobalInputHandler() {
    const input = document.getElementById('global-entry-input');
    if(!input) return;
    
    input.value = state.inputText; // Usa o texto do estado
    
    input.onclick = () => {
        // Ao clicar, mostra o slash menu, se o texto estiver vazio ou começar com /
        if (!state.inputText.trim() || state.inputText.startsWith('/')) {
             state.showSlashMenu = true;
             renderGlobalInput();
        }
    };
    
    input.oninput = (e) => {
        let val = e.target.value;
        let menuStateChanged = false;
        
        // Slash Command Trigger (/)
        if (val.startsWith('/')) {
            if (!state.showSlashMenu) menuStateChanged = true;
            state.showSlashMenu = true;
        } else { 
            if(state.showSlashMenu) { 
                if (!val.trim()) {
                    menuStateChanged = true;
                    state.showSlashMenu = false; 
                }
            }
        }
        
        // Lógica de "✱" (prioridade)
        if (val.includes('**')) {
            const cursor = e.target.selectionStart;
            val = val.replace(/\*\*/g, '✱');
            input.value = val;
            if(cursor > 0) input.setSelectionRange(cursor - 1, cursor - 1);
        }
        
        state.inputText = val;
        
        if (menuStateChanged) renderGlobalInput();
        
        // Atualiza a contagem em tempo real (sem re-renderizar todo o modal)
        const config = ENTRY_TYPES[state.selectedType];
        const charCount = state.inputText.length;
        const limit = config.limit;
        const charCountEl = document.getElementById('global-char-count');
        
        if (charCountEl) {
            charCountEl.innerText = limit ? `${charCount}/${limit}` : charCount;
            charCountEl.classList.toggle('text-red-600', limit && charCount > limit);
            charCountEl.classList.toggle('font-bold', limit && charCount > limit);
        }

        // Hack para manter foco e posição
        setTimeout(() => {
            const len = input.value.length;
            input.focus();
            input.setSelectionRange(len, len);
        }, 0);
    };
    
    input.onkeydown = (e) => { 
        if(e.key === 'Enter') {
            e.preventDefault();
            addNewGlobalEntry();
        }
        if(e.key === 'Escape') {
            closeGlobalInput();
        }
    };
}


// --- RENDER SYSTEM ---

function toggleViewMode() {
    state.viewMode = state.viewMode === 'visual' ? 'classic' : 'visual';
    saveData();
    render();
}

function render() {
    renderSidebar();
    const main = document.getElementById('main-container');
    
    if (state.searchQuery && state.activeTab === 'home') {
        main.innerHTML = getSearchResultsHTML();
    } else {
        switch(state.activeTab) {
            case 'home': main.innerHTML = getHomeHTML(); break;
            case 'journal': main.innerHTML = getJournalHTML(); setupJournalInput(); break;
            case 'hubs': main.innerHTML = getHubsHTML(); setupJournalInput(); break;
            case 'collections': main.innerHTML = getCollectionsHTML(); setupJournalInput(); break;
            case 'calendar': main.innerHTML = getCalendarHTML(); break; 
            case 'settings': main.innerHTML = getSettingsHTML(); break;
        }
    }
    
    lucide.createIcons();
}

function renderSidebar() {
    const menu = document.getElementById('nav-menu');
    const mobileMenu = document.getElementById('nav-menu-mobile');

    const items = [
        { id: 'home', icon: 'home', label: 'Home' },
        { id: 'journal', icon: 'book', label: 'Diário' },
        { id: 'hubs', icon: 'grid', label: 'Hubs' },
        { id: 'collections', icon: 'tags', label: 'Coleções' },
        { id: 'calendar', icon: 'calendar-days', label: 'Calendário' }, 
    ];
    
    const menuHTML = items.map(item => `
        <button onclick="setActiveTab('${item.id}')" 
            class="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium border-l-2 transition-all
            ${state.activeTab === item.id ? 'border-black bg-stone-100 text-black' : 'border-transparent text-stone-500 hover:text-black hover:bg-stone-50'}">
            <i data-lucide="${item.icon}" class="w-4 h-4"></i> ${item.label}
        </button>
    `).join('');

    if (menu) menu.innerHTML = menuHTML;
    if (mobileMenu) mobileMenu.innerHTML = menuHTML;
}

// --- VIEWS ---

function getHomeHTML() {
    const now = new Date();
    now.setHours(0,0,0,0);
    
    const upcomingEvents = state.entries
        .filter(e => e.type === 'event' && !e.completed)
        .filter(e => {
            const tDate = e.targetDate ? new Date(e.targetDate) : new Date(e.id);
            tDate.setHours(0,0,0,0);
            return tDate.getTime() >= now.getTime();
        })
        .sort((a,b) => (a.targetDate || a.id) - (b.targetDate || b.id));

    const nextEvent = upcomingEvents[0];
    const priorities = state.entries
        .filter(e => !e.completed && e.content.includes('✱'))
        .sort((a,b) => (b.targetDate || b.id) - (a.targetDate || a.id));
    
    return `
        <div class="space-y-8 fade-in">
            <header>
                <h1 class="text-3xl font-bold text-black">✱ Home</h1>
                <p class="text-stone-500 capitalize">${new Date().toLocaleDateString('pt-BR', {weekday: 'long', day:'numeric', month:'long'})}</p>
            </header>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div onclick="setActiveTab('calendar')" class="bg-stone-900 text-white p-5 border-2 border-black cursor-pointer hover:bg-black transition-colors relative overflow-hidden group">
                    <div class="flex items-center gap-2 mb-4 text-stone-400"><i data-lucide="calendar-days" class="w-4 h-4"></i> <span class="text-xs font-bold uppercase">Calendário</span></div>
                    <div class="text-4xl font-black mb-1">${new Date().getDate()}</div>
                    <div class="text-sm text-stone-400 uppercase tracking-widest">${new Date().toLocaleDateString('pt-BR', {month:'long'})}</div>
                    <i data-lucide="arrow-right" class="absolute bottom-5 right-5 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                </div>

                <div onclick="setActiveTab('journal'); state.activeJournalPeriod='Todos'; render();" class="bg-white border-2 border-stone-200 p-5 hover:border-black transition-all cursor-pointer">
                    <div class="flex items-center gap-2 mb-4 text-stone-500">
                        <i data-lucide="star" class="w-4 h-4 fill-black text-black"></i> 
                        <span class="text-xs font-bold uppercase text-black">Prioridades</span>
                    </div>
                    ${priorities.length > 0
                        ? `<div class="space-y-2">
                             ${priorities.slice(0, 3).map(e => `
                                <div class="text-sm font-medium truncate flex items-center gap-2">
                                    <span class="text-stone-400 text-[10px]">•</span> ${e.content.replace('✱', '').trim()}
                                </div>
                             `).join('')}
                             ${priorities.length > 3 ? `<div class="text-[10px] text-stone-400 font-bold mt-2">+${priorities.length - 3} itens</div>` : ''}
                           </div>`
                        : '<div class="text-stone-400 italic">Nenhuma prioridade ativa.</div>'
                    }
                </div>

                <div onclick="setActiveTab('journal'); state.activeJournalPeriod='Futuro'; render();" class="bg-white border-2 border-stone-200 p-5 hover:border-black transition-all cursor-pointer">
                    <div class="flex items-center gap-2 mb-4 text-stone-500"><i data-lucide="clock" class="w-4 h-4"></i> <span class="text-xs font-bold uppercase">Próximo Evento</span></div>
                    ${nextEvent 
                        ? `
                            <div class="font-bold text-lg leading-tight truncate">${nextEvent.content}</div>
                            <div class="text-xs text-black font-bold mt-2 bg-stone-100 inline-block px-2 py-1 border border-stone-200">
                                ${new Date(nextEvent.targetDate).toLocaleDateString('pt-BR', {day:'2-digit', month:'2-digit'})} 
                                ${new Date(nextEvent.targetDate).toDateString() === now.toDateString() ? '(Hoje)' : ''}
                            </div>
                          ` 
                        : '<div class="text-stone-400 italic">Nada agendado.</div>'
                    }
                </div>
            </div>
        </div>
    `;
}

function getSearchResultsHTML() {
    const list = getFilteredEntries(); 
    return `
        <div class="h-full flex flex-col fade-in">
             <div class="flex items-center justify-between border-b-2 border-stone-800 pb-4 mb-4">
                <div class="flex items-center gap-4">
                    <button onclick="clearSearch()" class="p-2 hover:bg-stone-100 rounded-full transition-colors">
                        <i data-lucide="arrow-left" class="w-6 h-6"></i>
                    </button>
                    <h2 class="text-2xl font-bold">Busca: "${state.searchQuery}"</h2>
                </div>
            </div>
            <div class="flex-1 overflow-y-auto pb-20 scrollbar-hide space-y-1">
                ${list.length > 0 ? list.map(entry => renderEntry(entry)).join('') : `<div class="text-center text-stone-400 mt-10 italic">Nenhum resultado encontrado para "${state.searchQuery}".</div>`}
            </div>
        </div>
    `;
}

function getHubsHTML() {
    if (state.activeHubId) return getCommonSingleViewHTML(state.hubs.find(h => h.id == state.activeHubId).name, closeHub, `Adicionar nota em ${state.hubs.find(h => h.id == state.activeHubId).name}...`, state.activeHubId);
    
    return `
        <div class="fade-in">
            <header class="flex justify-between items-center mb-8">
                <div><h1 class="text-3xl font-bold text-black">✱ Hubs</h1><p class="text-stone-500">Mapas de contexto (Nível 2).</p></div>
                <button onclick="createNewHub()" class="bg-black text-white px-4 py-2 text-xs font-bold border-2 border-black hover:bg-stone-800 transition-colors flex items-center gap-2"><i data-lucide="plus" class="w-4 h-4"></i> NOVO HUB</button>
            </header>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                ${state.hubs.map(hub => `
                    <div onclick="openHub(${hub.id})" class="bg-white border-2 border-stone-200 p-6 hover:border-black transition-all cursor-pointer group flex flex-col justify-between min-h-[140px]">
                        <div class="flex justify-between items-start">
                            <i data-lucide="${hub.icon}" class="w-8 h-8 text-stone-300 group-hover:text-black transition-colors"></i>
                            <span class="text-xs font-bold bg-stone-100 text-stone-600 px-2 py-1 rounded-full">${hub.count}</span>
                        </div>
                        <h3 class="font-bold text-lg truncate">${hub.name}</h3>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function getCollectionsHTML() {
    if (state.activeTag) return getCommonSingleViewHTML(state.activeTag, closeCollection, `Adicionar novo item em ${state.activeTag}...`);

    const tags = getUniqueTags(); 
    
    return `
        <div class="fade-in">
            <header class="mb-8">
                <h1 class="text-3xl font-bold text-black">✱ Coleções</h1>
                <p class="text-stone-500">Organizadas por frequência de uso.</p>
            </header>

            <div class="flex flex-wrap gap-3">
                ${tags.length > 0 
                    ? tags.map(t => `
                        <button onclick="openCollection('${t.name}')" class="bg-white border-2 border-stone-200 px-4 py-3 hover:border-black hover:bg-stone-50 transition-all flex items-center gap-3 group">
                            <span class="text-lg font-bold text-black">${t.name}</span>
                            <div class="flex flex-col items-end">
                                <span class="text-xs font-bold bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full group-hover:bg-black group-hover:text-white transition-colors">${t.count}</span>
                            </div>
                        </button>
                    `).join('')
                    : `<div class="w-full text-stone-400 italic border-2 border-dashed border-stone-200 p-8 text-center">Nenhuma coleção encontrada. Use <strong>#tags</strong> em suas notas para criar coleções automaticamente.</div>`
                }
            </div>
        </div>
    `;
}

function getSingleCollectionHTML(tagName) {
    return getCommonSingleViewHTML(tagName, closeCollection, `Adicionar novo item em ${tagName}...`);
}

function getSingleHubHTML(hubId) {
    const hub = state.hubs.find(h => h.id == hubId);
    if (!hub) { closeHub(); return ''; }
    return getCommonSingleViewHTML(hub.name, closeHub, `Adicionar nota em ${hub.name}...`, hubId);
}

function getCommonSingleViewHTML(title, closeFunc, placeholder, hubId = null) {
    const list = getFilteredEntries();
    const config = ENTRY_TYPES[state.selectedType];
    const charCount = state.inputText.length;
    const limit = config.limit;
    
    const typeOptions = Object.values(ENTRY_TYPES).map(t => `<button onclick="selectEntryType('${t.id}')" class="w-full text-left flex items-center gap-3 p-2 hover:bg-stone-100 transition-colors ${state.selectedType === t.id ? 'bg-stone-50 font-bold' : ''}"><i data-lucide="${t.icon}" class="w-4 h-4 text-black"></i><span class="text-sm text-black">${t.label}</span></button>`).join('');

    const linkOptions = state.hubs.map(h => `
        <button onclick="insertLink('${h.name}')" class="w-full text-left p-2 hover:bg-stone-100 transition-colors text-sm font-bold flex items-center gap-2">
            <i data-lucide="hash" class="w-3 h-3 text-stone-400"></i> ${h.name}
        </button>
    `).join('');

    return `
        <div class="h-full flex flex-col fade-in relative">
            <div class="flex items-center justify-between border-b-2 border-stone-800 pb-4 mb-4">
                <div class="flex items-center gap-4">
                    <button onclick="${closeFunc.name}()" class="p-2 hover:bg-stone-100 rounded-full transition-colors"><i data-lucide="arrow-left" class="w-6 h-6"></i></button>
                    <h2 class="text-2xl font-bold">${title}</h2>
                </div>
                ${hubId ? `<div class="flex items-center gap-2"><button onclick="deleteHub(${hubId})" class="p-2 text-stone-400 hover:text-red-600 transition-colors"><i data-lucide="trash-2" class="w-5 h-5"></i></button><button onclick="toggleViewMode()" class="p-2 rounded hover:bg-stone-100 transition-colors"><i data-lucide="${state.viewMode === 'visual' ? 'layout-list' : 'layout-template'}" class="w-5 h-5 text-stone-500 hover:text-black"></i></button></div>` : `<button onclick="toggleViewMode()" class="p-2 rounded hover:bg-stone-100 transition-colors"><i data-lucide="${state.viewMode === 'visual' ? 'layout-list' : 'layout-template'}" class="w-5 h-5 text-stone-500 hover:text-black"></i></button>`}
            </div>
            
            <div class="relative mb-6 z-20 group bg-stone-50 p-3 border border-stone-200 focus-within:border-black focus-within:shadow-lg transition-all flex items-start gap-3">
                <button onclick="state.showSlashMenu = !state.showSlashMenu; state.showLinkMenu = false; render()" class="flex-shrink-0 flex items-center gap-2 bg-white border border-stone-300 px-2 py-1.5 rounded-sm hover:border-black transition-colors"><i data-lucide="${config.icon}" class="w-4 h-4 text-black"></i><span class="text-xs font-bold text-black hidden sm:inline-block">${config.label}</span><i data-lucide="chevron-down" class="w-3 h-3 text-stone-400"></i></button>
                <div class="flex-1 relative">
                    <input type="text" id="entry-input" autocomplete="off" placeholder="${placeholder}" class="w-full bg-transparent text-sm outline-none font-medium placeholder:font-normal placeholder:text-stone-400 py-1.5">
                    ${limit ? `<div class="absolute right-0 top-1.5 text-[10px] font-mono">${charCount}/${limit}</div>` : ''}
                </div>
                ${state.showSlashMenu ? `<div class="absolute top-full left-0 mt-1 w-48 bg-white border-2 border-black shadow-xl z-50 fade-in py-1">${typeOptions}</div>` : ''}
                ${state.showLinkMenu ? `<div class="absolute top-full left-20 mt-1 w-48 bg-white border-2 border-black shadow-xl z-50 fade-in py-1">
                    <div class="px-2 py-1 text-[10px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100 mb-1">Linkar para...</div>
                    ${linkOptions}
                    <div class="px-2 py-1 text-[10px] text-stone-400 italic">Ou continue digitando para buscar...</div>
                </div>` : ''}
                <div class="relative flex-shrink-0"><input type="date" id="date-picker-native" class="absolute inset-0 opacity-0 cursor-pointer" onchange="state.inputDate = this.valueAsDate ? this.valueAsDate.getTime() : null; render()"><button class="p-1.5 hover:bg-stone-200 rounded text-stone-400 hover:text-black ${state.inputDate ? 'text-black font-bold' : ''}"><i data-lucide="calendar" class="w-4 h-4"></i></button></div>
            </div>
            <div class="flex-1 overflow-y-auto pb-20 scrollbar-hide space-y-1" onclick="if(state.showSlashMenu || state.showLinkMenu){state.showSlashMenu=false; state.showLinkMenu=false; render()}">
                ${list.length > 0 ? list.map(entry => renderEntry(entry)).join('') : `<div class="text-center text-stone-400 mt-10 italic">Nenhum item ainda.</div>`}
            </div>
        </div>
    `;
}

function getJournalHTML() {
    const list = getFilteredEntries();
    const config = ENTRY_TYPES[state.selectedType];
    const charCount = state.inputText.length;
    const limit = config.limit;
    const isOver = limit && charCount > limit;
    
    let lookBackHTML = '';
    
    const typeOptions = Object.values(ENTRY_TYPES).map(t => `<button onclick="selectEntryType('${t.id}')" class="w-full text-left flex items-center gap-3 p-2 hover:bg-stone-100 transition-colors ${state.selectedType === t.id ? 'bg-stone-50 font-bold' : ''}"><i data-lucide="${t.icon}" class="w-4 h-4 text-black"></i><span class="text-sm text-black">${t.label}</span></button>`).join('');
    
    const linkOptions = state.hubs.map(h => `
        <button onclick="insertLink('${h.name}')" class="w-full text-left p-2 hover:bg-stone-100 transition-colors text-sm font-bold flex items-center gap-2">
            <i data-lucide="hash" class="w-3 h-3 text-stone-400"></i> ${h.name}
        </button>
    `).join('');

    return `
        <div class="h-full flex flex-col fade-in relative">
            <div class="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-stone-800 pb-4 mb-4 gap-3">
                <div class="flex items-center gap-4">
                    <h2 class="text-2xl font-bold">✱ Diário</h2>
                    <button onclick="toggleViewMode()" class="p-2 rounded hover:bg-stone-100 transition-colors"><i data-lucide="${state.viewMode === 'visual' ? 'layout-list' : 'layout-template'}" class="w-5 h-5 text-stone-500 hover:text-black"></i></button>
                </div>
                
                <div class="flex gap-1 bg-stone-100 p-1 rounded-sm self-start md:self-auto">
                    ${['Todos', 'Hoje', 'Futuro'].map(p => `
                        <button onclick="state.activeJournalPeriod='${p}'; render()" 
                            class="px-3 py-1 text-xs font-bold transition-all ${state.activeJournalPeriod === p ? 'bg-black text-white' : 'text-stone-500 hover:text-black'}">
                            ${p}
                        </button>
                    `).join('')}
                </div>
            </div>
            ${lookBackHTML}
            <div class="relative mb-6 z-20 group bg-stone-50 p-3 border border-stone-200 focus-within:border-black focus-within:shadow-lg transition-all flex items-start gap-3">
                <button onclick="state.showSlashMenu = !state.showSlashMenu; state.showLinkMenu = false; render()" class="flex-shrink-0 flex items-center gap-2 bg-white border border-stone-300 px-2 py-1.5 rounded-sm hover:border-black transition-colors"><i data-lucide="${config.icon}" class="w-4 h-4 text-black"></i><span class="text-xs font-bold text-black hidden sm:inline-block">${config.label}</span><i data-lucide="chevron-down" class="w-3 h-3 text-stone-400"></i></button>
                <div class="flex-1 relative"><input type="text" id="entry-input" autocomplete="off" placeholder="O que está acontecendo agora? ('/' para opções, '>>' para links)" class="w-full bg-transparent text-sm outline-none font-medium placeholder:font-normal placeholder:text-stone-400 py-1.5">${limit ? `<div class="absolute right-0 top-1.5 text-[10px] font-mono ${isOver ? 'text-red-600 font-bold' : 'text-stone-300'}">${charCount}/${limit}</div>` : ''}</div>
                ${state.showSlashMenu ? `<div class="absolute top-full left-0 mt-1 w-48 bg-white border-2 border-black shadow-xl z-50 fade-in py-1">${typeOptions}</div>` : ''}
                ${state.showLinkMenu ? `<div class="absolute top-full left-20 mt-1 w-48 bg-white border-2 border-black shadow-xl z-50 fade-in py-1">
                    <div class="px-2 py-1 text-[10px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100 mb-1">Linkar para...</div>
                    ${linkOptions}
                    <div class="px-2 py-1 text-[10px] text-stone-400 italic">Ou continue digitando para buscar...</div>
                </div>` : ''}
                <div class="relative flex-shrink-0"><input type="date" id="date-picker-native" class="absolute inset-0 opacity-0 cursor-pointer" onchange="state.inputDate = this.valueAsDate ? this.valueAsDate.getTime() : null; render()"><button class="p-1.5 hover:bg-stone-200 rounded text-stone-400 hover:text-black ${state.inputDate ? 'text-black font-bold' : ''}"><i data-lucide="calendar" class="w-4 h-4"></i></button></div>
            </div>
            <div class="flex-1 overflow-y-auto pb-20 scrollbar-hide space-y-1" onclick="if(state.showSlashMenu || state.showLinkMenu){state.showSlashMenu=false; state.showLinkMenu=false; render()}">
                ${list.map(entry => renderEntry(entry)).join('')}
            </div>
        </div>
    `;
}


function renderEntry(entry) {
    // Se estivermos editando, retorna o campo de edição
    if (state.editingEntryId === entry.id) {
        return getEditEntryHTML(entry);
    }
    
    // Senão, renderiza o modo normal
    if (state.viewMode === 'classic') {
        return renderClassicEntry(entry);
    }
    return renderVisualEntry(entry);
}

function getEditEntryHTML(entry) {
    const config = ENTRY_TYPES[entry.type];
    const isClassic = state.viewMode === 'classic';
    
    return `
        <div class="p-3 bg-stone-50 border-2 border-black rounded shadow-md ${isClassic ? 'font-mono' : 'font-sans'}">
            <div class="text-[10px] font-bold uppercase text-stone-600 mb-1 flex items-center gap-2">
                 <i data-lucide="${config.icon}" class="w-3 h-3"></i> EDITANDO ${config.label}
            </div>
            <textarea 
                id="edit-content-${entry.id}" 
                class="w-full bg-white border border-stone-300 p-2 text-sm resize-none outline-none focus:border-black rounded-sm ${isClassic ? 'font-mono' : 'font-sans'}"
                rows="${Math.max(1, Math.ceil(entry.content.length / 80))}"
                onblur="saveEditEntry(${entry.id}, this.value)"
                onkeydown="if(event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); saveEditEntry(${entry.id}, this.value); } else if(event.key === 'Escape') { state.editingEntryId = null; render(); }"
            >${entry.content}</textarea>
            <button onclick="saveEditEntry(${entry.id}, document.getElementById('edit-content-${entry.id}').value)" class="mt-2 bg-black text-white px-3 py-1 text-xs font-bold rounded hover:bg-stone-800">
                Salvar (Enter)
            </button>
            <button onclick="state.editingEntryId = null; render()" class="mt-2 bg-white text-black px-3 py-1 text-xs font-bold rounded border border-stone-300 hover:bg-stone-100">
                Cancelar (Esc)
            </button>
        </div>
    `;
}

function formatContent(text) {
    // 0. Quebras de linha simples em <br> (para Notas)
    let formatted = text.replace(/\n/g, '<br>');
    
    // 1. Tags (#tag) -> Coleções
    formatted = formatted.replace(/(#[\w\u00C0-\u00FF]+)/g, '<button onclick="openCollection(\'$1\'); event.stopPropagation();" class="text-blue-600 hover:underline font-bold bg-blue-50 px-1 rounded mx-0.5">$1</button>');
    
    // 2. Links (>> Link) -> Hubs ou Busca 
    // Captura '>>' seguido por qualquer coisa até o fim da linha ou delimitador
    formatted = formatted.replace(/>>\s*([^\n#\r]+)/g, (match, p1) => {
        const linkText = p1.trim();
        // A chave aqui é exibir APENAS o texto do link (p1), sem o prefixo ">>".
        return `<button onclick="handleLinkClick('${linkText}'); event.stopPropagation();" class="text-purple-700 hover:underline font-bold bg-purple-50 px-1 rounded mx-0.5 border-b-2 border-purple-200">${linkText}</button>`;
    });

    // 3. Ênfase (Low-Code/Markdown Simplificado)
    
    // 3a. Negrito: Transforma **texto** ou __texto__ em <strong>
    formatted = formatted.replace(/\*\*(.+?)\*\*|__(.+?)__/g, '<strong>$1$2</strong>');
    
    // 3b. Itálico: Transforma *texto* ou _texto_ em <em>
    formatted = formatted.replace(/\*(.+?)\*|_(.+?)_/g, '<em>$1$2</em>');

    // 4. Listas (Low-Code/Markdown Simplificado)
    
    const listItemStyle = 'list-item list-disc ml-4 text-stone-900'; 
    
    // Substitui prefixos de lista após <br> (para itens subsequentes)
    formatted = formatted.replace(/<br>(\s*)[*-+]\s*(.+?)(?=<br>|$)/g, (match, p1, p2) => {
        return `<br><span class="${listItemStyle}">${p2}</span>`;
    });
    
    // Substitui prefixos de lista no início da string
    formatted = formatted.replace(/^(\s*)[*-+]\s*(.+?)(?=<br>|$)/g, `<span class="${listItemStyle}">$2</span>`);
    
    // 5. Títulos (Low-Code Simplificado)
    
    // Título 2: Transforma ## Título após <br>
    formatted = formatted.replace(/<br>(\s*)##\s*(.+?)(?=<br>|$)/g, '<br><h3 class="text-lg font-bold mt-3 mb-1">$2</h3>');
    // Título 2: Transforma ## Título no início da string
    formatted = formatted.replace(/^(\s*)##\s*(.+?)(?=<br>|$)/g, '<h3 class="text-lg font-bold mb-1">$2</h3>');
    

    return formatted;
}

function renderVisualEntry(entry) {
    const config = ENTRY_TYPES[entry.type];
    const dateDisplay = entry.targetDate ? new Date(entry.targetDate).toLocaleDateString('pt-BR', {day:'2-digit', month:'2-digit'}) : '';
    const isCompleted = entry.completed;
    const isPriority = entry.content.includes('✱');
    const contentHtml = formatContent(entry.content);

    return `
        <div class="flex items-start gap-3 p-3 bg-white border ${isPriority && !isCompleted ? 'border-l-4 border-l-black border-y-stone-100 border-r-stone-100' : 'border-stone-100'} hover:border-stone-400 group transition-all">
            <button onclick="toggleEntry(${entry.id})" class="${config.color} mt-0.5">
                <i data-lucide="${isCompleted && entry.type === 'task' ? 'check-square' : config.icon}" class="w-4 h-4 ${isCompleted ? 'opacity-30' : ''}"></i>
            </button>
            <div class="flex-1 min-w-0" onclick="startEditEntry(${entry.id})" id="entry-content-view-${entry.id}">
                <p class="text-sm ${isCompleted ? 'line-through text-stone-400' : 'text-stone-900'} leading-relaxed font-medium cursor-pointer">
                    ${contentHtml}
                    ${entry.recurring ? '<i data-lucide="repeat" class="w-3 h-3 inline text-stone-400 ml-1"></i>' : ''}
                </p>
                <div class="flex gap-3 mt-1">
                    <span class="text-[10px] text-stone-400 uppercase font-bold">${config.label}</span>
                    ${dateDisplay ? `<span class="text-[10px] bg-stone-100 text-stone-600 px-1 border border-stone-200">DATA: ${dateDisplay}</span>` : ''}
                    ${isPriority && !isCompleted ? '<span class="text-[10px] bg-black text-white px-1 font-bold">IMPORTANTE</span>' : ''}
                </div>
            </div>
            <button onclick="deleteEntry(${entry.id})" class="text-stone-300 hover:text-black opacity-0 group-hover:opacity-100 transition-opacity">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
        </div>
    `;
}

function renderClassicEntry(entry) {
    const config = ENTRY_TYPES[entry.type];
    const isCompleted = entry.completed;
    const isPriority = entry.content.includes('✱');
    const dateDisplay = entry.targetDate ? new Date(entry.targetDate).toLocaleDateString('pt-BR', {day:'2-digit', month:'2-digit'}) : '';
    const contentHtml = formatContent(entry.content);

    return `
        <div class="group flex items-baseline gap-2 py-1 px-1 hover:bg-stone-50 rounded -ml-1 transition-colors cursor-default">
            <button onclick="toggleEntry(${entry.id})" 
                class="font-mono font-bold w-5 text-center select-none ${isCompleted ? 'text-stone-300' : 'text-black hover:text-stone-600'}">
                ${isCompleted && entry.type === 'task' ? 'x' : config.symbol}
            </button>
            <div class="flex-1 min-w-0 font-mono text-sm leading-relaxed ${isCompleted ? 'line-through text-stone-400' : (isPriority ? 'text-black font-bold' : 'text-stone-800')} cursor-pointer" onclick="startEditEntry(${entry.id})" id="entry-content-view-${entry.id}">
                ${contentHtml}
                ${dateDisplay ? `<span class="text-[10px] text-stone-400 ml-2 select-none font-sans">(${dateDisplay})</span>` : ''}
            </div>
            <button onclick="deleteEntry(${entry.id})" class="text-stone-300 hover:text-black opacity-0 group-hover:opacity-100 transition-opacity">
                <i data-lucide="trash-2" class="w-3 h-3"></i>
            </button>
        </div>
    `;
}

function getCalendarHTML() {
    const month = state.calendarMonth;
    const year = month.getFullYear();
    const m = month.getMonth();
    
    const firstDay = new Date(year, m, 1);
    const lastDay = new Date(year, m + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay(); 
    
    let html = `
        <div class="fade-in h-full flex flex-col">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold capitalize">${month.toLocaleDateString('pt-BR', {month:'long', year:'numeric'})}</h2>
                <div class="flex gap-2">
                    <button onclick="changeMonth(-1)" class="p-2 border border-black hover:bg-stone-100"><i data-lucide="chevron-left" class="w-4 h-4"></i></button>
                    <button onclick="changeMonth(1)" class="p-2 border border-black hover:bg-stone-100"><i data-lucide="chevron-right" class="w-4 h-4"></i></button>
                </div>
            </div>
            
            <div class="grid grid-cols-7 gap-1 text-center font-bold text-xs text-stone-500 mb-2 uppercase">
                <div>Dom</div><div>Seg</div><div>Ter</div><div>Qua</div><div>Qui</div><div>Sex</div><div>Sáb</div>
            </div>
            
            <div class="calendar-grid grid grid-cols-7 flex-1 border-t border-l border-stone-200">
    `;

    for (let i = 0; i < startDayOfWeek; i++) {
        html += `<div class="bg-stone-50 border-r border-b border-stone-200"></div>`;
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const currentTs = new Date(year, m, d).setHours(0,0,0,0);
        const isToday = currentTs === new Date().setHours(0,0,0,0);
        
        const events = state.entries.filter(e => {
            const eDate = e.targetDate ? new Date(e.targetDate) : new Date(e.id);
            return eDate.setHours(0,0,0,0) === currentTs;
        });

        html += `
            <div class="calendar-day bg-white border-r border-b border-stone-200 p-2 min-h-[100px] hover:bg-stone-50 transition-colors cursor-pointer" onclick="openDayModal(${currentTs})">
                <div class="flex justify-between items-start">
                    <span class="text-sm font-bold ${isToday ? 'bg-black text-white w-6 h-6 flex items-center justify-center rounded-full' : 'text-stone-700'}">${d}</span>
                    ${events.length > 0 ? `<span class="text-[10px] font-bold text-stone-400">${events.length}</span>` : ''}
                </div>
                <div class="mt-2 space-y-1">
                    ${events.slice(0, 3).map(e => `
                        <div class="text-[10px] truncate px-1 py-0.5 ${e.completed ? 'line-through text-stone-300' : 'bg-stone-100 text-black'} rounded-sm border border-stone-100">
                           ${ENTRY_TYPES[e.type].symbol} ${e.content}
                        </div>
                    `).join('')}
                    ${events.length > 3 ? `<div class="text-[10px] text-stone-400 pl-1">+${events.length - 3} mais</div>` : ''}
                </div>
            </div>
        `;
    }

    html += `</div></div>`;
    return html;
}

function getSettingsHTML() {
    return `
        <div class="fade-in max-w-xl">
            <h2 class="text-2xl font-bold mb-6">Configurações</h2>
            <div class="bg-white border-2 border-stone-200 p-6 mb-4">
                <h3 class="font-bold mb-2">Backup & Dados</h3>
                <p class="text-sm text-stone-500 mb-4">Gerencie seus dados. Exporte para segurança ou restaure um arquivo anterior.</p>
                
                <div class="flex gap-2">
                    <button onclick="exportData()" class="flex items-center gap-2 bg-black text-white px-4 py-2 text-xs font-bold border-2 border-black hover:bg-stone-800 transition-colors">
                        <i data-lucide="download" class="w-4 h-4"></i> BACKUP
                    </button>

                    <button onclick="document.getElementById('import-file').click()" class="flex items-center gap-2 bg-white text-black px-4 py-2 text-xs font-bold border-2 border-stone-300 hover:border-black hover:bg-stone-50 transition-all">
                        <i data-lucide="upload" class="w-4 h-4"></i> RESTAURAR
                    </button>
                    
                    <input type="file" id="import-file" class="hidden" accept=".json" onchange="importData(this)">
                </div>
            </div>
        </div>
    `;
}

function importData(inputElement) {
    const file = inputElement.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.entries && Array.isArray(data.entries)) {
                showModal(
                    "Restaurar Backup?", 
                    "Atenção: Isso substituirá todos os dados atuais por este backup. Essa ação é irreversível.", 
                    () => {
                        state.entries = data.entries;
                        state.hubs = data.hubs || [];
                        state.tagUsage = data.tagUsage || {};
                        if (data.viewMode) state.viewMode = data.viewMode; 
                        
                        saveData(); 
                        render(); 
                        showModal('Sucesso', 'Backup restaurado com sucesso.');
                    }
                );
            } else {
                showModal('Erro', 'Arquivo de backup inválido ou corrompido.');
            }
        } catch (err) {
            console.error(err);
            showModal('Erro', 'Falha ao ler o arquivo JSON.');
        }
        inputElement.value = '';
    };
    reader.readAsText(file);
}

function getFilteredEntries() {
    let filtered = state.entries;
    const now = new Date(); 
    now.setHours(0,0,0,0);

    if (state.searchQuery) {
        return filtered.filter(e => e.content.toLowerCase().includes(state.searchQuery.toLowerCase()))
                       .sort((a,b) => (b.targetDate || b.id) - (a.targetDate || a.id));
    }

    if (state.activeTab === 'collections' && state.activeTag) {
        return filtered.filter(e => e.content.includes(state.activeTag))
                       .sort((a,b) => (b.targetDate || b.id) - (a.targetDate || a.id));
    }

    if (state.activeTab === 'hubs' && state.activeHubId) {
        return filtered.filter(e => e.hubId == state.activeHubId)
                       .sort((a,b) => (b.targetDate || b.id) - (a.targetDate || a.id));
    }
    
    if (state.activeTab === 'journal') {
        if (state.activeJournalPeriod === 'Hoje') {
            filtered = filtered.filter(e => {
                if (e.completed) return true; 
                const d = e.targetDate ? new Date(e.targetDate) : new Date(e.id);
                d.setHours(0,0,0,0);
                return d.getTime() <= now.getTime(); 
            });
        } else if (state.activeJournalPeriod === 'Futuro') {
            filtered = filtered.filter(e => {
                const d = e.targetDate ? new Date(e.targetDate) : new Date(e.id);
                d.setHours(0,0,0,0);
                return d.getTime() > now.getTime();
            });
        }
    }

    return filtered.sort((a,b) => (b.targetDate || b.id) - (a.targetDate || a.id));
}

function setActiveTab(tab) {
    state.activeTab = tab;
    state.editingEntryId = null; // Limpa qualquer edição ativa
    
    // Reseta filtros específicos
    if (tab !== 'hubs') state.activeHubId = null;
    if (tab !== 'collections') state.activeTag = null;
    
    // Limpa a busca ao sair da Home
    if (tab !== 'home') state.searchQuery = '';
    
    render();
}

function changeMonth(delta) {
    state.calendarMonth.setMonth(state.calendarMonth.getMonth() + delta);
    render();
}

function handleNaturalLanguageDate(text) {
    const lower = text.toLowerCase();
    const today = new Date();
    let targetDate = null;
    let cleanText = text;

    if (lower.includes('amanhã') || lower.includes('amanha')) {
        targetDate = new Date(today);
        targetDate.setDate(today.getDate() + 1);
        cleanText = text.replace(/amanhã|amanha/gi, '').trim();
    } else if (lower.includes('hoje')) {
        targetDate = new Date(today);
        cleanText = text.replace(/hoje/gi, '').trim();
    } else if (lower.includes('todos os dias') || lower.includes('todo dia')) {
        targetDate = new Date(today); 
        cleanText = text.replace(/todos os dias|todo dia/gi, '').trim();
        return { date: targetDate.getTime(), text: cleanText, recurring: 'daily' };
    } else {
        const regex = /@(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?/;
        const match = text.match(regex);
        if (match) {
            const year = match[3] ? (match[3].length === 2 ? '20'+match[3] : match[3]) : today.getFullYear();
            targetDate = new Date(year, parseInt(match[2])-1, parseInt(match[1]));
        }
    }

    if (state.inputDate) {
        targetDate = new Date(state.inputDate);
        targetDate.setMinutes(targetDate.getMinutes() + targetDate.getTimezoneOffset());
    }
    
    // Se a data for nula, assume HOJE.
    if (!targetDate) {
        targetDate = new Date();
    }

    return { 
        date: targetDate ? targetDate.getTime() : null, 
        text: cleanText,
        recurring: null 
    };
}

function setupJournalInput() {
    const input = document.getElementById('entry-input');
    if(!input) return;
    input.value = state.inputText;
    input.focus();
    
    input.onclick = () => {
        state.showSlashMenu = true;
        state.showLinkMenu = false;
        render();
        setTimeout(() => document.getElementById('entry-input').focus(), 10);
    };

    input.oninput = (e) => {
        let val = e.target.value;
        let menuStateChanged = false;
        
        // Slash Command Trigger (/)
        if (val.startsWith('/')) {
            if (!state.showSlashMenu || state.showLinkMenu) menuStateChanged = true;
            state.showSlashMenu = true; state.showLinkMenu = false;
        } 
        // Link Menu Trigger (>>)
        else if (val.endsWith('>>')) {
             if (!state.showLinkMenu || state.showSlashMenu) menuStateChanged = true;
             state.showLinkMenu = true; state.showSlashMenu = false;
        }
        else { 
            if(state.showSlashMenu || state.showLinkMenu) { 
                if (!val.trim() || (!val.endsWith('/') && !val.endsWith('>>'))) {
                    menuStateChanged = true;
                    state.showSlashMenu = false; 
                    state.showLinkMenu = false;
                }
            }
        }

        if (val.includes('**')) {
            const cursor = e.target.selectionStart;
            val = val.replace(/\*\*/g, '✱');
            input.value = val;
            if(cursor > 0) input.setSelectionRange(cursor - 1, cursor - 1);
        }
        state.inputText = val;
        
        if (menuStateChanged) render();

        // Hack para manter foco e posição
        setTimeout(() => {
            const len = input.value.length;
            input.focus();
            input.setSelectionRange(len, len);
        }, 0);
    };
    
    input.onkeydown = (e) => { 
        if(e.key === 'Enter') addNewEntry();
        if(e.key === 'Escape') {
            state.showSlashMenu = false;
            state.showLinkMenu = false;
            render();
        }
    };
}

function exportData() {
    const dataStr = JSON.stringify(state);
    const blob = new Blob([dataStr], {type: "application/json"});
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `forever_backup_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function showModal(title, msg, onConfirm = null) {
    const modal = document.getElementById('app-modal');
    const titleEl = document.getElementById('modal-title');
    const msgEl = document.getElementById('modal-message');
    const confirmBtn = document.getElementById('modal-confirm');
    const cancelBtn = document.getElementById('modal-cancel');

    if(!modal) return;

    titleEl.innerText = title;
    msgEl.innerText = msg;

    if (onConfirm) {
        cancelBtn.classList.remove('hidden');
        confirmBtn.innerText = 'Confirmar';
        confirmBtn.onclick = () => {
            onConfirm();
            closeModal();
        };
    } else {
        cancelBtn.classList.add('hidden'); 
        confirmBtn.innerText = 'OK';
        confirmBtn.onclick = closeModal;
    }

    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modal.querySelector('div[class*="transform"]').classList.add('scale-100');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('app-modal');
    if(!modal) return;
    
    modal.classList.add('opacity-0');
    modal.querySelector('div[class*="transform"]').classList.remove('scale-100');
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 200);
}

function openDayModal(timestamp) {
    showModal('Visualização de Dia', 'Zoom no dia será implementado na v3.1. Veja os itens no Diário > Todos.');
}

function toggleMobileNav() {
    const nav = document.getElementById('mobile-nav');
    nav.classList.toggle('-translate-x-full');
}

init();
