// --- CONSTANTES ---
const APP_VERSION = '3.1.1'; // Bugfix: Restauração de Backup Manual e Drive
const STORAGE_KEY = 'synta_v3_data';
const PREFS_KEY = 'synta_v3_prefs';

let currentLang = 'pt-BR'; 

const PERIOD_MAP = { 
    'Hoje': 'filter_today',
    'Futuro': 'filter_future',
    'Período': 'filter_period',
    'Todos': 'filter_all'
};

const TRANSLATIONS = {
    'pt-BR': {
        app_title: 'Synta Notes',
        type_note: 'Nota',
        type_task: 'Ação', // ALTERADO: De 'Tarefa' para 'Ação'
        type_event: 'Evento',
        type_inspiration: 'Inspiração', 
        type_mood: 'Humor', // NOVO: Significador
        nav_home: 'Home',
        nav_journal: 'Diário',
        nav_hubs: 'Hubs',
        nav_collections: 'Coleções',
        nav_settings: 'Configurações',
        nav_feedback: 'Feedback',
        filter_all: 'Todos',
        filter_today: 'Hoje',
        filter_future: 'Futuro',
        filter_period: 'Período',
        home_today: 'Hoje',
        home_priorities: 'Prioridades',
        home_next_event: 'Próximo Evento',
        home_recent: 'Adicionados Recentemente',
        home_no_priority: 'Nenhuma prioridade ativa.',
        home_no_event: 'Nada agendado.',
        home_no_recent: 'Nenhum item recente.',
        hubs_title: 'Hubs',
        hubs_subtitle: 'Mapas de contexto.',
        hubs_new_prompt: 'Nome do novo Hub (ex: Estudos):',
        hubs_new_button: 'NOVO HUB',
        modal_title_new_hub: 'Criar Novo Hub',
        placeholder_hub_name: 'Nome do Hub',
        button_create_hub: 'Criar Hub',
        collections_title: 'Coleções',
        collections_subtitle: 'Organizadas por frequência.',
        collections_empty: 'Nenhuma coleção encontrada. Use #tags em suas notas para criar coleções automaticamente.',
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
        modal_search_title: 'Busca Rápida',
        modal_search_msg: 'Filtrando itens relacionados a:',
        error_empty_hub: 'O nome do Hub não pode estar vazio.',
        settings_title: 'Configurações',
        settings_dark_mode: 'Modo Escuro (Dark Mode)',
        settings_dark_mode_desc: 'Alterne entre o tema claro e escuro da aplicação.',
        settings_backup_alert: 'Alerta de Backup ao Sair',
        settings_backup_alert_desc: 'Perguntar se deseja fazer backup antes de fechar a aba ou recarregar.',
        settings_backup_data: 'Backup & Dados',
        settings_backup_data_desc: 'Gerencie seus dados. Exporte para segurança ou restaure um arquivo anterior.',
        settings_backup_button: 'BACKUP LOCAL',
        settings_restore_button: 'RESTAURAR LOCAL',
        settings_restore_q: 'Restaurar Backup?',
        settings_restore_msg: 'Atenção: Isso substituirá todos os dados atuais por este backup. Essa ação é irreversível.',
        settings_restore_success: 'Backup restaurado com sucesso.',
        settings_restore_invalid: 'Arquivo de backup inválido ou corrompido.',
        settings_restore_fail: 'Falha ao ler o arquivo JSON.',
        settings_language: 'Idioma',
        settings_lang_pt: 'Português (Brasil)',
        settings_lang_en: 'Inglês',
        settings_gdrive_beta_badge: 'BETA',
        settings_gdrive_beta_msg: 'Funcionalidade experimental. Use com cautela e mantenha backups locais.',
        settings_gdrive_title: 'Sincronização Google Drive',
        settings_gdrive_desc: 'Mantenha seus dados seguros na nuvem e sincronize entre dispositivos.',
        settings_gdrive_btn_upload: 'ENVIAR P/ NUVEM',
        settings_gdrive_btn_download: 'BAIXAR DA NUVEM',
        feedback_send: 'Enviar Feedback',
        feedback_desc: 'Sua opinião é importante! Relate erros ou envie sugestões.',
        feedback_placeholder: 'Digite sua mensagem aqui...',
        feedback_empty: 'Por favor, digite alguma mensagem antes de enviar.',
        friction_migrated_3: 'Tarefa adiada 3 vezes. Por favor, justifique o motivo do adiamento.',
    },
    'en-US': {
        app_title: 'Synta Notes',
        type_note: 'Note',
        type_task: 'Action', // ALTERADO: De 'Task' para 'Action'
        type_event: 'Event',
        type_inspiration: 'Inspiration', 
        type_mood: 'Mood', // NEW
        nav_home: 'Home',
        nav_journal: 'Journal',
        nav_hubs: 'Hubs',
        nav_collections: 'Collections',
        nav_settings: 'Settings',
        nav_feedback: 'Feedback',
        filter_all: 'All',
        filter_today: 'Today',
        filter_future: 'Future',
        filter_period: 'Period',
        home_today: 'Today',
        home_priorities: 'Priorities',
        home_next_event: 'Next Event',
        home_recent: 'Recently Added',
        home_no_priority: 'No active priorities.',
        home_no_event: 'Nothing scheduled.',
        home_no_recent: 'No recent items.',
        hubs_title: 'Hubs',
        hubs_subtitle: 'Context maps.',
        hubs_new_prompt: 'Name of the new Hub (e.g., Studies):',
        hubs_new_button: 'NEW HUB',
        modal_title_new_hub: 'Create New Hub',
        placeholder_hub_name: 'Hub Name',
        button_create_hub: 'Create Hub',
        collections_title: 'Collections',
        collections_subtitle: 'Organized by frequency.',
        collections_empty: 'No collections found. Use #tags in your notes to create collections automatically.',
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
        modal_search_title: 'Quick Search',
        modal_search_msg: 'Filtering items related to:',
        error_empty_hub: 'Hub name cannot be empty.',
        settings_title: 'Settings',
        settings_dark_mode: 'Dark Mode',
        settings_dark_mode_desc: 'Toggle between light and dark theme.',
        settings_backup_alert: 'Unload Backup Alert',
        settings_backup_alert_desc: 'Ask if you want to backup before closing the tab or reloading.',
        settings_backup_data: 'Backup & Data',
        settings_backup_data_desc: 'Manage your data. Export for security or restore a previous file.',
        settings_backup_button: 'BACKUP LOCAL',
        settings_restore_button: 'RESTORE LOCAL',
        settings_restore_q: 'Restore Backup?',
        settings_restore_msg: 'Warning: This will overwrite all current data with this backup. This action is irreversible.',
        settings_restore_success: 'Backup restored successfully.',
        settings_restore_invalid: 'Invalid or corrupt backup file.',
        settings_restore_fail: 'Failed to read the JSON file.',
        settings_language: 'Language',
        settings_lang_pt: 'Portuguese (Brazil)',
        settings_lang_en: 'English',
        settings_gdrive_beta_badge: 'BETA',
        settings_gdrive_beta_msg: 'Experimental feature. Use with caution and keep local backups.',
        settings_gdrive_title: 'Google Drive Sync',
        settings_gdrive_desc: 'Keep your data safe in the cloud and sync across devices.',
        settings_gdrive_btn_upload: 'UPLOAD TO CLOUD',
        settings_gdrive_btn_download: 'DOWNLOAD FROM CLOUD',
        feedback_send: 'Send Feedback',
        feedback_desc: 'Your opinion is important! Report bugs or send suggestions.',
        feedback_placeholder: 'Type your message here...',
        feedback_empty: 'Please type a message before sending.',
        friction_migrated_3: 'Task postponed 3 times. Please justify why.',
    }
};

const T = (key, lang = currentLang) => {
    return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key] !== undefined) ? TRANSLATIONS[lang][key] : TRANSLATIONS['pt-BR'][key] || key;
};

const getPreferredLanguage = () => {
    const savedLang = state.prefs.lang;
    if (savedLang) return savedLang;
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.toLowerCase().startsWith('pt')) return 'pt-BR';
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
    mood: { id: 'mood', label: 'type_mood', icon: 'smile', symbol: '=', color: 'text-stone-700 dark:text-stone-300', limit: 140 },
};

// --- ESTADO ---
let state = {
    entries: [],
    hubs: [],
    activeTab: 'home',
    activeJournalPeriod: 'Hoje', 
    journalDate: new Date(),
    filterStartDate: new Date().toISOString().split('T')[0], 
    filterEndDate: new Date().toISOString().split('T')[0],   
    activeHubId: null, 
    activeTag: null,
    tagUsage: {}, 
    editingEntryId: null,
    searchQuery: '',
    calendarMonth: new Date(),
    inputText: '',
    inputDate: null, 
    selectedType: 'task', 
    showSlashMenu: false, 
    showLinkMenu: false,
    // REMOVIDO: isPriorityInput e isInspirationInput (mantendo apenas o estado visual do input)
    isPriorityInput: false, 
    isInspirationInput: false,
    prefs: {
        viewMode: 'visual', // Valor padrão inicial
        showAlertOnUnload: true,
        theme: 'light',
        lang: null,
        lastOpenedDate: null 
    }
};

// --- FUNÇÕES DE DATA PARA O RITUAL ---
function getTodayStart() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.getTime();
}

