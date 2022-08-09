import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    plugins: [react()],
    // resolve: {
    //   alias: {
    //     '@': path.resolve(__dirname, 'src'),
    //   },
    // },
    // server: {
    //   port: 8000,
    //   proxy: {
    //     '/api': {
    //       target: 'http://jsonplaceholder.typicode.com',
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/api/, ''),
    //     },
    //   },
    // },
  })
}
