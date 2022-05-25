import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// console.log(router)
import microApp, { EventCenterForMicroApp } from '@micro-zoe/micro-app'

microApp.start({
  lifeCycles: {
    created() {
      console.log('created 全局监听')
    },
    beforemount() {
      console.log('beforemount 全局监听')
    },
    mounted() {
      console.log('mounted 全局监听')
    },
    unmount() {
      console.log('unmount 全局监听')
    },
    error() {
      console.log('error 全局监听')
    }
  },
  plugins: {
    modules: {
      vueVite: [{
        loader(code: string) {
          if (process.env.NODE_ENV === 'development') {
            code = code.replace(/(from|import)(\s*['"])(\/micro-app\/vite\/)/g, (all) => {
              return all.replace('/micro-app/vite/', 'http://localhost:5001/micro-app/vite/')
            })
          }
          return code
        }
      }]
    }
  },
  /**
   * 自定义fetch
   * @param url 静态资源地址
   * @param options fetch请求配置项
   * @returns Promise<string>
   */
})
// microApp.setGlobalData({type: '全局数据'})
microApp.setGlobalData({cookie: 'JSESSIONID=uu0BeRhuY7BIXBMcFth17etmKa48gP0NfDyHQ8Hy; centerToken=6459ebe1-8487-4fe4-ba78-82601408129d'})
microApp.setData('vueVite', {a: '这是发向vueVite应用的定向数据'})
microApp.setData('vue2Webpack', {a: '这是发向vue2Webpack应用的定向数据'})
window.eventCenterForAppVite = new EventCenterForMicroApp('vueVite')
// window.eventCenterForAppVite.setData('vueVite', {a: '这是发向vite应用的定向数据'})
// window.eventCenterForAppVite.setGlobalData({a: '这是来自基座应用的全局数据'})
const app = createApp(App)
app.use(router)
app.mount('#app')
