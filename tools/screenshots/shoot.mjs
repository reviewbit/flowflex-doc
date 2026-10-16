// Takes the docs screenshots from a live FlowFlex app, filling every form with demo-data.json.
//
//   DOCS_EMAIL=... DOCS_PASSWORD=... DOCS_ORG="Rangoli Store (demo)" node shoot.mjs [shot-name ...]
//
// DOCS_BASIC_USER / DOCS_BASIC_PASSWORD: the nginx basic-auth login, if the app sits behind one.
// Credentials can also go in ./.env (git-ignored). Read-only by design: every POST/PUT/PATCH/DELETE
// to the API is blocked except sign-in, so nothing is created, submitted to Meta, or sent.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
loadEnv(path.join(here, ".env"));
const data = JSON.parse(fs.readFileSync(path.join(here, "demo-data.json"), "utf8"));

const APP = process.env.DOCS_APP_URL || "https://app.zen-tesla.flowflex.ai";
const USERS = process.env.DOCS_USERS_URL || "https://users.zen-tesla.flowflex.ai";
const API_HOST = new URL(process.env.DOCS_API_URL || "https://api.zen-tesla.flowflex.ai").host;
const OUT = path.resolve(here, process.env.DOCS_OUT || "../../assets");
const CACHE = process.env.DOCS_SHOTS_CACHE || path.join(process.env.HOME, ".cache/docs-shots");
const WRITE_ALLOWED = [/\/login$/, /\/switch-org/, /\/generate-access-token/];

for (const v of ["DOCS_EMAIL", "DOCS_PASSWORD"]) {
  if (!process.env[v]) throw new Error(`Set ${v} (env or tools/screenshots/.env)`);
}

// ---------------------------------------------------------------------------
// Shot list. Each shot opens a screen, fills it with demo data, and saves
// <section>/<name>.png. Run a subset by passing shot names on the command line.
// ---------------------------------------------------------------------------
const b = data.broadcast;
const shots = {
  "whatsapp/channels-list": async (p) => {
    await go(p, "/channels");
    await p.getByText("Channel Management").first().waitFor();
  },
  "whatsapp/templates-list": async (p) => {
    await go(p, "/templates");
    await p.getByText("Template Management").first().waitFor();
  },
  "whatsapp/template-select-channel": async (p) => {
    await go(p, "/templates/create_template");
    await pickFirstOption(p, "#template-channel");
  },
  "broadcasts/broadcast-list": async (p) => {
    await go(p, "/broadcast");
    await p.getByText("Launch targeted broadcasts").first().waitFor();
  },
  "broadcasts/create-details": async (p) => {
    await go(p, "/broadcast/create");
    await p.getByLabel("Broadcast name").fill(b.name);
    await pickFirstOption(p, p.getByLabel("Select channel"));
  },
};

// ---------------------------------------------------------------------------
const wanted = process.argv.slice(2);
const browser = await chromium.launch({
  executablePath: findBrowser(),
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  env: {
    ...process.env,
    FONTCONFIG_FILE: path.join(CACHE, "fonts.conf"),
    LD_LIBRARY_PATH: [`${CACHE}/root/usr/lib/x86_64-linux-gnu`, `${CACHE}/root/lib/x86_64-linux-gnu`].join(":"),
  },
});
const context = await browser.newContext({
  viewport: data.viewport,
  deviceScaleFactor: 2,
  locale: "en-IN",
  timezoneId: b.timeZone,
  httpCredentials: process.env.DOCS_BASIC_USER
    ? { username: process.env.DOCS_BASIC_USER, password: process.env.DOCS_BASIC_PASSWORD || "" }
    : undefined,
});
await context.route("**/*", (route) => {
  const req = route.request();
  const url = new URL(req.url());
  const write = !["GET", "HEAD", "OPTIONS"].includes(req.method());
  if (write && url.host === API_HOST && !WRITE_ALLOWED.some((re) => re.test(url.pathname))) {
    console.log(`  blocked ${req.method()} ${url.pathname}`);
    return route.abort();
  }
  return route.continue();
});
const page = await context.newPage();
await signIn(page);

let failed = 0;
for (const [name, run] of Object.entries(shots)) {
  if (wanted.length && !wanted.includes(name)) continue;
  try {
    await run(page);
    await page.waitForLoadState("networkidle").catch(() => {});
    await page.waitForTimeout(600);
    const file = path.join(OUT, `${name}.png`);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    await page.screenshot({ path: file });
    console.log(`ok   ${name}`);
  } catch (e) {
    failed++;
    console.log(`FAIL ${name}: ${e.message.split("\n")[0]}`);
  }
}
await browser.close();
process.exit(failed ? 1 : 0);

// ---------------------------------------------------------------------------
async function signIn(p) {
  await p.goto(`${USERS}/auth/login`);
  await p.locator("#si-email").fill(process.env.DOCS_EMAIL);
  await p.locator("#si-password").fill(process.env.DOCS_PASSWORD);
  await p.locator("button[type=submit]").click();
  const org = process.env.DOCS_ORG;
  await p.waitForURL((u) => u.host === new URL(APP).host || u.pathname.includes("/organisations"), { timeout: 30000 });
  if (!p.url().startsWith(APP)) {
    if (!org) throw new Error("Several organisations: set DOCS_ORG to the demo organisation's name");
    await p.getByText(org, { exact: true }).click();
    await p.waitForURL((u) => u.href.startsWith(APP), { timeout: 30000 });
  }
  await p.waitForLoadState("networkidle").catch(() => {});
  console.log("signed in");
}

async function go(p, route) {
  await p.goto(APP + route);
  await p.waitForLoadState("networkidle").catch(() => {});
}

async function pickFirstOption(p, select) {
  const el = typeof select === "string" ? p.locator(select) : select;
  await el.click();
  await p.locator(".ant-select-dropdown:visible .ant-select-item-option").first().click();
}

function findBrowser() {
  const dir = path.join(CACHE, "browsers");
  const shell = fs.readdirSync(dir).find((d) => d.startsWith("chromium_headless_shell"));
  if (!shell) throw new Error("Run ./setup.sh first");
  return path.join(dir, shell, "chrome-linux", "headless_shell");
}

function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*"?(.*?)"?\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/\\(["\\])/g, "$1");
  }
}
