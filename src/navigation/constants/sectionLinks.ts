import type { Component } from "vue"
import type { RouteLocationAsRelativeGeneric } from "vue-router"

import {
  IconDatabase,
  IconTools,
  IconInfoCircle,
} from "@tabler/icons-vue"

import { ROUTE_NAMES as DOCUMENTATION_ROUTES } from "@/documentation/router/constants/route-names"
import { ROUTE_NAMES as PRODUCTS_ROUTES } from "@/products/router/constants/route-names"

type ItemLink = {
  name: string,
  routeName: RouteLocationAsRelativeGeneric,
  icon?: Component
}

export type ItemSection = {
  title: string,
  items: ItemLink[]
}

type SectionMap = Record<string, ItemSection>

export const SECTION_LINKS: SectionMap = {
  products: {
    title: "Products",
    items: [
      {
        name: "Products Library",
        routeName: { name: PRODUCTS_ROUTES.PRODUCTS_LIST},
        icon: IconDatabase,
      },
    ],
  },
  documentation: {
    title: "Documentation",
    items: [
      {
        name: "About",
        routeName: { name: DOCUMENTATION_ROUTES.ABOUT },
        icon: IconInfoCircle,
      },
      {
        name: "Tech stack",
        routeName: { name: DOCUMENTATION_ROUTES.TECH_STACK },
        icon: IconTools,
      },
    ],
  },
}
