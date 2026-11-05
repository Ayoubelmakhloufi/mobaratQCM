/* Offline package: all assets are included in the downloaded folder.
   This worker additionally caches visited files when served on localhost/HTTPS. */
const CACHE='meyar-complete-v2';
const CORE=['./','./index.html','./style.css','./app.js','./data.js','./fonts/NotoSansArabic-Regular.ttf','./fonts/NotoSansArabic-Bold.ttf'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('meyar-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(caches.open(CACHE).then(async cache=>{let stored=await cache.match(e.request);if(stored)return stored;let response=await fetch(e.request);if(response.ok&&response.type!=='opaque'&&!e.request.url.endsWith('source.pdf'))cache.put(e.request,response.clone());return response}))});
