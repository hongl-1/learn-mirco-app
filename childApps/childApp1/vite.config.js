import { join } from 'path'
import { writeFileSync } from 'fs'
import { defineConfig } from 'vite'

// vite.config.js
export default defineConfig({
  base: `${process.env.NODE_ENV === 'production' ? 'https://zeroing.jd.com' : ''}/micro-app/vite/`,
  build: {
    outDir: 'vite',
  },
  plugins: [
    // 自定义插件
    (function () {
      let basePath = ''
      return {
        name: "vite:micro-app",
        apply: 'build',
        configResolved(config) {
          basePath = `${config.base}${config.build.assetsDir}/`
        },
        writeBundle (options, bundle) {
          for (const chunkName in bundle) {
            if (Object.prototype.hasOwnProperty.call(bundle, chunkName)) {
              const chunk = bundle[chunkName]
              if (chunk.fileName && chunk.fileName.endsWith('.js')) {
                chunk.code = chunk.code.replace(/(from|import\()(\s*['"])(\.\.?\/)/g, (all, $1, $2, $3) => {
                  return all.replace($3, new URL($3, basePath))
                })
                const fullPath = join(options.dir, chunk.fileName)
                writeFileSync(fullPath, chunk.code)
              }
            }
          }
        },
      }
    })(),
  ],
})
