# Docs screenshots

Takes the screenshots used in these docs from a live FlowFlex app, with every form filled from
[`demo-data.json`](demo-data.json) so all images show the same fictional brand (Rangoli Store),
contacts, templates and broadcast.

The script is read-only: it blocks every POST/PUT/PATCH/DELETE to the API except sign-in, so it
never creates, submits to Meta, or sends anything.

```bash
cd tools/screenshots
./setup.sh                 # once: Playwright + headless Chromium in ~/.cache/docs-shots (no sudo)
./configure.sh             # asks for the logins (passwords hidden), saves .env
node shoot.mjs             # all shots → assets/<section>/<name>.png
node shoot.mjs broadcasts/create-details   # one shot
```

Rules for every screenshot:

- Use a demo organisation that contains only the data in `demo-data.json`.
- Viewport 1440 × 900 at 2× scale, light theme, time zone Asia/Kolkata.
- To change the content, edit `demo-data.json`, not the script.
