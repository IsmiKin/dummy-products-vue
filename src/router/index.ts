import { createRouter, createWebHistory } from 'vue-router'

import { documentationRoute } from '@/documentation/router';
import { productsRoute } from '@/products/router';

import { ROUTE_NAMES as PRODUCTS_ROUTES } from '@/products/router/constants/route-names'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: PRODUCTS_ROUTES.PRODUCTS_LIST},
    },
    {
      ...documentationRoute,
      path:'/documentation',
    },
    {
      ...productsRoute,
      path: '/products',
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: (to) => {
        console.log('Route does not exists', to);
        return { name: PRODUCTS_ROUTES.PRODUCTS_LIST };
      },
    }
  ],
})

export default router
