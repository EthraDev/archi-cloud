import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 👇 ajoute ce bloc "test" pour activer les globals
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
