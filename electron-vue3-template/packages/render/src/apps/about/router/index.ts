import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NotFound from '../pages/notFound';

const routes: RouteRecordRaw[] = [
  {
    name: 'list',
    path: '',
    component: () => import('../pages/list')
  },
  {
    name: 'detail',
    path: '/detail',
    component: () => import('../pages/detail')
  },
  {
    name: 'notFound',
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory('/apps/about'),
  routes
});

export default router;
