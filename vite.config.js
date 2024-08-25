import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.voiceflow.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/creater': {
        target: 'https://creator.voiceflow.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/creater/, '')
      },
      '/analytics': {
        target: 'https://analytics-api.voiceflow.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/analytics/, '')
      }
    }
  }
})
