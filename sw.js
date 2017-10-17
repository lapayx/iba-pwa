'use strict';


 var versionApp = 4;
 
 this.addEventListener('fetch', function(event) {
  event.respondWith(
  
    caches.open('mysite-dynamic').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          if(event.request.url.indexOf("contact.html")<0)
            cache.put(event.request, response.clone());
          return response;
        }).catch(function(response) {

          if(event.request.url.indexOf(".html")>-1){
            return caches.match('offline.html');
          }
          else{
            return caches.match(event.request.url);

          }
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
	  
       [ 
        "index.html",
        "post.html",
        "post.1.html",
		    "about.html",
		    "offline.html"
        ]
      );
      return cache/*.addAll(
		"index.html"
        // core assets & levels 1-10
      );*/
    })
  );
});
