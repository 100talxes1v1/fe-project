import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NotFound from '@/pages/notFound';
import ErrorPage from '@/pages/error';

const routes: RouteRecordRaw[] = [
  {
    name: 'home', // 首页
    path: '/',
    component: () => import('@/pages/home')
  },
  {
    name: 'error', // 错误页面
    path: '/error',
    component: ErrorPage
  },
  {
    name: 'notFound',
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
