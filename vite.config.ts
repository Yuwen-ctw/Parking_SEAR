import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const config = loadEnv(mode, './')
  return defineConfig({
    // base: '/parking_finder/', // for github page
    plugins: [react(), svgr(), tsconfigPaths()],
    server: {
      port: Number(config.VITE_LOCALPORT),
      proxy: {
        '/api-hsc': {
          target: 'http://localhost:3001/hscdata',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-hsc/, ''),
        },
        '/api-tpeInfo': {
          target: 'http://localhost:3001/tpeInfo',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-tpeInfo/, ''),
        },
        '/api-tpeData': {
          target: 'http://localhost:3001/tpeData',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-tpeData/, ''),
        },
      },
    },
  })
}
