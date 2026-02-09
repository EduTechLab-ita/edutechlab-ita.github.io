// Service Worker per EduTechLab PWA
// Versione semplice per principianti
const CACHE_NAME = 'edutechlab-v3.0.4';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/hero-background.jpg.png'
];

// Installazione - mette in cache i file principali
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aperta');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch - serve i file dalla cache quando possibile
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Se il file è in cache, lo restituisce
        if (response) {
          return response;
        }
        // Altrimenti lo scarica dalla rete
        return fetch(event.request);
      })
  );
});

// Aggiornamento - pulisce le cache vecchie
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Cancello cache vecchia:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
