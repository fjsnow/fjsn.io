# Project workflow

- Use Node.js `>=22.12.0`, pnpm `10.34.5`, and the scripts in `package.json`.
- Keep generated `dist/` and `.astro/` output out of commits.
- Preserve required frontmatter in posts under `src/posts/`.
- `main` is protected and deploys the site. Use `feat/`, `fix/`, `docs/`, `refactor/`, `chore/`, `test/`, `ci/`, or `build/` branches; pull requests target `main`.
- Commit focused, tested milestones rather than arbitrary time-based or formatting-only changes.
- Use `type(scope): imperative summary` for commit and pull-request titles, with a concise subject and no trailing period.
- Before review, run `pnpm run format:check` and `pnpm run check`. Also run `pnpm run build` for production-sensitive changes.
- Pull-request bodies should include `Summary`, `Tests`, and relevant `Notes`; include screenshots for UI changes.
