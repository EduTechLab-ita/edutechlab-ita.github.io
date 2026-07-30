// ══════════════════════════════════════════════════════════════════
//  Service Worker – Sito EduTechLab
//  ⚙️  Aggiorna CACHE_NAME ad ogni rilascio
//  Pattern auto-update identico a LogiKron/EduBoard (già in produzione):
//  skipWaiting + clients.claim + notifica alle schede aperte.
// ══════════════════════════════════════════════════════════════════

const CACHE_NAME = 'edutechlab-v3.6.0';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/hero-background.jpg.png'
];

// ── Install: pre-cacha i file principali e attiva subito il nuovo SW ──
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// ── Activate: elimina le cache vecchie e avvisa le schede aperte ──
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      const oldKeys = keys.filter((k) => k !== CACHE_NAME);
      return Promise.all(oldKeys.map((k) => caches.delete(k))).then(() => {
        // Avvisa SOLO se c'era davvero una versione precedente:
        // al primo ingresso di un nuovo visitatore non serve alcun reload.
        if (oldKeys.length > 0) {
          return self.clients.matchAll({ type: 'window' }).then((clients) => {
            clients.forEach((client) => client.postMessage({ type: 'SW_UPDATED' }));
          });
        }
      });
    })
  );
  self.clients.claim();
});

// ── Fetch ─────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Solo GET: le POST (form demo verso Apps Script) non vanno mai intercettate.
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // sw.js stesso: mai dalla cache, altrimenti resta bloccato su una versione vecchia.
  if (url.pathname.endsWith('/sw.js')) return;

  // Tutto ciò che non è su questo dominio (Google, font, API esterne): passa al browser.
  if (url.origin !== self.location.origin) return;

  // Pagine HTML: network-first → un aggiornamento pubblicato si vede subito,
  // senza dipendere dal bump manuale del CACHE_NAME. Cache come riserva offline.
  if (url.pathname.endsWith('.html') || url.pathname.endsWith('/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Solo una risposta valida aggiorna la riserva offline: un 404 servito
          // durante un deploy non deve prendere il posto della pagina buona.
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // CSS, JS, immagini e altri asset: cache-first (cambiano col CACHE_NAME).
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});
