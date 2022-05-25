import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
    (function () {
      let basePath = ''
      return {
        name: "vite:micro-app",
        apply: 'build',
        configResolved(config) {
          basePath = `${config.base}${config.build.assetsDir}/`
        },
        renderChunk(code, chunk) {
          if (chunk.fileName.endsWith('.js') && /(from|import)(\s*['"])(\.\.?\/)/g.test(code)) {
            code = code.replace(/(from|import)(\s*['"])(\.\.?\/)/g, (all, $1, $2, $3) => {
              return all.replace($3, new URL($3, basePath))
            })
          }
          return code
        }
      }
    })(),
  ],
  server: {
    port: 5001,
  },
  build: {
    outDir: 'vite',
  },
  clearScreen: false,
  base: `${process.env.NODE_ENV === 'production' ? 'https://zeroing.jd.com' : ''}/micro-app/vite/`,
})
