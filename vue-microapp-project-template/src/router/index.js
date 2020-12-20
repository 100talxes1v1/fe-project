import Vue from 'vue';
import VueRouter from 'vue-router';
import { hasLogin, fetchAuth, getAuthItemByPathAndQuery, getProductLineOfPage } from '@/common/auth.js';
import errorPage from '../pages/error/index.vue';
import authErrorPage from '../pages/auth_error/index.vue';
import notFound from '../pages/not_found/index.vue';
import Home from '../pages/home/index.vue';
import { setProductLineSelectEnableStatus, setInitiateProductLine } from '@xes/dh-module-product-line';
Vue.use(VueRouter);
const routes = [
    {
    name: 'Home',
    path: '/',
    component: Home
  },{
    name: 'error',
    path: '/error',
    component: errorPage
  }, {
    name: 'authError',
    path: '/auth_error',
    component: authErrorPage
  },{
    name: 'notFound',
    path: '/not_found',
    component: notFound
  }, {
    name: 'default',
    path: '*',
    component: notFound
  }
];

const routerCreate = (baseUrl, applicationContext) => {
  const prefixPath = `/${applicationContext._appName}`;
  const router = new VueRouter({
    mode: 'history',
    base: baseUrl,
    routes
  });
  router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && !hasLogin()) {
      next({
        name: 'login',
        query: {
          src_url: encodeURIComponent(to.fullPath)
        }
      });
    } else if (['login', 'error', 'notFound', 'default', 'authError'].includes(to.name)) {
      next();
    } else {
      // TODO: 暂时屏蔽权限校验
      // next();
      fetchAuth().then(() => {
        if (to.query.no_check_auth && Boolean(to.query.no_check_auth)) {
          return;
        }
        let authItem = getAuthItemByPathAndQuery(prefixPath + to.path, to.query);
        if (authItem) {
          return;
        } else {
          const err = new Error('authError');
          err.name = 'authError';
          throw err;
        }
      }).then(() => {
        // 判断产品线逻辑
        const { enableSwitchProductLine, initiateProductLine, noSupportProductLine } = getProductLineOfPage(prefixPath + to.path);
        setProductLineSelectEnableStatus(enableSwitchProductLine);
        setInitiateProductLine(initiateProductLine);
        if (noSupportProductLine) {
          const err = new Error('当前页面不支持该产品线');
          err.name = 'noSupportProductLine';
          throw err;
        }
      }).then(() => {
        next();
      }).catch(error => {
        // 判断一下如果是权限校验的错误，则跳转至通用权限错误页面
        if (error.name === 'authError') {
          next({
            name: error.name,
            query: {
              ...to.query
            }
          });
        } else {
          next({
            name: 'error',
            params: {
              err: error
            },
            query: {
              src_url: encodeURIComponent(to.fullPath),
              ...to.query
            }
          });
        }
      });
    }
  });
  return router
}

export default routerCreate;
