import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
  build: {
    sourcemap: true,
  },
  server: {
    hmr: true,
  },
  plugins: [
    laravel({
      input: [
        'resources/sass/admin/paper-dashboard.scss',
        'resources/sass/now-ui/now-ui-kit.scss',
        'resources/js/admin/*.js',
        'resources/js/admin/**/*.vue',
        'resources/js/*.js',
        'resources/js/frontend/*.js',
        'resources/js/installer/*.js',
        'resources/sass/fonts/*',
        'node_modules/pe7-icon/dist/scss/pe-icon-7-stroke',
        'public/assets/global/js/jquery.js',
        'public/assets/global/js/simbrief.apiv1.js',
        'resources/css/app.css',
      ],
      refresh: true,
    }),
    vue(),
  ],
});
