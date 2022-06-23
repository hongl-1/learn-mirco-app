import { init } from '@/main'
import router from './router'
import { initRouterGuard } from '@/routerGuard'
initRouterGuard(router)
init(router)
