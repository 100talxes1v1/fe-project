import Vue from 'vue';
import app from './app.vue';
import customPlugin from '../index';

Vue.use(customPlugin);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<app/>',
  components: { app }
});
