// OneSignal SDK
importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");

// Cache
const CACHE_NAME = 'calendario-ifa-v8';
const urlsToCache = [
  '/Calendario-ifa/',
  '/Calendario-ifa/index.html',
  '/Calendario-ifa/logo-ifa.png',
  '/Calendario-ifa/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))
      )
    )
  );
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request).catch(() =>
        caches.match('/Calendario-ifa/index.html')
      )
    )
  );
});
