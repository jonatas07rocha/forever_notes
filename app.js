// --- CONSTANTES ---
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
        type_task: 'Tarefa',
        type_event: 'Evento',
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
        ui_delete_confirm: 'Confirmar',
        ui_cancel: 'Cancelar',
        ui_save: 'Salvar',
        ui_migrated: 'Migrado',
        ui_scheduled: 'Agendado',
        ui_completed: 'Concluído',
        ui_add_note_placeholder: 'O que está acontecendo? (/ para comandos)',
        ui_search_placeholder: 'Buscar itens',
        ui_item_long: 'Texto muito longo',
        ui_delete_item_q: 'Excluir item?',
        ui_delete_item_msg: 'Deseja remover este item permanentemente?',
        modal_friction_title: 'Pausa para Reflexão',
        modal_friction_msg: 'Você adiou esta tarefa 3 vezes. Ela ainda é importante? Se sim, por quê?',
        modal_friction_placeholder: 'Explique a importância ou deixe vazio para excluir.',
        modal_review_title: 'Revisão Matinal',
        modal_review_msg: 'Tarefas pendentes de ontem. O que fazer com elas?',
        btn_keep: 'Manter (Hoje)',
        btn_migrate: 'Migrar (Mover p/ frente)',
        btn_schedule: 'Agendar (Futuro)',
        btn_delete: 'Excluir',
    },
    'en-US': {
        app_title: 'Synta Notes',
        type_note: 'Note',
        type_task: 'Task',
        type_event: 'Event',
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
        ui_delete_confirm: 'Confirm',
        ui_cancel: 'Cancel',
        ui_save: 'Save',
        ui_migrated: 'Migrated',
        ui_scheduled: 'Scheduled',
        ui_completed: 'Completed',
        ui_add_note_placeholder: "What's happening? (/ for commands)",
        ui_search_placeholder: 'Search items',
        ui_item_long: 'Text too long',
        ui_delete_item_q: 'Delete item?',
        ui_delete_item_msg: 'Do you want to permanently remove this item?',
        modal_friction_title: 'Reflection Pause',
        modal_friction_msg: 'You migrated this task 3 times. Is it still important? If so, why?',
        modal_friction_placeholder: 'Explain importance or leave empty to delete.',
        modal_review_title: 'Morning Review',
        modal_review_msg: 'Pending tasks from yesterday. What to do?',
        btn_keep: 'Keep (Today)',
        btn_migrate: 'Migrate (Push forward)',
        btn_schedule: 'Schedule (Future)',
        btn_delete: 'Delete',
    }
};

const T = (key, lang = currentLang) => {
    return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key] !== undefined) ? TRANSLATIONS[lang][key] : TRANSLATIONS['pt-BR'][key] || key;
};

// --- DEFINIÇÕES DO MÉTODO BULLET JOURNAL ---
const ENTRY_TYPES = {
    task: { id: 'task', label: 'type_task', icon: 'square', symbol: '•', limit: 140 }, 
    event: { id: 'event', label: 'type_event', icon: 'circle', symbol: '○', limit: 140 },
    note: { id: 'note', label: 'type_note', icon: 'minus', symbol: '—', limit: null }
};

// Estados da Tarefa
const TASK_STATUS = {
    INCOMPLETE: 'incomplete',
    COMPLETED: 'completed',  // X
    MIGRATED: 'migrated',    // >
    SCHEDULED: 'scheduled'   // <
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
    inputSignifiers: { priority: false, inspiration: false }, // ESTADO DOS BOTÕES TOGGLE
    selectedType: 'task', 
    showSlashMenu: false, 
    showLinkMenu: false,
    pendingReviewEntries: [],
    prefs: {
        viewMode: 'visual', 
        showAlertOnUnload: true,
        theme: 'light',
        lang: 'pt-BR',
        lastReviewDate: null
    }
};

// --- INICIALIZAÇÃO ---
function init() {
    loadData();
    migrateOldData(); 
    
    const prefs = JSON.parse(localStorage.getItem(PREFS_KEY) || '{}');
    state.prefs = { ...state.prefs, ...prefs };
    currentLang = state.prefs.lang;
    
    applyTheme(state.prefs.theme); 
    
    if (state.hubs.length === 0) {
        state.hubs = [
            { id: 1, name: "✱ Pessoal", icon: "user", count: 0 },
            { id: 2, name: "✱ Trabalho", icon: "briefcase", count: 0 }
        ];
    }
    
    render();
    window.addEventListener('keydown', handleGlobalKeydown);
    setupUnloadAlert();
    
    // Tenta rodar a revisão matinal após renderizar
    setTimeout(checkMorningReview, 1000);
}

