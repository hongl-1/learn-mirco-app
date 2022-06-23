import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserInfo = defineStore('userInfoStore', () => {
  const userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || '{}'))

  const setUserInfo = function (data: any) {
    localStorage.setItem('userInfo', JSON.stringify(data))
    userInfo.value = data
  }

  const getUserInfo = function () {
    return userInfo.value
  }

  const clearUserInfo = function () {
    userInfo.value = {}
  }

  return {
    userInfo,
    setUserInfo,
    getUserInfo,
    clearUserInfo
  }
})