// --- INICIALIZAÇÃO ---
function init() {
    loadData();
    const prefs = JSON.parse(localStorage.getItem(PREFS_KEY) || '{}');
    
    state.prefs.viewMode = prefs.viewMode || 'visual';
    state.prefs.showAlertOnUnload = prefs.showAlertOnUnload !== undefined ? prefs.showAlertOnUnload : true;
    state.prefs.theme = prefs.theme || 'light'; 
    state.prefs.lang = prefs.lang || getPreferredLanguage();
    currentLang = state.prefs.lang;
    state.prefs.lastOpenedDate = prefs.lastOpenedDate || 0;

    applyTheme(state.prefs.theme); 
    
    if (typeof state.journalDate === 'string') state.journalDate = new Date(state.journalDate);
    
    if (state.hubs.length === 0) {
        state.hubs = [
            { id: 1, name: "✱ Pessoal", icon: "user", count: 0 },
            { id: 2, name: "✱ Trabalho", icon: "briefcase", count: 0 }
        ];
    }

    // Ritual de Revisão Matinal
    const todayStart = getTodayStart();
    const lastOpened = state.prefs.lastOpenedDate || 0;
    
    if (todayStart > lastOpened) {
        state.prefs.lastOpenedDate = todayStart;
        saveData();
        
        const yesterdayTasks = state.entries.filter(e => {
            const entryDate = e.targetDate || e.id; 
            const entryDayStart = new Date(entryDate);
            entryDayStart.setHours(0,0,0,0);
            
            // É uma Tarefa pendente (não completada) E era para ser feita antes de hoje.
            return e.type === 'task' && !e.completed && entryDayStart.getTime() < todayStart;
        }).sort((a,b) => a.id - b.id);

        if (yesterdayTasks.length > 0) {
            setTimeout(() => showMorningReviewModal(yesterdayTasks), 500);
        } else {
            render();
        }
    } else {
        render();
    }
    
    window.addEventListener('keydown', handleGlobalKeydown);
    setupUnloadAlert();
}

function setActiveTab(tabId) {
    state.activeTab = tabId;
    if (tabId !== 'hubs') state.activeHubId = null;
    if (tabId !== 'collections') state.activeTag = null;
    if (state.searchQuery && tabId !== 'home') state.searchQuery = '';
    const main = document.getElementById('main-container');
    if (main) main.scrollTop = 0;
    
    // Reseta estados de input
    state.isPriorityInput = false;
    state.isInspirationInput = false;
    
    render();
}

function loadData() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"entries":[], "hubs":[], "tagUsage":{}}');
    state.entries = data.entries || [];
    state.hubs = data.hubs || [];
    state.tagUsage = data.tagUsage || {};
    // Correção de migração: remove a propriedade inProgress de entradas antigas
    state.entries = state.entries.map(e => {
        const newEntry = { ...e };
        if (newEntry.inProgress !== undefined) {
            delete newEntry.inProgress; 
        }
        return newEntry;
    });

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

// --- LÓGICA DE EDIAÇÃO COMPLETA (ATUALIZADA) ---
function startEditEntry(id) {
    state.editingEntryId = id;
    state.isPriorityInput = false;
    state.isInspirationInput = false;
    render();
    setTimeout(() => {
        const textarea = document.getElementById(`edit-content-${id}`);
        if(textarea) {
            textarea.focus();
        }
    }, 50);
}

