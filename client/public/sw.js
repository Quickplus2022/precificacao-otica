const CACHE_NAME = 'lens-configurator-v2';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/pages/home.tsx',
  '/src/components/welcome-screen.tsx',
  '/src/components/question-screen.tsx',
  '/src/components/results-screen.tsx',
  '/src/components/lens-card.tsx',
  '/src/components/upload-screen.tsx',
  '/src/lib/lens-data.ts',
  '/src/hooks/use-lens-configurator.ts',
  '/src/index.css'
];

// Instalar e cachear recursos
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: Skip waiting');
        return self.skipWaiting();
      })
  );
});

// Ativar service worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Claiming clients');
      return self.clients.claim();
    })
  );
});

// Interceptar requisições - funciona offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('Service Worker: Serving from cache:', event.request.url);
          return cachedResponse;
        }
        
        // Se não estiver no cache, tenta buscar da rede
        console.log('Service Worker: Fetching from network:', event.request.url);
        return fetch(event.request)
          .then((response) => {
            // Se a resposta é válida, clona e adiciona ao cache
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseClone);
                });
            }
            return response;
          })
          .catch(() => {
            // Se offline e não tem no cache, retorna página offline
            if (event.request.destination === 'document') {
              return caches.match('/');
            }
          });
      })
  );
});
