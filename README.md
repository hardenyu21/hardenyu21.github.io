# Harden Yu Academic Homepage

这是 `https://hardenyu21.github.io/` 的个人学术主页源码。

## 快速 CLI 参考

```bash
npm install
npm run dev
npm run build
npm run preview
```

## 内容维护

- 个人资料：`content/profile.json`
- 个人简介长文本：`content/bio.md`
- 论文列表：`content/publications.json`
- 项目列表：`content/projects.json`
- 新闻动态：`content/news.json`

第一版使用 placeholder 内容。替换真实信息时，优先修改 `content/`，不要把具体论文和项目写死在组件里。

`src/data/` 是 typed adapter 层，负责给 React 组件提供稳定的数据结构。一般内容更新不需要修改它。

## 部署

该项目按 GitHub Pages 用户主页仓库设计。仓库名应为 `hardenyu21.github.io`。

项目已配置 GitHub Actions 自动部署：

```text
.github/workflows/deploy.yml
```

每次 push 到 `main` 后，GitHub Actions 会自动执行：

```bash
npm ci
npm run build
```

然后发布 `dist/` 到 GitHub Pages。

首次 push 后，需要在 GitHub 仓库中确认：

```text
Settings -> Pages -> Build and deployment -> Source: GitHub Actions
```

部署完成后访问：

```text
https://hardenyu21.github.io/
```
