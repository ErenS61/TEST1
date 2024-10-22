const CACHE_NAME = "amicale-geii-cache-v1"; // Nom du cache avec version
const urlsToCache = [
  "/",
  "/index.html",
  "/styles.css",
  "/A propos/about.html",
  "/A propos/about.css",
  "/Les Amicalistes/les-amicalistes.html",
  "Les Amicalistes/les-amicalistes.css",
  "/images/icon/apple-touch-icon-192x192.png",
  "/images/icon/apple-touch-icon-512x512.png",
  "/manifest.json"
];

// Installation du Service Worker et mise en cache des ressources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Mise en cache des fichiers");
      return cache.addAll(urlsToCache);
    })
  );
  // Force l'activation du nouveau service worker immédiatement
  self.skipWaiting();
});

// Activation du Service Worker et nettoyage des anciens caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Suppression de l'ancien cache :", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  // Prendre le contrôle de la page immédiatement
  return self.clients.claim();
});

// Interception des requêtes réseau pour servir les fichiers en cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si la ressource est trouvée dans le cache, la retourner
      if (response) {
        return response;
      }
      // Sinon, la télécharger du réseau
      return fetch(event.request);
    })
  );
});
