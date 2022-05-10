import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router"
import ViteVuePage from './components/vueVite.vue'
import vue2Webpack from './components/vue2Webpack.vue'
import Test from './components/test.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: Test
  },
  {
    // 👇 非严格匹配，/my-page/* 都指向 MyPage 页面
    path: '/vueVite/:page*', // vue-router@4.x path的写法为：'/my-page/:page*'
    name: 'vueVite',
    component: ViteVuePage,
  },
  {
    // 👇 非严格匹配，/my-page/* 都指向 MyPage 页面
    path: '/vue2Webpack/:page*', // vue-router@4.x path的写法为：'/my-page/:page*'
    name: 'vue2Webpack',
    component: vue2Webpack,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
