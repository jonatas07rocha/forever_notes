// --- CONSTANTES ---
// ⚠️ ATENÇÃO: As chaves foram alteradas para o novo branding. 
// Dados antigos salvos como 'forever_v3_data' não serão carregados automaticamente.
const APP_VERSION = '3.0.1'; // Versão atualizada para forçar refresh
const STORAGE_KEY = 'synta_v3_data';
const PREFS_KEY = 'synta_v3_prefs';

// Configuração do Google Drive API
// IMPORTANTE: Substitua CLIENT_ID e API_KEY pelas suas credenciais reais do Google Cloud Console
const CLIENT_ID = 'SEU_CLIENT_ID_AQUI'; 
const API_KEY = 'SUA_API_KEY_AQUI';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
const SCOPES = 'https://www.googleapis.com/auth/drive.file';
const DRIVE_FILE_NAME = 'synta_notes_backup.json';

let currentLang = 'pt-BR'; 
let gapiInited = false;
let gisInited = false;
let tokenClient;

const PERIOD_MAP = { 
    'Hoje': 'filter_today',
    'Futuro': 'filter_future',
    'Período': 'filter_period',
    'Todos': 'filter_all'
};

const TRANSLATIONS = {
    'pt-BR': {
        app_title: 'Synta Notes',
        settings_version: 'Versão do Aplicativo',
        type_note: 'Nota',
        type_task: 'Tarefa',
        type_event: 'Evento',
        type_inspiration: 'Inspiração',
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
        settings_title: 'Configurações',
        settings_gdrive_title: 'Google Drive Sync',
        settings_gdrive_desc: 'Faça backup e sincronize seus dados na nuvem.',
        settings_gdrive_btn_upload: 'Salvar na Nuvem',
        settings_gdrive_btn_download: 'Baixar da Nuvem',
        settings_language: 'Idioma',
        settings_lang_pt: 'Português (Brasil)',
        settings_lang_en: 'English (US)',
        settings_dark_mode: 'Modo Escuro',
        settings_dark_mode_desc: 'Alternar entre tema claro e escuro.',
        settings_backup_alert: 'Alerta de Saída',
        settings_backup_alert_desc: 'Avisar se sair sem salvar no Drive (apenas PC).',
        settings_backup_data: 'Dados Locais',
        settings_backup_data_desc: 'Exportar ou importar arquivo JSON manualmente.',
        settings_backup_button: 'Exportar JSON',
        settings_restore_button: 'Importar JSON'
    },
    'en-US': {
        app_title: 'Synta Notes',
        settings_version: 'App Version', // Adicionado
        type_note: 'Note',
        type_task: 'Task',
        type_event: 'Event',
        type_inspiration: 'Inspiration',
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
        settings_title: 'Settings',
        settings_gdrive_title: 'Google Drive Sync',
        settings_gdrive_desc: 'Backup and sync your data to the cloud.',
        settings_gdrive_btn_upload: 'Save to Cloud',
        settings_gdrive_btn_download: 'Download from Cloud',
        settings_language: 'Language',
        settings_lang_pt: 'Portuguese (Brazil)',
        settings_lang_en: 'English (US)',
        settings_dark_mode: 'Dark Mode',
        settings_dark_mode_desc: 'Toggle between light and dark theme.',
        settings_backup_alert: 'Exit Alert',
        settings_backup_alert_desc: 'Warn if leaving without saving to Drive (PC only).',
        settings_backup_data: 'Local Data',
        settings_backup_data_desc: 'Manually export or import JSON file.',
        settings_backup_button: 'Export JSON',
        settings_restore_button: 'Import JSON'
    }
};

// --- ESTADO GLOBAL ---
let state = {
    entries: [],
    hubs: [],
    tagUsage: {},
    activeTab: 'home',
    filter: 'Hoje',
    prefs: {
        theme: 'light',
        showAlertOnUnload: true
    }
};

// --- HELPER FUNCTIONS ---
function T(key) {
    return TRANSLATIONS[currentLang][key] || key;
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        entries: state.entries,
        hubs: state.hubs,
        tagUsage: state.tagUsage
    }));
    localStorage.setItem(PREFS_KEY, JSON.stringify(state.prefs));
}

function loadData() {
    const data = localStorage.getItem(STORAGE_KEY);
    const prefs = localStorage.getItem(PREFS_KEY);
    
    if (data) {
        const parsed = JSON.parse(data);
        state.entries = parsed.entries || [];
        state.hubs = parsed.hubs || [];
        state.tagUsage = parsed.tagUsage || {};
    }
    
    if (prefs) {
        state.prefs = Object.assign(state.prefs, JSON.parse(prefs));
    }

    // Define tema inicial
    if (state.prefs.theme === 'dark') {
        document.documentElement.classList.add('dark');
    }
}

