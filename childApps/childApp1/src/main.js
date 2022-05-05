import { createApp } from 'vue'
import App from './App.vue'
import HelloWorld from './components/HelloWorld.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/index',
    name: 'index',
    component: HelloWorld,
  }
]
console.log(window.__MICRO_APP_BASE_ROUTE__)
const router = createRouter({
  history: createWebHashHistory(),
  // 👇 设置基础路由，子应用可以通过window.__MICRO_APP_BASE_ROUTE__获取基座下发的baseroute，如果没有设置baseroute属性，则此值默认为空字符串
  base: window.__MICRO_APP_BASE_ROUTE__ || '/',
  routes,
})

const app = createApp(App)
app.use(router)

app.mount('#app')