// Adapta dados antigos para a nova estrutura estrita
function migrateOldData() {
    let changed = false;
    state.entries = state.entries.map(e => {
        let newEntry = { ...e };
        
        // 1. Converte tipos antigos
        if (e.type === 'reflection') {
            newEntry.type = 'note';
            if (!newEntry.content.includes('#reflexao')) newEntry.content += ' #reflexao';
            changed = true;
        } else if (e.type === 'idea') {
            newEntry.type = 'note';
            newEntry.isInspiration = true;
            changed = true;
        }

        // 2. Converte booleano completed para status
        if (!newEntry.status) {
            if (newEntry.completed) newEntry.status = TASK_STATUS.COMPLETED;
            else newEntry.status = TASK_STATUS.INCOMPLETE;
            delete newEntry.completed; 
            changed = true;
        }
        
        if (typeof newEntry.migrationCount === 'undefined') {
            newEntry.migrationCount = 0;
        }

        return newEntry;
    });

    if (changed) saveData();
}

// --- RITUAIS & FRICÇÃO ---

function checkMorningReview() {
    const todayStr = new Date().toISOString().split('T')[0];
    if (state.prefs.lastReviewDate === todayStr) return;

    const pending = state.entries.filter(e => {
        if (e.type !== 'task') return false;
        if (e.status !== TASK_STATUS.INCOMPLETE) return false;
        
        const entryDate = e.targetDate ? new Date(e.targetDate) : new Date(e.id);
        entryDate.setHours(0,0,0,0);
        const today = new Date();
        today.setHours(0,0,0,0);
        
        return entryDate < today;
    });

    if (pending.length > 0) {
        state.pendingReviewEntries = pending;
        openReviewModal();
    }
}

function openReviewModal() {
    const modal = document.getElementById('review-modal');
    if (!modal) return;
    renderReviewList();
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.remove('opacity-0'), 10);
}

function closeReviewModal() {
    const modal = document.getElementById('review-modal');
    if (!modal) return;
    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
        state.prefs.lastReviewDate = new Date().toISOString().split('T')[0];
        saveData();
    }, 200);
}

