/* Japan 2026 — offline service worker.

   TWO STRATEGIES, on purpose:

   - data.js        NETWORK-FIRST. It's the file that changes, so when you
                    have signal you always get the current one — no VERSION
                    bump, no double-open. Falls straight back to the cached
                    copy when offline, or when the network is slow enough to
                    be useless (see NET_TIMEOUT — half-signal is worse than
                    no signal, so we stop waiting and serve the cache).

   - everything else CACHE-FIRST. The shell almost never changes and this is
                    what makes the app open instantly in a subway tunnel.

   So: you only need to bump VERSION when you edit index.html or sw.js. */

const VERSION     = 'jp26-v9';
const NET_TIMEOUT = 3000;
const FRESH       = ['data.js'];

const SHELL = [
  './',
  './index.html',
  './data.js',
  './manifest.json',
  './icon-180.png',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION)
      .then(c => c.addAll(SHELL))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const { request } = e;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const isFresh = FRESH.some(f => url.pathname.endsWith(f));
  e.respondWith(isFresh ? networkFirst(request) : cacheFirst(request));
});

function save(req, res) {
  if (res && res.status === 200) {
    const copy = res.clone();
    caches.open(VERSION).then(c => c.put(req, copy)).catch(() => {});
  }
  return res;
}

function after(ms) {
  return new Promise((_, reject) => setTimeout(() => reject(new Error('slow')), ms));
}

/* Always try the network. no-store bypasses the browser's own HTTP cache,
   so GitHub Pages' max-age can't hand back a stale data.js. */
async function networkFirst(req) {
  const net = fetch(req, { cache: 'no-store' }).then(res => save(req, res));
  net.catch(() => {});
  try {
    return await Promise.race([net, after(NET_TIMEOUT)]);
  } catch (e) {
    return (await caches.match(req)) || Response.error();
  }
}

/* Serve the cache instantly, quietly refresh it for next time. */
async function cacheFirst(req) {
  const hit = await caches.match(req);
  if (hit) {
    fetch(req).then(res => save(req, res)).catch(() => {});
    return hit;
  }
  try {
    return save(req, await fetch(req));
  } catch (e) {
    return (await caches.match('./index.html')) || Response.error();
  }
}
