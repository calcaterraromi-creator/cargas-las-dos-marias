const CACHE='cargas-hoy-v7-completa';
const FILES=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest','./assets/papa.jpg','./assets/harina.jpg','./assets/ruta.jpg','./assets/premium.jpg','./assets/logo-las-dos-marias.png','./assets/icon-192.png','./assets/icon-512.png','./assets/cereal.jpg','./assets/fertilizante.jpg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
