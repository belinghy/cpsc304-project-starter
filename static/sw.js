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
    "url": "/_nuxt/app.fe36b8ede4a0cc944e67.js",
    "revision": "2c516f123b5e2a53bdd28ab9fd362d6e"
  },
  {
    "url": "/_nuxt/common.9e362092e843df8fe4a6.js",
    "revision": "b601d1cabe4ea405ccc20d2bb1c1233c"
  },
  {
    "url": "/_nuxt/layouts/default.6586e2baa8b60a685912.js",
    "revision": "ceb92f8e08605168d3651a631d9abf27"
  },
  {
    "url": "/_nuxt/manifest.b1ba47ce9c040b975d5d.js",
    "revision": "4b0a4ecef6ced495ced806d68b06f10e"
  },
  {
    "url": "/_nuxt/pages/admin/index.ded0b366121824771572.js",
    "revision": "9d3e98559c54e18f62099c9b85c677a0"
  },
  {
    "url": "/_nuxt/pages/doctor/_username/appointment.e9510798358ad2f5be84.js",
    "revision": "d0d74794b73fd6e73906a0bd4b94925b"
  },
  {
    "url": "/_nuxt/pages/doctor/_username/index.a8056be955d7f8e7f018.js",
    "revision": "88a11420ce92db621747ead12031e421"
  },
  {
    "url": "/_nuxt/pages/doctor/_username/medrec.fca8b5d69ba7d9afbc38.js",
    "revision": "b6dce4e08c9c478d386dd3bb8a6516ce"
  },
  {
    "url": "/_nuxt/pages/doctor/_username/prescription.d7c1aa66ddc00378ee4f.js",
    "revision": "bfd594a6ae366a5f96cb295d84382d6c"
  },
  {
    "url": "/_nuxt/pages/doctor/dosages.414ca9a352f99056c5b2.js",
    "revision": "150e387b7d5a6627c9ce1bf442f7d5b1"
  },
  {
    "url": "/_nuxt/pages/doctor/index.eb844acfea8fe002d773.js",
    "revision": "9a4f90225e9605b600f02bfddb0c18de"
  },
  {
    "url": "/_nuxt/pages/index.32a64b4cae628e067166.js",
    "revision": "d93c4701e4ce77954e4fb40952df9a72"
  },
  {
    "url": "/_nuxt/pages/patient/appointment.02e70fc2ac0cb3d4f1cc.js",
    "revision": "dc6f22a6ca732ca2c2703e4a54acc85f"
  },
  {
    "url": "/_nuxt/pages/patient/index.a178a0a03c020d789b96.js",
    "revision": "9f0b0802fa00da0bc7209dfbc2b3130c"
  },
  {
    "url": "/_nuxt/pages/patient/makeAppointment.78cc5d42a1092e6899ae.js",
    "revision": "d928ee4b1d019543e61240d3af8ed49c"
  },
  {
    "url": "/_nuxt/pages/patient/prescription.aa4ed806d6bf711510a4.js",
    "revision": "2bbb6170af4bb9f9b746d9e3b276aaee"
  },
  {
    "url": "/_nuxt/pages/patient/referral.6a2648593fce3d8d0f3c.js",
    "revision": "7d175e1e70b00e680ce09c082d5c1c95"
  },
  {
    "url": "/_nuxt/pages/users/_username/index.d5e4e048eb48713f5f03.js",
    "revision": "c7e3add231ccf50150a9ddcd1ebb4394"
  },
  {
    "url": "/_nuxt/pages/users/_username/update.05b45ad2648c79213eb4.js",
    "revision": "3394b7a55c318d5c41e7878132a1bf71"
  },
  {
    "url": "/_nuxt/pages/users/add.7efa1742848c77029bf0.js",
    "revision": "f533a25631efbdf6169d600d6643d05a"
  },
  {
    "url": "/_nuxt/pages/users/addPatient.844ec549d056a6918802.js",
    "revision": "b3d71901e98aa6737117b0a175ecfd38"
  },
  {
    "url": "/_nuxt/pages/users/index.9cb56d6fb16e31a97447.js",
    "revision": "eff69c36317216ecf3c6d8ea1ed4729a"
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
