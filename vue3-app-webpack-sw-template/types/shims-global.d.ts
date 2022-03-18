import * as Chai from 'chai';
import { Workbox } from 'workbox-window';

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
