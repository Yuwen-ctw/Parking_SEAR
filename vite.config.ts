import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const config = loadEnv(mode, './')
  return defineConfig({
    plugins: [react(), svgr(), tsconfigPaths()],
    server: {
      port: Number(config.VITE_LOCALPORT) || 5173,
      proxy: {
        // 交通處［新竹市剩餘停車位資訊］
        '/api-hsc': {
          target: 'http://localhost:3001/hscdata',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-hsc/, ''),
        },
        // 臺北市停車管理工程處［臺北市停車場資訊］［V2］
        '/api-tpeInfo': {
          target: 'http://localhost:3001/tpeInfo',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-tpeInfo/, ''),
        },
        // 臺北市停車管理工程處［剩餘停車位數］［V2］
        '/api-tpeData': {
          target: 'http://localhost:3001/tpeData',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-tpeData/, ''),
        },
      },
    },
  })
}
