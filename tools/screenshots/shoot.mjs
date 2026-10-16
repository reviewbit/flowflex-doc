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
// POST endpoints that only read data (the inbox list and its counters); their responses are rewritten too.
const READ_POSTS = [/^\/api\/chat\/conversations$/, /^\/api\/chat\/conversations\/counts$/,
  // Import upload: answered with a dummy upload link (mocks.mjs); the file never leaves the box.
  /^\/api\/storage\/upload-url$/];
const DUMMY_UPLOAD_HOST = "docs-shots.invalid";
// Endpoints answered from demo data even when a page polls them with POST-free reads.

for (const v of ["DOCS_EMAIL", "DOCS_PASSWORD"]) {
  if (!process.env[v]) throw new Error(`Set ${v} (env or tools/screenshots/.env)`);
}

// ---------------------------------------------------------------------------
// Shot list. Each shot opens a screen, fills it with demo data, and saves
// <section>/<name>.png. Run a subset by passing shot names on the command line.
// ---------------------------------------------------------------------------
const b = data.broadcast;
const t = data.templates;
const m = data.lists_and_more;
const shots = {
  // ---- Get started ----
  "get-started/create-account": async (p) => {
    p = await signedOutPage();
    await p.goto(`${USERS}/auth/register`, { waitUntil: "domcontentloaded", timeout: 180000 });
    await p.getByPlaceholder("e.g. Ravi Kulkarni").fill("Ananya Rao");
    await p.getByPlaceholder("98765 43210").fill("+91 90000 00010");
    await p.getByPlaceholder("you@company.com").fill(data.user.email);
    return p;
  },
  "get-started/create-organisation": async (p) => {
    // Real path: sign in on the login app, then "Add an organisation" on the organisation picker.
    p = await signedOutPage();
    await p.goto(`${USERS}/auth/login`, { waitUntil: "domcontentloaded", timeout: 180000 });
    await p.locator("#si-email").fill(process.env.DOCS_EMAIL);
    await p.locator("#si-password").fill(process.env.DOCS_PASSWORD);
    await p.locator("button[type=submit]").click();
    // With the demo data there is one organisation, so sign-in goes straight to the app;
    // the login app's session is set by then, so open its create-organisation page directly.
    await p.waitForURL((u) => u.href.startsWith(APP), { timeout: 180000 });
    await p.goto(`${USERS}/users/create-organisation`, { waitUntil: "domcontentloaded", timeout: 180000 });
    await p.getByPlaceholder("e.g. Spicebox Foods").waitFor({ timeout: 120000 });
    await p.getByPlaceholder("e.g. Spicebox Foods").fill(data.brand.name);
    await p.getByPlaceholder("https://").fill(data.brand.website).catch(() => {});
    return p;
  },
  "get-started/app-shell": async (p) => { await go(p, "/"); await p.getByText("Get flowflex fully ready").waitFor(); },
  // ---- WhatsApp setup ----
  "whatsapp/channels-list": async (p) => { await go(p, "/channels"); await p.getByText(data.channel.displayName).first().waitFor(); },
  "whatsapp/templates-list": async (p) => { await go(p, "/templates"); await p.getByText(t.marketing.name).first().waitFor(); },
  "whatsapp/template-select-channel": async (p) => {
    await go(p, "/templates/create_template");
    await pickOption(p, p.locator("#template-channel"), data.channel.displayName);
  },
  "whatsapp/template-edit": async (p) => {
    await go(p, "/templates/create_template");
    await pickOption(p, p.locator("#template-channel"), data.channel.displayName);
    await clickButton(p, "Continue");
    await p.getByText("Marketing", { exact: true }).first().click();
    await clickButton(p, "Continue");
    await p.getByPlaceholder("order_confirmation").fill(t.marketing.name);
    await p.getByText("Enter template body here...").first().click();
    await p.keyboard.type("Hi ", { delay: 5 });
    await p.getByRole("button", { name: /Add Variable/i }).last().click().catch(() => {});
    await p.keyboard.type(t.marketing.body.split("{{1}}")[1], { delay: 2 });
    await p.getByText("Enter template body here...").first().scrollIntoViewIfNeeded().catch(() => {});
    await p.evaluate(() => window.scrollBy(0, -160));
  },
  // ---- Audience ----
  "audience/overview-tabs": async (p) => { await go(p, "/audience/profiles"); await p.getByText("Audience overview").first().waitFor(); },
  "audience/add-contact-drawer": async (p) => {
    await go(p, "/audience/profiles");
    await clickButton(p, "Quick add");
    const d = p.locator(".ant-drawer-content:visible").last();
    await d.getByPlaceholder("Joey John").fill(data.contacts[0].name);
    await d.getByPlaceholder("joejohn@gmail.com").fill(data.contacts[0].email);
    await d.getByPlaceholder("Enter phone number").fill(data.contacts[0].phone);
    await d.getByPlaceholder("Kerala").fill("Karnataka");
    await d.getByPlaceholder("Address 1, Near 1st street").fill("14 Indiranagar, Bengaluru");
  },
  "audience/merge-list": async (p) => {
    await go(p, "/audience/list");
    await p.getByText(m.lists[0].title).first().waitFor();
    await rowAction(p, m.lists[0].title, "Merge list");
  },
  "audience/segment-builder": async (p) => {
    await go(p, "/audience/segments/new");
    await p.getByPlaceholder("Enter segment name").first().fill(m.segments[0].title);
  },
  "audience/tags-table": async (p) => { await go(p, "/audience/tags"); await p.getByText(m.tags[0].name).first().waitFor(); },
  "audience/import-upload": async (p) => { await go(p, "/audience/import/new"); await p.getByText(/Upload/).first().waitFor(); await p.waitForTimeout(2500); },
  "audience/import-map-columns": async (p) => {
    await go(p, "/audience/import/new");
    const chooser = p.waitForEvent("filechooser");
    await p.getByText("Click to upload").click();
    await (await chooser).setFiles(path.join(here, "fixtures/contacts.csv"));
    await p.waitForTimeout(3000);
    await clickButton(p, /Next: Map columns/);
    await p.waitForTimeout(2000);
  },
  // ---- Broadcasts ----
  "broadcasts/broadcast-list": async (p) => { await go(p, "/broadcast"); await p.getByText(b.name).first().waitFor(); },
  "broadcasts/create-details": async (p) => { await broadcastStep1(p); },
  "broadcasts/create-schedule": async (p) => { await broadcastStep2(p); },
  "broadcasts/publish-modal": async (p) => {
    await broadcastStep2(p);
    await clickButton(p, /Review broadcast/); await clickButton(p, /Publish broadcast/);
  },
  // ---- Messaging ----
  "messaging/conversations-inbox": async (p) => { await go(p, "/chat"); await p.getByText(m.chats[0].name).first().waitFor(); await p.waitForTimeout(1500); },
  "messaging/conversations-composer": async (p) => {
    await go(p, "/chat");
    await p.getByText(m.chats[0].name).first().click();
    await p.getByText(m.thread[2].text).first().waitFor();
    const box = p.locator('[contenteditable="true"]').last();
    await box.click().catch(() => {});
    await p.keyboard.type("Yes, exchanges are free within 7 days of delivery.", { delay: 5 }).catch(() => {});
    await p.waitForTimeout(800);
  },
  "messaging/settings-page": async (p) => { await go(p, "/chat/settings"); await p.getByText("Business hours").first().waitFor(); },
  "messaging/settings-subscription-auto-replies": async (p) => { await go(p, "/chat/settings"); await scrollTo(p, "Subscription Auto Replies"); await p.evaluate(() => window.scrollBy(0, -120)); },
  "messaging/quick-replies-table": async (p) => { await go(p, "/chat/settings"); await scrollTo(p, m.quickReplies[0].shortcut); },
  // ---- Workflows ----
  "flows/campaigns-list": async (p) => { await go(p, "/campaigns"); await p.getByText("Order status replies").first().waitFor({ timeout: 120000 }); await p.waitForTimeout(1500); },
  "flows/saved-data-tables": async (p) => { await go(p, "/flows/saved_data"); await p.getByText(m.dataTables[0].title).first().waitFor(); },
  // ---- Integrations ----
  "integrations/integrations-page": async (p) => { await go(p, "/integrations"); await p.getByText("Custom integrations").first().waitFor(); },
  "integrations/shopify-connect": async (p) => { await go(p, "/integrations/shopify"); await p.waitForTimeout(2000); },
  "integrations/custom-integration-events": async (p) => {
    await go(p, "/integrations/custom");
    await p.getByPlaceholder(/Acme CRM Events/i).fill("Rangoli Order Events").catch(() => {});
    await p.getByPlaceholder("e.g. User created").first().fill("Order placed").catch(() => {});
    await p.getByPlaceholder("e.g. user.created").first().fill("order.placed").catch(() => {});
    await p.getByPlaceholder("e.g. User created").first().scrollIntoViewIfNeeded().catch(() => {});
  },
  "integrations/custom-integration-live": async (p) => { await go(p, "/integrations"); await clickButton(p, "Manage"); await p.getByText("Rangoli Order Events").first().waitFor(); await p.waitForTimeout(1500); },
  // ---- Account ----
  "account/billing-overview": async (p) => { await go(p, "/settings/billing/overview"); await p.getByText(/Available message credits/i).first().waitFor({ timeout: 120000 }); await p.waitForTimeout(3000); },
  "account/set-credit-alert": async (p) => { await go(p, "/settings/billing/overview"); await clickButton(p, "Set alert"); },
  "account/plans-page": async (p) => { await go(p, "/plans"); await p.waitForTimeout(3000); },
  "account/account-settings": async (p) => { await go(p, "/settings/account"); await p.getByText("Organisation Details").first().waitFor(); },
  "account/branches": async (p) => { await go(p, "/settings/branches"); await p.getByText(data.workspace.branch).first().waitFor(); },
  "account/team-members": async (p) => { await go(p, "/settings/teams/members"); await p.getByText(m.team[1].name).first().waitFor(); },
  "account/invite-user": async (p) => {
    await go(p, "/settings/teams/invite");
    await fillLabel(p, /^Name/i, "Kiran").catch(() => {});
    await fillLabel(p, /email/i, "kiran@rangoli.example").catch(() => {});
    await p.keyboard.press("Escape");
    await pickOption(p, p.getByLabel(/Role/i).first(), "Support agent").catch(() => {});
    await p.keyboard.press("Escape");
  },
  "account/create-role": async (p) => {
    await go(p, "/settings/teams/roles/create");
    await fillLabel(p, /Role name/i, "Support agent");
    await fillLabel(p, /Description/i, "Replies to customers and manages their own chats.").catch(() => {});
  },
};

