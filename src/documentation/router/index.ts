import type { RouteRecordRaw } from 'vue-router';

import { ROUTE_NAMES } from './constants/route-names';

const ROUTE_NAME = 'documentation';

export const documentationRoute: RouteRecordRaw = {
  path: `/${ ROUTE_NAME }`,
  redirect: `/${  ROUTE_NAME }/${ ROUTE_NAMES.ABOUT }`,
  children: [
    {
      path: `/${ ROUTE_NAME }/${ ROUTE_NAMES.ABOUT }`,
      name: ROUTE_NAMES.ABOUT,
      component: () => import('@/documentation/views/About.vue'),
    },
    {
      path: `/${ ROUTE_NAME }/${ ROUTE_NAMES.TECH_STACK }`,
      name: ROUTE_NAMES.TECH_STACK,
      component: () => import('@/documentation/views/TechStack.vue'),
    },
  ]
}
