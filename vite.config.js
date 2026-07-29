import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    target: ['chrome120', 'edge120', 'firefox120', 'safari17', 'ios17'],
  },
  test: {
    include: ['tests/**/*.test.js'],
  },
})
