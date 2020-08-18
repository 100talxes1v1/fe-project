import Vue from 'vue';
import VueRouter from 'vue-router';
import { hasLogin, fetchAuth, getAuthItemByPathAndQuery } from '@/common/auth.js';
import errorPage from '../pages/error/index.vue';
import authErrorPage from '../pages/auth_error/index.vue';
import notFound from '../pages/not_found/index.vue';
import Home from '../pages/home/index.vue';
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

const routerCreate = (baseUrl) => {
  const prefixPath = baseUrl.substring(0, baseUrl.length - 1)
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
        next();
        return;
      }
      let authItem = getAuthItemByPathAndQuery(prefixPath + to.path, to.query);
      if (authItem) {
        next();
      } else {
        next({
          name: 'authError'
        });
      }
    }).catch(error => {
      next({
        name: 'error',
        params: {
          err: error
        }
      });
    });
  }
});
  return router
}

export default routerCreate;