function setLanguage(lang) {
    currentLang = lang;
    render();
}

function toggleTheme() {
    state.prefs.theme = state.prefs.theme === 'light' ? 'dark' : 'light';
    if (state.prefs.theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    saveData();
    render(); // Re-render para atualizar ícones ou textos se necessário
}

function toggleBackupAlert() {
    state.prefs.showAlertOnUnload = !state.prefs.showAlertOnUnload;
    saveData();
    render();
}

// --- FUNÇÕES DE RENDERIZAÇÃO ---

// Função corrigida e atualizada para Settings
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

// Render principal
function render() {
    const app = document.getElementById('app');
    
    // Header
    let content = `
        <header class="p-4 flex justify-between items-center bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 sticky top-0 z-10">
            <h1 class="text-xl font-black tracking-tighter flex items-center gap-2 dark:text-white">
                <i data-lucide="book-open" class="w-6 h-6"></i> ${T('app_title')}
            </h1>
            <nav class="flex gap-4 text-sm font-medium">
                <button onclick="setTab('home')" class="${state.activeTab === 'home' ? 'text-black dark:text-white' : 'text-stone-400'} transition-colors">${T('nav_home')}</button>
                <button onclick="setTab('journal')" class="${state.activeTab === 'journal' ? 'text-black dark:text-white' : 'text-stone-400'} transition-colors">${T('nav_journal')}</button>
                <button onclick="setTab('settings')" class="${state.activeTab === 'settings' ? 'text-black dark:text-white' : 'text-stone-400'} transition-colors">${T('nav_settings')}</button>
            </nav>
        </header>
        <main class="p-4 bg-stone-50 min-h-screen dark:bg-stone-950">
    `;

    // Content Switching
    if (state.activeTab === 'settings') {
        content += getSettingsHTML();
    } else if (state.activeTab === 'journal') {
        // Placeholder simples para manter funcionalidade se não houver lógica complexa
        content += `<div class="p-4 text-center dark:text-white">Diário (Em construção/migração)</div>`;
    } else {
        // Home (Padrão)
        content += `<div class="p-4 text-center dark:text-white">Home (Em construção/migração)</div>`;
    }

    content += `</main>`;
    app.innerHTML = content;
    
    // Re-inicia os ícones
    if (window.lucide) {
        lucide.createIcons();
    }
}

function setTab(tab) {
    state.activeTab = tab;
    render();
}

// --- FUNÇÕES DE IMPORTAÇÃO/EXPORTAÇÃO ---
function exportData() {
    const dataStr = JSON.stringify({
        entries: state.entries,
        hubs: state.hubs,
        tagUsage: state.tagUsage,
        prefs: state.prefs
    }, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `synta_backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
}

function importData(input) {
    const file = input.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (imported.entries) state.entries = imported.entries;
            if (imported.hubs) state.hubs = imported.hubs;
            if (imported.tagUsage) state.tagUsage = imported.tagUsage;
            if (imported.prefs) state.prefs = imported.prefs;
            
            saveData();
            render();
            alert('Dados importados com sucesso!');
        } catch (err) {
            alert('Erro ao importar arquivo: ' + err.message);
        }
    };
    reader.readAsText(file);
}

// --- GOOGLE DRIVE LOGIC (Placeholders para manter compatibilidade) ---
// Adicione aqui a lógica completa do GDrive se você a tiver salva anteriormente.
// Abaixo estão os stubs para não quebrar o HTML settings.

async function handleAuthClick(action) {
    tokenClient.callback = async (resp) => {
        if (resp.error) {
            throw resp;
        }
        if (action === 'upload') await uploadToDrive();
        if (action === 'download') await downloadFromDrive();
    };

    if (gapi.client.getToken() === null) {
        tokenClient.requestAccessToken({prompt: 'consent'});
    } else {
        tokenClient.requestAccessToken({prompt: ''});
    }
}

async function uploadToDrive() {
    console.log("Upload simulado (Implementação GDrive necessária)");
    alert("Função de upload chamada.");
}

async function downloadFromDrive() {
    console.log("Download simulado (Implementação GDrive necessária)");
    alert("Função de download chamada.");
}

// --- INICIALIZAÇÃO ---
window.onload = function() {
    loadData();
    // Inicializa GAPI/GIS se as bibliotecas estiverem carregadas no index.html
    // gapiLoaded(); 
    // gisLoaded();
    render();
};
