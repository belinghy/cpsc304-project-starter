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
    "url": "/_nuxt/app.e848fbe789af00b598aa.js",
    "revision": "aa9a4deffd934997f7cd6100c51587ee"
  },
  {
    "url": "/_nuxt/common.fcaba9d8785715f3e601.js",
    "revision": "a311e8155637697e546191851df9b819"
  },
  {
    "url": "/_nuxt/layouts/default.04a073663662994fb095.js",
    "revision": "6f6a40bee02ff0d4f64a14c9af77e21d"
  },
  {
    "url": "/_nuxt/manifest.5adab02f2ed62dafd009.js",
    "revision": "42ee56d7fc24d4e4b4c0777a8515b7d6"
  },
  {
    "url": "/_nuxt/pages/admin\\index.807c8d6f46a28735f348.js",
    "revision": "388a19368fefcb6901e80b504a0fedd9"
  },
  {
    "url": "/_nuxt/pages/doctor\\_username\\appointment.ac17d4ffb6a1eda5ecd5.js",
    "revision": "5a3211a498f1148e5867b7647371090f"
  },
  {
    "url": "/_nuxt/pages/doctor\\_username\\index.11fe311e4c3c12d86797.js",
    "revision": "7f01d1318a418f6ac72bd13ec27fad2a"
  },
  {
    "url": "/_nuxt/pages/doctor\\_username\\medrec.dc98ebee90d97753d9e0.js",
    "revision": "053248a894c8d02b64bee017be5a8965"
  },
  {
    "url": "/_nuxt/pages/doctor\\_username\\prescription.88288ac2b12d635bbd7a.js",
    "revision": "b87c74b672b030e69f5ea2069ff4bc49"
  },
  {
    "url": "/_nuxt/pages/doctor\\dosages.9d57598a8944feeb84b5.js",
    "revision": "0d624a2c08cfcd6ef4f9fd6cb3ac42ab"
  },
  {
    "url": "/_nuxt/pages/doctor\\index.8a78b6c9304374a7eee2.js",
    "revision": "7dd57d76a8512de2c3b59572f7cd7433"
  },
  {
    "url": "/_nuxt/pages/index.4f92085c9f4b6c36661b.js",
    "revision": "22d588af4a1ffb43a94e70838aa1001c"
  },
  {
    "url": "/_nuxt/pages/patient\\appointment.f71563a713ba4c8167da.js",
    "revision": "9709c7ee5c0b41e68745fd130efb2e65"
  },
  {
    "url": "/_nuxt/pages/patient\\index.78723dd00c7c85ae86ef.js",
    "revision": "965a3c42301e869e917a8bc04e1853c1"
  },
  {
    "url": "/_nuxt/pages/patient\\makeAppointment.1ac435a1414e4ec39624.js",
    "revision": "e421d032a25b51339d6fb3df083c6137"
  },
  {
    "url": "/_nuxt/pages/patient\\prescription.0b2d4b527e737df8f9b3.js",
    "revision": "6f5fc71d7f153cdb13a58941ab94824e"
  },
  {
    "url": "/_nuxt/pages/patient\\referral.2173a10f331610cfbab8.js",
    "revision": "82018ad4de0dd41a3d97caa435a4265e"
  },
  {
    "url": "/_nuxt/pages/users\\_username\\index.b6b19be4294ed08c9cb8.js",
    "revision": "b8ba846475b100e85207a7a0eaf55dd2"
  },
  {
    "url": "/_nuxt/pages/users\\_username\\update.ca2b1d375d2fdd7ffe9c.js",
    "revision": "468ce661d5aad17837f4472116a2d3ff"
  },
  {
    "url": "/_nuxt/pages/users\\add.024c4a61c90e35884008.js",
    "revision": "f247175198915f3db6c308a6b4544bd1"
  },
  {
    "url": "/_nuxt/pages/users\\addPatient.c899732fb149f0b8b14d.js",
    "revision": "5bd5069e930a6ffdb6d09a5c9d6cdc96"
  },
  {
    "url": "/_nuxt/pages/users\\index.beaa08d71290fa098ccd.js",
    "revision": "ff4709e1aa8a27e5144018b23c252785"
  }
];

const workboxSW = new self.WorkboxSW({
  "cacheId": "304demoproject_1.0.0",
  "clientsClaim": true,
  "directoryIndex": "/"
});
workboxSW.precache(fileManifest);
workboxSW.router.registerRoute('/**', workboxSW.strategies.networkFirst({}), 'GET');
workboxSW.router.registerRoute('/_nuxt/**', workboxSW.strategies.cacheFirst({}), 'GET');
