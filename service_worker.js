const cacheName = 'v1';

const filesToCache = [
  'index.html',
  './',
  './src/css/style.css',
  './src/css/contextmenu.css',
  './src/js/jquery.fcup.js',
  './src/js/tinylib.js',
  './src/js/longpress.min.js',
  './src/images/Actions-document-save-as-icon.png',
  './src/images/Button-Refresh-icon.png',
  './src/images/file.png',
  './src/images/icons8-menu-rounded-50.png',
  './src/images/rar-icon.png',
  './src/images/Other-html-5-icon.png',
  './src/images/css-3-icon.png',
  './src/images/javascript--v1.png',
  './src/images/Microsoft-Office-Word-icon.png',
  './src/images/app-json-icon.png',
  './src/images/open-folder.png',
];


// the event handler for the install event 
// typically used to cache assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll(filesToCache))
  );
});

// the event handler for the activate event
self.addEventListener('activate', e => self.clients.claim());

// the fetch event handler, to intercept requests and serve all 
// static assets from the cache
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
    .then(response => response ? response : fetch(e.request))
  )
});