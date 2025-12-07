// --- CONSTANTES ---
const STORAGE_KEY = 'forever_v3_data';
const PREFS_KEY = 'forever_v3_prefs';

let currentLang = 'pt-BR'; 

const PERIOD_MAP = { // Mapeamento para chaves de tradução
    'Todos': 'filter_all',
    'Hoje': 'filter_today',
    'Futuro': 'filter_future',
    'Período': 'filter_period'
};

const TRANSLATIONS = {
    'pt-BR': {
        // Branding
        app_title: 'Forever ✱ Notes [PoC]',
        // Entry Types
        type_note: 'Nota',
        type_task: 'Tarefa',
        type_event: 'Evento',
        type_reflection: 'Reflexão',
        type_idea: 'Ideia',
        // Navigation
        nav_home: 'Home',
        nav_journal: 'Diário',
        nav_hubs: 'Hubs',
        nav_collections: 'Coleções',
        nav_settings: 'Configurações',
        nav_feedback: 'Feedback',
        // Journal Filters
        filter_all: 'Todos',
        filter_today: 'Hoje',
        filter_future: 'Futuro',
        filter_period: 'Período',
        // Home View
        home_today: 'Hoje',
        home_priorities: 'Prioridades',
        home_next_event: 'Próximo Evento',
        home_no_priority: 'Nenhuma prioridade ativa.',
        home_no_event: 'Nada agendado.',
        // Hubs View
        hubs_title: 'Hubs',
        hubs_subtitle: 'Mapas de contexto.',
        hubs_new_prompt: 'Nome do novo Hub (ex: Estudos):',
        hubs_new_button: 'NOVO HUB',
        modal_title_new_hub: 'Criar Novo Hub',
        placeholder_hub_name: 'Nome do Hub',
        button_create_hub: 'Criar Hub',
        // Collections View
        collections_title: 'Coleções',
        collections_subtitle: 'Organizadas por frequência.',
        collections_empty: 'Nenhuma coleção encontrada. Use #tags em suas notas para criar coleções automaticamente.',
        // Common UI
        ui_delete_confirm: 'Confirmar',
        ui_cancel: 'Cancelar',
        ui_save: 'Salvar',
        ui_add_note_placeholder: 'O que está acontecendo agora? (',
        ui_add_note_placeholder_end: ' para opções, >> para links)',
        ui_search_placeholder: 'Buscar itens',
        ui_date: 'DATA',
        ui_important: 'IMPORTANTE',
        ui_edit: 'EDITANDO',
        ui_view_mode_toggle: 'Alternar Visualização',
        ui_item_scheduled: 'Item Agendado',
        ui_item_saved: 'Item Salvo',
        ui_item_long: 'Texto muito longo',
        ui_delete_item_q: 'Excluir item?',
        ui_delete_hub_q: 'Excluir Hub?',
        ui_delete_item_msg: 'Deseja remover este item permanentemente?',
        ui_delete_hub_msg: 'Deseja excluir "',
        ui_delete_hub_msg_end: '"?',
        message_hub_created: 'Hub criado com sucesso!',
        // Settings
        settings_title: 'Configurações',
        settings_dark_mode: 'Modo Escuro (Dark Mode)',
        settings_dark_mode_desc: 'Alterne entre o tema claro e escuro da aplicação.',
        settings_backup_alert: 'Alerta de Backup ao Sair',
        settings_backup_alert_desc: 'Perguntar se deseja fazer backup antes de fechar a aba ou recarregar.',
        settings_backup_data: 'Backup & Dados',
        settings_backup_data_desc: 'Gerencie seus dados. Exporte para segurança ou restaure um arquivo anterior.',
        settings_backup_button: 'BACKUP',
        settings_restore_button: 'RESTAURAR',
        settings_restore_q: 'Restaurar Backup?',
        settings_restore_msg: 'Atenção: Isso substituirá todos os dados atuais por este backup. Essa ação é irreversível.',
        settings_restore_success: 'Backup restaurado com sucesso.',
        settings_restore_invalid: 'Arquivo de backup inválido ou corrompido.',
        settings_restore_fail: 'Falha ao ler o arquivo JSON.',
        settings_language: 'Idioma',
        settings_lang_pt: 'Português (Brasil)',
        settings_lang_en: 'Inglês',
        // Feedback
        feedback_send: 'Enviar Feedback',
        feedback_desc: 'Sua opinião é importante! Relate erros ou envie sugestões.',
        feedback_placeholder: 'Digite sua mensagem aqui...',
        feedback_empty: 'Por favor, digite alguma mensagem antes de enviar.',
    },
    'en-US': {
        // Branding
        app_title: 'Forever ✱ Notes [PoC]',
        // Entry Types
        type_note: 'Note',
        type_task: 'Task',
        type_event: 'Event',
        type_reflection: 'Reflection',
        type_idea: 'Idea',
        // Navigation
        nav_home: 'Home',
        nav_journal: 'Journal',
        nav_hubs: 'Hubs',
        nav_collections: 'Collections',
        nav_settings: 'Settings',
        nav_feedback: 'Feedback',
        // Journal Filters
        filter_all: 'All',
        filter_today: 'Today',
        filter_future: 'Future',
        filter_period: 'Period',
        // Home View
        home_today: 'Today',
        home_priorities: 'Priorities',
        home_next_event: 'Next Event',
        home_no_priority: 'No active priorities.',
        home_no_event: 'Nothing scheduled.',
        // Hubs View
        hubs_title: 'Hubs',
        hubs_subtitle: 'Context maps.',
        hubs_new_prompt: 'Name of the new Hub (e.g., Studies):',
        hubs_new_button: 'NEW HUB',
        modal_title_new_hub: 'Create New Hub',
        placeholder_hub_name: 'Hub Name',
        button_create_hub: 'Create Hub',
        // Collections View
        collections_title: 'Collections',
        collections_subtitle: 'Organized by frequency.',
        collections_empty: 'No collections found. Use #tags in your notes to create collections automatically.',
        // Common UI
        ui_delete_confirm: 'Confirm',
        ui_cancel: 'Cancel',
        ui_save: 'Save',
        ui_add_note_placeholder: "What's happening now? (",
        ui_add_note_placeholder_end: ' for options, >> for links)',
        ui_search_placeholder: 'Search items',
        ui_date: 'DATE',
        ui_important: 'IMPORTANT',
        ui_edit: 'EDITING',
        ui_view_mode_toggle: 'Toggle View',
        ui_item_scheduled: 'Item Scheduled',
        ui_item_saved: 'Item Saved',
        ui_item_long: 'Text too long',
        ui_delete_item_q: 'Delete item?',
        ui_delete_hub_q: 'Delete Hub?',
        ui_delete_item_msg: 'Do you want to permanently remove this item?',
        ui_delete_hub_msg: 'Do you want to delete "',
        ui_delete_hub_msg_end: '"?',
        message_hub_created: 'Hub created successfully!',
        // Settings
        settings_title: 'Settings',
        settings_dark_mode: 'Dark Mode',
        settings_dark_mode_desc: 'Toggle between light and dark theme.',
        settings_backup_alert: 'Unload Backup Alert',
        settings_backup_alert_desc: 'Ask if you want to backup before closing the tab or reloading.',
        settings_backup_data: 'Backup & Data',
        settings_backup_data_desc: 'Manage your data. Export for security or restore a previous file.',
        settings_backup_button: 'BACKUP',
        settings_restore_button: 'RESTORE',
        settings_restore_q: 'Restore Backup?',
        settings_restore_msg: 'Warning: This will overwrite all current data with this backup. This action is irreversible.',
        settings_restore_success: 'Backup restored successfully.',
        settings_restore_invalid: 'Invalid or corrupt backup file.',
        settings_restore_fail: 'Failed to read the JSON file.',
        settings_language: 'Language',
        settings_lang_pt: 'Portuguese (Brazil)',
        settings_lang_en: 'English',
        // Feedback
        feedback_send: 'Send Feedback',
        feedback_desc: 'Your opinion is important! Report bugs or send suggestions.',
        feedback_placeholder: 'Type your message here...',
        feedback_empty: 'Please type a message before sending.',
    }
};

