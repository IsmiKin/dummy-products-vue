import type { RouteRecordRaw } from 'vue-router';

import { ROUTE_NAMES } from './constants/route-names';

import AboutView from '@/documentation/views/About.vue'
import TechStackView from '@/documentation/views/TechStack.vue'

const ROUTE_NAME = 'documentation';

export const documentationRoute: RouteRecordRaw = {
  path: `/${ ROUTE_NAME }`,
  redirect: `/${  ROUTE_NAME }/${ ROUTE_NAMES.ABOUT }`,
  children: [
    {
      path: `/${ ROUTE_NAME }/${ ROUTE_NAMES.ABOUT }`,
      name: ROUTE_NAMES.ABOUT,
      component: AboutView,
    },
    {
      path: `/${ ROUTE_NAME }/${ ROUTE_NAMES.TECH_STACK }`,
      name: ROUTE_NAMES.TECH_STACK,
      component: TechStackView,
    },
  ]
}
