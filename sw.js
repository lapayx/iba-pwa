'use strict';
importScripts('app.version.js'); 
//toolbox.precache(["index.html"]);
 //toolbox.router.get('assets/*', toolbox.cacheFirst); 
 //toolbox.router.get('/*', 
 //toolbox.networkFirst, { networkTimeoutSeconds: 5});

 var versionApp = app.version;
 
 this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('dynamic-assets').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          let url = event.request.url;
          if(url.indexOf("hiteka")>0  && url.indexOf("/api/")<0 && url.indexOf("/token")<0
            && ( url.indexOf("app.js")<0 && url.indexOf("config.js")<0 && url.indexOf("index.html")<0 && url.indexOf("login.html")<0)
          )
            cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

this.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          if(cacheName != 'mygame-core-v'+versionApp)
			    return true;
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('mygame-core-v'+versionApp).then(function(cache) {

      cache.addAll(
	  
       [ "app.js",
        "config.js",
        "index.html",
        "login.html"
        ]
      );
      return cache/*.addAll(
		"index.html"
        // core assets & levels 1-10
      );*/
    })
  );
});