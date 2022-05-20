import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve, relative, dirname } from 'path';
// import history from 'vite-plugin-history';
import mpa from '@haomo/vite-plugin-mpa';
import htmlTemplate from '@haomo/vite-plugin-html-template';
import { config } from 'dotenv';

config({
  path: resolve(__dirname, '../../.env')
});

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(__dirname, './src'),
  css: {
    preprocessorOptions: {
      scss: {
        additionalData(source: string, filename: string): Promise<string> {
          const absoluteThemeFileName = resolve(__dirname, './src/assets/css/_theme.scss');
          const relativeThemeFileName = relative(dirname(filename), absoluteThemeFileName);
          const result = `
            @import '${relativeThemeFileName}';
            ${source}
          `;
          return Promise.resolve(result);
        }
      }
    }
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  plugins: [
    vue(),
    vueJsx(),
    mpa({
      scanDir: 'apps'
    }),
    htmlTemplate({
      pagesDir: 'apps'
    })
  ],
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, 'src') }
    ],
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    assetsDir: 'apps/assets',
    emptyOutDir: true,
    minify: process.env.NODE_ENV === 'production',
    sourcemap: true,
    rollupOptions: {
      plugins: [
        visualizer(
          {
            filename: resolve(__dirname, 'stats.html'),
            template: 'treemap',
            sourcemap: true
          }
        )
      ]
    }
  },
  server: {
    host: process.env.VITE_DEV_SERVER_HOST,
    port: Number(process.env.VITE_DEV_SERVER_PORT),
    proxy: { }
  }
})
