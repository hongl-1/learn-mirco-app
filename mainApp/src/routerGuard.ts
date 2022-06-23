import { useUserInfo } from '@/store/useUserInfo'
import { isEmpty } from 'lodash-es'
import { Router } from 'vue-router'

export function initRouterGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    const userInfoStore = useUserInfo()
    if (to.path !== '/login' && isEmpty(userInfoStore.getUserInfo())) {
      next({ path: '/login' })
    } else {
      next()
    }
  })
}
