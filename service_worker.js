// Cached core static resources
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("static").then(cache => {
      return cache.addAll(["./", './images/icon/apple-touch-icon-192x192.png']);
    }).then(() => {
      return self.skipWaiting();  // Forcer l'installation et passer à la phase d'activation
    })
  );
});

// Activer immédiatement le nouveau service worker
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          // Supprimer l'ancien cache si nécessaire
          if (cache !== "static") {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();  // Prendre le contrôle immédiat des clients
    })
  );
});

// Fetch resources
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
