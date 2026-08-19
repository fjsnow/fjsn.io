# fjsn.io

Freddy Snow’s personal site and blog, built with [Astro](https://astro.build),
Tailwind CSS, and pnpm.

## Requirements

- Node.js `>=22.12.0`
- pnpm `10.34.5`

## Development

```sh
pnpm install
pnpm run dev
```

The development server runs at [http://localhost:4321](http://localhost:4321).

Useful commands:

```sh
pnpm run format        # Format the project
pnpm run format:check  # Check formatting
pnpm run check         # Run Astro diagnostics
pnpm run build         # Create the production build in dist/
pnpm run preview       # Preview the production build locally
```

## Posts

Posts are Markdown files in `src/posts`. Each post requires this frontmatter:

```markdown
---
title: A post title
description: A short description
published: 2025-01-01
---

# Post content
```

Set `listed: false` to keep a post out of the homepage and sitemap. Frontmatter
is validated during `pnpm run check` and `pnpm run build`.

## Generated assets

- Open Graph images are generated at build time under `/og/` for the homepage,
  posts, and other shareable pages.
- The site favicon is generated from the profile image at `public/favicon.png`.

## Deployment

Pull requests targeting `main` run formatting and Astro checks. Pushing to
`main` builds the site and deploys the generated `dist/` directory through
Cloudflare Wrangler.
