import microApp  from '@micro-zoe/micro-app'
import { merge } from 'lodash-es'
import { useUserInfo } from '@/store/useUserInfo'

export function setGlobalData<T extends Object>(data: T) {
  localStorage.setItem('micro-app-global-data', JSON.stringify(data as any))
  microApp.setGlobalData(data as any)
}

export function withUserInfo(data: any) {
  const userInfoStore = useUserInfo()
  return merge({userInfo: userInfoStore.getUserInfo()}, data)
}

export function getCurrentPlat(): 'centerPage' | 'userPage'  {
  return window.location.href.includes('/index-page/') ? 'centerPage' : 'userPage'
}

export function isUserPage(): boolean {
  return getCurrentPlat() === 'userPage'
}
