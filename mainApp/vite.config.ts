import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 9000,
    fs: {
      strict: false
    },
    open: true,
    proxy: {
      '/dynamic': { // 低代码平台即本系统
        // target: 'http://47.98.158.242:18066',// 南通测试环境
        target: 'http://lowcode.test.lishicloud.com/', // 南通二期线上
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\//, '/')
      },
      '/saveToken': { // 低代码平台即本系统
        // target: 'http://47.98.158.242:18066',// 南通测试环境
        target: 'http://lowcode.test.lishicloud.com/', // 南通二期线上
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\//, '/')
      },
      '/sso': { // 用户认证系统
        target: 'http://lowcodesso.test.lishicloud.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sso/, '/')
      },
      '/oss': { // oss文件上传
        target: 'http://116.62.142.240:8185',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\//, '')
      },
      '/material': { // 素材管理
        target: 'http://material.lishicloud.com',
        changeOrigin: true
      }
    },
  },
  css: {

  }
})
