import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import Generouted from '@generouted/react-router/plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), Generouted()],
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
