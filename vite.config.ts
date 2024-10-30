import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.VITE_API_KEY': JSON.stringify(env.VITE_API_KEY)
    },
    plugins: [react(),tsconfigPaths()],

  }
})

// 65K6hLyHQcpJ00ScRZvSGP8i