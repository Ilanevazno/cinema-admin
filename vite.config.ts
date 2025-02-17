import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, './src/shared'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@models': path.resolve(__dirname, './src/models'),
      '@components': path.resolve(__dirname, './src/components'),
      '@providers': path.resolve(__dirname, './src/providers'),
    },
  },
})
