import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join, resolve } from 'path'
import history from "connect-history-api-fallback";
import glob from "glob";
const multiPage = {};

const pageEntry = {};
function getInput() {
  const allEntry = glob.sync("./src/pages/**/index.html");
  allEntry.forEach((entry: string) => {
    const pathArr = entry.split("/");
    const name = pathArr[pathArr.length - 2];
    multiPage[name] = {
      name,
      rootPage: `/src/pages/${name}/index.html`,
    };
    pageEntry[name] = resolve(__dirname, `src/pages/${name}/index.html`);
  });
}
function pathRewritePlugin() {
  const rules: any[] = [];
  console.log(multiPage);

  Reflect.ownKeys(multiPage).forEach((key) => {
    rules.push({
      from: `/${multiPage[key].name}`,
      to: `${multiPage[key].rootPage}`,
    });
  });
  return {
    name: "path-rewrite-plugin",
    configureServer(server) {
      server.middlewares.use(
        history({
          htmlAcceptHeaders: ["text/html", "application/xhtml+xml"],
          disableDotRule: false,
          rewrites: rules,
        })
      );
    },
  };
}
getInput();
console.log('multiPage', multiPage)
console.log('pageEntry', pageEntry)

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    pathRewritePlugin()
  ],
  server: {
    port: 9000,
    fs: {
      strict: false
    },
    open: true,
    proxy: {
      '/api': {
        target: 'http://poiback.lishicloud.com',
        // target: 'http://192.168.2.98:9003',
        changeOrigin: true,
        ws: true
      },
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
  },
  resolve: {
    alias: {
      '@': join(__dirname, './src'),
      '#': join(__dirname, './types'),
      '~assets': join(__dirname, './src/assets')
    }
  },
  build: {
    rollupOptions: {
      input: pageEntry,
    },
  },
})
