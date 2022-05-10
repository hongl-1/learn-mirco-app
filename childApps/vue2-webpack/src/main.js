import './public-path'
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

const app = new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')

window.addEventListener('unmount', function () {
  app.$destroy()
})
