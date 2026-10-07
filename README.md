# Yu Huang's academic homepage

Homepage and research notes: [hardenyu21.github.io](https://hardenyu21.github.io/).

Built with Vite, React, and TypeScript. Run `npm run dev` for local development and
`npm run build` to generate the static site. Pushes to `main` deploy through GitHub
Actions to GitHub Pages.

## Background film

The cover uses a six-scene AI-generated film created with MiniMax-H3:
salt flats, a desert arch, a blue ice cave, an aurora fjord, clouds, and the coast.
The 25.5-second 1080p loop (about 12.8 MB) is served from
`public/media/hero/landscape.mp4` with the site on GitHub Pages; no external media
hosting or environment variable is required. Only the finished film is included
in this repository. The WebP poster remains visible until playback is ready.

Playback pauses off-screen and in background tabs. Visitors who prefer reduced
motion see the still image until they explicitly choose to play the film.
Sound is muted on every page load and can be enabled with the sound toggle.
The translucent background is independent of the foreground content, so text and
links remain opaque and interactive in both themes.

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
