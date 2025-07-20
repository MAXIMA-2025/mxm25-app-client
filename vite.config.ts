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
})
