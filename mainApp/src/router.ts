import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router"
import ViteVuePage from './components/vueVite.vue'
import vue2Webpack from './components/vue2Webpack.vue'
import lowcode from './components/lowcode.vue'
import poi from './components/poiInfo.vue'
import home from './components/home.vue'
import login from './components/login.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: home
  },
  {
    path: '/login',
    name: 'login',
    component: login
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
  },
  {
    // 👇 非严格匹配，/my-page/* 都指向 MyPage 页面
    path: '/lowcode/:page*', // vue-router@4.x path的写法为：'/my-page/:page*'
    name: 'lowcode',
    component: lowcode,
  },
  {
    // 👇 非严格匹配，/my-page/* 都指向 MyPage 页面
    path: '/poi/:page*', // vue-router@4.x path的写法为：'/my-page/:page*'
    name: 'poi',
    component: poi,
  }
]

const router = createRouter({
  history: createWebHistory('index'),
  routes
})

export default router
