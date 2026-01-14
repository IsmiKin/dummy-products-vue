import { createRouter, createWebHistory } from 'vue-router'

import { documentationRoute } from '@/documentation/router';
import { productsRoute } from '@/products/router';

import { ROUTE_NAMES as GENERIC_ROUTES } from '@/router/constants/genericRoutes';
import { ROUTE_NAMES as PRODUCTS_ROUTES } from '@/products/router/constants/route-names'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: GENERIC_ROUTES.HOME,
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
      redirect: () => {
        return { name: PRODUCTS_ROUTES.PRODUCTS_LIST };
      },
    }
  ],
})

export default router
