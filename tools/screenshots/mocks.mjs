// Rewrites API responses so every screenshot shows only demo-data.json content.
//
// Each rewriter receives the real JSON response (to keep the exact format the app expects),
// replaces every customer-visible value with demo content, and returns the new body.
// Endpoints listed in SCRUB but without a rewriter are emptied, so unknown real data never
// reaches the screen. Add a rewriter here when a new screen needs content.

const ID = (n) => `6a1b2c3d4e5f60718293a${String(n).padStart(3, "0")}`;
const NOW = "2026-10-16T10:00:00.000Z";

export function buildRewriters(data) {
  const { brand, contacts, templates, broadcast, workspace } = data;
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
      : b.type === "Copy offer code" ? { type: "COPY_CODE", example: b.code }
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
    [/^\/api\/wallet-details$/, (b) => ({ ...b, data: { ...(b.data || {}), balance: 5000, currentBalance: 5000, business_name: brand.name, gst_number: "", additional_email: [], phone: [], lastDeduction: null } })],
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
      data: { ...b.data, user_org: { ...b.data?.user_org, name: brand.name, website: brand.website, def_notify_email: brand.email, profile_image: "",
        business_address: { address1: brand.address, state: "Karnataka", city: "Bengaluru", zip: "560001" } },
        ...(b.data?.user ? { user: renameUser(b.data.user, demoUser) } : {}),
        ...(b.data?.user_data ? { user_data: renameUser(b.data.user_data, demoUser) } : {}),
        // Branch list in the profile drawer: keep real IDs, show only the demo branch names.
        ...(b.data?.user_branches ? { user_branches: demoBranchList(b.data.user_branches) } : {}),
        ...(b.data?.user_orgs ? { user_orgs: b.data.user_orgs.filter((o) => (o.org_id?._id || o.org_id) === (b.data.user_org?._id)).map((o) => ({ ...o, name: brand.name, org_id: typeof o.org_id === "object" ? { ...o.org_id, name: brand.name } : o.org_id })) } : {}) },
    })],
    [/^\/api\/user-organisations$/, (b) => ({ ...b, data: (b.data || []).slice(0, 1).map((o) => ({ ...o, name: brand.name, organisation: o.organisation ? { ...o.organisation, name: brand.name } : o.organisation })) })],
    [/^\/api\/notifications$/, (b) => ({ ...b, data: Array.isArray(b.data) ? [] : b.data })],
  ].map(([re, fn]) => ({ re, fn, userName }));
}

function renameUser(u, demo) {
  if (!u || typeof u !== "object") return u;
  return { ...u, name: demo.name, first_name: demo.name, last_name: "", full_name: demo.name, email: demo.email, phone: demo.phone, profile_image: "", profile_img: "" };
}
