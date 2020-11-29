import Vue from 'vue';
import Router from 'vue-router';
import Catalyst from '../catalyst/index.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Catalyst
  }
];

const router = new Router({
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

router.beforeEach((to, from, next) => {
  next();
});

router.beforeResolve((to, from, next) => {
  let sourceLink = window.sessionStorage.getItem('sourceLink');
  if ((to.query.sourceLink && to.query.sourceLink === 'boss') || (sourceLink && sourceLink === 'boss')) {
    window.sessionStorage.setItem('sourceLink', 'boss');
    document.getElementById('app').style.opacity = 0;
    // 兼容旧boos使用ifame嵌套改变样式，此代码日后必删
    setTimeout(() => {
      if (document.getElementsByClassName('portal-aside')[0]) {
        document.getElementsByClassName('portal-aside')[0].style.display = 'none';
      }
      if (document.getElementsByClassName('portal-header')[0]) {
        document.getElementsByClassName('portal-header')[0].style.display = 'none';
      }
      if (document.getElementsByClassName('portal')[0]) {
        document.getElementsByClassName('portal')[0].style.padding = '0px';
      }
      if (document.getElementsByClassName('portal-main')[0]) {
        document.getElementsByClassName('portal-main')[0].style.background = '#ffffff';
      }
      if (document.getElementsByClassName('portal-main')[0]) {
        document.getElementsByClassName('portal-main')[0].style.padding = '0px';
      }
      document.getElementById('app').style.opacity = 1;
    },30);
  }
  document.title = '学而思网校1对1';
  next();
});

// 用来保存通过router-content组件打开的页面的路由对象列表
const contentRoutes = [];

Object.defineProperty(router, 'currentMpRoute', {
  get() {
    if (contentRoutes.length > 0) {
      return contentRoutes[0];
    } else {
      return router.currentRoute;
    }
  },
  enumerable : true,
  configurable : false
});

Vue.mixin({
  inject: {
    $isLoadByRouterContent: {
      default: () => () => {
        return false;
      }
    }
  },
  computed: {
    $mpLoadByRouteContent() {
      return this.$isLoadByRouterContent();
    },
    $mpRoute() {
      return this.$router.currentMpRoute;
    }
  }
});

export { contentRoutes };

export default router;