const T = (key, lang = currentLang) => {
    return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key] !== undefined) ? TRANSLATIONS[lang][key] : TRANSLATIONS['pt-BR'][key] || key;
};

const getPreferredLanguage = () => {
    // 1. Check saved preference
    const savedLang = state.prefs.lang;
    if (savedLang) return savedLang;
    
    // 2. Check browser language
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.toLowerCase().startsWith('pt')) return 'pt-BR';
    
    // 3. Default to English
    return 'en-US';
};

function setLanguage(lang) {
    currentLang = lang;
    state.prefs.lang = lang;
    saveData();
    render();
}

const ENTRY_TYPES = {
    note: { id: 'note', label: 'type_note', icon: 'align-left', symbol: '—', color: 'text-stone-600 dark:text-stone-400', limit: null }, 
    task: { id: 'task', label: 'type_task', icon: 'check-square', symbol: '•', color: 'text-black dark:text-white', limit: 140 }, 
    event: { id: 'event', label: 'type_event', icon: 'calendar', symbol: '○', color: 'text-black dark:text-white', limit: 140 },
    reflection: { id: 'reflection', label: 'type_reflection', icon: 'moon', symbol: '>', color: 'text-black dark:text-white', limit: 280 }, 
    idea: { id: 'idea', label: 'type_idea', icon: 'lightbulb', symbol: '!', color: 'text-black dark:text-white', limit: 140 }, 
};

// --- ESTADO ---
let state = {
    entries: [],
    hubs: [],
    activeTab: 'home',
    
    // Navegação
    activeJournalPeriod: 'Todos',
    journalDate: new Date(),
    
    // Filtro de Período Personalizado
    filterStartDate: new Date().toISOString().split('T')[0], 
    filterEndDate: new Date().toISOString().split('T')[0],   
    
    // Contextos
    activeHubId: null, 
    activeTag: null,
    
    // Rastreamento
    tagUsage: {}, 
    
    // Edição
    editingEntryId: null,

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

    // PREFERÊNCIAS
    prefs: {
        showAlertOnUnload: true,
        theme: 'light',
        lang: null
    }
};

// --- INICIALIZAÇÃO ---
function init() {
    loadData();
    const prefs = JSON.parse(localStorage.getItem(PREFS_KEY) || '{}');
    
    state.prefs.viewMode = prefs.viewMode || 'visual';
    state.prefs.showAlertOnUnload = prefs.showAlertOnUnload !== undefined ? prefs.showAlertOnUnload : true;
    state.prefs.theme = prefs.theme || 'light'; 
    state.prefs.lang = prefs.lang || getPreferredLanguage();
    currentLang = state.prefs.lang;
    
    applyTheme(state.prefs.theme); 
    
    if (typeof state.journalDate === 'string') state.journalDate = new Date(state.journalDate);
    
    if (state.hubs.length === 0) {
        state.hubs = [
            { id: 1, name: "✱ Pessoal", icon: "user", count: 0 },
            { id: 2, name: "✱ Trabalho", icon: "briefcase", count: 0 }
        ];
    }
    render();
    
    window.addEventListener('keydown', handleGlobalKeydown);
    setupUnloadAlert();
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
    localStorage.setItem(PREFS_KEY, JSON.stringify(state.prefs));
}

function updateHubCounts() {
    state.hubs.forEach(h => {
        h.count = state.entries.filter(e => e.hubId == h.id && !e.completed).length;
    });
}

// --- LÓGICA DE TEMA ---
function applyTheme(theme) {
    const body = document.body;
    body.classList.remove('bg-white', 'text-stone-900', 'bg-stone-900', 'text-stone-100');
    
    if (theme === 'dark') {
        body.classList.add('bg-stone-900', 'text-stone-100');
        body.classList.add('dark');
    } else {
        body.classList.add('bg-white', 'text-stone-900');
        body.classList.remove('dark');
    }
}

function toggleTheme() {
    const newTheme = state.prefs.theme === 'light' ? 'dark' : 'light';
    state.prefs.theme = newTheme;
    applyTheme(newTheme);
    saveData();
    render(); 
}

// --- LÓGICA DE EDIÇÃO INLINE ---

