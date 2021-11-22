import * as Chai from 'chai';

declare global {
  interface Window {
    expect: Chai.ExpectStatic;
    serviceWorkerInstance: Workbox;
    SERVICE_WORKER_VERSION: string;
  }
  var expect: Chai.ExpectStatic;
  var SERVICE_WORKER_VERSION: string;
  var serviceWorkerInstance: Workbox;
}
