// Bump this whenever the caching strategy changes. The activate handler below
// deletes every cache that is not in the whitelist, so a new name wipes the old
// one on the next visit.
const CACHE_NAME = 'utkarshreads-cache-v2';

// Static assets only. HTML pages are deliberately absent: caching a page and
// serving it cache-first hands React stale markup to hydrate against, which
// throws "Hydration failed" the moment the page's own JS changes.
const urlsToCache = [
  '/images/header_blank.png',
  '/images/header_books.png',
  '/images/header_laptop.png',
  '/images/footer_love.png',
];

// Paths that are safe to serve cache-first: fingerprinted or otherwise stable.
const CACHEABLE_PREFIXES = ['/images/', '/fonts/', '/_next/static/'];

function isCacheable(request) {
  if (request.method !== 'GET') return false;

  // A document request. Never cache-first — see the note above urlsToCache.
  if (request.mode === 'navigate') return false;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return false;
  if (url.search) return false;

  const accept = request.headers.get('accept') || '';
  if (accept.includes('text/html')) return false;

  return CACHEABLE_PREFIXES.some((prefix) => url.pathname.startsWith(prefix));
}

self.addEventListener('install', (event) => {
  // Take over without waiting for every open tab to close, so a stale cache is
  // not left serving pages for the rest of the session.
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
});

self.addEventListener('fetch', (event) => {
  if (!isCacheable(event.request)) {
    // Let the network handle it — no respondWith, no interception.
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    }),
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          }),
        ),
      )
      .then(() => self.clients.claim()),
  );
});
