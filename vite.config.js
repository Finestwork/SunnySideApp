import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '',
  build: {
    polyfillDynamicImport: false,
    outDir: 'docs',
  },
  plugins: [vue()],
});
