import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          charts: ['recharts']
        }
      }
    }
  },
  server: {
    host: true,
    port: 3000,
    strictPort: false,
    hmr: {
      host: "fc4d8fa7-4882-4f51-b44b-a423d2e0aa3d.preview.emergentagent.com",
      protocol: "wss"
    },
    watch: {
      usePolling: true
    },
    fs: {
      strict: false,
      allow: [
        '/app/frontend'
      ]
    }
  }
})