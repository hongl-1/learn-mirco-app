import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router"
import ViteVuePage from './components/my-page.vue'
import Test from './components/test.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: Test
  },
  {
    // 👇 非严格匹配，/my-page/* 都指向 MyPage 页面
    path: '/my-page/:page*', // vue-router@4.x path的写法为：'/my-page/:page*'
    name: 'my-page',
    component: ViteVuePage,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
