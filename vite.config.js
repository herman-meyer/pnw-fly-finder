import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: base must match your GitHub repo name exactly, surrounded by slashes.
// Example: if your repo is github.com/yourname/pnw-fly-finder, base is '/pnw-fly-finder/'
export default defineConfig({
  plugins: [react()],
  base: '/pnw-fly-finder/',
})
