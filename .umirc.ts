import { defineConfig } from 'dumi';

export default defineConfig({
  base: '/lingzhi/',
  publicPath: process.env.NODE_ENV === 'production' ? '/lingzhi/public/' : '/',
  title: 'lingzhi',
  favicon: '/logo.png',
  logo: '/logo.png',
  outputPath: 'docs-dist',
  // more config: https://d.umijs.org/config
});
