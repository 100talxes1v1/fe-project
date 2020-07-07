import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Catalyst from '@xes/dh-catalyst';
import '@xes/dh-catalyst/dist/catalyst.min.css';
import App from './app.vue';
import router from './router';
import customFrom from '../index.vue';
let tableFieldComponents = {};
tableFieldComponents[customFrom.name] = customFrom;
Vue.use(ElementUI);
Vue.use(Catalyst, {
  tableFieldComponents
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
