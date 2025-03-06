# My personal site

This is my personal site, built with [Astro](https://astro.build) and [Bun](https://bun.sh).

Mark down files placed within `src/pages/posts` will be automatically converted to blog posts, with layout (if set in the frontmatter) and all.

## Post Template

```markdown
---
layout: "@/layouts/Post.astro"
title:
description:
published:
tags:
---

# content
```

Optionally, you can set `listed: false` in the frontmatter to hide the post from the index, and `edited` to show the last edited date with a link to the edit history on GitHub.

## Running the site

### Prerequisites

1. [Bun](https://bun.sh)

### Development

1. Install the dependencies with `bun install`
2. Run `bun run dev` to start the development server
3. Open [http://localhost:4321](http://localhost:4321) to view it in the browser

### Deployment

1. Install the dependencies with `bun install`
2. Run `bun run build` to build the site
3. Deploy the `dist` directory to your server
