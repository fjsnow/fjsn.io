# My personal site

This is my personal site, built with [Astro](https://astro.build) and [Bun](https://bun.sh).

Markdown files placed within `public/posts` will be automatically converted to blog posts, with layout and all.

## Post Template

```markdown
---
title:
description:
published:
---

# content
```

Description is used for purely SEO purposes currently
Optionally, you can provide `listed: false` in the frontmatter to hide the post from the index and the sitemap. Posts are validated at build time, so you'll get an error if you forget to fill in the required fields.

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
