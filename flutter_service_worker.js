'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "926cd8008bef60a4e735ba8d18fbac9c",
"/": "926cd8008bef60a4e735ba8d18fbac9c",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"assets/FontManifest.json": "580ff1a5d08679ded8fcf5c6848cece7",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/AssetManifest.json": "99914b932bd37a50b983c5e7c90ae93b",
"assets/LICENSE": "4c9a20fd88e0b77430e55b8ac1a98d08",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"main.dart.js": "b4fcc3cb1e64c9b99c4c0850839944e7",
"manifest.json": "00e0b69b49487ce4f9ff0c5fac8fda49"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