async function broadcastStep1(p) {
  await go(p, "/broadcast/create");
  await p.getByLabel("Broadcast name").fill(b.name);
  await pickOption(p, p.getByLabel("Select channel"), data.channel.displayName);
  await pickOption(p, p.locator("#templates"), t.marketing.name).catch(() => {});
  await p.waitForTimeout(1500);
  await pickOption(p, p.locator(".ant-select", { hasText: "Static text" }).first(), "Audience field");
  await pickOption(p, p.locator(".ant-select", { hasText: "Map {{1}} to an audience field" }).first(), "Name");
  await p.getByPlaceholder("Fallback value for {{1}} if the audience field is empty").fill("there");
  await p.waitForTimeout(800);
}

async function broadcastStep2(p) {
  await broadcastStep1(p);
  await clickButton(p, "Continue");
  await p.locator("#timezone").waitFor();
  await pickOption(p, p.locator("#timezone"), "Kolkata").catch(() => {});
  for (const [ph, v] of [["Select schedule date", "Oct 20, 2026 10:00 AM"], ["Select end date", "Oct 27, 2026 08:00 PM"]]) {
    const input = p.getByPlaceholder(new RegExp(ph)).first();
    await input.click();
    await input.fill(v);
    await p.keyboard.press("Enter");
    await p.waitForTimeout(400);
  }
  await p.getByPlaceholder("2,000").fill(b.dailySendCount).catch(() => {});
  await pickOption(p, p.locator("#audience_type"), "List").catch(() => {});
  await pickOption(p, p.locator("#audience_type_id"), m.lists[0].title).catch(() => {});
  await p.keyboard.press("Escape");
  await p.waitForTimeout(800);
}

