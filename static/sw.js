importScripts('workbox-sw.prod.v1.3.0.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "/_nuxt/app.ae8a577bc8597cc4e375.js",
    "revision": "3bf8b78352ff09540363ce0e977adec3"
  },
  {
    "url": "/_nuxt/common.d588f9e89784c93b7646.js",
    "revision": "c239c764a6a02b9a7719a8fba200263a"
  },
  {
    "url": "/_nuxt/layouts/default.99a3689e875b9d0926e9.js",
    "revision": "9f6208307b89fa9af4cac67346ec9b20"
  },
  {
    "url": "/_nuxt/manifest.48c71b10d1719bfa7825.js",
    "revision": "840d3f5239b3e62fefdce04321949410"
  },
  {
    "url": "/_nuxt/pages/index.cb9087eee956a2c62d03.js",
    "revision": "5702841bd074bf6731016234302dceaa"
  },
  {
    "url": "/_nuxt/pages/users/_username/index.3af7d904484d518ebe87.js",
    "revision": "9e510e65b86144b05b21883ca1b0ba99"
  },
  {
    "url": "/_nuxt/pages/users/_username/update.bf41ce0e30762df1c85a.js",
    "revision": "f12e44c93826bfa31e51e37f6137bcdf"
  },
  {
    "url": "/_nuxt/pages/users/add.e043bc0ef46b7d551d33.js",
    "revision": "280258eed7db2f38c577b571e20d69a1"
  },
  {
    "url": "/_nuxt/pages/users/index.64be98e22adddef6a8da.js",
    "revision": "38765c25892e7b33cb02a56b6b4b6276"
  }
];

const workboxSW = new self.WorkboxSW({
  "cacheId": "demoui_1.0.0",
  "clientsClaim": true,
  "directoryIndex": "/"
});
workboxSW.precache(fileManifest);
workboxSW.router.registerRoute('/**', workboxSW.strategies.networkFirst({}), 'GET');
workboxSW.router.registerRoute('/_nuxt/**', workboxSW.strategies.cacheFirst({}), 'GET');
