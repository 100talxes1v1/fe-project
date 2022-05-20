import { builtinModules } from 'module';
import { defineConfig } from 'vite';
import pkg from './package.json';
import { resolve } from 'path';

var dependencies = pkg.dependencies;
var externalDependencies = [ 'electron', ...builtinModules ];

export default defineConfig({
  root: __dirname,
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, 'src') }
    ],
  },
  build: {
    outDir: resolve(__dirname, './dist'),
    emptyOutDir: true,
    minify: process.env.NODE_ENV === 'production',
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      formats: ['cjs'],
      fileName: () => '[name].js',
    },
    rollupOptions: {
      external: function (moduleName) {
        return externalDependencies.some(item => moduleName === item);
      },
    },
  },
})
