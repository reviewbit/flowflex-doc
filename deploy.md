# Host these docs on GitHub Pages

This site is plain static files (a [Docsify](https://docsify.js.org) site) — **there is
no build step**. GitHub Pages just serves the folder and Docsify renders the Markdown in
the browser.

## Option A — publish from the repo root (simplest)

1. Create a new GitHub repo and push the **contents of `flowflex-docs/`** to it (so
   `index.html` is at the repo root).
   ```bash
   cd flowflex-docs
   git init
   git add .
   git commit -m "FlowFlex docs"
   git branch -M main
   git remote add origin https://github.com/<org>/<repo>.git
   git push -u origin main
   ```
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set **Source = Deploy from a branch**, **Branch =
   `main`**, **Folder = `/ (root)`**. Save.
4. Wait ~1 minute. Your docs are live at `https://<org>.github.io/<repo>/`.

## Option B — keep docs in an existing repo under `/docs`

If you'd rather keep the docs alongside code, put this folder at `docs/` in the repo and
choose **Folder = `/docs`** in step 3 above. (Rename `flowflex-docs` → `docs` first.)

## Important: `.nojekyll`

This folder includes an empty `.nojekyll` file. **Keep it.** It tells GitHub Pages *not*
to run Jekyll, which would otherwise ignore files/folders that start with `_` — and the
sidebar (`_sidebar.md`) and cover page (`_coverpage.md`) start with `_`.

## Optional polish

- Open `index.html` and set `repo: "<org>/<repo>"` to get the “Edit on GitHub” corner
  ribbon and repo link.
- Edit `_coverpage.md` for the landing splash, or remove `coverpage: true` in
  `index.html` to go straight to the home page.
- Add pages by creating a new `.md` file and linking it from `_sidebar.md`.

## Preview locally

Any static file server works. For example:

```bash
cd flowflex-docs
npx serve .          # or: python3 -m http.server 3000
```

Then open the printed URL. (Opening `index.html` directly via `file://` won't work —
Docsify needs to fetch the Markdown over HTTP.)

## Prefer GitBook instead?

The Markdown here is portable. The sidebar (`_sidebar.md`) is the table of contents — if
you move to GitBook, rename it to `SUMMARY.md` (GitBook's TOC file) and the same files
work with minor link tweaks.
