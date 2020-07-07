import Vue from 'vue';
import VueRouter from 'vue-router';
import app from './app.vue';
import { AbstractBostonMainApp } from '@xes/dh-boston-type';
import home from './pages/home/index.vue';
import list from './pages/list/index.vue';
import detail from './pages/detail/index.vue';
import errorPage from './pages/error/index.vue';
import notFound from './pages/not_found/index.vue';

const routes = [
  {
    name: 'home',
    path: '/',
    component: home
  }, {
    name: 'list',
    path: '/list',
    component: list
  }, {
    name: 'detail',
    path: '/detail',
    component: detail
  }, {
    name: 'error',
    path: '/error',
    component: errorPage
  }, {
    name: 'notFound',
    path: '/not_found',
    component: notFound
  }, {
    name: 'default',
    path: '*',
    component: notFound
  }
];

Vue.use(VueRouter);

export default class extends AbstractBostonMainApp {
  async loaded() {

    const router = new VueRouter({
      mode: 'history',
      base: this.baseUrl,
      routes
    });

    new Vue({
      el: this.mountElement as Element,
      router,
      render(h) {
        return h(app);
      }
    });
  }
}
