import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api/cloudflare': {
        target: 'https://gateway.ai.cloudflare.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/cloudflare/, ''),
      }
    }
  }
});
