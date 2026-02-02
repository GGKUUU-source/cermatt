const CACHE_NAME = 'quiz-pro-v1';
// List every file your app needs to work offline
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png' // Make sure this filename matches your actual icon!
];

// 1. Install Event: Saves the files to the phone
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching assets...');
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// 2. Activate Event: Cleans up old versions of the app
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
      );
    })
  );
});

// 3. Fetch Event: Serves files even when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return the cached file if found, otherwise go to network
      return cachedResponse || fetch(event.request);
    })
  );
});
