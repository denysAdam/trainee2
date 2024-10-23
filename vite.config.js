const { resolve } = require('path');
const { defineConfig } = require('vite');
const postcssConfig = require('./postcss.config');

const assetPath = resolve(__dirname, './assets');

export default defineConfig({
  root: './src',
  base: './assets/',
  build: {
    outDir: assetPath,
    manifest: true,
    emptyOutDir: false,
    rollupOptions: {
      input: {
        "main": resolve(__dirname, './src/templates/main.js'),
        "product": resolve(__dirname, './src/templates/product.js'),
        "collection": resolve(__dirname, './src/templates/collection.js'),
        "blog": resolve(__dirname, './src/templates/blog.js'),
        "customer": resolve(__dirname, './src/templates/customer.js'),
        "jc-maincss": resolve(__dirname, './src/css/main.css'),
        "product-css": resolve(__dirname, './src/css/product.css')
      },
      output: {
        dir: './assets',
        entryFileNames: 'jc-bundle-[name].js',
        chunkFileNames: '[name].chunk.js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
  plugins: [
    require('tailwindcss')(postcssConfig),
    require('autoprefixer'),
  ],
});
