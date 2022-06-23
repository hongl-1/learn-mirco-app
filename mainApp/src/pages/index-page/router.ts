import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/route'

const router = createRouter({
  history: createWebHistory('index-page'),
  routes
})

export default router