// ---------------------------------------------------------------------------
const SURVEY = ["/", "/audience/profiles", "/audience/list", "/audience/segments", "/audience/segments/new", "/audience/tags",
  "/audience/import", "/audience/import/new", "/audience/export", "/chat", "/chat/settings", "/campaigns", "/flows/saved_data",
  "/integrations", "/integrations/shopify", "/integrations/custom", "/settings/billing/overview", "/settings/billing/wallet",
  "/plans", "/settings/account", "/settings/branches", "/settings/teams/members", "/settings/teams/roles", "/settings/teams/invite",
  "/settings/teams/roles/create", "/templates/create_template", "/broadcast/create"];
if (process.env.DOCS_SURVEY) for (const r of SURVEY) shots[`survey${r}`] = async (p) => { await go(p, r); await p.waitForLoadState("networkidle", { timeout: 120000 }).catch(() => {}); await p.waitForTimeout(8000); };
const wanted = process.argv.slice(2);
let browser = await chromium.launch({
  executablePath: findBrowser(),
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  env: {
    ...process.env,
    FONTCONFIG_FILE: path.join(CACHE, "fonts.conf"),
    LD_LIBRARY_PATH: [`${CACHE}/root/usr/lib/x86_64-linux-gnu`, `${CACHE}/root/lib/x86_64-linux-gnu`].join(":"),
  },
});
const contextOptions = {
  viewport: data.viewport,
  deviceScaleFactor: 2,
  locale: "en-IN",
  timezoneId: b.timeZone,
  httpCredentials: process.env.DOCS_BASIC_USER
    ? { username: process.env.DOCS_BASIC_USER, password: process.env.DOCS_BASIC_PASSWORD || "" }
    : undefined,
};
let context = await browser.newContext(contextOptions);
// The inbox keeps each chat's latest message under a deployment-specific key; read it from the
// frontend's .env so previews render (the value is used in memory only, never printed).
const chatMessageKey = (() => {
  try {
    const f = process.env.DOCS_FRONTEND_ENV || path.join(process.env.HOME, "code/flowflex/.env");
    const m = fs.readFileSync(f, "utf8").match(/^NEXT_PUBLIC_SUPABASE_MESSAGE_TABLE=\s*"?([^"\n]+)"?/m);
    return m ? m[1].trim() : undefined;
  } catch { return undefined; }
})();
const rewriters = buildRewriters(data, { chatMessageKey });
const unmocked = new Set();
let mocking = false; // switched on after sign-in and branch selection
let currentShot = "";
const unmockedByShot = {};
async function guard(route) {
  const req = route.request();
  const url = new URL(req.url());
  if (url.host === DUMMY_UPLOAD_HOST) return route.fulfill({ status: 200, body: "", headers: { "access-control-allow-origin": "*" } });
  if (url.host !== API_HOST) return route.continue();
  const write = !["GET", "HEAD", "OPTIONS"].includes(req.method());
  const readPost = req.method() === "POST" && READ_POSTS.some((re) => re.test(url.pathname));
  if (write && !readPost && !WRITE_ALLOWED.some((re) => re.test(url.pathname))) {
    if (process.env.DOCS_VERBOSE) console.log(`  blocked ${req.method()} ${url.pathname}`);
    return route.abort();
  }
  // Replace real customer data with demo data (see mocks.mjs).
  const rw = mocking && (req.method() === "GET" || readPost) && rewriters.find((r) => r.re.test(url.pathname));
  if (readPost && !rw) return route.abort(); // never let real inbox data through unrewritten
  if (!rw) {
    if (mocking && req.method() === "GET") {
      const ep = url.pathname.replace(/[0-9a-f]{24}/g, ":id");
      unmocked.add(ep);
      (unmockedByShot[currentShot] ||= new Set()).add(ep);
    }
    return route.continue();
  }
  if (rw.synthetic) return route.fulfill({ status: 200, contentType: "application/json", headers: { "access-control-allow-origin": req.headers()["origin"] || "*", "access-control-allow-credentials": "true" }, body: JSON.stringify(rw.fn({})) });
  const res = await route.fetch();
  let body;
  try { body = await res.json(); } catch { return route.fulfill({ response: res }); }
  return route.fulfill({ response: res, json: rw.fn(body) });
}
await context.route("**/*", guard);

