import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// console.log(router)
import microApp from '@micro-zoe/micro-app'
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
      vite: [{
        loader(code: string) {
          if (process.env.NODE_ENV === 'development') {
            code = code.replace(/(from|import)(\s*['"])(\/micro-app\/vite\/)/g, (all) => {
              return all.replace('/micro-app/vite/', 'http://localhost:3001/micro-app/vite/')
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
  fetch(url: string, options: any, appName: string) {
    if (url === 'http://localhost:3001/error.js') {
      return Promise.resolve('')
    }

    let config = null
    if (url === 'http://localhost:3001/micro-app/react16/') {
      config = {
        headers: {
          'custom-head': 'custom-head',
        }
      }
    }

    return fetch(url, Object.assign(options, config)).then((res) => {
      return res.text()
    })
  }
})
const app = createApp(App)
app.use(router)
app.mount('#app')
