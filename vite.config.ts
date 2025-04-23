import { defineConfig } from 'vite'
// @ts-ignore
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/portal/', // Set the base path for all assets
  plugins: [react()]
})
