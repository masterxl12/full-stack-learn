import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'http://loaclhost',
    port: 8991,
    // 是否开启 https
    https: false,
  }
})
