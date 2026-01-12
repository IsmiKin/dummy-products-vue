import { createRouter, createWebHistory } from 'vue-router'

import { documentationRoute } from '@/documentation/router';
import { productsRoute } from '@/products/router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'list-products',
    },
    {
      ...documentationRoute,
      path: '/documentation',
    },
    {
      ...productsRoute,
      path: '/products',
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: () => {
        console.log('Route does not exists');
        return { name: 'home' };
      },
    }
  ],
})

export default router