function startEditEntry(id) {
    state.editingEntryId = id;
    render();
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
        // Valida o conteúdo ao salvar a edição
        if (!validateEntryContent(newContent, entry.type)) {
             // Se a validação falhar, não salva e re-renderiza para que a edição continue
             startEditEntry(id);
             return;
        }

        const oldContent = entry.content;
        entry.content = newContent.trim();
        state.editingEntryId = null; 
        
        const oldTags = extractTags(oldContent);
        const newTags = extractTags(entry.content);
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
    const hub = state.hubs.find(h => h.name === linkText || h.name.replace('✱ ', '').trim() === linkText.trim());

    if (hub) {
        openHub(hub.id); 
        return;
    }
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

// FIX C: Substitui o prompt() por um modal customizado
function showNewHubModal() {
    const content = `
        <input type="text" id="hub-name-input" placeholder="${T('placeholder_hub_name')}" class="modal-input w-full p-2 border border-stone-300 rounded focus:border-black outline-none dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:focus:border-white">
    `;
    showModal(
        T('modal_title_new_hub'), 
        content, 
        T('button_create_hub'), 
        handleCreateHub
    );
    // Adiciona foco ao input assim que o modal for renderizado
    setTimeout(() => {
        const input = document.getElementById('hub-name-input');
        if (input) input.focus();
    }, 150);
}

function handleCreateHub() {
    const hubName = document.getElementById('hub-name-input')?.value.trim();
    if (hubName && hubName.trim()) {
        const newHub = {
            id: Date.now(),
            name: `✱ ${hubName.replace('✱', '').trim()}`,
            icon: 'hash', 
            count: 0
        };
        state.hubs.push(newHub);
        saveData();
        render();
        // showModal(T('ui_item_saved'), T('message_hub_created')); // Feedback após fechar o modal principal
    } else {
        // Não é necessário fechar o modal, apenas mostrar erro
        showModal(T('ui_delete_confirm'), T('placeholder_hub_name') + " não pode estar vazio.");
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
    showModal(T('ui_delete_hub_q'), `${T('ui_delete_hub_msg')}${hub.name}${T('ui_delete_hub_msg_end')}`, T('ui_delete_confirm'), () => {
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

// --- FUNÇÃO CONSOLIDADA DE VALIDAÇÃO DE CONTEÚDO (Novo) ---

function validateEntryContent(content, type) {
    const config = ENTRY_TYPES[type];
    if (config.limit && content.length > config.limit) {
        showModal(
            T('ui_item_long'), 
            `${T('ui_item_long')} ${T(config.label)} ${T('pt-BR') === currentLang ? 'deve ter no máximo' : 'must have a maximum of'} ${config.limit} ${T('pt-BR') === currentLang ? 'caracteres. Para textos longos, use o tipo' : 'characters. For long texts, use the type'} "${T('type_note')}".`
        );
        return false;
    }
    return true;
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

    // 🚨 USO DA FUNÇÃO CONSOLIDADA 🚨
    if (!validateEntryContent(content, type)) {
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
    
    const viewedDate = new Date();
    viewedDate.setHours(0,0,0,0);
    const addedDate = new Date(targetDate);
    addedDate.setHours(0,0,0,0);
    
    if (targetDate && addedDate.getTime() !== viewedDate.getTime() && state.activeTab !== 'home') {
        showModal(T('ui_item_scheduled'), `${T('ui_item_scheduled')} em ${addedDate.toLocaleDateString(currentLang)}.`);
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
    showModal(T('ui_delete_item_q'), T('ui_delete_item_msg'), T('ui_delete_confirm'), () => {
        state.entries = state.entries.filter(e => e.id !== id);
        saveData();
        render();
    });
}

// --- LÓGICA DO GLOBAL SLASH COMMAND ---

function handleGlobalKeydown(e) {
    if (e.key === '/') {
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
    
    state.editingEntryId = null; 

    const modal = document.getElementById('global-input-modal');
    if (!modal) {
        console.error("Global input modal not found.");
        return;
    }
    
    modal.classList.remove('hidden');
    
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

    input.value = state.inputText;

    charCountEl.innerText = limit ? `${charCount}/${limit}` : charCount;
    charCountEl.classList.toggle('text-red-600', isOver);
    charCountEl.classList.toggle('font-bold', isOver);
    charCountEl.classList.toggle('hidden', !limit);
    
    if (typeIcon) typeIcon.setAttribute('data-lucide', config.icon);
    if (typeLabel) typeLabel.innerText = T(config.label);
    
    const typeOptions = Object.values(ENTRY_TYPES).map(t => `<button onclick="selectGlobalEntryType('${t.id}')" class="w-full text-left flex items-center gap-3 p-2 hover:bg-stone-100 transition-colors dark:hover:bg-stone-700 ${state.selectedType === t.id ? 'bg-stone-50 font-bold dark:bg-stone-600' : ''}"><i data-lucide="${t.icon}" class="w-4 h-4 text-black dark:text-white"></i><span class="text-sm text-black dark:text-white">${T(t.label)}</span></button>`).join('');
    menu.innerHTML = typeOptions;
    menu.classList.toggle('hidden', !state.showSlashMenu);
    
    if (dateBtn && datePicker) {
        if (state.inputDate) {
            dateBtn.classList.add('text-black', 'font-bold', 'dark:text-white');
            datePicker.value = new Date(state.inputDate).toISOString().split('T')[0];
        } else {
            dateBtn.classList.remove('text-black', 'font-bold', 'dark:text-white');
            datePicker.value = '';
        }
    }
    
    if (input.tagName === 'TEXTAREA') {
        input.style.height = 'auto';
        input.style.height = (input.scrollHeight) + 'px';
    }
    
    lucide.createIcons();
}

function selectGlobalEntryType(typeId) {
    state.selectedType = typeId;
    state.showSlashMenu = false;
    
    if (state.inputText.startsWith('/')) {
        state.inputText = state.inputText.substring(1).trim();
    }
    
    renderGlobalInput();
    
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
    
    // 🚨 USO DA FUNÇÃO CONSOLIDADA 🚨
    if (!validateEntryContent(content, type)) {
        return;
    }

    const foundTags = extractTags(content);
    foundTags.forEach(t => boostTagRelevance(t));

    state.entries.unshift({
        id: Date.now(),
        type,
        content,
        completed: false,
        hubId: null, 
        targetDate: targetDate, 
        recurring: nlpResult.recurring
    });

    closeGlobalInput();
    saveData();
    render(); 
    
    const config = ENTRY_TYPES[type];
    showModal(T('ui_item_saved'), `${T('ui_item_saved')} como "${T(config.label)}".`);
}

function setupGlobalInputHandler() {
    const input = document.getElementById('global-entry-input');
    if(!input) return;
    
    input.value = state.inputText;
    
    input.oninput = (e) => {
        let val = e.target.value;
        let menuStateChanged = false;
        
        e.target.style.height = 'auto';
        e.target.style.height = (e.target.scrollHeight) + 'px';

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

        if (val.includes('**')) {
            const cursor = e.target.selectionStart;
            val = val.replace(/\*\*/g, '✱');
            input.value = val;
            if(cursor > 0) input.setSelectionRange(cursor - 1, cursor - 1);
        }
        
        state.inputText = val;
        
        if (menuStateChanged) renderGlobalInput();

        const config = ENTRY_TYPES[state.selectedType];
        const charCount = state.inputText.length;
        const limit = config.limit;
        const charCountEl = document.getElementById('global-char-count');
        
        if (charCountEl) {
            charCountEl.innerText = limit ? `${charCount}/${limit}` : charCount;
            charCountEl.classList.toggle('text-red-600', limit && charCount > limit);
            charCountEl.classList.toggle('font-bold', limit && charCount > limit);
        }

        setTimeout(() => {
            const len = input.value.length;
            input.focus();
            input.setSelectionRange(len, len);
        }, 0);
    };
    
    input.onkeydown = (e) => { 
        if(e.key === 'Enter' && !e.shiftKey) {
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
    
    // Atualiza strings estáticas após i18n
    document.querySelector('title').textContent = T('app_title');
    document.getElementById('app-branding').textContent = T('app_title');
    document.getElementById('mobile-branding').textContent = T('app_title');
    document.getElementById('mobile-settings-text').textContent = T('nav_settings');
    document.getElementById('mobile-feedback-text').textContent = T('nav_feedback');
    document.getElementById('nav-settings-text').textContent = T('nav_settings');
    document.getElementById('nav-feedback-text').textContent = T('nav_feedback');
    document.getElementById('feedback-title-text').textContent = T('feedback_send');
    document.getElementById('feedback-desc-text').textContent = T('feedback_desc');
    document.getElementById('feedback-text').placeholder = T('feedback_placeholder');
    document.getElementById('feedback-send-button-text').textContent = T('feedback_send');
    document.getElementById('feedback-cancel-button-text').textContent = T('ui_cancel');


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
        { id: 'home', icon: 'home', label: T('nav_home') },
        { id: 'journal', icon: 'book', label: T('nav_journal') },
        { id: 'hubs', icon: 'grid', label: T('nav_hubs') },
        { id: 'collections', icon: 'tags', label: T('nav_collections') },
    ];
    
    const menuHTML = items.map(item => `
        <button onclick="setActiveTab('${item.id}'); if(document.getElementById('mobile-nav').classList.contains('-translate-x-full') === false) toggleMobileNav()" 
            class="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium border-l-2 transition-all
            ${state.activeTab === item.id ? 'border-black bg-stone-100 text-black dark:bg-stone-800 dark:text-white dark:border-white' : 'border-transparent text-stone-500 hover:text-black hover:bg-stone-50 dark:text-stone-400 dark:hover:text-white dark:hover:bg-stone-800'}">
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
    
    const langOptions = { weekday: 'long', day:'numeric', month:'long' };
    
    return `
        <div class="space-y-8 fade-in">
            <header>
                <h1 class="text-3xl font-bold text-black dark:text-white">✱ ${T('nav_home')}</h1>
                <p class="text-stone-500 capitalize dark:text-stone-400">${new Date().toLocaleDateString(currentLang, langOptions)}</p>
            </header>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="bg-stone-900 text-white p-5 border-2 border-black cursor-default relative overflow-hidden group dark:bg-black dark:border-stone-700">
                    <div class="flex items-center gap-2 mb-4 text-stone-400"><i data-lucide="calendar-days" class="w-4 h-4"></i> <span class="text-xs font-bold uppercase">${T('home_today')}</span></div>
                    <div class="text-4xl font-black mb-1">${new Date().getDate()}</div>
                    <div class="text-sm text-stone-400 uppercase tracking-widest">${new Date().toLocaleDateString(currentLang, {month:'long'})}</div>
                </div>

                <div onclick="setActiveTab('journal'); state.activeJournalPeriod='Todos'; render();" class="bg-white border-2 border-stone-200 p-5 hover:border-black transition-all cursor-pointer dark:bg-stone-800 dark:border-stone-700 dark:hover:border-white">
                    <div class="flex items-center gap-2 mb-4 text-stone-500 dark:text-stone-400">
                        <i data-lucide="star" class="w-4 h-4 fill-black text-black dark:text-white dark:fill-white"></i> 
                        <span class="text-xs font-bold uppercase text-black dark:text-white">${T('home_priorities')}</span>
                    </div>
                    ${priorities.length > 0
                        ? `<div class="space-y-2">
                             ${priorities.slice(0, 3).map(e => `
                                <div class="text-sm font-medium truncate flex items-center gap-2 dark:text-stone-200">
                                    <span class="text-stone-400 text-[10px]">•</span> ${e.content.replace('✱', '').trim()}
                                </div>
                             `).join('')}
                             ${priorities.length > 3 ? `<div class="text-[10px] text-stone-400 font-bold mt-2">+${priorities.length - 3} ${currentLang === 'pt-BR' ? 'itens' : 'items'}</div>` : ''}
                           </div>`
                        : `<div class="text-stone-400 italic">${T('home_no_priority')}</div>`
                    }
                </div>

                <div onclick="setActiveTab('journal'); state.activeJournalPeriod='Futuro'; render();" class="bg-white border-2 border-stone-200 p-5 hover:border-black transition-all cursor-pointer dark:bg-stone-800 dark:border-stone-700 dark:hover:border-white">
                    <div class="flex items-center gap-2 mb-4 text-stone-500 dark:text-stone-400"><i data-lucide="clock" class="w-4 h-4"></i> <span class="text-xs font-bold uppercase">${T('home_next_event')}</span></div>
                    ${nextEvent 
                        ? `
                            <div class="font-bold text-lg leading-tight truncate dark:text-white">${nextEvent.content}</div>
                            <div class="text-xs text-black font-bold mt-2 bg-stone-100 inline-block px-2 py-1 border border-stone-200 dark:bg-stone-900 dark:text-stone-300 dark:border-stone-600">
                                ${new Date(nextEvent.targetDate).toLocaleDateString(currentLang, {day:'2-digit', month:'2-digit'})} 
                                ${new Date(nextEvent.targetDate).toDateString() === now.toDateString() ? `(${T('filter_today')})` : ''}
                            </div>
                          ` 
                        : `<div class="text-stone-400 italic">${T('home_no_event')}</div>`
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
             <div class="flex items-center justify-between border-b-2 border-stone-800 pb-4 mb-4 dark:border-stone-700">
                <div class="flex items-center gap-4">
                    <button onclick="clearSearch()" class="p-2 hover:bg-stone-100 rounded-full transition-colors dark:hover:bg-stone-800">
                        <i data-lucide="arrow-left" class="w-6 h-6 dark:text-white"></i>
                    </button>
                    <h2 class="text-2xl font-bold dark:text-white">${T('ui_search_placeholder')}: "${state.searchQuery}"</h2>
                </div>
            </div>
            <div class="flex-1 overflow-y-auto pb-20 scrollbar-hide space-y-1">
                ${list.length > 0 ? list.map(entry => renderEntry(entry)).join('') : `<div class="text-center text-stone-400 mt-10 italic">${currentLang === 'pt-BR' ? 'Nenhum resultado encontrado para' : 'No results found for'} "${state.searchQuery}".</div>`}
            </div>
        </div>
    `;
}

function getHubsHTML() {
    if (state.activeHubId) return getCommonSingleViewHTML(state.hubs.find(h => h.id == state.activeHubId).name, closeHub, `${currentLang === 'pt-BR' ? 'Adicionar nota em' : 'Add note to'} ${state.hubs.find(h => h.id == state.activeHubId).name}...`, state.activeHubId);
    
    return `
        <div class="fade-in">
            <header class="flex justify-between items-center mb-8">
                <div><h1 class="text-3xl font-bold text-black dark:text-white">✱ ${T('hubs_title')}</h1><p class="text-stone-500 dark:text-stone-400">${T('hubs_subtitle')}</p></div>
                <button onclick="showNewHubModal()" class="bg-black text-white px-4 py-2 text-xs font-bold border-2 border-black hover:bg-stone-800 transition-colors flex items-center gap-2 dark:bg-white dark:text-black dark:hover:bg-stone-200"><i data-lucide="plus" class="w-4 h-4"></i> ${T('hubs_new_button')}</button>
            </header>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                ${state.hubs.map(hub => `
                    <div onclick="openHub(${hub.id})" class="bg-white border-2 border-stone-200 p-6 hover:border-black transition-all cursor-pointer group flex flex-col justify-between min-h-[140px] dark:bg-stone-800 dark:border-stone-700 dark:hover:border-white">
                        <div class="flex justify-between items-start">
                            <i data-lucide="${hub.icon}" class="w-8 h-8 text-stone-300 group-hover:text-black transition-colors dark:group-hover:text-white"></i>
                            <span class="text-xs font-bold bg-stone-100 text-stone-600 px-2 py-1 rounded-full dark:bg-stone-900 dark:text-stone-300">${hub.count}</span>
                        </div>
                        <h3 class="font-bold text-lg truncate dark:text-white">${hub.name}</h3>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function getCollectionsHTML() {
    if (state.activeTag) return getCommonSingleViewHTML(state.activeTag, closeCollection, `${currentLang === 'pt-BR' ? 'Adicionar novo item em' : 'Add new item to'} ${state.activeTag}...`);

    const tags = getUniqueTags(); 
    
    return `
        <div class="fade-in">
            <header class="mb-8">
                <h1 class="text-3xl font-bold text-black dark:text-white">✱ ${T('collections_title')}</h1>
                <p class="text-stone-500 dark:text-stone-400">${T('collections_subtitle')}</p>
            </header>

            <div class="flex flex-wrap gap-3">
                ${tags.length > 0 
                    ? tags.map(t => `
                        <button onclick="openCollection('${t.name}')" class="bg-white border-2 border-stone-200 px-4 py-3 hover:border-black hover:bg-stone-50 transition-all flex items-center gap-3 group dark:bg-stone-800 dark:border-stone-700 dark:hover:border-white dark:hover:bg-stone-700">
                            <span class="text-lg font-bold text-black dark:text-white">${t.name}</span>
                            <div class="flex flex-col items-end">
                                <span class="text-xs font-bold bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full group-hover:bg-black group-hover:text-white transition-colors dark:bg-stone-900 dark:text-stone-400 dark:group-hover:bg-white dark:group-hover:text-black">${t.count}</span>
                            </div>
                        </button>
                    `).join('')
                    : `<div class="w-full text-stone-400 italic border-2 border-dashed border-stone-200 p-8 text-center dark:border-stone-700">${T('collections_empty')}</div>`
                }
            </div>
        </div>
    `;
}

function getCommonSingleViewHTML(title, closeFunc, placeholder, hubId = null) {
    const list = getFilteredEntries();
    const config = ENTRY_TYPES[state.selectedType];
    const charCount = state.inputText.length;
    const limit = config.limit;
    
    const typeOptions = Object.values(ENTRY_TYPES).map(t => `<button onclick="selectEntryType('${t.id}')" class="w-full text-left flex items-center gap-3 p-2 hover:bg-stone-100 transition-colors dark:hover:bg-stone-700 ${state.selectedType === t.id ? 'bg-stone-50 font-bold dark:bg-stone-600' : ''}"><i data-lucide="${t.icon}" class="w-4 h-4 text-black dark:text-white"></i><span class="text-sm text-black dark:text-white">${T(t.label)}</span></button>`).join('');
    const linkOptions = state.hubs.map(h => `<button onclick="insertLink('${h.name}')" class="w-full text-left p-2 hover:bg-stone-100 transition-colors text-sm font-bold flex items-center gap-2 dark:text-stone-300 dark:hover:bg-stone-700"><i data-lucide="hash" class="w-3 h-3 text-stone-400"></i> ${h.name}</button>`).join('');

    return `
        <div class="h-full flex flex-col fade-in relative">
            <div class="flex items-center justify-between border-b-2 border-stone-800 pb-4 mb-4 dark:border-stone-700">
                <div class="flex items-center gap-4">
                    <button onclick="${closeFunc.name}()" class="p-2 hover:bg-stone-100 rounded-full transition-colors dark:hover:bg-stone-800"><i data-lucide="arrow-left" class="w-6 h-6 dark:text-white"></i></button>
                    <h2 class="text-2xl font-bold dark:text-white">${title}</h2>
                </div>
                ${hubId ? `<div class="flex items-center gap-2"><button onclick="deleteHub(${hubId})" class="p-2 text-stone-400 hover:text-red-600 transition-colors dark:hover:text-red-400"><i data-lucide="trash-2" class="w-5 h-5"></i></button><button onclick="toggleViewMode()" class="p-2 rounded hover:bg-stone-100 transition-colors dark:hover:bg-stone-800"><i data-lucide="${state.viewMode === 'visual' ? 'layout-list' : 'layout-template'}" class="w-5 h-5 text-stone-500 hover:text-black dark:hover:text-white"></i></button></div>` : `<button onclick="toggleViewMode()" class="p-2 rounded hover:bg-stone-100 transition-colors dark:hover:bg-stone-800"><i data-lucide="${state.viewMode === 'visual' ? 'layout-list' : 'layout-template'}" class="w-5 h-5 text-stone-500 hover:text-black dark:hover:text-white"></i></button>`}
            </div>
            
            <div class="relative mb-6 z-20 group bg-stone-50 p-3 border border-stone-200 focus-within:border-black focus-within:shadow-lg transition-all flex items-start gap-3 dark:bg-stone-800 dark:border-stone-700 dark:focus-within:border-white">
                <button onclick="state.showSlashMenu = !state.showSlashMenu; state.showLinkMenu = false; render()" class="flex-shrink-0 flex items-center gap-2 bg-white border border-stone-300 px-2 py-1.5 rounded-sm hover:border-black transition-colors dark:bg-stone-900 dark:border-stone-600 dark:hover:border-white"><i data-lucide="${config.icon}" class="w-4 h-4 text-black dark:text-white"></i><span class="text-xs font-bold text-black hidden sm:inline-block dark:text-white">${T(config.label)}</span><i data-lucide="chevron-down" class="w-3 h-3 text-stone-400"></i></button>
                <div class="flex-1 relative">
                    <input type="text" id="entry-input" autocomplete="off" placeholder="${placeholder}" class="w-full bg-transparent text-sm outline-none font-medium placeholder:font-normal placeholder:text-stone-400 py-1.5 dark:text-white dark:placeholder:text-stone-500">
                    ${limit ? `<div class="absolute right-0 top-1.5 text-[10px] font-mono text-stone-400">${charCount}/${limit}</div>` : ''}
                </div>
                ${state.showSlashMenu ? `<div class="absolute top-full left-0 mt-1 w-48 bg-white border-2 border-black shadow-xl z-50 fade-in py-1 dark:bg-stone-800 dark:border-stone-600">${typeOptions}</div>` : ''}
                ${state.showLinkMenu ? `<div class="absolute top-full left-20 mt-1 w-48 bg-white border-2 border-black shadow-xl z-50 fade-in py-1 dark:bg-stone-800 dark:border-stone-600"><div class="px-2 py-1 text-[10px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100 mb-1 dark:border-stone-700">${currentLang === 'pt-BR' ? 'Linkar para...' : 'Link to...'}</div>${linkOptions}</div>` : ''}
                <div class="relative flex-shrink-0"><input type="date" id="date-picker-native" class="absolute inset-0 opacity-0 cursor-pointer" onchange="state.inputDate = this.valueAsDate ? this.valueAsDate.getTime() : null; render()"><button class="p-1.5 hover:bg-stone-200 rounded text-stone-400 hover:text-black dark:hover:bg-stone-700 dark:hover:text-white ${state.inputDate ? 'text-black font-bold dark:text-white' : ''}"><i data-lucide="calendar" class="w-4 h-4"></i></button></div>
            </div>
            <div class="flex-1 overflow-y-auto pb-20 scrollbar-hide space-y-1" onclick="if(state.showSlashMenu || state.showLinkMenu){state.showSlashMenu=false; state.showLinkMenu=false; render()}">
                ${list.length > 0 ? list.map(entry => renderEntry(entry)).join('') : `<div class="text-center text-stone-400 mt-10 italic">${currentLang === 'pt-BR' ? 'Nenhum item ainda.' : 'No items yet.'}</div>`}
            </div>
        </div>
    `;
}

function getJournalHTML() {
    const list = getFilteredEntries();
    const config = ENTRY_TYPES[state.selectedType];
    const charCount = state.inputText.length;
    const limit = config.limit;
    
    let dateFilterHTML = '';
    if (state.activeJournalPeriod === 'Período') {
        dateFilterHTML = `
            <div class="flex items-center gap-2 text-sm text-stone-600 bg-stone-50 p-2 border-b border-stone-200 mb-2 fade-in dark:bg-stone-800 dark:border-stone-700 dark:text-stone-400">
                <span>${currentLang === 'pt-BR' ? 'De:' : 'From:'}</span>
                <input type="date" value="${state.filterStartDate}" onchange="state.filterStartDate=this.value; render()" class="bg-white border border-stone-300 rounded px-2 py-1 text-xs dark:bg-stone-900 dark:border-stone-600 dark:text-white">
                <span>${currentLang === 'pt-BR' ? 'Até:' : 'To:'}</span>
                <input type="date" value="${state.filterEndDate}" onchange="state.filterEndDate=this.value; render()" class="bg-white border border-stone-300 rounded px-2 py-1 text-xs dark:bg-stone-900 dark:border-stone-600 dark:text-white">
            </div>
        `;
    }
    
    // FIX A: Usa PERIOD_MAP para traduzir corretamente os nomes dos filtros
    const periodButtons = ['Todos', 'Hoje', 'Futuro', 'Período'].map(p => `
        <button onclick="state.activeJournalPeriod='${p}'; render()" 
            class="px-3 py-1 text-xs font-bold transition-all ${state.activeJournalPeriod === p ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-stone-500 hover:text-black dark:text-stone-400 dark:hover:text-white'}">
            ${T(PERIOD_MAP[p])}
        </button>
    `).join('');

    const typeOptions = Object.values(ENTRY_TYPES).map(t => `<button onclick="selectEntryType('${t.id}')" class="w-full text-left flex items-center gap-3 p-2 hover:bg-stone-100 transition-colors dark:hover:bg-stone-700 ${state.selectedType === t.id ? 'bg-stone-50 font-bold dark:bg-stone-600' : ''}"><i data-lucide="${t.icon}" class="w-4 h-4 text-black dark:text-white"></i><span class="text-sm text-black dark:text-white">${T(t.label)}</span></button>`).join('');
    const linkOptions = state.hubs.map(h => `<button onclick="insertLink('${h.name}')" class="w-full text-left p-2 hover:bg-stone-100 transition-colors text-sm font-bold flex items-center gap-2 dark:text-stone-300 dark:hover:bg-stone-700"><i data-lucide="hash" class="w-3 h-3 text-stone-400"></i> ${h.name}</button>`).join('');

    return `
        <div class="h-full flex flex-col fade-in relative">
            <div class="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-stone-800 pb-4 mb-4 gap-3 dark:border-stone-700">
                <div class="flex items-center gap-4">
                    <h2 class="text-2xl font-bold dark:text-white">✱ ${T('nav_journal')}</h2>
                    <button onclick="toggleViewMode()" class="p-2 rounded hover:bg-stone-100 transition-colors dark:hover:bg-stone-800"><i data-lucide="${state.viewMode === 'visual' ? 'layout-list' : 'layout-template'}" class="w-5 h-5 text-stone-500 hover:text-black dark:hover:text-white"></i></button>
                </div>
                
                <div class="flex gap-1 bg-stone-100 p-1 rounded-sm self-start md:self-auto overflow-x-auto dark:bg-stone-800">
                    ${periodButtons}
                </div>
            </div>
            
            ${dateFilterHTML}

            <div class="relative mb-6 z-20 group bg-stone-50 p-3 border border-stone-200 focus-within:border-black focus-within:shadow-lg transition-all flex items-start gap-3 dark:bg-stone-800 dark:border-stone-700 dark:focus-within:border-white">
                <button onclick="state.showSlashMenu = !state.showSlashMenu; state.showLinkMenu = false; render()" class="flex-shrink-0 flex items-center gap-2 bg-white border border-stone-300 px-2 py-1.5 rounded-sm hover:border-black transition-colors dark:bg-stone-900 dark:border-stone-600 dark:hover:border-white"><i data-lucide="${config.icon}" class="w-4 h-4 text-black dark:text-white"></i><span class="text-xs font-bold text-black hidden sm:inline-block dark:text-white">${T(config.label)}</span><i data-lucide="chevron-down" class="w-3 h-3 text-stone-400"></i></button>
                <div class="flex-1 relative"><input type="text" id="entry-input" autocomplete="off" placeholder="${T('ui_add_note_placeholder')}/${T('ui_add_note_placeholder_end')}" class="w-full bg-transparent text-sm outline-none font-medium placeholder:font-normal placeholder:text-stone-400 py-1.5 dark:text-white dark:placeholder:text-stone-500">${limit ? `<div class="absolute right-0 top-1.5 text-[10px] font-mono text-stone-400">${charCount}/${limit}</div>` : ''}</div>
                ${state.showSlashMenu ? `<div class="absolute top-full left-0 mt-1 w-48 bg-white border-2 border-black shadow-xl z-50 fade-in py-1 dark:bg-stone-800 dark:border-stone-600">${typeOptions}</div>` : ''}
                ${state.showLinkMenu ? `<div class="absolute top-full left-20 mt-1 w-48 bg-white border-2 border-black shadow-xl z-50 fade-in py-1 dark:bg-stone-800 dark:border-stone-600"><div class="px-2 py-1 text-[10px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100 mb-1 dark:border-stone-700">${currentLang === 'pt-BR' ? 'Linkar para...' : 'Link to...'}</div>${linkOptions}</div>` : ''}
                <div class="relative flex-shrink-0"><input type="date" id="date-picker-native" class="absolute inset-0 opacity-0 cursor-pointer" onchange="state.inputDate = this.valueAsDate ? this.valueAsDate.getTime() : null; render()"><button class="p-1.5 hover:bg-stone-200 rounded text-stone-400 hover:text-black dark:hover:bg-stone-700 dark:hover:text-white"><i data-lucide="calendar" class="w-4 h-4"></i></button></div>
            </div>
            <div class="flex-1 overflow-y-auto pb-20 scrollbar-hide space-y-1" onclick="if(state.showSlashMenu || state.showLinkMenu){state.showSlashMenu=false; state.showLinkMenu=false; render()}">
                ${list.map(entry => renderEntry(entry)).join('')}
            </div>
        </div>
    `;
}

function renderEntry(entry) {
    if (state.editingEntryId === entry.id) {
        return getEditEntryHTML(entry);
    }
    if (state.viewMode === 'classic') {
        return renderClassicEntry(entry);
    }
    return renderVisualEntry(entry);
}

function getEditEntryHTML(entry) {
    const config = ENTRY_TYPES[entry.type];
    const isClassic = state.viewMode === 'classic';
    
    return `
        <div class="p-3 bg-stone-50 border-2 border-black rounded shadow-md ${isClassic ? 'font-mono' : 'font-sans'} dark:bg-stone-800 dark:border-stone-600">
            <div class="text-[10px] font-bold uppercase text-stone-600 mb-1 flex items-center gap-2 dark:text-stone-400">
                 <i data-lucide="${config.icon}" class="w-3 h-3"></i> ${T('ui_edit')} ${T(config.label)}
            </div>
            <textarea 
                id="edit-content-${entry.id}" 
                class="w-full bg-white border border-stone-300 p-2 text-sm resize-none outline-none focus:border-black rounded-sm ${isClassic ? 'font-mono' : 'font-sans'} dark:bg-stone-900 dark:border-stone-700 dark:text-white dark:focus:border-white"
                rows="${Math.max(1, Math.ceil(entry.content.length / 80))}"
                onblur="saveEditEntry(${entry.id}, this.value)"
                onkeydown="if(event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); saveEditEntry(${entry.id}, this.value); } else if(event.key === 'Escape') { state.editingEntryId = null; render(); }"
            >${entry.content}</textarea>
            <button onclick="saveEditEntry(${entry.id}, document.getElementById('edit-content-${entry.id}').value)" class="mt-2 bg-black text-white px-3 py-1 text-xs font-bold rounded hover:bg-stone-800 dark:bg-white dark:text-black dark:hover:bg-stone-200">
                ${T('ui_save')} (Enter)
            </button>
            <button onclick="state.editingEntryId = null; render()" class="mt-2 bg-white text-black px-3 py-1 text-xs font-bold rounded border border-stone-300 hover:bg-stone-100 dark:bg-stone-800 dark:text-stone-200 dark:border-stone-700 dark:hover:bg-stone-700">
                ${T('ui_cancel')} (Esc)
            </button>
        </div>
    `;
}

function formatContent(text) {
    let formatted = text.replace(/\n/g, '<br>');
    formatted = formatted.replace(/(#[\w\u00C0-\u00FF]+)/g, '<button onclick="openCollection(\'$1\'); event.stopPropagation();" class="text-blue-600 hover:underline font-bold bg-blue-50 px-1 rounded mx-0.5 dark:bg-blue-900/30 dark:text-blue-400">$1</button>');
    formatted = formatted.replace(/>>\s*([^\n#\r]+)/g, (match, p1) => {
        const linkText = p1.trim();
        return `<button onclick="handleLinkClick('${linkText}'); event.stopPropagation();" class="text-purple-700 hover:underline font-bold bg-purple-50 px-1 rounded mx-0.5 border-b-2 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800">${linkText}</button>`;
    });
    formatted = formatted.replace(/\*\*(.+?)\*\*|__(.+?)__/g, '<strong>$1$2</strong>');
    formatted = formatted.replace(/\*(.+?)\*|_(.+?)_/g, '<em>$1$2</em>');
    
    const listItemStyle = 'list-item list-disc ml-4 text-stone-900 dark:text-stone-200'; 
    formatted = formatted.replace(/<br>(\s*)[*-+]\s*(.+?)(?=<br>|$)/g, `<br><span class="${listItemStyle}">$2</span>`);
    formatted = formatted.replace(/^(\s*)[*-+]\s*(.+?)(?=<br>|$)/g, `<span class="${listItemStyle}">$2</span>`);
    
    formatted = formatted.replace(/<br>(\s*)##\s*(.+?)(?=<br>|$)/g, '<br><h3 class="text-lg font-bold mt-3 mb-1 dark:text-white">$2</h3>');
    formatted = formatted.replace(/^(\s*)##\s*(.+?)(?=<br>|$)/g, '<h3 class="text-lg font-bold mb-1 dark:text-white">$2</h3>');
    return formatted;
}

function renderVisualEntry(entry) {
    const config = ENTRY_TYPES[entry.type];
    const dateDisplay = entry.targetDate ? new Date(entry.targetDate).toLocaleDateString(currentLang, {day:'2-digit', month:'2-digit'}) : '';
    const isCompleted = entry.completed;
    const isPriority = entry.content.includes('✱');
    const contentHtml = formatContent(entry.content);

    return `
        <div class="flex items-start gap-3 p-3 bg-white border ${isPriority && !isCompleted ? 'border-l-4 border-l-black border-y-stone-100 border-r-stone-100 dark:border-l-white dark:border-y-stone-800 dark:border-r-stone-800' : 'border-stone-100 dark:border-stone-800'} hover:border-stone-400 group transition-all dark:bg-stone-900 dark:hover:border-stone-600">
            <button onclick="toggleEntry(${entry.id})" class="${config.color} mt-0.5">
                <i data-lucide="${isCompleted && entry.type === 'task' ? 'check-square' : config.icon}" class="w-4 h-4 ${isCompleted ? 'opacity-30' : ''}"></i>
            </button>
            <div class="flex-1 min-w-0" onclick="startEditEntry(${entry.id})" id="entry-content-view-${entry.id}">
                <p class="text-sm ${isCompleted ? 'line-through text-stone-400' : 'text-stone-900 dark:text-stone-200'} leading-relaxed font-medium cursor-pointer">
                    ${contentHtml}
                    ${entry.recurring ? '<i data-lucide="repeat" class="w-3 h-3 inline text-stone-400 ml-1"></i>' : ''}
                </p>
                <div class="flex gap-3 mt-1">
                    <span class="text-[10px] text-stone-400 uppercase font-bold">${T(config.label)}</span>
                    ${dateDisplay ? `<span class="text-[10px] bg-stone-100 text-stone-600 px-1 border border-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:border-stone-700">${T('ui_date')}: ${dateDisplay}</span>` : ''}
                    ${isPriority && !isCompleted ? `<span class="text-[10px] bg-black text-white px-1 font-bold dark:bg-white dark:text-black">${T('ui_important')}</span>` : ''}
                </div>
            </div>
            <button onclick="deleteEntry(${entry.id})" class="text-stone-300 hover:text-black opacity-0 group-hover:opacity-100 transition-opacity dark:hover:text-white">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
        </div>
    `;
}

function renderClassicEntry(entry) {
    const config = ENTRY_TYPES[entry.type];
    const isCompleted = entry.completed;
    const isPriority = entry.content.includes('✱');
    const dateDisplay = entry.targetDate ? new Date(entry.targetDate).toLocaleDateString(currentLang, {day:'2-digit', month:'2-digit'}) : '';
    const contentHtml = formatContent(entry.content);

    return `
        <div class="group flex items-baseline gap-2 py-1 px-1 hover:bg-stone-50 rounded -ml-1 transition-colors cursor-default dark:hover:bg-stone-800">
            <button onclick="toggleEntry(${entry.id})" 
                class="font-mono font-bold w-5 text-center select-none ${isCompleted ? 'text-stone-300' : 'text-black hover:text-stone-600 dark:text-white dark:hover:text-stone-300'}">
                ${isCompleted && entry.type === 'task' ? 'x' : config.symbol}
            </button>
            <div class="flex-1 min-w-0 font-mono text-sm leading-relaxed ${isCompleted ? 'line-through text-stone-400' : (isPriority ? 'text-black font-bold dark:text-white' : 'text-stone-800 dark:text-stone-300')} cursor-pointer" onclick="startEditEntry(${entry.id})" id="entry-content-view-${entry.id}">
                ${contentHtml}
                ${dateDisplay ? `<span class="text-[10px] text-stone-400 ml-2 select-none font-sans">(${dateDisplay})</span>` : ''}
            </div>
            <button onclick="deleteEntry(${entry.id})" class="text-stone-300 hover:text-black opacity-0 group-hover:opacity-100 transition-opacity dark:hover:text-white">
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
                <h2 class="text-2xl font-bold capitalize dark:text-white">${month.toLocaleDateString(currentLang, {month:'long', year:'numeric'})}</h2>
                <div class="flex gap-2">
                    <button onclick="changeMonth(-1)" class="p-2 border border-black hover:bg-stone-100 dark:border-white dark:hover:bg-stone-800"><i data-lucide="chevron-left" class="w-4 h-4 dark:text-white"></i></button>
                    <button onclick="changeMonth(1)" class="p-2 border border-black hover:bg-stone-100 dark:border-white dark:hover:bg-stone-800"><i data-lucide="chevron-right" class="w-4 h-4 dark:text-white"></i></button>
                </div>
            </div>
            
            <div class="grid grid-cols-7 gap-1 text-center font-bold text-xs text-stone-500 mb-2 uppercase dark:text-stone-400">
                <div>${currentLang === 'pt-BR' ? 'Dom' : 'Sun'}</div><div>${currentLang === 'pt-BR' ? 'Seg' : 'Mon'}</div><div>${currentLang === 'pt-BR' ? 'Ter' : 'Tue'}</div><div>${currentLang === 'pt-BR' ? 'Qua' : 'Wed'}</div><div>${currentLang === 'pt-BR' ? 'Qui' : 'Thu'}</div><div>${currentLang === 'pt-BR' ? 'Sex' : 'Fri'}</div><div>${currentLang === 'pt-BR' ? 'Sáb' : 'Sat'}</div>
            </div>
            
            <div class="calendar-grid grid grid-cols-7 flex-1 border-t border-l border-stone-200 dark:border-stone-700">
    `;

    for (let i = 0; i < startDayOfWeek; i++) {
        html += `<div class="bg-stone-50 border-r border-b border-stone-200 dark:bg-stone-800 dark:border-stone-700"></div>`;
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const currentTs = new Date(year, m, d).setHours(0,0,0,0);
        const isToday = currentTs === new Date().setHours(0,0,0,0);
        
        const events = state.entries.filter(e => {
            const eDate = e.targetDate ? new Date(e.targetDate) : new Date(e.id);
            return eDate.setHours(0,0,0,0) === currentTs;
        });

        html += `
            <div class="calendar-day bg-white border-r border-b border-stone-200 p-2 min-h-[100px] hover:bg-stone-50 transition-colors cursor-pointer dark:bg-stone-900 dark:border-stone-700 dark:hover:bg-stone-800" onclick="openDayModal(${currentTs})">
                <div class="flex justify-between items-start">
                    <span class="text-sm font-bold ${isToday ? 'bg-black text-white w-6 h-6 flex items-center justify-center rounded-full dark:bg-white dark:text-black' : 'text-stone-700 dark:text-stone-300'}">${d}</span>
                    ${events.length > 0 ? `<span class="text-[10px] font-bold text-stone-400">${events.length}</span>` : ''}
                </div>
                <div class="mt-2 space-y-1">
                    ${events.slice(0, 3).map(e => `
                        <div class="text-[10px] truncate px-1 py-0.5 ${e.completed ? 'line-through text-stone-300 dark:text-stone-500' : 'bg-stone-100 text-black dark:bg-stone-700 dark:text-stone-200'} rounded-sm border border-stone-100 dark:border-stone-700">
                           ${ENTRY_TYPES[e.type].symbol} ${e.content}
                        </div>
                    `).join('')}
                    ${events.length > 3 ? `<div class="text-[10px] text-stone-400 pl-1">+${events.length - 3} ${currentLang === 'pt-BR' ? 'mais' : 'more'}</div>` : ''}
                </div>
            </div>
        `;
    }

    html += `</div></div>`;
    return html;
}

function toggleBackupAlert() {
    state.prefs.showAlertOnUnload = !state.prefs.showAlertOnUnload;
    saveData();
    setupUnloadAlert(); 
    render(); 
}

function getSettingsHTML() {
    const isDark = state.prefs.theme === 'dark'; 
    
    return `
        <div class="fade-in max-w-xl">
            <h2 class="text-2xl font-bold mb-6 dark:text-white">${T('settings_title')}</h2>
            
            <div class="bg-white border-2 border-stone-200 p-6 mb-4 flex justify-between items-center dark:bg-stone-800 dark:border-stone-700">
                <div>
                    <h3 class="font-bold mb-1 text-black dark:text-white">${T('settings_language')}</h3>
                    <p class="text-sm text-stone-500 dark:text-stone-400">${currentLang === 'pt-BR' ? 'Escolha o idioma da interface.' : 'Choose the interface language.'}</p>
                </div>
                <select id="language-select" onchange="setLanguage(this.value)" class="bg-white border border-stone-300 rounded px-2 py-1 text-sm dark:bg-stone-900 dark:border-stone-600 dark:text-white">
                    <option value="pt-BR" ${currentLang === 'pt-BR' ? 'selected' : ''}>${T('settings_lang_pt')}</option>
                    <option value="en-US" ${currentLang === 'en-US' ? 'selected' : ''}>${T('settings_lang_en')}</option>
                </select>
            </div>

            <div class="bg-white border-2 border-stone-200 p-6 mb-4 flex justify-between items-center dark:bg-stone-800 dark:border-stone-700">
                <div>
                    <h3 class="font-bold mb-1 text-black dark:text-white">${T('settings_dark_mode')}</h3>
                    <p class="text-sm text-stone-500 dark:text-stone-400">${T('settings_dark_mode_desc')}</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" onchange="toggleTheme()" ${isDark ? 'checked' : ''}>
                    <div class="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:bg-stone-600"></div>
                </label>
            </div>
            
            <div class="bg-white border-2 border-stone-200 p-6 mb-4 flex justify-between items-center dark:bg-stone-800 dark:border-stone-700">
                <div>
                    <h3 class="font-bold mb-1 text-black dark:text-white">${T('settings_backup_alert')}</h3>
                    <p class="text-sm text-stone-500 dark:text-stone-400">${T('settings_backup_alert_desc')}</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" onchange="toggleBackupAlert()" ${state.prefs.showAlertOnUnload ? 'checked' : ''}>
                    <div class="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:bg-stone-600"></div>
                </label>
            </div>
            
            <div class="bg-white border-2 border-stone-200 p-6 mb-4 dark:bg-stone-800 dark:border-stone-700">
                <h3 class="font-bold mb-2 text-black dark:text-white">${T('settings_backup_data')}</h3>
                <p class="text-sm text-stone-500 mb-4 dark:text-stone-400">${T('settings_backup_data_desc')}</p>
                
                <div class="flex gap-2">
                    <button onclick="exportData()" class="flex items-center gap-2 bg-black text-white px-4 py-2 text-xs font-bold border-2 border-black hover:bg-stone-800 transition-colors dark:bg-white dark:text-black dark:hover:bg-stone-200">
                        <i data-lucide="download" class="w-4 h-4"></i> ${T('settings_backup_button')}
                    </button>

                    <button onclick="document.getElementById('import-file').click()" class="flex items-center gap-2 bg-white text-black px-4 py-2 text-xs font-bold border-2 border-stone-300 hover:border-black hover:bg-stone-50 transition-all dark:bg-stone-700 dark:text-white dark:border-stone-600 dark:hover:bg-stone-600">
                        <i data-lucide="upload" class="w-4 h-4"></i> ${T('settings_restore_button')}
                    </button>
                    
                    <input type="file" id="import-file" class="hidden" accept=".json" onchange="importData(this)">
                </div>
            </div>
        </div>
    `;
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

function mergeImportedData(currentData, importedData) {
    // 1. Mesclar Entradas (Entries)
    // Cria um Set com os IDs das entradas atuais para uma verificação rápida
    const existingEntryIds = new Set(currentData.entries.map(e => e.id));
    // Filtra as entradas importadas para manter apenas as que não existem (baseado no ID)
    const uniqueImportedEntries = importedData.entries.filter(importedEntry => !existingEntryIds.has(importedEntry.id));
    const newEntries = [...currentData.entries, ...uniqueImportedEntries]; // Junta as entradas atuais com as novas

    // 2. Mesclar Hubs
    const existingHubIds = new Set(currentData.hubs.map(h => h.id));
    // Filtra os hubs importados para manter apenas os que não existem (baseado no ID)
    const uniqueImportedHubs = importedData.hubs.filter(importedHub => !existingHubIds.has(importedHub.id));
    const newHubs = [...currentData.hubs, ...uniqueImportedHubs]; // Junta os hubs atuais com os novos

    // 3. Mesclar Uso de Tags (somar a relevância)
    const newTagUsage = { ...currentData.tagUsage };
    const importedTagUsage = importedData.tagUsage || {};
    
    // Soma o uso de tags do backup ao uso de tags atual
    for (const tag in importedTagUsage) {
        newTagUsage[tag] = (newTagUsage[tag] || 0) + importedTagUsage[tag];
    }
    
    // 4. Mesclar Preferências (mantém as atuais, sobrescreve apenas as chaves presentes no importado)
    const newPrefs = {...currentData.prefs, ...importedData.prefs};

    return {
        entries: newEntries,
        hubs: newHubs,
        tagUsage: newTagUsage,
        prefs: newPrefs
    };
}

function importData(inputElement) {
    const file = inputElement.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.entries && Array.isArray(data.entries)) {
                const mergeMessage = currentLang === 'pt-BR' 
                    ? 'Atenção: Isso combinará os dados atuais com os do backup. Entradas duplicadas (pelo ID) serão ignoradas.' 
                    : 'Warning: This will merge current data with the backup. Duplicate entries (by ID) will be ignored.';
                
                showModal(
                    T('settings_restore_q'), 
                    mergeMessage, 
                    T('ui_delete_confirm'), 
                    () => {
                        const mergedData = mergeImportedData({
                            entries: state.entries,
                            hubs: state.hubs,
                            tagUsage: state.tagUsage,
                            prefs: state.prefs
                        }, data);
                        
                        state.entries = mergedData.entries;
                        state.hubs = mergedData.hubs;
                        state.tagUsage = mergedData.tagUsage;
                        state.prefs = mergedData.prefs;
                        
                        saveData(); 
                        applyTheme(state.prefs.theme); 
                        render(); 
                        showModal(T('ui_item_saved'), T('settings_restore_success'));
                    }
                );
            } else {
                showModal('Erro', T('settings_restore_invalid'));
            }
        } catch (err) {
            console.error(err);
            showModal('Erro', T('settings_restore_fail'));
        }
        inputElement.value = '';
    };
    reader.readAsText(file);
}

// FIX A: Função showModal ajustada para ser mais robusta e garantir o fechamento.
function showModal(title, msg, actionBtnText, onAction) { 
    const modal = document.getElementById('app-modal');
    const titleEl = document.getElementById('modal-title');
    const msgEl = document.getElementById('modal-message');
    const confirmBtn = document.getElementById('modal-confirm');
    const cancelBtn = document.getElementById('modal-cancel');

    if(!modal) return;

    titleEl.innerText = title;
    msgEl.innerHTML = msg; 

    if (onAction) {
        cancelBtn.classList.remove('hidden');
        confirmBtn.innerText = actionBtnText || T('ui_delete_confirm');
        
        // Ação de confirmação que executa a função e FECHA o modal.
        confirmBtn.onclick = () => {
            onAction();
            closeModal(); 
        };
        // Para Hub Modal, garante que o input tenha foco
        if (document.getElementById('hub-name-input')) {
             setTimeout(() => document.getElementById('hub-name-input').focus(), 150);
        }

    } else {
        cancelBtn.classList.add('hidden'); 
        confirmBtn.innerText = actionBtnText || 'OK';
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

function openFeedbackModal() {
    const modal = document.getElementById('feedback-modal');
    if (!modal) return;
    const textarea = document.getElementById('feedback-text');
    if (textarea) textarea.value = '';
    
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        if (textarea) textarea.focus();
    }, 10);
}

function closeFeedbackModal() {
    const modal = document.getElementById('feedback-modal');
    if (!modal) return;
    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 200);
}

function sendFeedback() {
    const textarea = document.getElementById('feedback-text');
    const text = textarea ? textarea.value.trim() : '';
    
    if (!text) {
        showModal(T('ui_delete_confirm'), T('feedback_empty'));
        return;
    }
    
    const email = "jonatas.rocha@outlook.es";
    const subject = T('app_title') + " Feedback";
    const body = encodeURIComponent(text);
    
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${body}`;
    closeFeedbackModal();
}

function toggleBackupAlert() {
    state.prefs.showAlertOnUnload = !state.prefs.showAlertOnUnload;
    saveData();
    setupUnloadAlert(); 
    render(); 
}

function setupUnloadAlert() {
    window.removeEventListener('beforeunload', handleBeforeUnload);

    if (state.prefs.showAlertOnUnload) {
        window.addEventListener('beforeunload', handleBeforeUnload);
    }
}

function handleBeforeUnload(e) {
    const confirmationMessage = currentLang === 'pt-BR' ? 'Deseja fazer o backup dos seus dados antes de sair?' : 'Do you want to backup your data before leaving?';
    e.returnValue = confirmationMessage; 
    return confirmationMessage;
}

init();
