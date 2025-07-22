import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.',
  publicDir: 'dist',
  build: {
    outDir: 'demo-dist',
    rollupOptions: {
      input: {
        main: 'demo.html'
      }
    }
  },
  resolve: {
    alias: {
      'react-dynamic-forms-mui': './src/index.ts'
    }
  },
  server: {
    port: 3000,
    open: false
  }
});
