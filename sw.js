// Nome do Cache estático (Versão 4 - Atualizado para refletir mudanças no front-end)
// ⚠️ ALTERADO PARA v4 PARA FORÇAR A ATUALIZAÇÃO DO CACHE EM TODOS OS CLIENTES
const CACHE_NAME = 'synta-notes-cache-v4';

// Lista de arquivos essenciais para o funcionamento offline
const urlsToCache = [
    './', // Raiz (index.html)
    './index.html',
    './app.js',   // ⚠️ Adicionado explicitamente para garantir o refresh da lógica
    './manifest.json',
    './styles.css',
    'https://unpkg.com/lucide@latest',
    './icons/icon-512x512.png'
];

// --- Etapa de Instalação (Install) ---
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching assets essenciais (v4).');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('Service Worker: Falha ao adicionar ao cache durante a instalação.', error);
            })
    );
    // Força o Service Worker recém-instalado a se tornar o ativo imediatamente
    self.skipWaiting();
});

// --- Etapa de Ativação (Activate) ---
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Service Worker: Deletando cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // Garante que o SW assuma o controle de todas as abas abertas imediatamente
            return self.clients.claim();
        })
    );
});

// --- Etapa de Busca (Fetch) ---
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
            .catch(error => {
                console.error('Service Worker: Erro no fetch:', error);
            })
    );
});
