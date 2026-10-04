// Minimal service worker — no caching, so it never serves stale content
// during development. It exists only so the browser treats this app as
// "installable" (Add to Home Screen / Install app).

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
