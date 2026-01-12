import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'list-products',
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue'),
    },
    {
      path: '/products',
      name: 'list-products',
      component: () => import('@/products/views/ListProducts.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: () => ({ name: 'list-products' }),
    },
  ],
})

export default router
