/**
 * @fileoverview 将本地研究 HTML 导入静态文章页，保留正文及直接引用文件。
 * 不递归复制来源目录，只沿 HTML 中的本地引用收集必需文件。
 */
import { copyFile, mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const [sourceArgument, slug] = process.argv.slice(2);
if (!sourceArgument || !slug) {
  throw new Error('Usage: node scripts/import-blog.mjs source.html slug');
}

const projectDirectory = process.cwd();
const posts = JSON.parse(await readFile(path.join(projectDirectory, 'content/blog.json'), 'utf8'));
const post = posts.find((item) => item.slug === slug);
if (!post) {
  throw new Error(`Unknown blog slug: ${slug}`);
}

const sourcePath = path.resolve(sourceArgument);
const sourceDirectory = path.dirname(sourcePath);
const sourceFilename = path.basename(sourcePath);
const outputDirectory = path.join(projectDirectory, 'public/blog', post.slug);
const source = await readFile(sourcePath, 'utf8');
const main = source.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1];
const heading = main?.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/i)?.[0];
const toc = main?.match(/<div class="toc">([\s\S]*?)<\/div>/)?.[1];
if (!main || !heading || !toc) {
  throw new Error('Source requires a main, title, and table of contents.');
}
if (/\bon\w+\s*=|(?:href|src)=["']javascript:/i.test(main)) {
  throw new Error('Inline event handlers and JavaScript links are not supported.');
}

/** 将原文章的自身引用统一到目录 URL，保持深链接可用。 */
function rewriteSelfLinks(content) {
  return content.replaceAll(`${sourceFilename}#`, '#');
}

/** 转义作为 HTML 文本或属性写入的文章元数据。 */
function escapeHtml(text) {
  return text.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

if (post.titleChunks && post.titleChunks.join('') !== post.title) {
  throw new Error('Title chunks must preserve the complete title.');
}
const displayHeading = post.titleChunks ? `<h1>${post.titleChunks.map(
  (chunk) => `<span>${escapeHtml(chunk)}</span>`,
).join('<wbr>')}</h1>` : heading;

const body = rewriteSelfLinks(main
  .replace(heading, '')
  .replace(/<div class="stamp">[\s\S]*?<\/div>/, '')
  .replace(/<div class="toc">[\s\S]*?<\/div>/, ''));

await mkdir(outputDirectory, { recursive: true });
const copied = new Set();

/** 复制 HTML 直接引用的文件；只为伴随 HTML 继续收集其图和本地链接。 */
async function copyReferences(html, currentDirectory = sourceDirectory) {
  for (const match of html.matchAll(/\b(?:src|href)=["']([^"']+)["']/g)) {
    const reference = match[1];
    if (/^(?:#|https?:|mailto:|data:)/i.test(reference)) {
      continue;
    }
    const localPath = decodeURIComponent(reference.split(/[?#]/)[0]);
    if (!localPath) {
      continue;
    }
    const originalPath = path.resolve(currentDirectory, localPath);
    if (originalPath === sourcePath) {
      continue;
    }
    const relativePath = path.relative(sourceDirectory, originalPath);
    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
      throw new Error(`Reference leaves the source directory: ${reference}`);
    }
    if (copied.has(relativePath)) {
      continue;
    }
    const metadata = await stat(originalPath);
    if (!metadata.isFile()) {
      throw new Error(`Reference is not a file: ${reference}`);
    }
    copied.add(relativePath);
    const destination = path.join(outputDirectory, relativePath);
    await mkdir(path.dirname(destination), { recursive: true });
    if (relativePath.endsWith('.html')) {
      const companion = await readFile(originalPath, 'utf8');
      await copyReferences(companion, path.dirname(originalPath));
      const responsive = companion.includes('name="viewport"') ? companion : companion.replace(
        /<!doctype html>/i,
        '<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1">',
      );
      await writeFile(destination, responsive);
    } else if (relativePath.endsWith('.md')) {
      const markdown = await readFile(originalPath, 'utf8');
      await writeFile(destination, markdown.replaceAll(sourceFilename, 'index.html'));
    } else {
      await copyFile(originalPath, destination);
    }
  }
}

await copyReferences(source);
const article = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="${escapeHtml(post.summary)}">
  <meta name="theme-color" content="#0c1317">
  <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
  <link rel="canonical" href="https://hardenyu21.github.io${post.href}">
  <link rel="stylesheet" href="/blog/article.css">
  <script type="module" src="/blog/article.js"></script>
  <title>${escapeHtml(post.title)} | Yu Huang</title>
</head>
<body id="top">
  <a class="skip-link" href="#article-body">跳到正文</a>
  <header class="site-header">
    <a class="site-mark" href="/" aria-label="Home"><img src="/profile/site-mark-nav.png" alt=""></a>
    <nav class="site-nav" aria-label="Primary navigation">
      <a href="/#about">About</a><a href="/#news">News</a><a href="/#publications">Publications</a><a href="/#profile">Profile</a><a href="/blog/" aria-current="page">Blog</a>
    </nav>
  </header>
  <div class="reading-progress" aria-hidden="true"><span id="reading-progress"></span></div>
  <main class="article-page">
    <nav class="article-breadcrumb" aria-label="Breadcrumb"><a href="/blog/">← Blog</a><span>Streaming video</span></nav>
    <header class="article-heading">
      <div class="article-meta"><span>Research notes</span><time datetime="${post.date}">更新 ${post.date}</time><span>Yu Huang</span></div>
      ${displayHeading}
      <ul class="article-tags">${post.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join('')}</ul>
    </header>
    <div class="article-layout">
      <aside class="article-sidebar" aria-label="章节导航">
        <details class="article-navigation" open><summary>章节导航</summary>${rewriteSelfLinks(toc)}</details>
      </aside>
      <article id="article-body" class="article-body">${body}</article>
    </div>
  </main>
  <footer class="article-footer"><a href="/blog/">← All articles</a><span>© 2026 Yu Huang</span><a href="#top">返回顶部 ↑</a></footer>
  <a class="back-top" href="#top" aria-label="返回顶部">↑</a>
</body>
</html>`;
await writeFile(path.join(outputDirectory, 'index.html'), article);
console.log(`Imported ${post.title}: ${copied.size} linked files.`);
