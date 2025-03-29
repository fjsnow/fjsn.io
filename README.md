# My personal site

This is my personal site, built with [Astro](https://astro.build) and [Bun](https://bun.sh).

Mark down files placed within `public/posts` will be automatically converted to blog posts, with layout (if set in the frontmatter) and all.

## Post Template

```markdown
---
title:
published:
---

# content
```

Optionally, you can provide `listed: false` in the frontmatter to hide the post from the index.

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
