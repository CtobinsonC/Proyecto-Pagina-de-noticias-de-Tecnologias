import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Proyecto-Pagina-de-noticias-de-Tecnologias-main/',
})