// A separate, signed-out browser tab for the sign-up screens (same write blocking).
async function signedOutPage() {
  const ctx = await browser.newContext(contextOptions);
  await ctx.route("**/*", guard);
  return ctx.newPage();
}
let page = await context.newPage();
page.setDefaultTimeout(60000);
if (process.env.DOCS_VERBOSE) page.on("console", (m) => { if (m.type() === "error") console.log(`  console: ${m.text().slice(0, 300)}`); });
if (process.env.DOCS_VERBOSE) page.on("pageerror", (e) => console.log(`  pageerror: ${e.message.slice(0, 300)}`));

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

// Restart the browser after a crash (low memory on the devbox) and sign in again.
async function relaunch() {
  try { await browser.close(); } catch {}
  browser = await chromium.launch({
  executablePath: findBrowser(),
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  env: {
    ...process.env,
    FONTCONFIG_FILE: path.join(CACHE, "fonts.conf"),
    LD_LIBRARY_PATH: [`${CACHE}/root/usr/lib/x86_64-linux-gnu`, `${CACHE}/root/lib/x86_64-linux-gnu`].join(":"),
  },
});
  context = await browser.newContext(contextOptions);
  await context.route("**/*", guard);
  page = await context.newPage();
  page.setDefaultTimeout(60000);
  mocking = false;
  await signIn(page);
  mocking = true;
  await go(page, "/");
  console.log("  (browser restarted)");
}

