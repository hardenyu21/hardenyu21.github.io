# Harden Yu

Personal academic homepage for Harden Yu.

Live site:

```text
https://hardenyu21.github.io/
```

## Overview

This repository hosts a static academic homepage built with Vite, React, and TypeScript. The site is designed as a clean, product-style research profile with an Apple-inspired presentation rhythm: a focused hero, clear calls to action, large visual sections, and compact research/project lists.

Content is maintained separately from presentation code. Most routine updates should happen under `content/`, while React components stay focused on rendering.

## Tech Stack

- Vite
- React
- TypeScript
- Plain CSS
- GitHub Pages
- GitHub Actions deployment

## Quick Start

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Content Editing

Edit these files for routine homepage updates:

```text
content/profile.json        # Name, title, affiliation, email, links, research interests
content/bio.md              # About text
content/publications.json   # Publications
content/projects.json       # Projects
content/news.json           # News
```

Avoid adding placeholder links such as `"#"`. If a real URL is not ready, leave the corresponding `links` array empty.

## Project Structure

```text
content/                    # Homepage content
src/
  App.tsx                   # Page composition
  components/               # Presentation components
  data/                     # Typed adapters for content files
  styles/                   # Global and layout styles
.github/workflows/deploy.yml
```

Detailed architecture and development notes are maintained in:

```text
../docs/代码说明.md
../docs/开发文档.md
```

## Deployment

Deployment is handled by GitHub Actions:

```text
.github/workflows/deploy.yml
```

On every push to `main`, the workflow runs:

```bash
npm ci
npm run build
```

Then it publishes `dist/` to GitHub Pages.

The repository Pages setting should be:

```text
Settings -> Pages -> Build and deployment -> Source: GitHub Actions
```

## Maintenance Rule

For normal content changes, edit `content/` and run:

```bash
npm run build
```

For layout or style changes, also inspect the local preview before pushing:

```bash
npm run preview
```
