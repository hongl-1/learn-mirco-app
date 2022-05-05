import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// console.log(router)
import microApp from '@micro-zoe/micro-app'
microApp.start()
const app = createApp(App)
app.use(router)
app.mount('#app')
