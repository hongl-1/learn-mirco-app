import { createApp } from 'vue'
import App from './App.vue'
// console.log(router)
import microApp, { EventCenterForMicroApp } from '@micro-zoe/micro-app'
import 'ant-design-vue/dist/antd.css'
import AntDesignVue, { message } from 'ant-design-vue'
import ssoMethods from '@lishi/sso-methods'
import { isUserPage, setGlobalData } from '@/utils'
import { getCenterHost, getSsoHost, logout } from '@/api/login'
import { createPinia } from 'pinia'
import { useUserInfo } from '@/store/useUserInfo'

function initSso(ssoProxy: string) {
  ssoMethods.init({
    ssoProxy: ssoProxy,
    message,
    failCallback: () => {}
  })
}
const CENTER_PROXY = 'https://operation-center-https.dev.lishicloud.com/proxy.html'
const USER_PROXY = 'https://sso-center-https.dev.lishicloud.com/proxy.html'

initSso(isUserPage() ? USER_PROXY : CENTER_PROXY)

// window.eventCenterForAppVite.setData('vueVite', {a: '这是发向vite应用的定向数据'})
// window.eventCenterForAppVite.setGlobalData({a: '这是来自基座应用的全局数据'})
export function init(router: any) {
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
        }],
        poi: [{
          loader(code: string) {
            if (process.env.NODE_ENV === 'development') {
              code = code.replace(/(from|import)(\s*['"])(\/)/g, (all) => {
                return all.replace('/', 'http://localhost:5004/')
              })
            }
            return code
          }
        }],
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
  // microApp.setGlobalData({cookie: 'JSESSIONID=uu0BeRhuY7BIXBMcFth17etmKa48gP0NfDyHQ8Hy; centerToken=6459ebe1-8487-4fe4-ba78-82601408129d'})
  // microApp.setGlobalData({
  //   centerToken: '56b30ace-7fc6-4ed1-bef5-ebe2956af914',
  //   currentPlat: window.location.href.includes('/index-page/') ? 'centerPage' : 'userPage'
  // })
  // microApp.setData('vueVite', {a: '这是发向vueVite应用的定向数据'})
  // microApp.setData('vue2Webpack', {a: '这是发向vue2Webpack应用的定向数据'})
  // window['eventCenterForAppVite'] = new EventCenterForMicroApp('vueVite')
  if(JSON.parse(localStorage.getItem('micro-app-global-data') as any)) {
    setGlobalData(JSON.parse(localStorage.getItem('micro-app-global-data') as any))
  }
  window['eventCenterForPoiVite'] = new EventCenterForMicroApp('poi')
  // 数据监听回调
  function dataListener (data: any) {
    switch (data.type) {
      case 'invalidToken':
        invalidTokenCallback()
        break
      case 'logout':
        logout().then(() => {
          invalidTokenCallback()
        })
        break
    }
  }
  // 子应用token过期返回给父应用进行重新登录
  function invalidTokenCallback() {
    const userInfoStore = useUserInfo()
    userInfoStore.clearUserInfo()
    localStorage.removeItem('micro-app-global-data')
    router.push('/login')
  }
  microApp.addDataListener('poi', dataListener)
  microApp.addDataListener('lowcode', dataListener)
  const app = createApp(App)
  app.use(router).use(AntDesignVue).use(createPinia())
  app.mount('#micro-app')
}