function saveEditEntry(id) {
    const entry = state.entries.find(e => e.id === id);
    if (!entry) return;

    // 1. Read Inputs
    const newContent = document.getElementById(`edit-content-${id}`)?.value.trim();
    const newDateStr = document.getElementById(`edit-date-${id}`)?.value;
    const newHubId = document.getElementById(`edit-hub-${id}`)?.value;
    
    // Ler estado dos botões (data-active='true')
    const btnPriority = document.getElementById(`btn-edit-priority-${id}`);
    const btnInspiration = document.getElementById(`btn-edit-inspiration-${id}`);

    const isPriorityChecked = btnPriority ? btnPriority.dataset.active === 'true' : false;
    const isInspirationChecked = btnInspiration ? btnInspiration.dataset.active === 'true' : false;

    if (!validateEntryContent(newContent, entry.type)) {
         startEditEntry(id);
         return;
    }
    
    // 2. Process Content/Signifiers (BuJo Logic Canônica)
    let content = newContent;
    
    // Clean existing signifiers from the content
    content = content.replace(/[\*!✱]/g, '').trim();

    // Re-apply BuJo signifiers based on toggles/type
    if (entry.type === 'task') {
        if (isPriorityChecked) {
            content = `✱ ${content}`;
        }
    } else if (entry.type === 'note') {
        if (isInspirationChecked) {
            content = `! ${content}`;
        }
    }
    
    // 3. Update Entry Object
    entry.content = content.trim();
    entry.targetDate = newDateStr ? parseLocalInputDate(newDateStr) : null;
    entry.hubId = newHubId ? parseInt(newHubId) : null;
    
    // REMOVIDO: Update Progress State
    // if (entry.type === 'task') {
    //     delete entry.inProgress;
    // }

    state.editingEntryId = null; 
    
    // Update Tags
    const newTags = extractTags(entry.content);
    newTags.forEach(t => boostTagRelevance(t));

    saveData();
    render();
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
    showModal(T('modal_search_title'), `${T('modal_search_msg')} "${linkText}"`);
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
function showNewHubModal() {
    const content = `
        <input type="text" id="hub-name-input" placeholder="${T('placeholder_hub_name')}" class="modal-input w-full p-2 border border-stone-300 rounded focus:border-black outline-none dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:focus:border-white">
    `;
    showModal(T('modal_title_new_hub'), content, T('button_create_hub'), handleCreateHub);
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
    } else {
        showModal(T('ui_delete_confirm'), T('error_empty_hub'));
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

function validateEntryContent(content, type) {
    const config = ENTRY_TYPES[type];
    if (config.limit && content.length > config.limit) {
        showModal(T('ui_item_long'), `${T('ui_item_long')} ${T(config.label)} ${T('pt-BR') === currentLang ? 'deve ter no máximo' : 'must have a maximum of'} ${config.limit} ${T('pt-BR') === currentLang ? 'caracteres. Para textos longos, use o tipo' : 'characters. For long texts, use the type'} "${T('type_note')}".`);
        return false;
    }
    return true;
}

function handleNaturalLanguageDate(text) {
    return { text: text, date: null, recurring: null };
}

function parseLocalInputDate(dateStr) {
    if (!dateStr) return null;
    const parts = dateStr.split('-');
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    return date.getTime();
}

function handleDateInput(val) {
    state.inputDate = val; 
    const btn = document.getElementById('date-btn-icon');
    if (btn) {
        if (val) {
            btn.classList.add('text-black', 'font-bold', 'dark:text-white');
        } else {
            btn.classList.remove('text-black', 'font-bold', 'dark:text-white');
        }
    }
}

// --- FUNÇÕES DE CONTEXTO INTELIGENTE (CANÔNICO) ---
function togglePriorityInput() {
    if (state.selectedType === 'task') {
         state.isPriorityInput = !state.isPriorityInput;
         state.isInspirationInput = false;
    }
    render(); 
    setTimeout(() => {
        const input = document.getElementById('entry-input');
        if(input) {
            const val = input.value;
            input.focus();
            input.setSelectionRange(val.length, val.length);
        }
    }, 50);
}

function toggleInspirationInput() {
    if (state.selectedType === 'note') {
         state.isInspirationInput = !state.isInspirationInput;
         state.isPriorityInput = false;
    } else {
         state.isInspirationInput = false; 
    }
    render(); 
    setTimeout(() => {
        const input = document.getElementById('entry-input');
        if(input) {
            const val = input.value;
            input.focus();
            input.setSelectionRange(val.length, val.length);
        }
    }, 50);
}

// --- GESTÃO DE DATAS E ENTRADAS ---
function selectEntryType(typeId) {
    state.selectedType = typeId;
    state.showSlashMenu = false;
    state.isPriorityInput = false;
    state.isInspirationInput = false;
    
    if (state.inputText.startsWith('/')) {
        state.inputText = state.inputText.substring(1).trim();
    }
    
    if (state.activeTab === 'journal' || state.activeTab === 'hubs' || state.activeTab === 'collections') {
        render();
    } else {
        renderGlobalInput();
    }
    
    setTimeout(() => {
        const input = document.getElementById('entry-input') || document.getElementById('global-entry-input');
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
    let targetDate = nlpResult.date || (state.inputDate ? parseLocalInputDate(state.inputDate) : null);
    
    if (content.startsWith('/')) {
         content = content.replace(/^\/\w*\s?/, '');
    }

    // Lógica de Entrada Híbrida e Significadores BuJo
    const isPriorityMarker = content.includes('*') || content.includes('✱') || state.isPriorityInput;
    const isInspirationMarker = content.includes('!') || state.isInspirationInput;
    
    // Prioridade (apenas para Tarefa)
    if (type === 'task' && isPriorityMarker) {
        if (!content.includes('✱')) {
             content = `✱ ${content.replace(/[\*!✱]/g, '').trim()}`; 
        }
    }
    
    // Inspiração (apenas para Nota)
    if (type === 'note' && isInspirationMarker) {
        if (!content.includes('!')) {
             content = `! ${content.replace(/[\*!✱]/g, '').trim()}`;
        }
    }
    
    // Certifica-se de que Eventos não podem ter significadores
    if (type === 'event') {
        content = content.replace(/[\*!✱]/g, '').trim();
    }
    
    state.isPriorityInput = false;
    state.isInspirationInput = false; 

    if (!validateEntryContent(content, type)) {
        return;
    }

    let targetHubId = state.activeTab === 'hubs' ? state.activeHubId : (state.activeHubId || null);

    // Detecção de Link
    const hubLinkMatch = content.match(/>>\s*([^\n#\r]+)/);
    
    if (hubLinkMatch) {
        const linkedHubName = hubLinkMatch[1].trim();
        const foundHub = state.hubs.find(h => 
            h.name.toLowerCase() === linkedHubName.toLowerCase() || 
            h.name.replace('✱', '').trim().toLowerCase() === linkedHubName.toLowerCase()
        );

        if (foundHub) {
            targetHubId = foundHub.id;
        }
    }
    
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
        recurring: nlpResult.recurring,
        migrationCount: 0,
        // REMOVIDO: inProgress
    });

    state.inputText = '';
    state.inputDate = null; 
    state.showSlashMenu = false;
    state.showLinkMenu = false;
    saveData();
    
    const viewedDate = new Date();
    viewedDate.setHours(0,0,0,0);
    const addedDate = targetDate ? new Date(targetDate) : null;
    if (addedDate) addedDate.setHours(0,0,0,0);
    
    if (targetDate && addedDate.getTime() !== viewedDate.getTime() && state.activeTab !== 'home') {
        showModal(T('ui_item_scheduled'), `${T('ui_item_scheduled')} em ${addedDate.toLocaleDateString(currentLang)}.`);
    }

    render();
}

function toggleEntry(id) {
    const entry = state.entries.find(e => e.id === id);
    if (entry) {
        entry.completed = !entry.completed;
        if (entry.completed && entry.type === 'task') {
             entry.migrationCount = 0;
        }
        
        if (entry.completed && entry.recurring === 'daily') {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            state.entries.unshift({
                ...entry,
                id: Date.now(),
                completed: false,
                targetDate: tomorrow.getTime(),
                migrationCount: 0,
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

// REMOVIDO: function toggleProgress(id) {}

// NOVO: Lógica de Migração Canônica (usa ">")
function migrateTask(id, requiresJustification = false, newDate) {
    const entry = state.entries.find(e => e.id === id);
    if (!entry || entry.type !== 'task' || entry.completed) return;
    
    let justification = '';
    if (requiresJustification) {
        const inputEl = document.getElementById('justify-input');
        justification = inputEl ? inputEl.value.trim() : '';
        if (!justification) return false; 
        entry.content += ` (MIGRADO/ADIADO pela ${entry.migrationCount + 1}ª vez: ${justification})`; 
    }
    
    entry.migrationCount = (entry.migrationCount || 0) + 1;
    entry.targetDate = newDate; 

    // NOVO: Adiciona o marcador de Migração (>) visualmente na frente do conteúdo (apenas se for agendado para o futuro)
    const todayStart = getTodayStart();
    const isMigratedToFuture = newDate && new Date(newDate).setHours(0,0,0,0) > todayStart;
    
    // Limpa > e < anteriores
    entry.content = entry.content.replace(/[<>]/g, '').trim();

    if (isMigratedToFuture) {
        // Marcador canônico: > (Migrado para o futuro)
        entry.content = `> ${entry.content}`;
    } else {
        // Se for migrado para hoje (padrão do ritual), não leva > (é apenas um bullet)
    }

    saveData();
    return true;
}


// NOVO: Modal do Ritual de Revisão Matinal (MIGRAÇÃO CANÔNICA)
function showMorningReviewModal(tasks) {
    if (tasks.length === 0) {
        closeModal();
        render(); 
        return;
    }

    let currentTaskIndex = 0;
    
    function updateModal() {
        const task = tasks[currentTaskIndex];
        if (!task) {
            closeModal();
            render(); 
            return;
        }
        const isFrictionTriggered = (task.migrationCount || 0) >= 2; 

        const title = T('pt-BR') === currentLang ? `Ritual de Revisão Matinal (${currentTaskIndex + 1}/${tasks.length})` : `Morning Review Ritual (${currentTaskIndex + 1}/${tasks.length})`;

        const content = `
            <div class="space-y-4">
                <p class="text-lg font-bold text-black dark:text-white">${T('pt-BR') === currentLang ? 'Pendência de Ontem:' : 'Pending from Yesterday:'}</p>
                <div class="p-3 border border-stone-300 rounded bg-stone-50 dark:bg-stone-800 dark:border-stone-700">
                    <p class="text-sm dark:text-stone-300">${task.content.replace(/[<>]/g, '').trim()}</p>
                    ${isFrictionTriggered ? `<p class="text-xs font-bold text-red-600 mt-2">${T('friction_migrated_3')}</p>` : ''}
                </div>
                ${isFrictionTriggered ? `<input type="text" id="justify-input" placeholder="${T('pt-BR') === currentLang ? 'Justificativa (obrigatório)' : 'Justification (required)'}" class="modal-input w-full p-2 border border-stone-300 rounded focus:border-black outline-none dark:bg-stone-700 dark:border-stone-600 dark:text-white">` : ''}
                <div class="mt-4">
                    <label for="schedule-date-input" class="text-xs font-bold uppercase text-stone-500">${T('pt-BR') === currentLang ? 'Agendar para outra data:' : 'Schedule for another date:'}</label>
                    <input type="date" id="schedule-date-input" class="w-full p-2 border border-stone-300 rounded focus:border-black outline-none dark:bg-stone-700 dark:border-stone-600 dark:text-white mt-1">
                </div>
            </div>
        `;
        
        const modalEl = document.getElementById('app-modal');
        const titleEl = document.getElementById('modal-title');
        const msgEl = document.getElementById('modal-message');
        
        titleEl.innerText = title;
        msgEl.innerHTML = content;
        
        let buttonContainer = modalEl.querySelector('.flex-row-reverse');
        if (buttonContainer) buttonContainer.remove();
        
        const actionArea = modalEl.querySelector('.sm\\:max-w-lg');
        
        buttonContainer = document.createElement('div');
        buttonContainer.className = 'mt-6 flex flex-row-reverse gap-2';
        buttonContainer.innerHTML = `
            <button type="button" id="btn-migrate" class="inline-flex w-full justify-center bg-black px-3 py-2 text-sm font-bold text-white shadow-sm hover:bg-stone-800 sm:w-auto border-2 border-transparent transition-colors dark:bg-white dark:text-black dark:hover:bg-stone-200">
                ${T('pt-BR') === currentLang ? 'Migrar p/ Hoje' : 'Migrate to Today'}
            </button>
            <button type="button" id="btn-schedule" class="inline-flex w-full justify-center bg-stone-500 text-white px-3 py-2 text-sm font-bold shadow-sm hover:bg-stone-600 sm:w-auto border-2 border-transparent transition-colors dark:bg-stone-700 dark:hover:bg-stone-600">
                ${T('pt-BR') === currentLang ? 'Agendar' : 'Schedule'}
            </button>
             <button type="button" id="btn-delete" class="inline-flex w-full justify-center bg-red-600 text-white px-3 py-2 text-sm font-bold shadow-sm hover:bg-red-700 sm:w-auto border-2 border-transparent transition-colors">
                ${T('pt-BR') === currentLang ? 'Eliminar' : 'Delete'}
            </button>
        `;
        actionArea.appendChild(buttonContainer);

        document.getElementById('btn-migrate').onclick = () => {
            if (isFrictionTriggered && (!document.getElementById('justify-input') || !document.getElementById('justify-input').value.trim())) {
                alert(T('pt-BR') === currentLang ? "A justificativa é obrigatória para esta tarefa." : "Justification is required for this task.");
                return;
            }
            // Migra para HOJE (sem o marcador >)
            if (migrateTask(task.id, isFrictionTriggered, getTodayStart())) {
                currentTaskIndex++;
                updateModal();
            }
        };
        
        document.getElementById('btn-schedule').onclick = () => {
            const scheduleDateInput = document.getElementById('schedule-date-input');
            const newDateStr = scheduleDateInput.value;
            const justifyInput = document.getElementById('justify-input');

            if (!newDateStr) {
                alert(T('pt-BR') === currentLang ? "Selecione uma data para agendar." : "Select a date to schedule.");
                return;
            }
            if (isFrictionTriggered && (!justifyInput || !justifyInput.value.trim())) {
                alert(T('pt-BR') === currentLang ? "A justificativa é obrigatória para esta tarefa, mesmo ao reagendar." : "Justification is required for this task, even when rescheduling.");
                return;
            }

            const newDate = parseLocalInputDate(newDateStr);
            // Migra para o futuro (adiciona o marcador >)
            if (migrateTask(task.id, isFrictionTriggered, newDate)) { 
                currentTaskIndex++;
                updateModal();
            }
        };
        
        document.getElementById('btn-delete').onclick = () => {
            state.entries = state.entries.filter(e => e.id !== task.id);
            saveData();
            currentTaskIndex++;
            updateModal();
        };

        modalEl.classList.remove('hidden', 'opacity-0');
        modalEl.querySelector('div[class*="transform"]').classList.add('scale-100');
        
        if (isFrictionTriggered && document.getElementById('justify-input')) {
            document.getElementById('justify-input').focus();
        }
    }
    
    document.getElementById('app-modal').classList.remove('hidden', 'opacity-0');
    updateModal();
}

async function shareEntry(id) {
    const entry = state.entries.find(e => e.id === id);
    if (!entry) return;

    // Limpa HTML básico para compartilhar texto puro
    const textContent = entry.content
        .replace(/<br>/g, '\n')
        .replace(/<[^>]*>/g, '');

    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Synta Note',
                text: textContent,
            });
        } catch (err) {
            console.log('Compartilhamento cancelado ou falhou', err);
        }
    } else {
        // Fallback para área de transferência se o navegador não suportar share
        try {
            await navigator.clipboard.writeText(textContent);
            showModal(T('ui_item_saved'), 'Texto copiado para a área de transferência!');
        } catch (err) {
            console.error('Falha ao copiar', err);
            showModal('Erro', 'Não foi possível compartilhar ou copiar.');
        }
    }
}

// --- GLOBAL SLASH COMMAND (ATUALIZADO) ---
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
    state.isPriorityInput = false; 
    state.isInspirationInput = false;

    const modal = document.getElementById('global-input-modal');
    if (!modal) return;
    
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
    const globalActionButtons = document.getElementById('global-input-action-buttons'); 

    if (!input || !menu) return;
    
    const config = ENTRY_TYPES[state.selectedType];
    const charCount = state.inputText.length;
    const limit = config.limit;
    const isOver = limit && charCount > limit;

    input.value = state.inputText;
    
    if (charCountEl) {
        charCountEl.innerText = limit ? `${charCount}/${limit}` : charCount;
        charCountEl.classList.toggle('text-red-600', isOver);
        charCountEl.classList.toggle('font-bold', isOver);
        charCountEl.classList.toggle('hidden', !limit);
    }
    
    if (typeIcon) typeIcon.setAttribute('data-lucide', config.icon);
    if (typeLabel) typeLabel.innerText = T(config.label);
    
    const typeOptions = Object.values(ENTRY_TYPES).map(t => `<button onclick="selectGlobalEntryType('${t.id}')" class="w-full text-left flex items-center gap-3 p-2 hover:bg-stone-100 transition-colors dark:hover:bg-stone-700 ${state.selectedType === t.id ? 'bg-stone-50 font-bold dark:bg-stone-600' : ''}"><i data-lucide="${t.icon}" class="w-4 h-4 text-black dark:text-white"></i><span class="text-sm text-black dark:text-white">${T(t.label)}</span></button>`).join('');
    menu.innerHTML = typeOptions;
    menu.classList.toggle('hidden', !state.showSlashMenu);
    
    if (dateBtn && datePicker) {
        // Esta lógica de sincronização aqui fora só garante a cor do botão,
        // mas o elemento de data agora é construído DENTRO do actionButtons.
        if (state.inputDate) {
            dateBtn.classList.add('text-black', 'font-bold', 'dark:text-white');
            datePicker.value = state.inputDate; 
        } else {
            dateBtn.classList.remove('text-black', 'font-bold', 'dark:text-white');
            datePicker.value = '';
        }
        // O event listener de onchange foi movido para o HTML gerado abaixo.
    }
    
    // --- TRECHO DE AJUSTE PARA CONSISTÊNCIA ---
    if (globalActionButtons) {
        let conditionalButtonsHTML = '';
        
        // Funções de toggle com renderização de input global
        const toggleFunc = 'state.isPriorityInput = !state.isPriorityInput; state.isInspirationInput = false; renderGlobalInput();';
        const inspToggleFunc = 'state.isInspirationInput = !state.isInspirationInput; state.isPriorityInput = false; renderGlobalInput();';

        if (config.id === 'task') {
            conditionalButtonsHTML = `
                <button onclick="${toggleFunc}" title="${T('pt-BR') === currentLang ? 'Marcar como Prioridade (✱) - BuJo' : 'Mark as Priority (✱) - BuJo'}" 
                        class="p-1.5 rounded transition-colors ${state.isPriorityInput ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-stone-400 hover:text-black dark:hover:text-white'}">
                    <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                </button>
            `;
        } else if (config.id === 'note') {
             conditionalButtonsHTML = `
                <button onclick="${inspToggleFunc}" title="${T('pt-BR') === currentLang ? 'Marcar como Inspiração (!) - BuJo' : 'Mark as Inspiration (!) - BuJo'}"
                        class="p-1.5 rounded transition-colors ${state.isInspirationInput ? 'bg-blue-600 text-white dark:bg-blue-400 dark:text-black' : 'text-stone-400 hover:text-black dark:hover:text-white'}">
                    <i data-lucide="zap" class="w-4 h-4 fill-current"></i> 
                </button>
             `;
        }
        
        // Adicionando o controle de data no mesmo contêiner, garantindo a mesma ordem do Diário
        const dateButtonHTML = `
            <div class="relative">
                <input type="date" id="global-date-picker-native" value="${state.inputDate || ''}" class="absolute inset-0 opacity-0 cursor-pointer" onchange="handleDateInput(this.value); renderGlobalInput();">
                <button id="global-date-button-icon" class="p-1.5 hover:bg-stone-200 rounded text-stone-400 hover:text-black dark:hover:text-white ${state.inputDate ? 'text-black font-bold dark:text-white' : ''}"><i data-lucide="calendar" class="w-4 h-4"></i></button>
            </div>
        `;

        globalActionButtons.innerHTML = conditionalButtonsHTML + dateButtonHTML;
    }
    // --- FIM DO TRECHO DE AJUSTE ---

    if (input.tagName === 'TEXTAREA') {
        input.style.height = 'auto';
        input.style.height = (input.scrollHeight) + 'px';
    }
    lucide.createIcons();
}
function selectGlobalEntryType(typeId) {
    state.selectedType = typeId;
    state.showSlashMenu = false;
    state.isPriorityInput = false;
    state.isInspirationInput = false;
    
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
    let targetDate = nlpResult.date || (state.inputDate ? parseLocalInputDate(state.inputDate) : null);
    
    // Lógica de Significadores BuJo
    const isPriorityMarker = content.includes('*') || content.includes('✱') || state.isPriorityInput;
    const isInspirationMarker = content.includes('!') || state.isInspirationInput;

    if (type === 'task' && isPriorityMarker) {
        if (!content.includes('✱')) {
             content = `✱ ${content.replace(/[\*!✱]/g, '').trim()}`; 
        }
    }
    
    if (type === 'note' && isInspirationMarker) {
        if (!content.includes('!')) {
             content = `! ${content.replace(/[\*!✱]/g, '').trim()}`;
        }
    }
    
    if (type === 'event') {
        content = content.replace(/[\*!✱]/g, '').trim();
    }
    
    state.isPriorityInput = false;
    state.isInspirationInput = false; 

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
        recurring: nlpResult.recurring,
        migrationCount: 0,
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
    state.prefs.viewMode = state.prefs.viewMode === 'visual' ? 'classic' : 'visual';
    saveData();
    render();
}

function render() {
    renderSidebar();
    
    document.querySelector('title').textContent = 'Synta Notes';
    
    const brandingHTML = `Synta <span class="text-stone-500">Notes</span>`;
    
    const brandingEl = document.getElementById('app-branding');
    if (brandingEl) brandingHTML;
    
    const mobileBrandingEl = document.getElementById('mobile-branding');
    if (mobileBrandingEl) mobileBrandingEl.innerHTML = brandingHTML;

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

function setupJournalInput() {
    const input = document.getElementById('entry-input');
    if (!input) return;

    input.value = state.inputText;
    
    input.oninput = (e) => {
        let val = e.target.value;
        let menuStateChanged = false;
        
        if (val.startsWith('/')) {
            if (!state.showSlashMenu) menuStateChanged = true;
            state.showSlashMenu = true;
        } else if (val.includes('>>')) {
             if (!state.showLinkMenu) menuStateChanged = true;
             state.showLinkMenu = true;
        } else { 
            if(state.showSlashMenu || state.showLinkMenu) { 
                menuStateChanged = true;
                state.showSlashMenu = false; 
                state.showLinkMenu = false;
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
        
        setTimeout(() => {
             const refocusedInput = document.getElementById('entry-input');
             if(refocusedInput) {
                 refocusedInput.focus();
                 const len = refocusedInput.value.length;
                 refocusedInput.setSelectionRange(len, len);
             }
        }, 10);
    };

    input.onkeydown = (e) => {
        if(e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addNewEntry();
        }
    };
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
        .filter(e => !e.completed && (e.content.includes('✱') || e.content.includes('*')))
        .sort((a,b) => (b.targetDate || b.id) - (a.targetDate || b.id));

    const recentItems = [...state.entries]
        .sort((a, b) => b.id - a.id)
        .slice(0, 3);
    
    const langOptions = { weekday: 'long', day:'numeric', month:'long' };
    
    return `
        <div class="space-y-8 fade-in">
            <header>
                <h1 class="text-3xl font-bold text-black dark:text-white">✱ ${T('nav_home')}</h1>
                <p class="text-stone-500 capitalize dark:text-stone-400">${new Date().toLocaleDateString(currentLang, langOptions)}</p>
            </header>

            <div class="mb-6 relative group">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i data-lucide="search" class="w-5 h-5 text-stone-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors"></i>
                </div>
                <input type="text" 
                    placeholder="${T('ui_search_placeholder')}" 
                    class="w-full bg-stone-50 border-2 border-stone-200 rounded-lg py-3 pl-10 pr-4 text-sm focus:border-black focus:bg-white outline-none transition-all dark:bg-stone-800 dark:border-stone-700 dark:focus:border-white dark:text-white"
                    onkeydown="if(event.key === 'Enter'){ state.searchQuery = this.value; render(); }"
                >
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="bg-stone-900 text-white p-5 border-2 border-black cursor-default relative overflow-hidden group dark:bg-stone-800 dark:border-stone-700">
                    <div class="flex items-center gap-2 mb-4 text-stone-400"><i data-lucide="calendar-days" class="w-4 h-4"></i> <span class="text-xs font-bold uppercase">${T('home_today')}</span></div>
                    <div class="text-4xl font-black mb-1">${new Date().getDate()}</div>
                    <div class="text-sm text-stone-400 uppercase tracking-widest">${new Date().toLocaleDateString(currentLang, {month:'long'})}</div>
                </div>

                <div onclick="setActiveTab('journal'); state.activeJournalPeriod='Todos'; render();" class="bg-white border-2 border-stone-200 p-5 hover:border-black transition-all cursor-pointer dark:bg-stone-900 dark:border-stone-700 dark:hover:border-white">
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
                           </div>`
                        : `<div class="text-stone-400 italic">${T('home_no_priority')}</div>`
                    }
                </div>

                <div onclick="setActiveTab('journal'); state.activeJournalPeriod='Futuro'; render();" class="bg-white border-2 border-stone-200 p-5 hover:border-black transition-all cursor-pointer dark:bg-stone-900 dark:border-stone-700 dark:hover:border-white">
                    <div class="flex items-center gap-2 mb-4 text-stone-500 dark:text-stone-400"><i data-lucide="clock" class="w-4 h-4"></i> <span class="text-xs font-bold uppercase">${T('home_next_event')}</span></div>
                    ${nextEvent 
                        ? `
                            <div class="font-bold text-lg leading-tight truncate dark:text-white">${nextEvent.content}</div>
                            <div class="text-xs text-black font-bold mt-2 bg-stone-100 inline-block px-2 py-1 border border-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-600">
                                ${new Date(nextEvent.targetDate).toLocaleDateString(currentLang, {day:'2-digit', month:'2-digit'})} 
                            </div>
                          ` 
                        : `<div class="text-stone-400 italic">${T('home_no_event')}</div>`
                    }
                </div>
            </div>

            <div class="mt-8">
                <h3 class="text-sm font-bold text-stone-500 uppercase mb-3 dark:text-stone-400">${T('home_recent')}</h3>
                <div class="bg-stone-50 border border-stone-200 rounded p-4 dark:bg-stone-900 dark:border-stone-700">
                    ${recentItems.length > 0 ? 
                        `<div class="space-y-3">
                            ${recentItems.map(e => `
                                <div class="flex items-center gap-3 text-sm border-b border-stone-100 last:border-0 pb-2 last:pb-0 dark:border-stone-800">
                                    <i data-lucide="${ENTRY_TYPES[e.type].icon}" class="w-3 h-3 text-stone-400"></i>
                                    <span class="truncate text-stone-700 dark:text-stone-300 flex-1">${e.content}</span>
                                    <span class="text-[10px] text-stone-400 whitespace-nowrap">${new Date(e.id).toLocaleTimeString(currentLang, {hour:'2-digit', minute:'2-digit'})}</span>
                                </div>
                            `).join('')}
                        </div>` 
                        : `<div class="text-stone-400 italic text-sm">${T('home_no_recent')}</div>`
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

// Renderiza o bloco de input
function renderInputBlock(placeholder, isGlobal = false) {
    const config = ENTRY_TYPES[state.selectedType];
    const charCount = state.inputText.length;
    const limit = config.limit;
    
    const selectTypeFunction = isGlobal ? 'selectGlobalEntryType' : 'selectEntryType';
    
    const typeOptions = Object.values(ENTRY_TYPES).map(t => `<button onclick="${selectTypeFunction}('${t.id}')" class="w-full text-left flex items-center gap-3 p-2 hover:bg-stone-100 transition-colors dark:hover:bg-stone-700 ${state.selectedType === t.id ? 'bg-stone-50 font-bold dark:bg-stone-600' : ''}"><i data-lucide="${t.icon}" class="w-4 h-4 text-black dark:text-white"></i><span class="text-sm text-black dark:text-white">${T(t.label)}</span></button>`).join('');
    const linkOptions = state.hubs.map(h => `<button onclick="insertLink('${h.name}')" class="w-full text-left p-2 hover:bg-stone-100 transition-colors text-sm font-bold flex items-center gap-2 dark:text-stone-300 dark:hover:bg-stone-700"><i data-lucide="hash" class="w-3 h-3 text-stone-400"></i> ${h.name}</button>`).join('');

    const inputId = isGlobal ? 'global-entry-input' : 'entry-input';
    const datePickerId = isGlobal ? 'global-date-picker-native' : 'date-picker-native';
    const dateBtnId = isGlobal ? 'global-date-button' : 'date-btn-icon';
    
    // Botões Condicionais (CANÔNICO)
    let conditionalButtons = '';
    
    const toggleFunc = isGlobal ? 
        'state.isPriorityInput = !state.isPriorityInput; state.isInspirationInput = false; renderGlobalInput();' :
        'togglePriorityInput();';
        
    const inspToggleFunc = isGlobal ?
        'state.isInspirationInput = !state.isInspirationInput; state.isPriorityInput = false; renderGlobalInput();' :
        'toggleInspirationInput();';

    if (config.id === 'task') {
        conditionalButtons = `
            <button onclick="${toggleFunc}" title="${T('pt-BR') === currentLang ? 'Marcar como Prioridade (✱) - BuJo' : 'Mark as Priority (✱) - BuJo'}" 
                    class="p-1.5 rounded transition-colors ${state.isPriorityInput ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-stone-400 hover:text-black dark:hover:text-white'}">
                <i data-lucide="star" class="w-4 h-4 fill-current"></i>
            </button>
        `;
    } else if (config.id === 'note') {
         conditionalButtons = `
            <button onclick="${inspToggleFunc}" title="${T('pt-BR') === currentLang ? 'Marcar como Inspiração (!) - BuJo' : 'Mark as Inspiration (!) - BuJo'}"
                    class="p-1.5 rounded transition-colors ${state.isInspirationInput ? 'bg-blue-600 text-white dark:bg-blue-400 dark:text-black' : 'text-stone-400 hover:text-black dark:hover:text-white'}">
                <i data-lucide="zap" class="w-4 h-4 fill-current"></i> 
            </button>
         `;
    }
    
    if (isGlobal) {
        // O HTML do input global é renderizado via JS no renderGlobalInput()
    }
    
    return `
        <div class="relative mb-6 z-20 group bg-stone-50 p-3 border border-stone-200 focus-within:border-black focus-within:shadow-lg transition-all flex items-start gap-3 dark:bg-stone-800 dark:border-stone-700 dark:focus-within:border-white">
            <button onclick="state.showSlashMenu = !state.showSlashMenu; state.showLinkMenu = false; render()" class="flex-shrink-0 flex items-center gap-2 bg-white border border-stone-300 px-2 py-1.5 rounded-sm hover:border-black transition-colors dark:bg-stone-900 dark:border-stone-600 dark:hover:border-white"><i data-lucide="${config.icon}" class="w-4 h-4 text-black dark:text-white"></i><span class="text-xs font-bold text-black hidden sm:inline-block dark:text-white">${T(config.label)}</span><i data-lucide="chevron-down" class="w-3 h-3 text-stone-400"></i></button>
            
            <div class="flex-1 relative">
                <input type="text" id="${inputId}" autocomplete="off" placeholder="${placeholder}" class="w-full bg-transparent text-sm outline-none font-medium placeholder:font-normal placeholder:text-stone-400 py-1.5 dark:text-white dark:placeholder:text-stone-500">
                ${limit ? `<div id="${isGlobal ? 'global-char-count' : 'char-count'}" class="absolute right-0 top-1.5 text-[10px] font-mono text-stone-400">${charCount}/${limit}</div>` : ''}
            </div>
            
            ${state.showSlashMenu ? `<div class="absolute top-full left-0 mt-1 w-48 bg-white border-2 border-black shadow-xl z-50 fade-in py-1 dark:bg-stone-800 dark:border-stone-600">${typeOptions}</div>` : ''}
            ${state.showLinkMenu ? `<div class="absolute top-full left-20 mt-1 w-48 bg-white border-2 border-black shadow-xl z-50 fade-in py-1 dark:bg-stone-800 dark:border-stone-600"><div class="px-2 py-1 text-[10px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100 mb-1 dark:border-stone-700">${currentLang === 'pt-BR' ? 'Linkar para...' : 'Link to...'}</div>${linkOptions}</div>` : ''}

            <div class="flex items-center flex-shrink-0">
                ${conditionalButtons}
                <div class="relative">
                    <input type="date" id="${datePickerId}" value="${state.inputDate || ''}" class="absolute inset-0 opacity-0 cursor-pointer" onchange="handleDateInput(this.value)">
                    <button id="${dateBtnId}" class="p-1.5 hover:bg-stone-200 rounded text-stone-400 hover:text-black dark:hover:text-white ${state.inputDate ? 'text-black font-bold dark:text-white' : ''}"><i data-lucide="calendar" class="w-4 h-4"></i></button>
                </div>
            </div>
        </div>
    `;
}


function getCommonSingleViewHTML(title, closeFunc, placeholder, hubId = null) {
    const list = getFilteredEntries();
    
    const inputBlock = renderInputBlock(placeholder);

    return `
        <div class="h-full flex flex-col fade-in relative">
            <div class="flex items-center justify-between border-b-2 border-stone-800 pb-4 mb-4 dark:border-stone-700">
                <div class="flex items-center gap-4">
                    <button onclick="${closeFunc.name}()" class="p-2 hover:bg-stone-100 rounded-full transition-colors dark:hover:bg-stone-800"><i data-lucide="arrow-left" class="w-6 h-6 dark:text-white"></i></button>
                    <h2 class="text-2xl font-bold dark:text-white">${title}</h2>
                </div>
                ${hubId ? `<div class="flex items-center gap-2"><button onclick="deleteHub(${hubId})" class="p-2 text-stone-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"><i data-lucide="trash-2" class="w-5 h-5"></i></button><button onclick="toggleViewMode()" class="p-2 rounded hover:bg-stone-100 transition-colors dark:hover:bg-stone-800"><i data-lucide="${state.prefs.viewMode === 'visual' ? 'layout-list' : 'layout-template'}" class="w-5 h-5 text-stone-500 hover:text-black dark:hover:text-white"></i></button></div>` : `<button onclick="toggleViewMode()" class="p-2 rounded hover:bg-stone-100 transition-colors dark:hover:bg-stone-800"><i data-lucide="${state.prefs.viewMode === 'visual' ? 'layout-list' : 'layout-template'}" class="w-5 h-5 text-stone-500 hover:text-black dark:hover:text-white"></i></button>`}
            </div>
            
            ${inputBlock}
            
            <div class="flex-1 overflow-y-auto pb-20 scrollbar-hide space-y-1" onclick="if(state.showSlashMenu || state.showLinkMenu){state.showSlashMenu=false; state.showLinkMenu=false; render()}">
                ${list.length > 0 ? list.map(entry => renderEntry(entry)).join('') : `<div class="text-center text-stone-400 mt-10 italic">${currentLang === 'pt-BR' ? 'Nenhum item ainda.' : 'No items yet.'}</div>`}
            </div>
        </div>
    `;
}

function getFilteredEntries() {
    let list = [];
    
    // Função auxiliar para criar data compatível com iOS (troca - por /)
    const createSafeDate = (val) => {
        if (!val) return new Date(); // Fallback para hoje
        return typeof val === 'string' ? new Date(val.replace(/-/g, '/')) : new Date(val);
    };

    if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        list = state.entries.filter(e => e.content.toLowerCase().includes(q));
    } else if (state.activeTab === 'journal') {
        // Timestamp de hoje zerado (00:00:00) para comparações simples
        const now = createSafeDate(new Date().toISOString().split('T')[0]);
        now.setHours(0,0,0,0);
        const todayStart = now.getTime();

        if (state.activeJournalPeriod === 'Todos') {
            list = state.entries;
        } else if (state.activeJournalPeriod === 'Hoje') {
            list = state.entries.filter(e => {
                const target = createSafeDate(e.targetDate || e.id);
                target.setHours(0,0,0,0);
                return target.getTime() === todayStart;
            });
        } else if (state.activeJournalPeriod === 'Futuro') {
            list = state.entries.filter(e => {
                const target = createSafeDate(e.targetDate || e.id);
                target.setHours(0,0,0,0);
                return target.getTime() > todayStart;
            });
        } else if (state.activeJournalPeriod === 'Período') {
            // 1. Pega as datas (ou usa Hoje se estiver vazio)
            const dStart = createSafeDate(state.filterStartDate || new Date().toISOString().split('T')[0]);
            const dEnd = createSafeDate(state.filterEndDate || new Date().toISOString().split('T')[0]);

            // 2. A MÁGICA: Define o início como 00:00 e o fim como 23:59
            dStart.setHours(0, 0, 0, 0);
            dEnd.setHours(23, 59, 59, 999);

            const startTime = dStart.getTime();
            const endTime = dEnd.getTime();

            list = state.entries.filter(e => {
                const target = createSafeDate(e.targetDate || e.id);
                const tTime = target.getTime();
                // Agora "mesmo dia" funciona porque vai de 00:00 até 23:59
                return tTime >= startTime && tTime <= endTime;
            });
        }
    } else if (state.activeTab === 'hubs' && state.activeHubId) {
        list = state.entries.filter(e => e.hubId == state.activeHubId);
    } else if (state.activeTab === 'collections' && state.activeTag) {
        list = state.entries.filter(e => e.content.includes(state.activeTag));
    }

    return list.sort((a, b) => (b.id || 0) - (a.id || 0));
}

function getJournalHTML() {
    const list = getFilteredEntries();
    
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
    
    const periodButtons = ['Hoje', 'Futuro', 'Período', 'Todos'].map(p => `
        <button onclick="state.activeJournalPeriod='${p}'; render()" 
            class="px-3 py-1 text-xs font-bold transition-all ${state.activeJournalPeriod === p ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-stone-500 hover:text-black dark:text-stone-400 dark:hover:text-white'}">
            ${T(PERIOD_MAP[p])}
        </button>
    `).join('');

    const inputBlock = renderInputBlock(T('ui_add_note_placeholder') + '/' + T('ui_add_note_placeholder_end'));

    return `
        <div class="h-full flex flex-col fade-in relative">
            <div class="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-stone-800 pb-4 mb-4 gap-3 dark:border-stone-700">
                <div class="flex items-center gap-4">
                    <h2 class="text-2xl font-bold dark:text-white">✱ ${T('nav_journal')}</h2>
                    <button onclick="toggleViewMode()" class="p-2 rounded hover:bg-stone-100 transition-colors dark:hover:bg-stone-800"><i data-lucide="${state.prefs.viewMode === 'visual' ? 'layout-list' : 'layout-template'}" class="w-5 h-5 text-stone-500 hover:text-black dark:hover:text-white"></i></button>
                </div>
                <div class="flex gap-1 bg-stone-100 p-1 rounded-sm self-start md:self-auto overflow-x-auto dark:bg-stone-800">
                    ${periodButtons}
                </div>
            </div>
            ${dateFilterHTML}

            ${inputBlock}
            
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
    if (state.prefs.viewMode === 'classic') {
        return renderClassicEntry(entry);
    }
    return renderVisualEntry(entry);
}

// ⚠️ ATUALIZADO: Interface de Edição (CANÔNICA)
function getEditEntryHTML(entry) {
    const config = ENTRY_TYPES[entry.type];
    const isClassic = state.prefs.viewMode === 'classic';
    const isPriority = (entry.content.includes('✱') || entry.content.includes('*')) && entry.type === 'task';
    const isInspiration = entry.content.includes('!') && entry.type === 'note'; 
    const entryDate = entry.targetDate ? new Date(entry.targetDate).toISOString().split('T')[0] : '';
    
    const hubOptions = state.hubs.map(h => 
        `<option value="${h.id}" ${entry.hubId == h.id ? 'selected' : ''}>${h.name}</option>`
    ).join('');
    
    let contextualButtons = '';
    
    if (entry.type === 'task') {
        // Botão Prioridade (Task)
        contextualButtons += `
            <button type="button" id="btn-edit-priority-${entry.id}" 
                onclick="this.dataset.active = this.dataset.active === 'true' ? 'false' : 'true'; this.className = this.dataset.active === 'true' ? 'p-1.5 rounded transition-colors bg-black text-white dark:bg-white dark:text-black' : 'p-1.5 rounded transition-colors text-stone-400 hover:text-black dark:hover:text-white'"
                data-active="${isPriority}"
                class="p-1.5 rounded transition-colors ${isPriority ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-stone-400 hover:text-black dark:hover:text-white'}"
                title="${T('ui_important')}">
                <i data-lucide="star" class="w-4 h-4 fill-current"></i>
            </button>
            
            `;
    } else if (entry.type === 'note') {
        // Botão Inspiração (Note)
        contextualButtons += `
            <button type="button" id="btn-edit-inspiration-${entry.id}"
                onclick="this.dataset.active = this.dataset.active === 'true' ? 'false' : 'true'; this.className = this.dataset.active === 'true' ? 'p-1.5 rounded transition-colors bg-blue-600 text-white dark:bg-blue-400 dark:text-black' : 'p-1.5 rounded transition-colors text-stone-400 hover:text-black dark:hover:text-white'"
                data-active="${isInspiration}"
                class="p-1.5 rounded transition-colors ${isInspiration ? 'bg-blue-600 text-white dark:bg-blue-400 dark:text-black' : 'text-stone-400 hover:text-black dark:hover:text-white'}"
                title="${T('type_inspiration')}">
                <i data-lucide="zap" class="w-4 h-4 fill-current"></i> 
            </button>
        `;
    }

    return `
        <div class="p-3 bg-stone-50 border-2 border-black rounded shadow-md ${isClassic ? 'font-mono' : 'font-sans'} dark:bg-stone-800 dark:border-stone-600">
            <div class="text-[10px] font-bold uppercase text-stone-600 mb-2 flex items-center justify-between dark:text-stone-400">
                 <div class="flex items-center gap-2">
                    <i data-lucide="${config.icon}" class="w-3 h-3"></i> ${T('ui_edit')} ${T(config.label)}
                 </div>
                 <div class="flex gap-1">
                    ${contextualButtons}
                 </div>
            </div>

            <textarea 
                id="edit-content-${entry.id}" 
                class="w-full bg-white border border-stone-300 p-2 text-sm resize-none outline-none focus:border-black rounded-sm ${isClassic ? 'font-mono' : 'font-sans'} dark:bg-stone-900 dark:border-stone-700 dark:text-white dark:focus:border-white mb-3"
                rows="${Math.max(2, Math.ceil(entry.content.length / 60))}"
                onkeydown="if(event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); saveEditEntry(${entry.id}); } else if(event.key === 'Escape') { state.editingEntryId = null; render(); }"
            >${entry.content}</textarea>

            <div class="flex items-end gap-3">
                <div class="flex-1">
                    <label for="edit-date-${entry.id}" class="block text-[10px] font-bold uppercase text-stone-500 mb-1">${T('ui_date')}</label>
                    <div class="relative">
                        <input type="date" id="edit-date-${entry.id}" value="${entryDate}" class="w-full p-1.5 pl-8 border border-stone-300 rounded text-sm dark:bg-stone-900 dark:border-stone-700 dark:text-white focus:border-black outline-none">
                        <i data-lucide="calendar" class="absolute left-2 top-2 w-4 h-4 text-stone-400"></i>
                    </div>
                </div>
                
                <div class="flex-1">
                    <label for="edit-hub-${entry.id}" class="block text-[10px] font-bold uppercase text-stone-500 mb-1">Hub</label>
                    <div class="relative">
                        <select id="edit-hub-${entry.id}" class="w-full p-1.5 pl-2 border border-stone-300 rounded text-sm dark:bg-stone-900 dark:border-stone-700 dark:text-white appearance-none focus:border-black outline-none">
                            <option value="">${T('pt-BR') === currentLang ? 'Sem Hub' : 'No Hub'}</option>
                            ${hubOptions}
                        </select>
                        <i data-lucide="chevron-down" class="absolute right-2 top-2 w-4 h-4 text-stone-400 pointer-events-none"></i>
                    </div>
                </div>

                <div class="flex gap-2">
                    <button onclick="saveEditEntry(${entry.id})" class="bg-black text-white px-3 py-1.5 text-xs font-bold rounded hover:bg-stone-800 dark:bg-white dark:text-black dark:hover:bg-stone-200 shadow-sm">
                        ${T('ui_save')}
                    </button>
                    <button onclick="state.editingEntryId = null; render()" class="bg-white text-black px-3 py-1.5 text-xs font-bold rounded border border-stone-300 hover:bg-stone-100 dark:bg-stone-800 dark:text-stone-200 dark:border-stone-700 dark:hover:bg-stone-700">
                        ${T('ui_cancel')}
                    </button>
                </div>
            </div>
        </div>
    `;
}

function escapeHtml(text) {
    if (!text) return text;
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function formatContent(text) {
    let formatted = escapeHtml(text);
    formatted = formatted.replace(/\n/g, '<br>');
    
    // TAGS
    formatted = formatted.replace(/(#[\w\u00C0-\u00FF]+)/g, '<button onclick="openCollection(\'$1\'); event.stopPropagation();" class="text-blue-600 hover:underline font-bold bg-blue-50 px-1 rounded mx-0.5 dark:bg-blue-900/30 dark:text-blue-400">$1</button>');
    
    // LINKS
    formatted = formatted.replace(/(?:>>|&gt;&gt;)\s*([^\n#<]+)/g, (match, p1) => {
        const linkText = p1.trim();
        return `<button onclick="handleLinkClick('${linkText}'); event.stopPropagation();" class="text-purple-700 hover:underline font-bold bg-purple-50 px-1 rounded mx-0.5 transition-colors dark:bg-purple-900/30 dark:text-purple-400">${linkText}</button>`;
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

// ♻️ ATUALIZADO: RENDERIZAÇÃO VISUAL (CANÔNICA)
function renderVisualEntry(entry) {
    const config = ENTRY_TYPES[entry.type];
    const dateDisplay = entry.targetDate ? new Date(entry.targetDate).toLocaleDateString(currentLang, {day:'2-digit', month:'2-digit'}) : '';
    const isCompleted = entry.completed;
    
    const isPriority = (entry.content.includes('✱') || entry.content.includes('*')) && entry.type === 'task';
    const isInspiration = entry.content.includes('!') && entry.type === 'note'; 
    const isMood = entry.type === 'mood'; // 1. Identifica se é Humor
    
    const rawContentCleaned = entry.content.replace(/✱/g, '').replace(/\*/g, '').replace(/!/g, '').replace(/[<>]/g, '').trim();
    const contentHtml = formatContent(rawContentCleaned);
    
    const migrationCount = entry.migrationCount > 0 ? ` [${entry.migrationCount}x]` : '';
    
    let borderColor = 'border-stone-100 dark:border-stone-800';
    if (!isCompleted) {
        if (isPriority) {
            borderColor = 'border-l-4 border-l-black border-y-stone-100 border-r-stone-100 dark:border-l-white dark:border-y-stone-800 dark:border-r-stone-800';
        } else if (isInspiration) {
            borderColor = 'border-l-4 border-l-blue-600 border-y-stone-100 border-r-stone-100 dark:border-l-blue-400 dark:border-y-stone-800 dark:border-r-stone-800';
        } else if (isMood) {
            // 2. Borda Cinza Escuro (Stone-600) para manter o P&B
            borderColor = 'border-l-4 border-l-stone-600 border-y-stone-100 border-r-stone-100 dark:border-l-stone-400 dark:border-y-stone-800 dark:border-r-stone-800';
        }
    }
    
    return `
        <div class="flex items-start gap-3 p-3 bg-white border ${borderColor} hover:border-stone-400 group transition-all dark:bg-stone-900 dark:hover:border-stone-600">
            <button onclick="toggleEntry(${entry.id})" class="${config.color} mt-0.5">
                <i data-lucide="${isCompleted && entry.type === 'task' ? 'check-square' : config.icon}" class="w-4 h-4 ${isCompleted ? 'opacity-30' : ''}"></i>
            </button>
            <div class="flex-1 min-w-0" onclick="startEditEntry(${entry.id})" id="entry-content-view-${entry.id}">
                <p class="text-sm ${isCompleted ? 'line-through text-stone-400' : 'text-stone-900 dark:text-stone-200'} leading-relaxed font-medium cursor-pointer">
                    ${contentHtml}
                    ${entry.recurring ? '<i data-lucide="repeat" class="w-3 h-3 inline text-stone-400 ml-1"></i>' : ''}
                </p>
                <div class="flex gap-3 mt-1">
                    <span class="text-[10px] text-stone-400 uppercase font-bold">${T(config.label)}${migrationCount}</span>
                    ${dateDisplay ? `<span class="text-[10px] bg-stone-100 text-stone-600 px-1 border border-stone-200 dark:bg-stone-800 dark:text-stone-400 dark:border-stone-700">${T('ui_date')}: ${dateDisplay}</span>` : ''}
                    
                    ${isInspiration && !isCompleted ? `<span class="text-[10px] bg-blue-600 text-white px-1 font-bold dark:bg-blue-400 dark:text-black">${T('type_inspiration').toUpperCase()}</span>` : ''}
                    ${isPriority && !isCompleted ? `<span class="text-[10px] bg-black text-white px-1 font-bold dark:bg-white dark:text-black">${T('ui_important')}</span>` : ''}
                    
                    ${isMood && !isCompleted ? `<span class="text-[10px] bg-stone-700 text-white px-1 font-bold dark:bg-stone-300 dark:text-black">${T('type_mood').toUpperCase()}</span>` : ''}
                </div>
            </div>
            
            <div class="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onclick="shareEntry(${entry.id})" class="text-stone-300 hover:text-blue-600 dark:hover:text-blue-400" title="Compartilhar">
                    <i data-lucide="share-2" class="w-4 h-4"></i>
                </button>
                <button onclick="deleteEntry(${entry.id})" class="text-stone-300 hover:text-red-600 dark:hover:text-red-400" title="Excluir">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                </button>
            </div>
        </div>
    `;
}

// ♻️ ATUALIZADO: RENDERIZAÇÃO CLÁSSICA (CANÔNICA: < e > para agendamento/migração)
function renderClassicEntry(entry) {
    const config = ENTRY_TYPES[entry.type];
    const isCompleted = entry.completed;
    const isPriority = (entry.content.includes('✱') || entry.content.includes('*')) && entry.type === 'task';
    const isInspiration = entry.content.includes('!') && entry.type === 'note';
    const dateDisplay = entry.targetDate ? new Date(entry.targetDate).toLocaleDateString(currentLang, {day:'2-digit', month:'2-digit'}) : '';
    const migrationCount = entry.migrationCount > 0 ? ` [${entry.migrationCount}x]` : '';
    
    const rawContentCleaned = entry.content.replace(/✱/g, '').replace(/\*/g, '').replace(/!/g, '').replace(/[<>]/g, '').trim();
    const contentHtml = formatContent(rawContentCleaned);
    
    const todayStart = getTodayStart();
    const targetDateStart = entry.targetDate ? new Date(entry.targetDate).setHours(0,0,0,0) : new Date(entry.id).setHours(0,0,0,0);
    const isScheduledToFuture = targetDateStart > todayStart && entry.type === 'task'; // Tarefa agendada/migrada
    const isScheduledToPast = targetDateStart < todayStart && !entry.completed && entry.type === 'task'; // Tarefa atrasada

    // Marcadores BuJo Canônicos
    let bujoSymbol = config.symbol;
    
    if (entry.type === 'task') {
        if (isCompleted) bujoSymbol = 'x'; // Concluído
        else if (isScheduledToFuture) bujoSymbol = '>'; // Migrado/Agendado
        else if (isScheduledToPast) bujoSymbol = '<'; // Agendado/Atrasado
        else if (isPriority) bujoSymbol = '✱'; // Prioridade
        else bujoSymbol = '•'; // Padrão
    } else if (entry.type === 'note' && isInspiration) {
        bujoSymbol = '!'; // Inspiração
    } else if (entry.type === 'mood') {
        bujoSymbol = '='; // Humor/Sentimento (Adicionado aqui)
    }

    return `
        <div class="group flex items-baseline gap-2 py-1 px-1 hover:bg-stone-50 rounded -ml-1 transition-colors cursor-default dark:hover:bg-stone-800">
            <button onclick="toggleEntry(${entry.id})" 
                class="font-mono font-bold w-5 text-center select-none ${isCompleted ? 'text-stone-300' : 'text-black hover:text-stone-600 dark:text-white dark:hover:text-stone-300'}">
                ${bujoSymbol}
            </button>
            <div class="flex-1 min-w-0 font-mono text-sm leading-relaxed ${isCompleted ? 'line-through text-stone-400' : (isPriority ? 'text-black font-bold dark:text-white' : 'text-stone-800 dark:text-stone-300')} cursor-pointer" onclick="startEditEntry(${entry.id})" id="entry-content-view-${entry.id}">
                ${contentHtml}
                ${dateDisplay ? `<span class="text-[10px] text-stone-400 ml-2 select-none font-sans">(${dateDisplay})${migrationCount}</span>` : ''}
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

function changeMonth(delta) {
    state.calendarMonth.setMonth(state.calendarMonth.getMonth() + delta);
    render();
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
        <div class="fade-in max-w-xl mx-auto pb-20">
            <h2 class="text-2xl font-bold mb-6 dark:text-white">${T('settings_title')}</h2>
            
            <div class="bg-white border-2 border-stone-200 p-6 mb-6 relative overflow-hidden dark:bg-stone-800 dark:border-stone-700">
                <h3 class="font-bold mb-2 text-black dark:text-white flex items-center gap-2">
                    <i data-lucide="cloud" class="w-5 h-5"></i> ${T('settings_gdrive_title')}
                </h3>
                <p class="text-sm text-stone-500 mb-4 dark:text-stone-400">
                    ${T('settings_gdrive_desc')}
                </p>
                <div class="flex gap-2">
                    <button onclick="handleAuthClick('upload')" class="flex items-center gap-2 bg-black text-white px-4 py-2 text-xs font-bold border-2 border-black hover:bg-stone-800 transition-colors dark:bg-white dark:text-black dark:hover:bg-stone-200">
                        <i data-lucide="upload-cloud" class="w-4 h-4"></i> ${T('settings_gdrive_btn_upload')}
                    </button>
                    <button onclick="handleAuthClick('download')" class="flex items-center gap-2 bg-white text-black px-4 py-2 text-xs font-bold border-2 border-stone-300 hover:border-black hover:bg-stone-50 transition-all dark:bg-stone-700 dark:text-white dark:border-stone-600 dark:hover:bg-stone-600">
                        <i data-lucide="download-cloud" class="w-4 h-4"></i> ${T('settings_gdrive_btn_download')}
                    </button>
                </div>
            </div>

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

            <div class="bg-white border-2 border-stone-200 p-6 mb-6 dark:bg-stone-800 dark:border-stone-700">
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

            <div class="flex justify-between items-center pt-4 opacity-40 hover:opacity-100 transition-opacity border-t border-stone-200 dark:border-stone-800">
                <span class="text-[10px] font-bold uppercase tracking-widest dark:text-white">${T('settings_version')}</span>
                <span class="text-[10px] font-mono bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded dark:text-stone-400">${APP_VERSION}</span>
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
    a.download = `synta_backup_${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function isValidBackup(data) {
    return (
        data &&
        typeof data === 'object' &&
        Array.isArray(data.entries) &&
        Array.isArray(data.hubs)
    );
}

function mergeImportedData(currentData, importedData) {
    const currentEntries = Array.isArray(currentData.entries) ? currentData.entries : [];
    const importedEntries = Array.isArray(importedData.entries) ? importedData.entries : [];

    const currentHubs = Array.isArray(currentData.hubs) ? currentData.hubs : [];
    const importedHubs = Array.isArray(importedData.hubs) ? importedData.hubs : [];

    const currentTagUsage = currentData.tagUsage || {};
    const importedTagUsage = importedData.tagUsage || {};

    const currentPrefs = currentData.prefs || {};
    const importedPrefs = importedData.prefs || {};

    const existingEntryIds = new Set(currentEntries.map(e => e.id));
    const uniqueImportedEntries = importedEntries.filter(
        entry => entry && !existingEntryIds.has(entry.id)
    );
    const newEntries = [...currentEntries, ...uniqueImportedEntries];

    const existingHubIds = new Set(currentHubs.map(h => h.id));
    const uniqueImportedHubs = importedHubs.filter(
        hub => hub && !existingHubIds.has(hub.id)
    );
    const newHubs = [...currentHubs, ...uniqueImportedHubs];

    const newTagUsage = { ...currentTagUsage };
    for (const tag in importedTagUsage) {
        newTagUsage[tag] = (newTagUsage[tag] || 0) + importedTagUsage[tag];
    }

    const newPrefs = {
        ...currentPrefs,
        ...importedPrefs
    };

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
                showModal(T('settings_restore_q'), mergeMessage, T('ui_delete_confirm'), () => {
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

function showModal(title, msg, actionBtnText, onAction) { 
    const modal = document.getElementById('app-modal');
    const titleEl = document.getElementById('modal-title');
    const msgEl = document.getElementById('modal-message');
    const confirmBtn = document.getElementById('modal-confirm');
    const cancelBtn = document.getElementById('modal-cancel');
    if(!modal) return;
    titleEl.innerText = title;
    msgEl.innerHTML = msg; 
    
    const newConfirmBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
    const newCancelBtn = cancelBtn.cloneNode(true);
    cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);

    if (onAction) {
        newCancelBtn.classList.remove('hidden');
        newConfirmBtn.innerText = actionBtnText || T('ui_delete_confirm');
        newConfirmBtn.onclick = () => {
            onAction();
            closeModal(); 
        };
        newCancelBtn.onclick = closeModal;
    } else {
        newCancelBtn.classList.add('hidden'); 
        newConfirmBtn.innerText = actionBtnText || 'OK';
        newConfirmBtn.onclick = closeModal;
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

// ==========================================
// ☁️ INTEGRAÇÃO GOOGLE DRIVE
// ==========================================

const CLIENT_ID = '173913188559-olttmpg5j7i6c8dje4as4rldqfn85tnv.apps.googleusercontent.com'; // SEU ID
const SCOPES = 'https://www.googleapis.com/auth/drive.file';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
// ⚠️ ATUALIZADO: Nome do arquivo no Google Drive
const DRIVE_FILE_NAME = 'synta_notes_v3_data.json';


let tokenClient;
let gapiInited = false;
let gisInited = false;

function gapiLoaded() {
    gapi.load('client', async () => {
        await gapi.client.init({
            discoveryDocs: [DISCOVERY_DOC],
        });
        gapiInited = true;
    });
}

function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '', // Definido no clique
    });
    gisInited = true;
}

function handleAuthClick(action) {
    if (!gapiInited || !gisInited) {
        showModal('Aguarde', 'Conectando ao Google... (se demorar, recarregue a página)');
        return;
    }

    tokenClient.callback = async (resp) => {
        if (resp.error) throw resp;
        if (action === 'upload') await uploadToDrive();
        if (action === 'download') await downloadFromDrive();
    };

    const token = gapi.client.getToken();
    if (token === null) {
        tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
        tokenClient.requestAccessToken({prompt: ''});
    }
}

async function uploadToDrive() {
    try {
        showModal('Google Drive', 'Enviando dados para a nuvem...');
        
        // 1. Verifica se arquivo já existe
        const res = await gapi.client.drive.files.list({
            q: `name = '${DRIVE_FILE_NAME}' and trashed = false`,
            fields: 'files(id, name)',
            spaces: 'drive'
        });

        const files = res.result.files;
        const content = JSON.stringify({
			...state,
			backupDate: new Date().toISOString(),
			backupSource: 'google-drive'
		});


        if (files && files.length > 0) {
            // Atualiza existente
            await gapi.client.request({
                path: '/upload/drive/v3/files/' + files[0].id,
                method: 'PATCH',
                params: {uploadType: 'media'},
                body: content
            });
            showModal('Sucesso', 'Backup atualizado no Google Drive!');
        } else {
            // Cria novo (requer multipart)
            const metadata = { name: DRIVE_FILE_NAME, mimeType: 'application/json' };
            const form = new FormData();
            form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
            form.append('file', new Blob([content], {type: 'application/json'}));

            await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
                method: 'POST',
                headers: {'Authorization': 'Bearer ' + gapi.client.getToken().access_token},
                body: form
            });
            showModal('Sucesso', 'Novo backup criado no Google Drive!');
        }
    } catch (err) {
        console.error(err);
        showModal('Erro', 'Falha ao salvar no Drive. Verifique se você autorizou o acesso.');
    }
}

async function downloadFromDrive() {
    try {
        showModal('Google Drive', 'Buscando dados na nuvem...');
        
        const res = await gapi.client.drive.files.list({
            q: `name = '${DRIVE_FILE_NAME}' and trashed = false`,
            fields: 'files(id, name)',
            spaces: 'drive'
        });

        const files = res.result.files;
        if (files && files.length > 0) {
            const fileId = files[0].id;
            const result = await gapi.client.drive.files.get({ fileId: fileId, alt: 'media' });
            
            const importedData =
				typeof result.result === 'string'
				? JSON.parse(result.result)
				: result.result;

			if (!isValidBackup(importedData)) {
				throw new Error('Arquivo do Drive não é um backup válido.');
			}


			const mergedData = mergeImportedData({
				entries: state.entries,
				hubs: state.hubs,
				tagUsage: state.tagUsage,
				prefs: state.prefs
			}, importedData);

			saveState(mergedData);


            state.entries = mergedData.entries;
            state.hubs = mergedData.hubs;
            state.tagUsage = mergedData.tagUsage;
            state.prefs = mergedData.prefs;
            
            saveData();
            render();
            showModal('Sucesso', 'Dados sincronizados do Google Drive!');
        } else {
            showModal('Aviso', 'Nenhum backup encontrado no Drive.');
        }
    } catch (err) {
        console.error(err);
        showModal('Erro', 'Falha ao baixar do Drive.');
    }
}

init();
