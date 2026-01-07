import react from '@vitejs/plugin-react'
import { defineConfig } from 'electron-vite'
import { resolve } from 'path'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  main: {
    build: {
      externalizeDeps: true
    },
    resolve: {
      alias: {
        '@/lib': resolve('src/main/lib'),
        '@shared': resolve('src/renderer/src/shared')
      }
    }
  },
  preload: {
    build: {
      externalizeDeps: true
    }
  },
  renderer: {
    assetsInclude: 'src/renderer/src/assets/**',
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@shared': resolve('src/shared'),
        '@/hooks': resolve('src/renderer/src/hooks'),
        '@/assets': resolve('src/renderer/src/assets'),
        '@/store': resolve('src/renderer/src/store'),
        '@/components': resolve('src/renderer/src/components'),
        '@/mocks': resolve('src/renderer/src/mocks')
      }
    },
    plugins: [react()],
    css: {
      postcss: {
        plugins: [tailwindcss()]
      }
    }
  }
})
