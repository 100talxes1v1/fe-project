import { createApp } from 'vue';
import App from './app';
import router from '@/router';
import '@/assets/css/tailwind.css';

// Check that service workers are supported
if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.serviceWorkerInstance = new Workbox('/serviceWorker.js');
  window.serviceWorkerInstance.register();
}

const app = createApp(App);
app.use(router);
app.mount('#app');
