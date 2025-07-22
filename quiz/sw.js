const CACHE_NAME = 'edutech-lab-v1.1'; // Ho incrementato la versione per forzare l'aggiornamento

// Lista completa dei file da salvare in cache
const urlsToCache = [
  '.', // La cartella corrente
  'index.html', // Il file principale
  'manifest.json',
  // Tutte le icone dichiarate nel manifest
  'icon-72.png',
  'icon-96.png',
  'icon-128.png',
  'icon-144.png',
  'icon-152.png',
  'icon-192.png',
  'icon-384.png',
  'icon-512.png'
];

// Evento di installazione
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('EduTech Lab: Cache aperta e file aggiunti');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento di fetch
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Ritorna la risorsa dalla cache se disponibile
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Evento di activate: pulisce le vecchie cache
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('EduTech Lab: Eliminazione cache vecchia', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
