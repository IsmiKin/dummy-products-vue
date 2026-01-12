import type { RouteRecordRaw } from 'vue-router';

import { ROUTE_NAMES } from './constants/route-names';

const ROUTE_NAME = 'products';

export const productsRoute: RouteRecordRaw = {
  path: `/${ ROUTE_NAME }`,
  children: [
    {
      path: `/${ ROUTE_NAME }/${ ROUTE_NAMES.PRODUCTS_LIST }`,
      name: ROUTE_NAMES.PRODUCTS_LIST,
      component: () => import('@/products/views/ListProducts.vue'),
    },
  ]
}
