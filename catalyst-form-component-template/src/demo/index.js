import Vue from 'vue';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import Catalyst from '@xes/dh-catalyst';
import '@xes/dh-catalyst/dist/catalyst.min.css';
import mpUI from '@xes/dh-component-vue-mp-ui';
import '@xes/dh-component-vue-mp-ui/dist/dh_component_vue_mp_ui.min.css';
// import './assets/styles/main.scss'
import App from './app.vue';
import router from './router';
Vue.use(ElementUI);
Vue.use(mpUI);
Vue.use(Catalyst);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
