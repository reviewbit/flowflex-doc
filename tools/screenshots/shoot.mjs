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
import { buildRewriters } from "./mocks.mjs";

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
const rewriters = buildRewriters(data);
const unmocked = new Set();
let mocking = false; // switched on after sign-in and branch selection
await context.route("**/*", async (route) => {
  const req = route.request();
  const url = new URL(req.url());
  if (url.host !== API_HOST) return route.continue();
  const write = !["GET", "HEAD", "OPTIONS"].includes(req.method());
  if (write && !WRITE_ALLOWED.some((re) => re.test(url.pathname))) {
    if (process.env.DOCS_VERBOSE) console.log(`  blocked ${req.method()} ${url.pathname}`);
    return route.abort();
  }
  // Replace real customer data with demo data (see mocks.mjs).
  const rw = mocking && req.method() === "GET" && rewriters.find((r) => r.re.test(url.pathname));
  if (!rw) {
    if (mocking && req.method() === "GET") unmocked.add(url.pathname.replace(/[0-9a-f]{24}/g, ":id"));
    return route.continue();
  }
  const res = await route.fetch();
  let body;
  try { body = await res.json(); } catch { return route.fulfill({ response: res }); }
  return route.fulfill({ response: res, json: rw.fn(body) });
});
const page = await context.newPage();
page.setDefaultTimeout(60000);

// DOCS_RECORD=1: log the *shape* (keys and types, never values) of every API response,
// so mocks can match the real format without real data leaving the box.
const shapes = {};
if (process.env.DOCS_RECORD) {
  page.on("response", async (res) => {
    const url = new URL(res.url());
    if (url.host !== API_HOST || !(res.headers()["content-type"] || "").includes("json")) return;
    try {
      const key = `${res.request().method()} ${url.pathname.replace(/[0-9a-f]{24}/g, ":id")}`;
      shapes[key] = { query: [...url.searchParams.keys()], body: shapeOf(await res.json()) };
    } catch {}
  });
}
try {
  await signIn(page);
  mocking = true;
  await go(page, "/");
} catch (e) {
  fs.mkdirSync(path.join(here, "out"), { recursive: true });
  await page.screenshot({ path: path.join(here, "out/sign-in-failed.png") });
  console.log(`sign-in failed at ${page.url().split("?")[0]}: ${e.message.split("\n")[0]} (see out/sign-in-failed.png)`);
  await browser.close();
  process.exit(1);
}

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
console.log(`not rewritten (check these screens for real data): ${[...unmocked].sort().join(", ")}`);
if (process.env.DOCS_RECORD) {
  fs.mkdirSync(path.join(here, "out"), { recursive: true });
  fs.writeFileSync(path.join(here, "out/api-shapes.json"), JSON.stringify(shapes, null, 1));
  console.log(`recorded ${Object.keys(shapes).length} endpoint shapes → out/api-shapes.json`);
}
await browser.close();
process.exit(failed ? 1 : 0);

function shapeOf(v, depth = 0) {
  if (depth > 7) return "…";
  if (Array.isArray(v)) return v.length ? [shapeOf(v[0], depth + 1)] : [];
  if (v && typeof v === "object") return Object.fromEntries(Object.keys(v).map((k) => [k, shapeOf(v[k], depth + 1)]));
  return v === null ? "null" : typeof v;
}

// ---------------------------------------------------------------------------
async function signIn(p) {
  await p.goto(`${USERS}/auth/login`);
  await p.locator("#si-email").fill(process.env.DOCS_EMAIL);
  await p.locator("#si-password").fill(process.env.DOCS_PASSWORD);
  await p.locator("button[type=submit]").click();
  const org = process.env.DOCS_ORG;
  await p.waitForURL((u) => u.host === new URL(APP).host || u.pathname.includes("/organisations"), { timeout: 180000 });
  if (!p.url().startsWith(APP)) {
    if (!org) throw new Error("Several organisations: set DOCS_ORG to the demo organisation's name");
    await p.getByText(org, { exact: true }).click();
    await p.getByRole("button", { name: "Continue" }).click();
    await p.waitForURL((u) => u.href.startsWith(APP), { timeout: 180000 });
  }
  if ((await p.title()).includes("504") || (await p.content()).includes("504 Gateway")) {
    await go(p, "/");
  }
  await p.waitForLoadState("networkidle").catch(() => {});
  await selectBranch(p, process.env.DOCS_BRANCH || data.workspace.branch);
  console.log("signed in");
}

// Channels, templates, broadcasts and flows belong to a branch: switch to the demo one
// (top bar name → Switch branch). The app keeps the choice in localStorage for later loads.
async function selectBranch(p, name) {
  // The name/branch block in the top bar opens the profile drawer.
  await p.waitForFunction(() => document.querySelectorAll("header, .ant-layout-header, button").length > 3, null, { timeout: 120000 });
  await p.waitForTimeout(3000);
  const box = await p.evaluate(() => {
    const w = window.innerWidth;
    const hit = [...document.querySelectorAll("div, span")].find((el) => {
      const r = el.getBoundingClientRect();
      return r.top < 70 && r.left > w * 0.7 && r.height > 20 && getComputedStyle(el).cursor === "pointer" && !/\d/.test(el.textContent || "");
    });
    if (!hit) return null;
    const r = hit.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  });
  if (!box) throw new Error("profile block not found in top bar");
  await p.mouse.click(box.x, box.y);
  await p.waitForTimeout(1000);
  await p.getByText("Switch branch", { exact: true }).click();
  const drawer = p.locator(".ant-drawer-content:visible").last();
  await drawer.getByText(name, { exact: true }).first().click();
  await p.waitForTimeout(2000);
  const stored = await p.evaluate(() => localStorage.getItem("branch_id"));
  console.log(`branch: ${name} (${stored ? "saved" : "NOT saved"})`);
}

async function go(p, route) {
  // The devbox runs `next dev`, which compiles a page on first visit; allow for it.
  // nginx returns 504 while a page compiles; wait and retry.
  for (let attempt = 1; ; attempt++) {
    const res = await p.goto(APP + route, { waitUntil: "domcontentloaded", timeout: 180000 });
    if (!res || res.status() < 500 || attempt === 6) break;
    console.log(`  ${route}: ${res.status()}, retrying (${attempt})`);
    await p.waitForTimeout(20000);
  }
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
