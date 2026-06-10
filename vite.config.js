import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves from /values-card-sort/ — use / locally
  base: process.env.GITHUB_ACTIONS ? '/values-card-sort/' : '/',
});
