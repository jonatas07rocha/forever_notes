// Nome do Cache estático (Versão 3 - Atualizado para Synta Notes)
// ⚠️ ALTERADO PARA FORÇAR A ATUALIZAÇÃO DO CACHE EM TODOS OS CLIENTES
const CACHE_NAME = 'synta-notes-cache-v3';

// Lista de arquivos essenciais para o funcionamento offline
const urlsToCache = [
    './', // Raiz (index.html)
    './index.html',
    './manifest.json',
    './styles.css', // ⚠️ Atenção: Verifique se o seu arquivo é 'styles.css' (usado no HTML) ou 'css/main.css'
    'https://unpkg.com/lucide@latest', // É bom cachear bibliotecas externas se possível, ou usar versão local
    // '/icons/icon-512x512.png' // Certifique-se que este arquivo existe no servidor
];

// --- Etapa de Instalação (Install) ---
// Ocorre na primeira visita do usuário. Abre o cache e armazena os assets essenciais.
self.addEventListener('install', event => {
    // Força o Service Worker a esperar que o caching esteja completo
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching assets essenciais.');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                // Se algum arquivo da lista urlsToCache não for encontrado, a instalação falha.
                console.error('Service Worker: Falha ao adicionar ao cache durante a instalação. Verifique se todos os arquivos em urlsToCache existem.', error);
            })
    );
});

// --- Etapa de Ativação (Activate) ---
// Remove caches antigos para liberar espaço.
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Se o cache não estiver na lista branca (CACHE_NAME atual), ele é deletado
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Service Worker: Deletando cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// --- Etapa de Busca (Fetch) ---
// Intercepta todas as requisições da rede.
self.addEventListener('fetch', event => {
    // Define a estratégia Cache-First:
    // 1. Tenta buscar no cache.
    // 2. Se falhar, busca na rede.
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Retorna o item do cache, se encontrado
                if (response) {
                    return response;
                }
                
                // Se não estiver no cache, faz a requisição na rede
                return fetch(event.request);
            })
            .catch(error => {
                // Isto deve ser tratado para páginas de erro offline, mas para um PoC simples, é opcional.
                console.error('Service Worker: Erro no fetch e cache miss:', error);
            })
    );
});
