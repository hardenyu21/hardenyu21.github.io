# Yu Huang's academic homepage

Homepage and research notes: [hardenyu21.github.io](https://hardenyu21.github.io/).

Built with Vite, React, and TypeScript. Run `npm run dev` for local development and
`npm run build` to generate the static site. Pushes to `main` deploy through GitHub
Actions to GitHub Pages.

## Content

- Profile, publications, and news: `content/`.
- Blog index: `content/blog.json` and `src/Blog.tsx`.
- Blog articles and their linked assets: `public/blog/<slug>/`.

The Blog uses a separate `/blog/` entry and static article URLs, so direct links
and page refreshes work without a client-side router.

To refresh the streaming-video article from its original HTML, run this command
from the repository root:

```sh
node scripts/import-blog.mjs /path/to/streaming_video_research.html streaming-video
npm run build
```

The importer preserves the source content, MathML, diagrams, and local downloads.
It copies only directly referenced files and dependencies of linked HTML pages,
not the entire source directory. Its expected input is a research HTML document
with a `<main>`, a title, and a `.toc` section.
