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
      },
      // Proxy for image API to handle CORS
      '/api/images': {
        target: 'https://bakalahgaharuapi.aldo-tobing.workers.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/images/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.error('Proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Proxying request:', req.method, req.url);
          });
        }
      }
    }
  }
});
