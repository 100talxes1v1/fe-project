import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Catalyst from '@xes/dh-catalyst';
import '@xes/dh-catalyst/dist/catalyst.min.css';
import App from './app.vue';
import router from './router';
import customComp from '../custom_logic.js';
let logicComponents = {};
logicComponents[customComp.name] = customComp;
Vue.use(ElementUI);
Vue.use(Catalyst, {
  logicComponents
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
