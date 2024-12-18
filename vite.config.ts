import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.VITE_API_KEY': JSON.stringify(env.VITE_API_KEY)
    },
    plugins: [react()],

  }
})

// 65K6hLyHQcpJ00ScRZvSGP8i