let failed = 0;
for (const [name, run] of Object.entries(shots)) {
  if (wanted.length && !wanted.includes(name)) continue;
  currentShot = name;
  if (page.isClosed() || !browser.isConnected()) await relaunch();
  try {
    const target = (await run(page)) || page;
    await target.waitForLoadState("networkidle").catch(() => {});
    await target.waitForTimeout(600);
    // The app asks for Inter but does not load it; it must be installed locally (setup.sh).
    if (!(await target.evaluate(() => document.fonts.check('14px "Inter"')))) console.log(`  warning: Inter font not available`);
    if (name.startsWith("survey/")) { console.log(`ok   ${name}`); continue; }
    await target.waitForFunction(() => [...document.images].every((i) => i.complete), null, { timeout: 15000 }).catch(() => {});
    await scrubPage(target);
    const file = path.join(OUT, `${name}.png`);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    await target.screenshot({ path: file });
    if (target !== page) await target.context().close();
    console.log(`ok   ${name}`);
  } catch (e) {
    failed++;
    console.log(`FAIL ${name}: ${e.message.split("\n")[0]}`);
    fs.mkdirSync(path.join(here, "out/fail"), { recursive: true });
    await page.screenshot({ path: path.join(here, "out/fail", `${name.replace("/", "__")}.png`) }).catch(() => {});
    if (/has been closed|crashed/.test(e.message)) await relaunch().catch((err) => console.log(`  relaunch failed: ${err.message}`));
  }
}
console.log(`not rewritten (check these screens for real data): ${[...unmocked].sort().join(", ")}`);
if (process.env.DOCS_RECORD) {
  fs.mkdirSync(path.join(here, "out"), { recursive: true });
  fs.writeFileSync(path.join(here, "out/api-shapes.json"), JSON.stringify(shapes, null, 1));
  fs.writeFileSync(path.join(here, "out/unmocked-by-shot.json"), JSON.stringify(Object.fromEntries(Object.entries(unmockedByShot).map(([k, v]) => [k, [...v].sort()])), null, 1));
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

// Last line of defence before a screenshot: devbox host names and real-looking database IDs on screen.
async function scrubPage(p) {
  await p.addStyleTag({ content: "nextjs-portal, [data-nextjs-toast], #__next-build-watcher { display: none !important; }" }).catch(() => {});
  await p.evaluate(() => {
    const fakeId = (m) => (m.startsWith("6a1b2c3d") ? m : "6a1b2c3d4e5f60718293a" + m.slice(-3));
    const fix = (t) => t.replace(/https?:\/\/api\.zen-tesla\.flowflex\.ai/g, "https://api.flowflex.ai").replace(/[a-z0-9-]+\.zen-tesla\.flowflex\.ai/g, "app.flowflex.ai")
      .replace(/\b[0-9a-f]{24}\b/g, fakeId);
    const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n; (n = walk.nextNode()); ) { const v = fix(n.nodeValue); if (v !== n.nodeValue) n.nodeValue = v; }
    for (const el of document.querySelectorAll("input, textarea")) { const v = fix(el.value); if (v !== el.value) el.value = v; }
  });
}

async function pickOption(p, select, text) {
  await select.click();
  const opt = p.locator(".ant-select-dropdown:visible .ant-select-item-option");
  await (text ? opt.filter({ hasText: text }).first() : opt.first()).click();
}

async function fillLabel(scope, label, value) {
  const el = scope.getByLabel(label).first();
  await el.fill(value);
}

async function clickButton(p, name) {
  await p.getByRole("button", { name }).first().click();
  await p.waitForTimeout(800);
}

async function rowAction(p, rowText, action) {
  const row = p.locator("tr", { hasText: rowText }).first();
  const direct = row.getByText(action, { exact: true });
  if (await direct.count()) return direct.first().click();
  await row.locator("button, .ant-dropdown-trigger").last().click();
  await p.getByText(action, { exact: true }).last().click();
}

async function scrollTo(p, text) {
  const el = p.getByText(text, { exact: true }).first();
  await el.waitFor();
  await el.evaluate((n) => n.scrollIntoView({ block: "start" }));
  await p.evaluate(() => window.scrollBy(0, -90));
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
