import type { RouteRecordRaw } from 'vue-router';

import { ROUTE_NAMES } from './constants/route-names';

const ROUTE_NAME = 'products';

export const productsRoute: RouteRecordRaw = {
  path: `/${ ROUTE_NAME }`,
  redirect: `/${  ROUTE_NAME }/${ ROUTE_NAMES.LIST }`,
  children: [
    {
      path: `/${ ROUTE_NAME }/${ ROUTE_NAMES.LIST }`,
      name: ROUTE_NAMES.LIST,
      component: () => import('@/products/views/ListProducts.vue'),
    },
  ]
}
