import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/palavrasecreta/',
  plugins: [react()],
})