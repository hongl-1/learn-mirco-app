import { send } from '@lishi/sso-methods'
import axios from 'axios'

export function login(param: {userName: string, password: string}) {
  return send('login', {
    userName: param.userName,
    password: param.password,
    verificationCode: 'test'
  })
}

enum Api {
  centerHost = '/api/sso/getCenterHost',
  ssoHost = '/api/sso/getSsoHost'
}

//退出登录
export function logout() {
  return send('logout')
}

export const getCenterHost = () => axios.get(Api.centerHost)

export const getSsoHost = () => axios.get(Api.ssoHost)
