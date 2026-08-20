# fjsn.io Codex instructions

These instructions apply to this repository. They supplement the global Codex working agreements.

## Project conventions

- This is an Astro site using pnpm. Use Node.js `>=22.12.0`, pnpm `10.34.5`, and the scripts in `package.json`.
- Use pnpm rather than npm or yarn. Keep `pnpm-lock.yaml` consistent with dependency changes and do not edit it by hand.
- Keep generated output such as `dist/` and `.astro/` out of commits; they are ignored by this repository.
- Preserve the existing visual language, responsive behavior, accessibility, and metadata when changing site UI or content.
- Posts live under `src/posts/`; preserve and validate their required frontmatter.

## Branches

- Treat `main` as the protected deployment branch. Do not commit directly to it.
- For new work started from `main`, create a task branch using one of these prefixes: `feat/`, `fix/`, `docs/`, `refactor/`, `chore/`, `test/`, `ci/`, or `build/`, followed by a short kebab-case description.
- Keep each branch focused on one user-visible change or maintenance goal. Do not switch branches, rebase, or move existing uncommitted work without explicit direction.
- Pull requests target `main`. Do not push or open a pull request unless explicitly asked.

## Commits

- Use Conventional Commit subjects in the form `type(scope): imperative summary`; keep the subject concise, lowercase the type, and omit the scope when it adds no useful context.
- Preferred types are `feat`, `fix`, `docs`, `refactor`, `style`, `perf`, `test`, `chore`, `build`, and `ci`.
- Examples: `feat(posts): add article on ...`, `fix(fidget): prevent mobile touch regression`, and `docs: clarify local development`.
- Commit after each coherent, tested milestone. For a small change, one commit is usually enough; for a larger task, use separate commits for meaningful implementation, tests, or documentation milestones. Do not make arbitrary time-based commits or separate formatting-only commits unless the formatting change is intentional and independently useful.
- Before a commit, inspect the staged diff and verify that unrelated user changes are not included.

## Pull requests

- Use the same Conventional Commit style for PR titles: `type(scope): imperative summary`, with no trailing period and a concise subject.
- Keep each PR focused on one concern. The body should include `Summary`, `Tests` with the exact commands run, and `Notes` for screenshots, deployment implications, content changes, or follow-up work when relevant.
- For UI changes, include before/after screenshots or a preview URL when available. For post changes, mention the affected slug and frontmatter if relevant.
- Before requesting review, run `pnpm run format:check` and `pnpm run check`. Also run `pnpm run build` for changes affecting Astro configuration, generated pages or images, deployment behavior, dependencies, or other production-sensitive paths.
- Pull requests targeting `main` run formatting and Astro checks in CI. Pushing to `main` deploys the site, so leave merging and deployment to the user unless explicitly asked.
