import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/portal/', // Set the base path for all assets
  plugins: [react()]
})
