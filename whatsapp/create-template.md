# Create a template

Go to **Templates** → **Create template**. The wizard has four steps: **Select channel** → **Set up template** → **Edit template** → **Submit for review**. Meta usually reviews a template within minutes, but it can take up to 24 hours.

Read the [Template guidelines](whatsapp/template-guidelines.md) before you submit. They cover the most common reasons Meta rejects a template.

## 1. Select channel

<img src="assets/whatsapp/template-select-channel.png" alt="Create template, step 1: selecting the Rangoli Store channel">

Pick a **Connected** channel. Each template belongs to that channel's WABA, so another WABA cannot use it.

## 2. Set up template

### Category

Choose the category carefully. Meta charges by category, and it re-categorises templates whose content does not match the category you chose.

| Category | Use it for | Examples | Not for |
| --- | --- | --- | --- |
| Marketing | Promotions, offers, launches, re-engagement, newsletters | Sale announcement, new collection, abandoned cart with a discount | Anyone who has not opted in |
| Utility | Updates about something the customer already did or bought | Order confirmed, shipped, appointment reminder, payment receipt | Any promotional line. One upsell sentence makes it Marketing. |
| Authentication | One-time passwords only | Login or signup OTP | Any other text. Meta fixes the content. |

### Name, language, and format

- **Template name**: lowercase letters, numbers, and underscores only. Spaces become `_`. Use at least 5 characters and keep it under 100. Names must be unique per WABA. Use a pattern such as `diwali_sale_2026_en` or `order_shipped_v2`.
- **Language**: the language of the content. For several languages, create one template per language with the same name.
- **Template format** (Marketing only): **Standard** (one message) or **Carousel** (2–10 swipeable cards).

## 3. Edit template

<img src="assets/whatsapp/template-edit.png" alt="Create template: editing the Diwali sale template">

| Part | Required | Limits in FlowFlex |
| --- | --- | --- |
| Header | No | None, Text (60 characters, up to one variable `{{1}}`), Image (JPEG/PNG, 5 MB), Video (MP4/3GPP, 16 MB), Document (PDF/Office/txt, 100 MB), or Location (filled in at send time) |
| Body | Yes | 1,024 characters. Variables `{{1}}` to `{{15}}`, numbered only. |
| Footer | No | 60 characters, no variables |
| Buttons | No | Up to 10 buttons, 25 characters of text each. More than 3 show as a list. |

### Buttons

| Button | Limit | Notes |
| --- | --- | --- |
| Quick reply → **Marketing opt-out (Recommended)** | 1, Marketing only | Sends the STOP keyword and unsubscribes the contact automatically. Add it to every Marketing template. |
| Quick reply → **Custom** | – | Free text such as "Yes, interested". Replies arrive in **Conversations**. |
| **Visit website** | 2 | Static URL, or Dynamic URL that adds `{{1}}` at the end, for example `https://shop.com/order/{{1}}`. FlowFlex converts links to a tracked short link to count clicks. |
| **Call Phone Number** | 1 | Include the country code. |
| **Copy offer code** | 1, Marketing only | Up to 15 characters. Not shown on WhatsApp Web. |

### Variables and samples

Every variable needs a sample value. Meta reviews the template using these samples, so make them realistic: `Priya` for a name, `ORD-48213` for an order ID, never `test` or `abc`.

### Carousel

2–10 cards. All cards use the same header type (all images or all videos) and the same buttons as Card 1, with 1–2 buttons per card. A carousel has no header, footer, or outer buttons.

### Authentication

The text is fixed. You can add a security recommendation and a code expiry time (1–90 minutes). A copy-code button is added automatically.

## 4. Submit for review

<img src="assets/whatsapp/templates-list.png" alt="Template Management listing the approved demo templates">

After you submit, the template shows **In Review**. FlowFlex receives status changes from Meta automatically. Use **Sync from Meta** on a row, or **Refresh**, to pull them sooner.

| Status | Meaning | What to do |
| --- | --- | --- |
| In Review | Meta is reviewing it | Wait. You cannot broadcast it yet. |
| Approved | Ready to use. Quality shows High, Medium, Low, or pending. | Broadcast it. Watch for a quality drop. |
| Rejected | Meta refused it | Read the reason, fix the content, and submit it under a new name. |
| Paused | Paused after negative feedback or low read rates | Running broadcasts pause. Rework the content and audience. |
| Disabled | Disabled after repeated low quality | Create a new, improved template. |

Statuses follow [Meta – Template fundamentals](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/overview).