function renderReviewList() {
    const container = document.getElementById('review-list-container');
    if (!container) return;
    
    if (state.pendingReviewEntries.length === 0) {
        closeReviewModal();
        return;
    }

    container.innerHTML = state.pendingReviewEntries.map(e => `
        <div class="bg-stone-50 p-4 rounded border border-stone-200 mb-3 dark:bg-stone-800 dark:border-stone-700">
            <p class="font-bold text-sm mb-3 text-stone-800 dark:text-stone-200">${e.content}</p>
            <div class="flex flex-wrap gap-2">
                <button onclick="reviewAction(${e.id}, 'keep')" class="flex-1 bg-white border border-stone-300 text-xs py-2 rounded hover:bg-stone-100 dark:bg-stone-700 dark:border-stone-600 dark:text-white">${T('btn_keep')}</button>
                <button onclick="reviewAction(${e.id}, 'migrate')" class="flex-1 bg-stone-200 border border-stone-300 text-xs py-2 rounded hover:bg-stone-300 dark:bg-stone-600 dark:border-stone-500 dark:text-white">${T('btn_migrate')} (>)</button>
                <button onclick="reviewAction(${e.id}, 'schedule')" class="flex-1 bg-stone-200 border border-stone-300 text-xs py-2 rounded hover:bg-stone-300 dark:bg-stone-600 dark:border-stone-500 dark:text-white">${T('btn_schedule')} (<)</button>
                <button onclick="reviewAction(${e.id}, 'delete')" class="px-3 bg-red-100 text-red-700 border border-red-200 text-xs py-2 rounded hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

function reviewAction(id, action) {
    const entry = state.entries.find(e => e.id === id);
    if (!entry) return;

    if (action === 'keep') {
        entry.targetDate = new Date().getTime(); 
    } else if (action === 'migrate') {
        handleMigration(entry);
    } else if (action === 'schedule') {
        handleScheduling(entry);
    } else if (action === 'delete') {
        state.entries = state.entries.filter(e => e.id !== id);
    }

    state.pendingReviewEntries = state.pendingReviewEntries.filter(e => e.id !== id);
    saveData();
    renderReviewList();
    render(); 
}

function handleMigration(entry) {
    if (entry.migrationCount >= 3) {
        showFrictionModal(entry, 'migrate');
    } else {
        performMigration(entry);
    }
}

function performMigration(entry) {
    entry.status = TASK_STATUS.MIGRATED;
    const newEntry = {
        ...entry,
        id: Date.now(), 
        status: TASK_STATUS.INCOMPLETE,
        migrationCount: (entry.migrationCount || 0) + 1,
        targetDate: new Date().getTime() 
    };
    state.entries.unshift(newEntry);
    saveData();
    render();
}

function handleScheduling(entry) {
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.onchange = (e) => {
        if (e.target.value) {
            const parts = e.target.value.split('-');
            const date = new Date(parts[0], parts[1] - 1, parts[2]);
            
            entry.status = TASK_STATUS.SCHEDULED;
            
            const newEntry = {
                ...entry,
                id: Date.now(),
                status: TASK_STATUS.INCOMPLETE,
                targetDate: date.getTime(),
                migrationCount: (entry.migrationCount || 0) + 1
            };
            state.entries.unshift(newEntry);
            saveData();
            render();
        }
    };
    dateInput.click(); 
}

function showFrictionModal(entry, intent) {
    const modal = document.getElementById('friction-modal');
    if(!modal) return;
    
    document.getElementById('friction-btn-confirm').onclick = () => {
        const reason = document.getElementById('friction-input').value.trim();
        if (reason) {
            entry.content += ` [Justificativa: ${reason}]`; 
            if (intent === 'migrate') performMigration(entry);
            closeFrictionModal();
        } else {
            deleteEntry(entry.id);
            closeFrictionModal();
        }
    };
    
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.remove('opacity-0'), 10);
    document.getElementById('friction-input').focus();
}

function closeFrictionModal() {
    const modal = document.getElementById('friction-modal');
    if(!modal) return;
    document.getElementById('friction-input').value = '';
    modal.classList.add('opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 200);
}

// --- FUNÇÃO DE INPUT TOGGLE (NOVO) ---
function toggleInputSignifier(type) {
    state.inputSignifiers[type] = !state.inputSignifiers[type];
    
    const btn = document.getElementById(`btn-toggle-${type}`);
    // O problema A estava aqui: a função toggleInputSignifier não estava
    // garantindo a atualização visual se fosse chamada pelo menu de tipos.
    // Isso é corrigido em renderGlobalInput, que chama esta função
    // para sincronizar o estado visual.
    
    // Atualização visual (Ajuste de estilos):
    if (btn) {
        const icon = btn.querySelector('i');
        if (state.inputSignifiers[type]) {
            btn.classList.add('bg-stone-100', 'text-black', 'dark:bg-stone-700', 'dark:text-white');
            btn.classList.remove('text-stone-400');
            if (type === 'priority') icon.setAttribute('fill', 'currentColor'); 
        } else {
            btn.classList.remove('bg-stone-100', 'text-black', 'dark:bg-stone-700', 'dark:text-white');
            btn.classList.add('text-stone-400');
            if (type === 'priority') icon.setAttribute('fill', 'none');
        }
    }
}

// --- FUNÇÕES GERAIS E RENDERIZAÇÃO ---

function render() {
    const navMenu = document.getElementById('nav-menu');
    const mobileNav = document.getElementById('nav-menu-mobile');
    const mainContainer = document.getElementById('main-container');
    const globalInputContainer = document.getElementById('global-input-modal');
    
    if (navMenu) navMenu.innerHTML = getNavHtml();
    if (mobileNav) mobileNav.innerHTML = getNavHtml();
    
    document.getElementById('nav-settings-text').textContent = T('nav_settings');
    document.getElementById('nav-feedback-text').textContent = T('nav_feedback');
    document.getElementById('mobile-settings-text').textContent = T('nav_settings');
    document.getElementById('mobile-feedback-text').textContent = T('nav_feedback');

    if (state.activeTab === 'home') {
        mainContainer.innerHTML = getHomeHtml();
        lucide.createIcons();
        if (!globalInputContainer.classList.contains('hidden')) {
            setTimeout(() => document.getElementById('global-entry-input').focus(), 50);
        }
    } else if (state.activeTab === 'journal') {
        mainContainer.innerHTML = getJournalHtml();
        lucide.createIcons();
    } else if (state.activeTab === 'hubs') {
        mainContainer.innerHTML = getHubsHtml();
        lucide.createIcons();
    } else if (state.activeTab === 'collections') {
        mainContainer.innerHTML = getCollectionsHtml();
        lucide.createIcons();
    } else if (state.activeTab === 'settings') {
        mainContainer.innerHTML = getSettingsHtml();
        lucide.createIcons();
    }
}

function renderVisualEntry(entry) {
    const config = ENTRY_TYPES[entry.type];
    const isPriority = entry.isPriority; 
    const isInspiration = entry.isInspiration;
    const contentHtml = formatContent(entry.content);
    
    // Lógica de Precedência Visual: Significador substitui o ícone padrão
    let iconName = config.icon; 
    let iconFill = "none";      

    if (entry.status === TASK_STATUS.INCOMPLETE) {
        if (isPriority) {
            iconName = 'star';
        } else if (isInspiration) {
            iconName = 'alert-circle';
        }
    }
    
    let statusClass = "text-stone-900 dark:text-stone-200";
    let iconClass = "text-stone-400 dark:text-stone-500 hover:text-black dark:hover:text-white transition-colors";
    
    if (entry.type === 'task') {
        switch(entry.status) {
            case TASK_STATUS.COMPLETED:
                iconName = 'check-square';
                statusClass = "line-through text-stone-400";
                iconClass = "text-stone-300"; 
                break;
            case TASK_STATUS.MIGRATED:
                iconName = 'arrow-right-circle';
                iconClass = "text-stone-400";
                statusClass = "text-stone-400 italic";
                break;
            case TASK_STATUS.SCHEDULED:
                iconName = 'calendar-clock'; 
                iconClass = "text-stone-400";
                statusClass = "text-stone-400 italic";
                break;
        }
    }

    if (isPriority && entry.status === TASK_STATUS.INCOMPLETE) {
        iconClass = "text-black dark:text-white font-bold"; 
        iconFill = "currentColor"; 
    }
    if (isInspiration && entry.status === TASK_STATUS.INCOMPLETE) {
        iconClass = "text-stone-800 dark:text-stone-200"; 
    }

    return `
        <div class="flex items-start gap-3 p-3 bg-white border border-stone-100 hover:border-stone-400 group transition-all dark:bg-stone-900 dark:border-stone-800 dark:hover:border-stone-600 relative">
            
            <button onclick="cycleTaskStatus(${entry.id})" class="mt-0.5 ${iconClass}">
                <i data-lucide="${iconName}" class="w-4 h-4" fill="${iconFill}"></i>
            </button>

            <div class="flex-1 min-w-0" onclick="startEditEntry(${entry.id})">
                <p class="text-sm ${statusClass} leading-relaxed font-medium cursor-pointer">
                    ${contentHtml}
                </p>
            </div>
            
            <div class="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 top-2 bg-white dark:bg-stone-900 p-1 shadow-sm border border-stone-100 dark:border-stone-700 rounded z-10">
                ${entry.type === 'task' && entry.status === TASK_STATUS.INCOMPLETE ? `
                    <button onclick="handleMigration(state.entries.find(e=>e.id===${entry.id}))" class="text-stone-400 hover:text-black dark:hover:text-white" title="Migrar (>)">
                        <i data-lucide="arrow-right" class="w-3 h-3"></i>
                    </button>
                    <button onclick="handleScheduling(state.entries.find(e=>e.id===${entry.id}))" class="text-stone-400 hover:text-black dark:hover:text-white" title="Agendar (<)">
                        <i data-lucide="calendar" class="w-3 h-3"></i>
                    </button>
                ` : ''}
                <button onclick="deleteEntry(${entry.id})" class="text-stone-400 hover:text-red-600" title="Excluir">
                    <i data-lucide="trash-2" class="w-3 h-3"></i>
                </button>
            </div>
        </div>
    `;
}

function renderClassicEntry(entry) {
    const config = ENTRY_TYPES[entry.type];
    const isPriority = entry.isPriority;
    const isInspiration = entry.isInspiration;
    const contentHtml = formatContent(entry.content);
    
    let symbol = config.symbol; 
    
    if (entry.type === 'task') {
        if (entry.status === TASK_STATUS.COMPLETED) symbol = 'X';
        else if (entry.status === TASK_STATUS.MIGRATED) symbol = '>';
        else if (entry.status === TASK_STATUS.SCHEDULED) symbol = '<';
    }

    // Precedência Visual: Significador substitui bullet se incompleto
    if (entry.status === TASK_STATUS.INCOMPLETE) {
        if (isPriority) symbol = '*';
        else if (isInspiration) symbol = '!';
    }

    return `
        <div class="group flex items-baseline gap-2 py-1 px-1 hover:bg-stone-50 rounded -ml-1 transition-colors cursor-default dark:hover:bg-stone-800 font-mono text-sm">
            
            <div class="w-8 text-right select-none font-bold text-black dark:text-white flex-shrink-0">
                <button onclick="cycleTaskStatus(${entry.id})" class="hover:text-stone-500 transition-colors">
                    ${symbol}
                </button>
            </div>

            <div class="flex-1 min-w-0 ${entry.status === TASK_STATUS.COMPLETED ? 'line-through text-stone-400' : 'text-stone-800 dark:text-stone-300'}" 
                 onclick="startEditEntry(${entry.id})">
                ${contentHtml}
            </div>

             <div class="opacity-0 group-hover:opacity-100 flex gap-2 pl-2">
                ${entry.type === 'task' && entry.status === TASK_STATUS.INCOMPLETE ? `
                    <button onclick="handleMigration(state.entries.find(e=>e.id===${entry.id}))" class="text-stone-300 hover:text-black dark:hover:text-white">></button>
                    <button onclick="handleScheduling(state.entries.find(e=>e.id===${entry.id}))" class="text-stone-300 hover:text-black dark:hover:text-white"><</button>
                ` : ''}
                <button onclick="deleteEntry(${entry.id})" class="text-stone-300 hover:text-red-500">x</button>
            </div>
        </div>
    `;
}

function getHomeHtml() {
    const today = new Date().toISOString().split('T')[0];
    const todayEntries = state.entries.filter(e => {
        if (!e.targetDate) return false;
        const d = new Date(e.targetDate).toISOString().split('T')[0];
        return d === today;
    });

    const priorityEntries = state.entries.filter(e => e.isPriority && e.status === TASK_STATUS.INCOMPLETE);
    const recentEntries = state.entries.slice(0, 5);
    
    const nextEvent = state.entries
        .filter(e => e.type === 'event' && e.targetDate && new Date(e.targetDate) >= new Date())
        .sort((a,b) => a.targetDate - b.targetDate)[0];

    const renderer = state.prefs.viewMode === 'visual' ? renderVisualEntry : renderClassicEntry;

    return `
        <div class="flex items-center justify-between mb-8">
            <div>
                <h1 class="text-3xl font-bold tracking-tight mb-1 text-black dark:text-white">${T('home_today')}</h1>
                <p class="text-stone-500 dark:text-stone-400">${new Date().toLocaleDateString(currentLang, { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            </div>
            <div class="flex gap-2">
                 <button onclick="openGlobalInput()" class="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-stone-800 shadow-lg transition-all dark:bg-white dark:text-black dark:hover:bg-stone-200">
                    <i data-lucide="plus" class="w-5 h-5"></i>
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2 space-y-8">
                <section>
                    <div class="flex items-center gap-2 mb-4 text-stone-800 dark:text-stone-200">
                        <i data-lucide="check-circle-2" class="w-4 h-4"></i>
                        <h2 class="font-bold text-sm uppercase tracking-wide">Foco de Hoje</h2>
                    </div>
                    ${todayEntries.length > 0 
                        ? `<div class="space-y-2">${todayEntries.map(renderer).join('')}</div>`
                        : `<div class="p-8 border-2 border-dashed border-stone-200 rounded text-center dark:border-stone-700">
                               <p class="text-stone-400 text-sm">Nada planejado para hoje.</p>
                               <button onclick="openGlobalInput()" class="mt-2 text-sm font-bold underline">Adicionar tarefa</button>
                           </div>`
                    }
                </section>
                
                 <section>
                    <div class="flex items-center gap-2 mb-4 text-stone-800 dark:text-stone-200">
                        <i data-lucide="clock" class="w-4 h-4"></i>
                        <h2 class="font-bold text-sm uppercase tracking-wide">${T('home_recent')}</h2>
                    </div>
                     <div class="space-y-2">
                        ${recentEntries.length > 0 ? recentEntries.map(renderer).join('') : `<p class="text-stone-400 text-sm">${T('home_no_recent')}</p>`}
                    </div>
                </section>
            </div>

            <div class="space-y-8">
                <section class="bg-stone-50 p-6 rounded border border-stone-100 dark:bg-stone-850 dark:border-stone-800">
                    <div class="flex items-center gap-2 mb-4 text-stone-800 dark:text-stone-200">
                        <i data-lucide="star" class="w-4 h-4 fill-stone-800 dark:fill-stone-200"></i>
                        <h2 class="font-bold text-sm uppercase tracking-wide">${T('home_priorities')}</h2>
                    </div>
                    <div class="space-y-3">
                         ${priorityEntries.length > 0 
                            ? priorityEntries.map(renderer).join('') 
                            : `<p class="text-stone-400 text-sm italic">${T('home_no_priority')}</p>`
                        }
                    </div>
                </section>

                <section class="bg-stone-50 p-6 rounded border border-stone-100 dark:bg-stone-850 dark:border-stone-800">
                    <div class="flex items-center gap-2 mb-4 text-stone-800 dark:text-stone-200">
                        <i data-lucide="calendar" class="w-4 h-4"></i>
                        <h2 class="font-bold text-sm uppercase tracking-wide">${T('home_next_event')}</h2>
                    </div>
                    ${nextEvent 
                        ? `<div class="bg-white p-4 rounded border-l-4 border-black shadow-sm dark:bg-stone-900 dark:border-stone-100">
                             <p class="font-bold text-lg mb-1 dark:text-white">${nextEvent.content}</p>
                             <p class="text-sm text-stone-500 dark:text-stone-400">${new Date(nextEvent.targetDate).toLocaleDateString(currentLang)}</p>
                           </div>`
                        : `<p class="text-stone-400 text-sm italic">${T('home_no_event')}</p>`
                    }
                </section>
            </div>
        </div>
    `;
}

function getJournalHtml() {
    const renderer = state.prefs.viewMode === 'visual' ? renderVisualEntry : renderClassicEntry;
    
    let filteredEntries = [];
    let title = "";

    if (state.activeJournalPeriod === 'Hoje') {
        const today = new Date().toISOString().split('T')[0];
        filteredEntries = state.entries.filter(e => {
            const d = e.targetDate ? new Date(e.targetDate).toISOString().split('T')[0] : null;
            return d === today;
        });
        title = T('filter_today');
    } else if (state.activeJournalPeriod === 'Futuro') {
         const today = new Date().toISOString().split('T')[0];
         filteredEntries = state.entries.filter(e => {
            const d = e.targetDate ? new Date(e.targetDate).toISOString().split('T')[0] : null;
            return d > today;
        }).sort((a,b) => a.targetDate - b.targetDate);
        title = T('filter_future');
    } else {
        filteredEntries = state.entries;
        title = T('filter_all');
    }

    return `
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-bold dark:text-white">${T('nav_journal')}</h1>
            <div class="flex bg-stone-100 p-1 rounded dark:bg-stone-800">
                ${['Hoje', 'Futuro', 'Todos'].map(p => `
                    <button onclick="setJournalPeriod('${p}')" class="px-3 py-1 text-sm rounded transition-all ${state.activeJournalPeriod === p ? 'bg-white shadow text-black font-bold dark:bg-stone-700 dark:text-white' : 'text-stone-500 hover:text-stone-900 dark:text-stone-400'}">
                        ${T(PERIOD_MAP[p])}
                    </button>
                `).join('')}
            </div>
        </div>
        
        <div class="space-y-2">
            ${filteredEntries.length > 0 
                ? filteredEntries.map(renderer).join('') 
                : `<div class="text-center py-12 text-stone-400">Nenhum registro encontrado.</div>`
            }
        </div>
    `;
}

function getHubsHtml() {
    return `
        <h1 class="text-2xl font-bold mb-6 dark:text-white">${T('nav_hubs')}</h1>
        <div class="grid grid-cols-2 gap-4">
            ${state.hubs.map(hub => `
                <div onclick="filterByHub(${hub.id})" class="p-6 bg-stone-50 border border-stone-200 rounded hover:border-stone-400 cursor-pointer transition-all dark:bg-stone-800 dark:border-stone-700">
                    <i data-lucide="${hub.icon}" class="w-8 h-8 mb-3 text-stone-700 dark:text-stone-300"></i>
                    <h3 class="font-bold text-lg dark:text-white">${hub.name}</h3>
                    <p class="text-stone-500 text-sm dark:text-stone-400">${state.entries.filter(e => e.hubId === hub.id).length} itens</p>
                </div>
            `).join('')}
        </div>
    `;
}

function getCollectionsHtml() {
    const tags = extractTags();
    return `
        <h1 class="text-2xl font-bold mb-6 dark:text-white">${T('nav_collections')}</h1>
        <div class="flex flex-wrap gap-3">
            ${tags.map(tag => `
                <button onclick="filterByTag('${tag}')" class="px-4 py-2 bg-stone-50 border border-stone-200 rounded-full hover:bg-white hover:border-black transition-all font-mono text-sm dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:hover:border-stone-400">
                    #${tag} <span class="text-stone-400 ml-1 text-xs">(${state.entries.filter(e => e.content.includes('#'+tag)).length})</span>
                </button>
            `).join('')}
        </div>
    `;
}

function getSettingsHtml() {
    return `
        <h1 class="text-2xl font-bold mb-6 dark:text-white">${T('nav_settings')}</h1>
        
        <div class="space-y-6 max-w-lg">
            
            <div class="flex items-center justify-between p-4 border border-stone-200 rounded dark:border-stone-700">
                <div>
                    <h3 class="font-bold dark:text-white">Modo de Visualização</h3>
                    <p class="text-sm text-stone-500 dark:text-stone-400">Escolha entre moderno ou purista.</p>
                </div>
                <button onclick="toggleViewMode()" class="px-3 py-1 bg-stone-100 rounded font-bold text-sm dark:bg-stone-800 dark:text-white">
                    ${state.prefs.viewMode === 'visual' ? 'Visual' : 'Clássico'}
                </button>
            </div>

            <div class="flex items-center justify-between p-4 border border-stone-200 rounded dark:border-stone-700">
                <div>
                    <h3 class="font-bold dark:text-white">Tema</h3>
                    <p class="text-sm text-stone-500 dark:text-stone-400">Claro ou Escuro (OLED).</p>
                </div>
                <button onclick="toggleTheme()" class="px-3 py-1 bg-stone-100 rounded font-bold text-sm dark:bg-stone-800 dark:text-white">
                    ${state.prefs.theme === 'dark' ? 'Escuro' : 'Claro'}
                </button>
            </div>

             <div class="flex items-center justify-between p-4 border border-stone-200 rounded dark:border-stone-700">
                <div>
                    <h3 class="font-bold dark:text-white">Idioma / Language</h3>
                    <p class="text-sm text-stone-500 dark:text-stone-400">Português ou English.</p>
                </div>
                <button onclick="toggleLang()" class="px-3 py-1 bg-stone-100 rounded font-bold text-sm dark:bg-stone-800 dark:text-white">
                    ${state.prefs.lang === 'pt-BR' ? '🇧🇷 PT' : '🇺🇸 EN'}
                </button>
            </div>

            <div class="pt-6 border-t border-stone-200 dark:border-stone-700">
                <button onclick="backupData()" class="w-full bg-black text-white py-2 rounded font-bold mb-2 dark:bg-white dark:text-black">Backup dos Dados (JSON)</button>
                <input type="file" id="restore-input" class="hidden" onchange="restoreData(this)">
                <button onclick="document.getElementById('restore-input').click()" class="w-full bg-white border border-black text-black py-2 rounded font-bold dark:bg-stone-900 dark:text-white dark:border-stone-500">Restaurar Backup</button>
            </div>
             <div class="pt-6 text-center">
                 <p class="text-xs text-stone-400">Versão 3.0 (Bullet Method Strict)</p>
             </div>
        </div>
    `;
}

// --- HELPERS (Simplificados para brevidade, mas funcionais) ---

function getNavHtml() {
    const items = [
        { id: 'home', icon: 'home', label: 'nav_home' },
        { id: 'journal', icon: 'book', label: 'nav_journal' },
        { id: 'hubs', icon: 'layout-grid', label: 'nav_hubs' },
        { id: 'collections', icon: 'hash', label: 'nav_collections' }
    ];
    
    return items.map(item => `
        <button onclick="setActiveTab('${item.id}'); toggleMobileNav()" class="w-full flex items-center gap-3 px-3 py-2 text-sm rounded transition-all ${state.activeTab === item.id ? 'bg-stone-100 font-bold text-black dark:bg-stone-800 dark:text-white' : 'text-stone-600 hover:bg-stone-50 dark:text-stone-400 dark:hover:bg-stone-800'}">
            <i data-lucide="${item.icon}" class="w-4 h-4"></i>
            ${T(item.label)}
        </button>
    `).join('');
}

function setActiveTab(tab) {
    state.activeTab = tab;
    render();
}

function setJournalPeriod(period) {
    state.activeJournalPeriod = period;
    render();
}

function toggleViewMode() {
    state.prefs.viewMode = state.prefs.viewMode === 'visual' ? 'classic' : 'visual';
    saveData();
    render();
}

function toggleTheme() {
    state.prefs.theme = state.prefs.theme === 'light' ? 'dark' : 'light';
    applyTheme(state.prefs.theme);
    saveData();
    render();
}

function toggleLang() {
    state.prefs.lang = state.prefs.lang === 'pt-BR' ? 'en-US' : 'pt-BR';
    currentLang = state.prefs.lang;
    saveData();
    render();
}

function applyTheme(theme) {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
}

function openGlobalInput() {
    document.getElementById('global-input-modal').classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('global-input-modal').classList.remove('opacity-0');
        document.getElementById('global-entry-input').focus();
    }, 10);
    renderGlobalInput();
}

function closeGlobalInput() {
    document.getElementById('global-input-modal').classList.add('opacity-0');
    setTimeout(() => {
        document.getElementById('global-input-modal').classList.add('hidden');
    }, 200);
}

function renderGlobalInput() {
    // --------------------------------------------------------
    // CORREÇÃO B (Semântica): Desabilita/habilita significadores
    // --------------------------------------------------------
    const isTask = state.selectedType === 'task';
    const isNote = state.selectedType === 'note';
    
    const btnPriority = document.getElementById('btn-toggle-priority');
    const btnInspiration = document.getElementById('btn-toggle-inspiration');
    
    // 1. Aplica Regras Semânticas (B)
    if (btnPriority) {
        btnPriority.disabled = !isTask;
        btnPriority.classList.toggle('opacity-50', !isTask);
        btnPriority.classList.toggle('cursor-not-allowed', !isTask);
        
        // Se mudou para NOTA/EVENTO, desativa Prioridade
        if (!isTask && state.inputSignifiers.priority) {
            toggleInputSignifier('priority');
        }
    }
    
    if (btnInspiration) {
        btnInspiration.disabled = !isNote;
        btnInspiration.classList.toggle('opacity-50', !isNote);
        btnInspiration.classList.toggle('cursor-not-allowed', !isNote);
        
        // Se mudou para TAREFA/EVENTO, desativa Inspiração
        if (!isNote && state.inputSignifiers.inspiration) {
            toggleInputSignifier('inspiration');
        }
    }
    
    // 2. Sincroniza o estado visual dos botões (Correção A)
    // Isso garante que os estilos aplicados em toggleInputSignifier sejam aplicados
    // quando o modal é reaberto ou quando o tipo de input é alterado.
    if (state.inputSignifiers.priority) toggleInputSignifier('priority');
    if (state.inputSignifiers.inspiration) toggleInputSignifier('inspiration');
    
    // Atualiza o tipo selecionado no botão principal
    const selectedTypeConfig = ENTRY_TYPES[state.selectedType];
    document.getElementById('global-type-icon').setAttribute('data-lucide', selectedTypeConfig.icon);
    document.getElementById('global-type-label').textContent = T(selectedTypeConfig.label);
}

function addNewEntry() {
    if (!state.inputText.trim()) return;

    const nlpResult = handleNaturalLanguageDate(state.inputText);
    let content = nlpResult.text;
    let type = state.selectedType;
    
    // Detecção: Combina botões visuais OU sintaxe de texto
    let isPriority = state.inputSignifiers.priority;
    let isInspiration = state.inputSignifiers.inspiration;

    // Verifica sintaxe de texto (sobrescreve se encontrado)
    if (content.startsWith('* ')) {
        isPriority = true;
        content = content.substring(2);
    } else if (content.startsWith('! ')) {
        isInspiration = true;
        content = content.substring(2);
    }
    
    // Garante a semântica final (última chance de limpar estados inválidos)
    if (type !== 'task') isPriority = false;
    if (type !== 'note') isInspiration = false;


    state.entries.unshift({
        id: Date.now(),
        type,
        content,
        status: TASK_STATUS.INCOMPLETE,
        isPriority,     
        isInspiration,  
        migrationCount: 0,
        hubId: state.activeHubId,
        targetDate: nlpResult.date || (state.inputDate ? parseLocalInputDate(state.inputDate) : null),
        recurring: nlpResult.recurring
    });

    state.inputText = '';
    state.inputDate = null;
    
    // Reseta o estado dos toggles (importante!)
    if (state.inputSignifiers.priority) toggleInputSignifier('priority');
    if (state.inputSignifiers.inspiration) toggleInputSignifier('inspiration');
    
    // Reset do selectedType para Task (padrão Bullet Journal)
    state.selectedType = 'task';

    document.getElementById('global-entry-input').value = '';
    closeGlobalInput();
    saveData();
    render();
}

function handleGlobalKeydown(e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openGlobalInput();
    }
    if (e.key === 'Escape') {
        closeGlobalInput();
        closeModal();
        closeReviewModal();
        closeFrictionModal();
        closeFeedbackModal();
    }
    // Atalho para adicionar no Input Global
    if (e.key === 'Enter' && !e.shiftKey && !document.getElementById('global-input-modal').classList.contains('hidden')) {
        e.preventDefault();
        state.inputText = document.getElementById('global-entry-input').value;
        addNewEntry();
    }
}

// Utilitários de Data e Backup (Mantidos simplificados)
function handleNaturalLanguageDate(text) {
    // Implementação simplificada de detecção de data (ex: "amanhã")
    let date = null;
    let cleanText = text;
    // ... (lógica de NLP real iria aqui) ...
    return { text: cleanText, date: date, recurring: null };
}

function parseLocalInputDate(dateStr) {
    const parts = dateStr.split('-');
    return new Date(parts[0], parts[1]-1, parts[2]).getTime();
}

function handleDateInput(val) {
    state.inputDate = val;
}

function formatContent(text) {
    // Formata links e tags
    return text.replace(/#(\w+)/g, '<span class="text-blue-600 dark:text-blue-400">#$1</span>');
}

function extractTags() {
    const tags = new Set();
    state.entries.forEach(e => {
        const matches = e.content.match(/#(\w+)/g);
        if (matches) matches.forEach(t => tags.add(t.replace('#','')));
    });
    return Array.from(tags);
}

function deleteEntry(id) {
    if(confirm(T('ui_delete_item_msg'))) {
        state.entries = state.entries.filter(e => e.id !== id);
        saveData();
        render();
    }
}

function startEditEntry(id) {
    const entry = state.entries.find(e => e.id === id);
    const newContent = prompt("Editar:", entry.content);
    if (newContent !== null) {
        entry.content = newContent;
        saveData();
        render();
    }
}

function cycleTaskStatus(id) {
    const entry = state.entries.find(e => e.id === id);
    if (!entry || entry.type !== 'task') return;
    if (entry.status === TASK_STATUS.MIGRATED || entry.status === TASK_STATUS.SCHEDULED) return;

    if (entry.status === TASK_STATUS.INCOMPLETE) {
        entry.status = TASK_STATUS.COMPLETED;
    } else {
        entry.status = TASK_STATUS.INCOMPLETE;
    }
    saveData();
    render();
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.entries));
    localStorage.setItem(PREFS_KEY, JSON.stringify(state.prefs));
}

function loadData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) state.entries = JSON.parse(saved);
}

function setupUnloadAlert() {
    window.onbeforeunload = (e) => {
        if (state.prefs.showAlertOnUnload && state.inputText) {
            e.preventDefault();
            e.returnValue = '';
        }
    };
}

// Funções de Modal simples
function openFeedbackModal() { document.getElementById('feedback-modal').classList.remove('hidden'); setTimeout(() => document.getElementById('feedback-modal').classList.remove('opacity-0'), 10); }
function closeFeedbackModal() { document.getElementById('feedback-modal').classList.add('opacity-0'); setTimeout(() => document.getElementById('feedback-modal').classList.add('hidden'), 200); }
function sendFeedback() { alert("Feedback enviado!"); closeFeedbackModal(); }
function closeModal() { document.getElementById('app-modal').classList.add('opacity-0'); setTimeout(() => document.getElementById('app-modal').classList.add('hidden'), 200); }

// Funções de Backup/Restore (dummy, sem implementação real aqui)
function backupData() {
    const data = JSON.stringify({ entries: state.entries, prefs: state.prefs }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `synta_notes_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    alert("Backup concluído!");
}

function restoreData(input) {
    if (input.files.length === 0) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const loadedState = JSON.parse(e.target.result);
            if (loadedState.entries && loadedState.prefs) {
                if (confirm("Isto substituirá todos os seus dados atuais. Continuar?")) {
                    state.entries = loadedState.entries;
                    state.prefs = { ...state.prefs, ...loadedState.prefs };
                    saveData();
                    init(); // Re-inicializa o app
                    alert("Dados restaurados com sucesso! O aplicativo será recarregado.");
                    location.reload();
                }
            } else {
                alert("Formato de arquivo de backup inválido.");
            }
        } catch (error) {
            alert("Erro ao ler o arquivo: " + error.message);
        }
    };
    reader.readAsText(file);
}

// --- BOOTSTRAP ---
document.addEventListener('DOMContentLoaded', init);
