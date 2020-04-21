import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('../pages/home/index.vue')
  }, {
    name: 'list',
    path: '/list',
    component: () => import('../pages/list/index.vue')
  }, {
    name: 'detail',
    path: '/detail',
    component: () => import('../pages/detail/index.vue')
  }, {
    name: 'error',
    path: '/error',
    component: () => import('../pages/error/index.vue')
  }, {
    name: 'notFound',
    path: '/not_found',
    component: () => import('../pages/not_found/index.vue')
  }, {
    name: 'default',
    path: '*',
    component: () => import('../pages/not_found/index.vue')
  }
];

export default new Router({
  mode: 'history',
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (to.hash) {
        return {
          selector: to.hash
        };
      } else {
        return {
          x: 0,
          y: 0
        };
      }
    }
  }
});
