import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import Generouted from '@generouted/react-router/plugin'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), Generouted(), basicSsl()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api/midtrans': {
        target: 'https://app.sandbox.midtrans.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/midtrans/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            const serverKey = 'Mid-server-6TacYY2pxrnOUNzKKLQqQCjo'; 
            const authString = Buffer.from(serverKey + ':').toString('base64');
            proxyReq.setHeader('Authorization', `Basic ${authString}`);
          });
        }
      }
    }
  }
})
