// Nome do Cache estático (Versão 1)
const CACHE_NAME = 'forever-notes-cache-v1';

// Lista de arquivos essenciais para o funcionamento offline
// Adicione aqui todos os seus HTML, CSS, JS, e a pasta de ícones do PWA
const urlsToCache = [
    './', // Raiz (index.html)
    './index.html',
    './manifest.json',
    './css/main.css', // Assumindo que você tem um arquivo CSS principal
    './js/lucide.js', // Assumindo que lucide.js está sendo carregado
    // Adicione os caminhos para as imagens dos ícones do PWA
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
    // ... adicione todos os outros assets necessários
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
                console.error('Service Worker: Falha ao adicionar ao cache durante a instalação:', error);
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
