import Vue from 'vue';
import router from './router';
import store from './store';
import app from './app.vue';

Vue.config.productionTip = false;
/* eslint-disable no-undef */
if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = function (err) {
    router.push({
      name: 'error',
      params: {
        err: err.message
      }
    });
  };
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render(h) {
    return h(app);
  }
});
