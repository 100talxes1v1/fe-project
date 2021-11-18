/**
 * service worker
 */

import { precacheAndRoute } from 'workbox-precaching';

console.log('hello in service worker!');
const swScope: ServiceWorkerGlobalScope = self as any;

precacheAndRoute(self.__WB_MANIFEST);

swScope.addEventListener('install', (evt: ExtendableEvent) => {
  console.log('sw installing...', evt);

  // evt.waitUntil(Promise.resolve().then((...args) => {
  //   console.log('sw installed...', ...args);
  // }).catch((...e) => {
  //   console.log('sw install error: ', ...e);
  // }));
  evt.waitUntil(
    caches.open('v1').then((cache) => {
      cache.add('/horse.png');
    })
  );
});

swScope.addEventListener('activate', (evt: ExtendableEvent) => {
  console.log('sw activating...', evt);
  swScope.clients.claim();

  evt.waitUntil(
    Promise.resolve()
      .then((...args) => {
        console.log('sw activated...', ...args);
      })
      .catch((...e) => {
        console.log('sw activate error: ', ...e);
      })
  );
});

swScope.addEventListener('fetch', (evt: FetchEvent) => {
  const url = new URL(evt.request.url);
  console.log('sw fetching: ', url.href);
  if (url.origin === location.origin && url.pathname === '/cat.png') {
    caches
      .match('/horse.png')
      .then((res) => {
        if (res) {
          evt.respondWith(res);
        } else {
          // todo: res is undefined
        }
      })
      .catch((error) => {
        // todo: error handle
      });
  }
});

swScope.addEventListener('message', (...args) => {
  console.log('recieved message: ', ...args);
});
