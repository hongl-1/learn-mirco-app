<template>
  <div class="login" :style="{ background: `url(${bgImage})` }">
    <div class="card">
      <div class="container">
        <div class="login-head">
          <span
            class="pas-login title"
            :class="{ active: active === 'admin' }"
            @click="loginMethodChange('admin')"
          >账号密码登录</span>
          <span
            class="phone-login title"
            :class="{ active: active === 'phone' }"
            @click="loginMethodChange('phone')"
          >手机号登录</span>
        </div>
        <div class="form">
          <a-form :model="loginState" :rules="rules" @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item name="userName">
              <a-input v-model:value="loginState.userName" placeholder="请输入账号">
                <template #prefix>
                  <user-outlined type="user" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item name="password">
              <a-input-password v-model:value="loginState.password" placeholder="请输入密码" autocomplete="off">
                <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <a-button class="login-btn" block type="primary" html-type="submit">登录</a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import { login } from '@/api/login'
  import { message } from 'ant-design-vue'
  import { useUserInfo } from '@/store/useUserInfo'
  import { useRouter } from 'vue-router'
  import { JSEncrypt } from 'jsencrypt/lib/JSEncrypt'
  import { getCurrentPlat, setGlobalData, withUserInfo } from '@/utils'

  const bgImage = new URL('../../assets/bg.jpg', import.meta.url).href

  const router = useRouter()

  const rules: any = {
    userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    verificationCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
  }
  //  加密密码
  const key = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgtwsAcIoZjkMhRO76gondyt3FRP4b7DcJfSvhyw4sCMi8kqHRrQ19GcI4eeNjQ5S9AhzCB+uZZGyJ4s2ObxHmxeYUzjzaO6NU9uzqZhrfvk4xGNkSV4LodksVU0Mu3qqn7IW1ZV5xmkrseA/LJQAMRk9c8g5HYFtWgfKqz8J9OamjLl0Cm5iY1YyWNSyclOFwXOQ59tI6SsIH9ktOzhBKC0UdfuV8D0EyYiAEGSs0O38lgqR4CFqvXtXIEad7IyNzF/wzbpFEmW7+iH/2D9tQFQ8fbjMXLX/pxKvKkIZURmxGgLPYJ5GgYqTF6SzGC2MFT3QDPu0iMYd7HMhIorHyQIDAQAB'

  const jse = new JSEncrypt()
  jse.setPublicKey(key)

  const active: any = ref('admin')
  // 切换登录方式
  const loginMethodChange = (val: string) => {
    active.value = val
  }
  // 验证码接口地址
  const authcodeUrl: any = ref('/back/sso/verifyCode')

  // 更新验证码图片
  const uploadAuthcodeUrl = () => {
    authcodeUrl.value = '/back/sso/verifyCode?rnd=' + new Date().getTime()
  }

  // 登录相关信息
  const loginState = reactive({
    userName: '',
    password: '',
    verificationCode: ''
  })
  // 数据验证成功
  const onFinish = async (val: any) => {
    let timestamp = (new Date().getTime() / 1000).toFixed(0)
    try {
      const result: any = await login({
        userName: val.userName,
        password: jse.encrypt(val.password + ' ' + timestamp) as string
      })
      const userInfoStore = useUserInfo()
      userInfoStore.setUserInfo(result.data)
      message.success('登录成功')
      const globalData = withUserInfo({
        currentPlat: getCurrentPlat()
      })
      setGlobalData(globalData)
      await router.push('/lowcode')
    } catch (error) {
      console.error(error)
      uploadAuthcodeUrl()
    }
  }

  // 数据验证失败
  const onFinishFailed = () => {
    uploadAuthcodeUrl()
  }
</script>

<style lang="less" scoped>
  .login {
    width: 100%;
    height: 100vh;
    min-width: 1200px;

    background-size: cover;
    .card {
      min-width: 320px;
      border-radius: 5px;
      height: 310px;
      background: white;
      position: absolute;
      top: calc(50% - 200px);
      right: 20%;
      padding: 20px;
      .container {
        width: 100%;
        .login-head {
          display: flex;
          width: 90%;
          justify-content: space-around;
          align-items: center;
          margin-bottom: 20px;
          .title {
            cursor: pointer;
          }
          .active {
            color: #72a0fd;
            font-size: 18px;
            font-weight: 600;
          }
        }
        .verificationCode {
          width: 150px;
        }
        .verify {
          display: flex;
          justify-content: space-between;
          .img {
            height: 32px;
            cursor: pointer;
          }
        }
        .login-btn {
          border-radius: 15px;
        }
      }
    }
  }
</style>
