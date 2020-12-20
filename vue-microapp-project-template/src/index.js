import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import routerCreate from './router';
import store from './store'
import app from './app.vue';
import { AbstractBostonMainApp } from '@xes/dh-boston-type';
import { BostonSyncState } from '@xes/dh-boston-sync-state';

import ElementUI from 'element-ui';
import CommonTable from '@xes/dh-component-vue-common-table';
import apiFn from '@/api/index';
import authMixin from '@/mixins/authMixin';
import { env, protocol } from '@xes/dh-module-env';
import { saInit, saRegisterPage} from '@xes/dh-sensor';
import get from '@xes/dh-module-getter';
import MpComponent from '@xes/fe-mp-business-components';
import '@xes/fe-mp-business-components/dist/fe-mp-business-components.min.css';
import productLinePlugin, { productLineMixin } from '@xes/dh-module-product-line';

try {
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo')) || {};
  const u_id = userInfo.uid || userInfo.id || '';
  let server_url = '';
  if (protocol === 'https') {
    server_url = (env === 'prod' ? 'https://sensorsdata-2.talbrain.com:8080/sa?project=dahai_web_manageplatform' : 'https://sensorsdata.talbrain.com:8080/sa?project=default');
  } else if (protocol === 'http') {
    server_url = (env === 'prod' ? 'http://sensorsdata-2.talbrain.com:8106/sa?project=dahai_web_manageplatform' : 'http://sensorsdata.talbrain.com:8106/sa?project=default');
  }
  saInit({
    server_url,
    pro_name: 'dahai_web_manageplatform',
    show_log: env === 'prod' ? false : true,
    u_id,
    open_fmp: false
  });
  saRegisterPage({
    u_id,
  });
} catch (error) {
  console.log(error)
}

Vue.use(ElementUI);
Vue.use(CommonTable);
Vue.use(MpComponent);
Vue.mixin(authMixin);
Vue.use(productLinePlugin);
Vue.mixin(productLineMixin);

Vue.prototype.$api = apiFn;
export default class extends AbstractBostonMainApp {

  handleInternalRoute(arg) {
    if (this._router) {
      const targetPath = arg.to.fullPath;
      if (arg.replaceMode) {
        this._router.replace(targetPath);
      } else {
        this._router.push(targetPath);
      }
    }
  }
  async install() {
    this._router = routerCreate(this.baseUrl, this.applicationContext);
    sync(store, this._router);
    this.applicationContext.use(BostonSyncState, { syncApp: this, debug: true })
    Vue.prototype.applicationContext = this.applicationContext;
  }
  async loaded() {
    new Vue({
      el: this.mountElement,
      router: this._router,
      store,
      render(h) {
        return h(app);
      }
    });
  }
  sync() {
    return {
      auth(value, source) {
        if (get(value, 'authTree', []).length > 0) {
          store.commit('auth/updateAuthList', value.authTree)
        }
      },
    }
  }
}
