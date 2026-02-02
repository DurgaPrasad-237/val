const CACHE_NAME = "valentine-cache-v2";
const ASSETS = [
  "/",
  "/index.html",
  "/meandlahari.jpg",
  "/gehra.mp3",
  "/manifest.json"
];

// Install
self.addEventListener("install", event => {
  self.skipWaiting(); // 🔥 IMPORTANT
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Activate
self.addEventListener("activate", event => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(), // 🔥 THIS IS THE KEY
      caches.keys().then(keys =>
        Promise.all(
          keys.map(key => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          })
        )
      )
    ])
  );
});

// Fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
