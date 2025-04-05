const CACHE_NAME = "sum4fun-cache-v1";
const urlsToCache = [
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.json",
  "/serviceworker.js",
  "/icons/manifest-icon-192.maskable",
  "/icons/manifest-icon-512.maskable",
  "/img/favicon.svg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request).catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
    );
  });
  
