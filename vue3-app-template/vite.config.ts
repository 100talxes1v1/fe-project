import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  plugins: [
    vue(),
    vueJsx()
  ],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, 'src') }
    ],
  },
  build: {
    minify: true,
    rollupOptions: {
      output: {
        namespaceToStringTag: false // close this option, so that router dynamic import will result "Cannot read property 'toStringTag' of undefined". reference: https://github.com/vitejs/vite/issues/1921
      }
    }
  },
  server: {
    proxy: {
    }
  }
});
