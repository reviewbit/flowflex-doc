// Rewrites API responses so every screenshot shows only demo-data.json content.
//
// Each rewriter receives the real JSON response (to keep the exact format the app expects),
// replaces every customer-visible value with demo content, and returns the new body.
// Endpoints listed in SCRUB but without a rewriter are emptied, so unknown real data never
// reaches the screen. Add a rewriter here when a new screen needs content.

const ID = (n) => `6a1b2c3d4e5f60718293a${String(n).padStart(3, "0")}`;
const NOW = "2026-10-16T10:00:00.000Z";
const page = (p, total) => ({ ...(p || {}), page: 1, total, totalPages: 1 });

export function buildRewriters(data, opts = {}) {
  const msgKey = opts.chatMessageKey || "messages";
  const { brand, contacts, templates, broadcast, workspace } = data;
  const demo = data.lists_and_more;
  const demoUser = data.user;
  const branches = [
    { name: "Bengaluru", address: "MG Road, Bengaluru, Karnataka, India" },
    { name: workspace.branch, address: "Marine Drive, Kochi, Kerala, India" },
  ];
  const kochi = ID(902);

  const channel = (real = {}) => ({
    ...real,
    _id: ID(1),
    waba_id: "100000000000001",
    ...(real.branch_id ? {} : { branch_id: kochi, branch_ids: [kochi] }),
    websites: [brand.website],
    email: brand.email,
    description: brand.description,
    address: brand.address,
    profile_picture_url: "",
    is_disabled_by_plan: false,
    disabled_reason: null,
    coexistence_enabled: true,
    default_tag_ids: [],
    additional: { ...(real.additional || {}), interakt_partner_issue: { applicable: false, requires_reconnect: false, reason: null, last_error: null, last_checked_at: NOW }, health_sync: {} },
    phone_number_details: {
      ...(real.phone_number_details || {}),
      id: "200000000000001",
      verified_name: data.channel.displayName,
      display_phone_number: "+91 90000 10001",
      status: "CONNECTED",
      name_status: "APPROVED",
      quality_rating: "GREEN",
      code_verification_status: "VERIFIED",
      messaging_limit_tier: "TIER_2K",
      health_status: { can_send_message: "AVAILABLE" },
      is_official_business_account: false,
    },
  });

  const metaTemplate = (t, i, real = {}) => {
    const components = [];
    if (t.header?.type === "IMAGE") components.push({ type: "HEADER", format: "IMAGE", example: { header_handle: [`${brand.website}/assets/diwali-banner.jpg`] } });
    components.push({ type: "BODY", text: t.body, example: { body_text: [Object.values(t.samples)] } });
    if (t.footer) components.push({ type: "FOOTER", text: t.footer });
    const buttons = t.buttons.map((b) =>
      b.type === "Visit website" ? { type: "URL", text: b.text, url: b.url, ...(b.sample ? { example: [b.url.replace("{{1}}", b.sample)] } : {}) }
      : b.type === "Copy offer code" ? { type: "COPY_CODE", text: "Copy offer code", example: b.code }
      : { type: "QUICK_REPLY", text: b.text });
    if (buttons.length) components.push({ type: "BUTTONS", buttons });
    return { ...real, _id: ID(100 + i), id: `30000000000000${i}`, waba_id: "100000000000001", name: t.name, language: "en", category: t.category.toUpperCase(), status: "APPROVED", quality_score: { score: "GREEN" }, components };
  };
  const template = (t, i, real = {}) => ({
    ...real, _id: ID(200 + i), name: t.name, status: "APPROVED", createdAt: NOW, updatedAt: NOW,
    meta_templates: [metaTemplate(t, i, real.meta_templates?.[0])],
  });
  const demoTemplates = [templates.marketing, templates.utility];

  const stats = (sent, delivered, read, clicked, replied, failed) => ({
    total_enqueued: sent + failed, total_failed: failed, total_sent: sent, total_delivered: delivered,
    total_read: read, total_clicked: clicked, total_clicked_customers: clicked, total_replied: replied,
    total_retried: 0, total_unsubscribed_users: 0, total_recipients: sent + failed, total_clicked_links: [],
  });
  const demoBroadcasts = [
    { title: broadcast.name, status: "active", start: "2026-10-20T04:30:00.000Z", end: "2026-10-27T14:30:00.000Z", s: stats(1840, 1792, 1311, 402, 96, 38), t: templates.marketing },
    { title: "Order shipped – October", status: "completed", start: "2026-10-01T04:30:00.000Z", end: "2026-10-08T14:30:00.000Z", s: stats(960, 951, 870, 512, 41, 6), t: templates.utility },
    { title: "Navratri preview – Draft", status: "draft", start: "2026-10-28T04:30:00.000Z", end: "2026-11-04T14:30:00.000Z", s: stats(0, 0, 0, 0, 0, 0), t: templates.marketing },
  ];

  const userName = demoUser.name;
  const chatRows = () => demo.chats.map((c, i) => {
    const at = new Date(Date.parse("2026-10-16T09:58:00Z") - i * 23 * 60000).toISOString();
    return { id: 9100 + i, contact_id: String(9100 + i), customer_id: ID(950 + i), name: c.name, display_name: c.name, whatsapp_profile_name: c.name,
      phone: c.phone, display_phone: c.phone, session: c.phone.replace("+", ""), email: null, profile_pic: null,
      unread_count: c.unread || 0, status: c.status || "open", session_status: c.expired ? "expired" : "active",
      assigned_to: c.agent ? ID(800 + demo.team.findIndex((m) => m.name === c.agent)) : null, channel_id: ID(1), channel_phone_number: "919000010001",
      customer_assignment_ref: null, updated_at: at, created_at: at, tags: [],
      [msgKey]: [{ id: 9200 + i, contact_id: String(9100 + i), message_id: `wamid.demo${i}`, type: c.fromUs ? "outbound" : "inbound", status: "read",
        search_text: c.last, meta_payload: { type: "text", text: { body: c.last } }, reaction: [], created_at: at, updated_at: at }] };
  });
  const demoIntegration = (real = {}) => ({ ...real, _id: ID(750), name: "Rangoli Order Events", description: "Order and delivery events from the Rangoli Store website.", icon_url: null,
    api_key: "cik_xxxxxxxxxxxx", code: "ic_rangoli01", isActive: true, allow_adhoc_topics: false, deletedAt: null, org_id: real.org_id, branch_id: real.branch_id,
    createdAt: "2026-10-01T09:00:00.000Z", updatedAt: "2026-10-01T09:00:00.000Z",
    events: [{ topic: "order.placed", title: "Order placed", description: "A customer places an order", category: "orders", sample_payload: { name: "John Smith", phone: "+919000000001", order_id: "ORD-48213", total: "2499" } },
             { topic: "order.shipped", title: "Order shipped", description: "An order leaves the warehouse", category: "orders", sample_payload: { name: "John Smith", phone: "+919000000001", order_id: "ORD-48213", eta: "18 Oct" } }] });
  const contactRows = () => contacts.map((c, i) => ({
    _id: ID(950 + i), name: c.name, phone: c.phone, email: c.email || null, country: "India", state: "", addresses: [c.city],
    tags: c.tags.map((n, j) => ({ _id: ID(500 + j), name: n })), assigned_user: c.owner ? { full_name: c.owner, name: c.owner, email: `${c.owner.toLowerCase()}@rangoli.example` } : null,
    whatsapp_marketing_consent: true, sms_marketing_consent: false, email_marketing_consent: !!c.email,
    createdAt: new Date(Date.parse("2026-10-14T10:00:00Z") - i * 86400000 * 3).toISOString(), meta: {},
  }));
  const demoBranchList = (real) => {
    const main = real.find((r) => r.name === workspace.branch) || real[0];
    const other = real.find((r) => r !== main);
    return [main, other].filter(Boolean).map((r, i) => ({ ...r, name: i === 0 ? workspace.branch : branches[0].name, profile_img: "" }));
  };
  return [
    [/^\/api\/channels$/, (b) => ({ ...b, data: [channel(b.data?.[0])], meta: { ...(b.meta || {}), total_channels: 1, plan_disabled_count: 0 } })],
    [/^\/api\/channels\/[^/]+$/, (b) => ({ ...b, data: channel(b.data) })],
    [/^\/api\/whatsapp-templates$/, (b) => ({ ...b, data: demoTemplates.map((t, i) => template(t, i, b.data?.[0])), pagination: { total: 2, page: 1, pageSize: 10, totalPages: 1, hasMore: false } })],
    [/^\/api\/broadcast$/, (b) => ({
      ...b,
      data: demoBroadcasts.map((d, i) => ({
        ...(b.data?.[0] || {}), _id: ID(300 + i), title: d.title, status: d.status, channel: ID(1),
        start_date: d.start, end_date: d.end, timezone: broadcast.timeZone, batch_size: Number(broadcast.dailySendCount),
        audience_cat: "list", list_ref: [ID(400)], segment_ref: [], manual_ref: [], jobs: [], stats: d.s,
        audience_summary: { selected_count: d.s.total_recipients, eligible_count: d.s.total_recipients, excluded_count: 0, whatsapp_opted_out_count: 0 },
        template: { type: "whatsapp", template_id: ID(200), template_json: { name: d.t.name, language: { code: "en" }, components: [] }, variableMappings: { 1: { mode: "field", value: "name" } } },
      })),
      pagination: { ...(b.pagination || {}), total: demoBroadcasts.length, totalPages: 1 },
    })],
    [/^\/api\/broadcast-overview$/, (b) => ({ ...b, data: { ...(b.data || {}), ...stats(2800, 2743, 2181, 914, 137, 44) } })],
    [/^\/api\/wallet-details$/, (b) => ({ ...b, data: { ...(b.data || {}), balance: 5000, currentBalance: 5000, threshold: 1000, min_balance: 10, monthlyUsage: 1240.5, usageSinceLastRecharge: 2500, total_usage: 2500, total_recharged: 7500,
      usagePercentage: 33.33, lastRechargeAmount: 5000, business_name: brand.name, gst_number: "", additional_email: [], phone: [], lastDeduction: null } })],
    // Keep the real branch IDs (the API needs them); show only the demo branch plus one demo sibling.
    [/^\/api\/branches$/, (b) => {
      const real = b.data || [];
      const main = real.find((r) => r.name === workspace.branch) || real[0];
      const other = real.find((r) => r !== main);
      const out = [main, other].filter(Boolean).map((r, i) => ({ ...r, name: i === 0 ? workspace.branch : branches[0].name,
        location: { ...(r.location || {}), formatted_address: i === 0 ? branches[1].address : branches[0].address }, profile_img: "" }));
      return { ...b, data: out, pagination: { ...(b.pagination || {}), total: out.length, totalPages: 1 } };
    }],
    [/^\/api\/user$/, (b) => ({ ...renameUser(b, demoUser), ...(b.data ? { data: renameUser(b.data, demoUser) } : {}) })],
    [/^\/api\/user-config$/, (b) => ({
      ...b,
      data: { ...b.data, user_org: { ...b.data?.user_org, name: brand.name, createdAt: "2026-09-01T09:00:00.000Z", website: brand.website, def_notify_email: brand.email, profile_image: "",
        business_address: { address1: brand.address, state: "Karnataka", city: "Bengaluru", zip: "560001" } },
        ...(b.data?.user ? { user: renameUser(b.data.user, demoUser) } : {}),
        ...(b.data?.user_data ? { user_data: renameUser(b.data.user_data, demoUser) } : {}),
        // Branch list in the profile drawer: keep real IDs, show only the demo branch names.
        ...(b.data?.user_branches ? { user_branches: demoBranchList(b.data.user_branches) } : {}),
        ...(b.data?.user_orgs ? { user_orgs: b.data.user_orgs.filter((o) => (o.org_id?._id || o.org_id) === (b.data.user_org?._id)).map((o) => ({ ...o, name: brand.name, org_id: typeof o.org_id === "object" ? { ...o.org_id, name: brand.name } : o.org_id })) } : {}) },
    })],
    [/^\/api\/user-organisations$/, (b) => ({ ...b, data: (b.data || []).slice(0, 1).map((o) => ({ ...o, name: brand.name, organisation: o.organisation ? { ...o.organisation, name: brand.name } : o.organisation })) })],
    // ---- Audience ----
    [/^\/api\/audience-list$/, (b) => ({ ...b, data: demo.lists.map((l, i) => ({ ...(b.data?.[0] || {}), _id: ID(400 + i), title: l.title, audience_count: l.count, createdAt: l.created, updatedAt: l.created })), pagination: page(b.pagination, demo.lists.length) })],
    [/^\/api\/audience-segments$/, (b) => ({ ...b, data: demo.segments.map((g, i) => ({ ...(b.data?.[0] || {}), _id: ID(450 + i), title: g.title, status: "completed", audience_count: g.count, rules: "{}", createdAt: g.created, updatedAt: g.created })) })],
    [/^\/api\/tags?$/, (b) => ({ ...b, data: demo.tags.map((t, i) => ({ ...(Array.isArray(b.data) ? b.data[0] || {} : {}), _id: ID(500 + i), name: t.name, is_auto_tag: !!t.auto, type: "customer", description: t.description || "", created_at: "2026-09-02T09:00:00.000Z", createdAt: "2026-09-02T09:00:00.000Z", customer_count: t.count, count: t.count, usage_count: t.count })), ...(b.pagination ? { pagination: page(b.pagination, demo.tags.length) } : {}) })],
    [/^\/api\/audience-import-history$/, (b) => ({ ...b, data: demo.imports.map((m, i) => ({ ...(b.data?.[0] || {}), _id: ID(550 + i), title: m.title, status: m.status, customer_count: m.count, filecdn: "", errorcdn: "", column_mapping: [], createdAt: m.created, updatedAt: m.created })), pagination: page(b.pagination, demo.imports.length) })],
    [/^\/api\/customer-export-history$/, (b) => ({ ...b, data: demo.exports.map((m, i) => ({ ...(b.data?.[0] || {}), _id: ID(600 + i), title: m.title, status: "completed", customer_count: m.count, filecdn: "", createdAt: m.created })), pagination: page(b.pagination, demo.exports.length) })],
    [/^\/api\/dynamic-fields$/, (b) => ({ ...b, data: Array.isArray(b.data) ? demo.customFields.map((f, i) => ({ ...(b.data[0] || {}), _id: ID(650 + i), label: f, name: f.toLowerCase().replace(/ /g, "_"), key: f.toLowerCase().replace(/ /g, "_"), source: "import" })) : b.data })],
    // Fully synthetic: answered without calling the backend (the real query is slow on the devbox).
    [/^\/api\/audience$/, (b) => ({ success: true, message: "OK", ...b, data: contactRows(), pagination: page(b.pagination, 2734) }), { synthetic: true }],
    [/^\/api\/audience\/overview$/, (b) => ({ ...b, data: { ...(b.data || {}), total_customers: 2734, total_email_subscribed: 2215, total_phone_subscribed: 2734, total_suppressed: 41 } })],
    [/^\/api\/storage\/upload-url$/, () => ({ uploadUrl: "https://docs-shots.invalid/upload/contacts.csv", publicUrl: "https://docs-shots.invalid/contacts.csv",
      path: "docs/contacts.csv", bucket: "flowflex" }), { synthetic: true }],
    // Contact detail page (synthetic)
    [/^\/api\/single-audience$/, () => ({ success: true, message: "OK", data: { ...contactRows()[0],
      lists: [{ _id: ID(400), title: demo.lists[0].title }, { _id: ID(401), title: demo.lists[1].title }],
      sms_marketing_consent: false, email_marketing_consent: true, created: "2026-08-12T10:00:00.000Z",
      meta: { shopify: { orders_count: 6, total_spent: "18450.00" } } } }), { synthetic: true }],
    [/^\/api\/audience-belongs-to-segment$/, () => ({ success: true, message: "OK", data: demo.segments.slice(0, 2).map((g, i) => ({ _id: ID(450 + i), title: g.title, audience_count: g.count })) }), { synthetic: true }],
    // Saving a broadcast draft (publish dialog): answered here, never sent to the backend.
    [/^\/api\/broadcast$/, () => ({ success: true, message: "Broadcast saved", data: { _id: ID(399), status: "draft" } }), { synthetic: true, methods: ["POST", "PUT", "PATCH"] }],
    // ---- Messaging ----
    [/^\/api\/business-hours$/, (b) => ({ ...b, data: { ...(b.data || {}), quick_reply: { ...(b.data?.quick_reply || {}), reply: [] },
      hours_mode: "custom",
      bussiness_hours: Object.fromEntries(["mon", "tue", "wed", "thur", "fri", "sat", "sun"].map((d) => [d, { stime: "2026-01-01T04:30:00.000Z", etime: "2026-01-01T14:30:00.000Z", enabled: d !== "sun" }])),
      marketing_preference_languages: [
        { language_code: "en", start_keyword: "START", stop_keyword: "STOP", start_auto_reply: "You have been subscribed. Reply STOP to unsubscribe anytime.", start_auto_reply_enabled: true, stop_auto_reply: "You have been unsubscribed. Reply START to subscribe again.", stop_auto_reply_enabled: true },
        { language_code: "hi", start_keyword: "शुरू", stop_keyword: "बंद", start_auto_reply: "आपने सदस्यता ले ली है। सदस्यता छोड़ने के लिए बंद लिखें।", start_auto_reply_enabled: true, stop_auto_reply: "आपकी सदस्यता बंद कर दी गई है। फिर से शुरू करने के लिए शुरू लिखें।", stop_auto_reply_enabled: true }],
      greetingmsg: `Hi! Thanks for messaging ${brand.name}. How can we help today?`, awaymsg: `Thanks for your message. ${brand.name} is closed now; we reply from 10 am to 8 pm.` } })],
    [/^\/api\/chat\/quick-replies$/, (b) => {
      const quick_replies = demo.quickReplies.map((q, i) => ({ id: ID(680 + i), _id: ID(680 + i), name: q.shortcut, note: q.message }));
      return b.data && typeof b.data === "object" && !Array.isArray(b.data) ? { ...b, data: { ...b.data, quick_replies } } : { ...b, quick_replies, ...(Array.isArray(b.data) ? { data: quick_replies } : {}) };
    }],
    // Inbox: fully synthetic (answered without calling the backend).
    [/^\/api\/chat\/conversations$/, () => ({ contacts: chatRows(), hasMore: false, error: null, nextCursor: null, recovery_channel_ids: [] }), { synthetic: true }],
    [/^\/api\/chat\/conversations\/counts$/, () => ({ tabCounts: { total_mine: demo.chats.filter((c) => c.agent === demoUser.name).length,
      total_unassigned: demo.chats.filter((c) => !c.agent).length, total_contacts: demo.chats.length },
      overviewCounts: { open: 4, pending: 1, resolved: 1, total: demo.chats.length } }), { synthetic: true }],
    [/^\/api\/chat\/messages$/, () => ({ messages: demo.thread.map((m, i) => ({ id: 9300 + i, contact_id: "9100", message_id: `wamid.thread${i}`,
      type: m.out ? "outbound" : "inbound", status: m.out ? "read" : "received", search_text: m.text, reaction: [], agent_id: m.agent ? ID(800) : null,
      broadcast_id: m.broadcast ? ID(300) : null, meta_payload: { type: "text", text: { body: m.text } },
      created_at: m.at, updated_at: m.at })), hasMore: false, error: null }), { synthetic: true }],
    [/^\/api\/chat\/(filter-tags|audience-notes|events)$/, () => ({ data: [], tags: [], notes: [], events: [], error: null }), { synthetic: true }],
    [/^\/api\/list-folders$/, (b) => ({ ...b, data: Array.isArray(b.data) ? [] : b.data })],
    // ---- Workflows ----
    [/^\/api\/flow-data-tables$/, (b) => ({ ...b, data: demo.dataTables.map((t, i) => ({ ...(b.data?.[0] || {}), _id: ID(700 + i), title: t.title, columns: t.columns, is_pinned: i === 0, createdAt: "2026-09-20T09:00:00.000Z", updatedAt: "2026-10-14T09:00:00.000Z" })) })],
    [/^\/api\/campaigns$/, (b) => ({ success: true, message: "OK", ...b, data: [
      { title: "Order status replies", description: "Answers \"Where is my order?\" with live tracking.", status: "Active", start_date: "2026-10-01T00:00:00.000Z", end_date: "2026-10-31T23:59:00.000Z" },
      { title: "Diwali sale enquiries", description: "Replies to customers who message about the Diwali Sale.", status: "Active", start_date: "2026-10-15T00:00:00.000Z", end_date: "2026-10-27T23:59:00.000Z" },
      { title: "Store visit booking", description: "Books a visit to the Kochi or Bengaluru store.", status: "Paused", start_date: "2026-09-20T00:00:00.000Z", end_date: "2026-10-20T23:59:00.000Z" },
      { title: "Navratri preview", description: "Draft for the Navratri collection launch.", status: "Draft", start_date: "2026-10-28T00:00:00.000Z", end_date: "2026-11-10T23:59:00.000Z" },
    ].map((c, i) => ({ _id: ID(720 + i), key: ID(720 + i), name: c.title, updated_at: "2026-10-14T09:00:00.000Z", updatedAt: "2026-10-14T09:00:00.000Z",
      flow_versions: [], flows: [], errors: [], updates: 0, total_sent: 0, total_delivered: 0, total_opened: 0, total_failed: 0, ...c })),
      pagination: page(b.pagination, 4), total: 4 }), { synthetic: true }],
    // ---- Integrations ----
    [/^\/api\/custom-integrations$/, (b) => ({ ...b, data: [demoIntegration(b.data?.[0])] })],
    [/^\/api\/__unused_custom_integrations$/, (b) => ({ ...b, data: [{ ...(b.data?.[0] || {}), _id: ID(750), name: "Rangoli Order Events", description: "Order and delivery events from the Rangoli Store website.", icon_url: null, api_key: "cik_xxxxxxxxxxxx", code: "ic_rangoli01", isActive: true,
      events: [{ topic: "order.placed", title: "Order placed", description: "A customer places an order", category: "orders", sample_payload: { name: "John Smith", phone: "+919000000001", order_id: "ORD-48213", total: "2499" } },
               { topic: "order.shipped", title: "Order shipped", description: "An order leaves the warehouse", category: "orders", sample_payload: { name: "John Smith", phone: "+919000000001", order_id: "ORD-48213", eta: "18 Oct" } }] }] })],
    [/^\/api\/custom-integrations\/[^/]+$/, () => ({ success: true, data: demoIntegration() }), { synthetic: true }],
    [/^\/api\/integration$/, (b) => (b.data ? { ...b, data: { ...b.data, config: { api_key: "••••••••", api_secret_key: "••••••••", access_token: "••••••••", shop_domain: "rangoli-store.myshopify.com" } } } : b)],
    // ---- Account ----
    [/^\/api\/branch-agents$/, (b) => ({ ...b, data: demo.team.map((m, i) => ({ user_id: ID(800 + i), full_name: m.name, email: m.email, profile_pic: "", status: "active" })) })],
    [/^\/api\/member-access\/channels$/, (b) => ({ ...b, data: [channel(b.data?.[0])] })],

    [/^\/api\/users-by-org$/, (b) => ({ ...b, data: demo.team.map((m, i) => ({ ...(b.data?.[i] || b.data?.[0] || {}), _id: ID(800 + i), full_name: m.name, email: m.email, phone_number: m.phone, profile_pic: "", last_login: m.lastActive, dismissed_app_notices: [],
      ...(b.data?.[0]?.role ? { role: { ...b.data[0].role, name: m.role } } : {}) })), ...(b.pagination ? { pagination: page(b.pagination, demo.team.length) } : {}) })],
    [/^\/api\/monthly-usage-history$/, (b) => ({ ...b, data: demo.usage })],
    [/^\/api\/subscription\/current$/, (b) => ({ ...b, data: { ...(b.data || {}),
      ...(b.data?.active_subscription ? { active_subscription: { ...b.data.active_subscription, amount: b.data.plan?.pricing?.inr ?? b.data.active_subscription.amount,
        subscription_start_date: "2026-10-01T00:00:00.000Z", next_billing_date: "2027-01-01T00:00:00.000Z", subscription_end_date: "2027-01-01T00:00:00.000Z", addons: [] } } : {}),
      ...(b.data?.subscription ? { subscription: { ...b.data.subscription, name: brand.name, website: brand.website, next_billing_date: "2027-01-01T00:00:00.000Z", subscription_end_date: "2027-01-01T00:00:00.000Z", subscription_start_date: "2026-10-01T00:00:00.000Z" } } : {}),
      addons: [], change_request: null, ...(b.data?.organisation ? { organisation: { ...b.data.organisation, name: brand.name, website: brand.website,
      business_address: { address1: brand.address, state: "Karnataka", city: "Bengaluru", zip: "560001" }, billing_details: { ...(b.data.organisation.billing_details || {}), full_name: demoUser.name, billing_name: brand.name, billing_email: brand.email } } } : {}) } })],
    [/^\/api\/roles$/, (b) => {
      const real = b.data || [];
      const admin = real.find((r) => r.name === "Admin") || real[0];
      const custom = real.filter((r) => r !== admin);
      const named = [admin, ...["Support agent", "Marketing manager"].map((n, i) => ({ ...(custom[i] || admin), _id: ID(850 + i), name: n, deletable: true, is_default: false,
        permissions: (custom[i] || admin)?.permissions || [] }))].filter(Boolean);
      return { ...b, data: named, total: named.length, totalPages: 1 };
    }],
    [/^\/api\/daily-usage$/, (b) => ({ ...b, data: { ...(b.data || {}), dailyUsage: (b.data?.dailyUsage || []).map((row, i) => {
      const out = { ...row };
      for (const k of Object.keys(row)) if (row[k] && typeof row[k] === "object" && "qty" in row[k]) {
        const q = k === "marketing" ? 40 + ((i * 7) % 25) : k === "utility" ? 12 + ((i * 5) % 9) : k === "authentication" ? 2 + (i % 3) : 0;
        out[k] = { ...row[k], qty: q, totalCost: Math.round(q * (k === "marketing" ? 0.88 : k === "utility" ? 0.13 : 0.13) * 100) / 100 };
      }
      return out;
    }) } })],
    [/^\/api\/transactions$/, (b) => ({ ...b, data: { ...(b.data || {}), transactions: [
      { amount: 5000, type: "wallet_recharge", status: "success", description: "Wallet recharge", createdAt: "2026-10-01T06:12:00.000Z" },
      { amount: 2500, type: "wallet_recharge", status: "success", description: "Wallet recharge", createdAt: "2026-09-15T05:40:00.000Z" },
    ].map((x, i) => ({ ...(b.data?.transactions?.[0] || {}), _id: ID(870 + i), userId: ID(800), merchant_order_id: `order_RNG${1000 + i}`, currency: "INR",
      service_charges: Math.round(x.amount * 0.025), gst_amount: 0, net_amount: x.amount, updatedAt: x.createdAt, ...x })) } })],
    [/^\/api\/notifications$/, (b) => ({ ...b, data: Array.isArray(b.data) ? [] : b.data })],
  ].map(([re, fn, opts]) => ({ re, fn, userName, synthetic: !!opts?.synthetic, methods: opts?.methods || ["GET"] }));
}

function renameUser(u, demo) {
  if (!u || typeof u !== "object") return u;
  return { ...u, name: demo.name, first_name: demo.name, last_name: "", full_name: demo.name, email: demo.email, phone: demo.phone, profile_image: "", profile_img: "" };
}
