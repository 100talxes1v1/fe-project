/**
 * service worker
 */

import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';

const swScope: ServiceWorkerGlobalScope & { version: string } = self as any;
const workerVersion = SERVICE_WORKER_VERSION;
swScope.version = workerVersion;
function log(...args: any[]) {
  console.log(`[worker version: ${workerVersion}]`, ...args);
}

precacheAndRoute([
  { url: '/', revision: workerVersion },
  ...self.__WB_MANIFEST
]);
cleanupOutdatedCaches();

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

swScope.addEventListener('message', (...args) => {
  console.log('recieved message: ', ...args);
});
