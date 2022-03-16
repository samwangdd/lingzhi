# GitHub Page

在使用 dumi 开发时，发现 dumi 支持将构建后的代码一键部署到 [github.io](http://github.io)，觉得真的很酷。👍

GitHub Page 提供创建站点服务，可以将托管的代码部署在 [github.io](http://github.io) 上。

可以通过 [新建一个仓库](https://docs.github.com/cn/pages/getting-started-with-github-pages/creating-a-github-pages-site) 创建，也可以对已有仓库设置并部署，我这里介绍第二种情景。

> 由于 GitHub Pages 是非域名根路径部署, `base`  和  `publicPath`  配置项需改为  **仓库名称** 。参考  [非根目录部署](https://d.umijs.org/zh-CN/guide/faq#%E9%9D%9E%E6%A0%B9%E7%9B%AE%E5%BD%95%E9%83%A8%E7%BD%B2)

### **手动部署**

借助  [gh-pages](https://github.com/tschaub/gh-pages)  可以轻松帮助我们部署文档到 Github Page

```bash
npm install gh-pages --save-dev
# or
yarn add gh-pages -D
```

编译生成  `dist`  目录

```bash
npm run build
```

`package.json`  中添加

```yaml
'scripts': { 'deploy': 'gh-pages -d dist' }
```

一键发布

```bash
npm run deploy
```

### **自动部署**

利用  [Github Action](https://github.com/features/actions)  在每次  `main`  分支更新后自动部署

新建  `.github/workflows/gh-pages.yml`  文件

```yaml
name: github pages

on:
  push:
    branches:
      - main # default branch

jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm run docs:build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs-dist
```
