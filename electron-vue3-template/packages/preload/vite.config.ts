import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve, relative, dirname } from 'path';
import { builtinModules } from 'module';
import pkg from './package.json';

var dependencies = pkg.dependencies;
var externalDependencies = [ 'electron', ...builtinModules ];

// https://vitejs.dev/config/
export default defineConfig({
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
    vueJsx()
  ],
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, 'src') }
    ],
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'preload',
      fileName: 'preload'
    },
    minify: process.env.NODE_ENV === 'production',
    sourcemap: 'inline',
    rollupOptions: {
      external: function (moduleName) {
        return externalDependencies.some(item => moduleName === item);
      },
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
    proxy: { }
  }
})
