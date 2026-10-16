# Custom integrations

A custom integration lets any system start your flows by sending events to one webhook URL. FlowFlex gives each integration its own API key and secret.

Use it for systems FlowFlex has no ready-made integration for, such as your own website, order system or CRM. For the code side, see the [Developer quick start](developers/quick-start.md).

## Create a custom integration

1. Go to **Integrations** and click **New** on the **Custom integrations** card.
2. Fill in **Details** and **Events**, as described below.
3. Click **Create integration**.

The page title is **Create custom integration**. The right-hand side shows the **API / Webhook instructions** while you work.

### Details

| Field | Required | Rules |
| --- | --- | --- |
| **Integration name** | Yes | Any name, for example `Rangoli Order Events`. |
| **Description** | No | A short note on what these events represent. It shows on the integration's card. |
| Icon | No | Click the avatar next to the title to upload a logo. JPG or PNG only, smaller than 5 MB. |

If you skip the icon, FlowFlex shows initials on a coloured circle. It uses the first letters of the first two words, so "Rangoli Order Events" shows **RO**.

### Events

Events are the things your system will tell FlowFlex about. Flows subscribe to them by name. Add at least one event, or you see **Add at least one event**.

The form starts with one empty event. Click **+ Add event** for more, or **Remove event** to delete one.

<img src="assets/integrations/custom-integration-events.png" alt="Adding events to a custom integration">

| Field | Required | Rules |
| --- | --- | --- |
| **Event name** | No | A readable title, for example `Order placed`. If empty, FlowFlex uses the event value. |
| **Event value** | Yes | The identifier your system sends in the `x-event` header, for example `order.placed`. See the rules below. |
| **Description** | No | What this event represents. |
| **Expected payload** | No | A sample of the JSON data this event carries. |

**Event value** rules:

- 1 to 64 characters.
- Letters, numbers, dot (`.`), underscore (`_`) or hyphen (`-`).
- Must start and end with a letter or number. `order.placed` is valid; `.order` and `order-` are not.
- Must be unique within the integration. `Order.Placed` and `order.placed` count as the same value.

### Expected payload

**Expected payload** describes the data your system sends with the event. Switch between two views:

- **Code** — type or paste raw JSON. Invalid JSON shows **Invalid JSON** under the box.
- **Tree** — edit the same JSON as a tree of keys and values.

The sample powers the `{{trigger.*}}` hints in the flow builder. For example, this payload for `order.placed`:

```json
{
  "customer": { "name": "Ananya", "phone": "919000000001" },
  "order_id": "RS-1042",
  "total": 1499
}
```

gives you `{{trigger.customer.name}}`, `{{trigger.customer.phone}}`, `{{trigger.order_id}}` and `{{trigger.total}}`. See [Choose the trigger](flows/triggers-and-variables.md).

> [!TIP]
> Use realistic sample values. The sample only describes the fields; each real event brings its own values.

## Your integration is live

After you click **Create integration**, FlowFlex shows **Your integration is live**.

<img src="assets/integrations/custom-integration-live.png" alt="A live custom integration with its webhook details">

The **Credentials** card shows three values:

| Value | Looks like | Use |
| --- | --- | --- |
| **Webhook URL** | `POST https://<your-flowflex-host>/v1/events/ic_xxxx` | Where your system sends events. The last part is the integration code. |
| **API Key** | `cik_xxxx` | The username for HTTP Basic Auth. |
| **API Secret** | `cisk_xxxx` | The password for HTTP Basic Auth. Tagged **Shown once**. |

The secret is masked. Click **Reveal** to see it, and the copy icon to copy it.

> [!WARNING]
> The API secret is shown only once. Copy it or download the .env now. It can't be retrieved later. To get a new one, regenerate the credentials.

Click **Download .env** to save a file with all three values:

```bash
FLOWFLEX_API_KEY=cik_xxxx
FLOWFLEX_API_SECRET=cisk_xxxx
FLOWFLEX_WEBHOOK_URL=https://<your-flowflex-host>/v1/events/ic_xxxx
```

Click **Go to integrations** when you are done. Your new integration now has its own card.

## Send events

The **API / Webhook instructions** panel, under **How to send events**, sums up the request:

| Part | Value |
| --- | --- |
| Method and URL | `POST` to the integration's **Webhook URL**, over HTTPS only |
| `Authorization` | HTTP Basic Auth: API key as username, API secret as password |
| `x-event` | One of this integration's event values, for example `order.placed` |
| `content-type` | `application/json` |
| `x-idempotency-key` | Optional. A unique ID that stops a retried request from running twice |
| Body | The event data, matching the expected payload |

One integration has one webhook URL. The `x-event` header says which event it is. Every flow subscribed to that event runs.

Open **Attaching files to events** in the same panel to send a file, such as an invoice PDF. It uses three calls and accepts files up to 25 MB.

For full details, see:

- [Developer quick start](developers/quick-start.md)
- [Send events](api/events.md)
- [Upload assets](api/assets.md)
- [Install and use the SDK](sdk/overview.md)

## Use the integration in a flow

In the flow builder, choose the trigger source **Custom**, then your integration, then the event. Only active integrations appear in the list. See [Choose the trigger](flows/triggers-and-variables.md).

## Manage an integration

On the **Integrations** page, click **Manage** on the integration's card. The page shows:

- The name, description and icon. Click the icon to upload a new one.
- **Events**, with each event value, name, description and expected payload.
- **API / Webhook instructions** for this integration.
- **Credentials**: the **API Key**, and **API Secret** marked **Hidden — shown only once at creation**.

### Edit

Click **Edit** to change the name, description or events. Click **Save changes** to keep them, or **Cancel**. The API key, secret and webhook URL do not change.

### Regenerate credentials

Click **Regenerate** in the **Credentials** panel, then confirm **Regenerate credentials?**.

- FlowFlex creates a new API key and a new secret.
- The old key and secret stop working immediately.
- The webhook URL stays the same.
- The new secret is shown once, with **Reveal** and copy. Update all callers before you close the page.

Regenerate whenever the secret may have leaked.

### Revoke an integration

Click **Revoke**, then confirm **Revoke this integration?**.

- Callers can no longer start flows with this key.
- The integration shows a **Revoked** tag and leaves the flow trigger list.
- **Edit**, **Revoke** and **Regenerate** disappear. **Delete** appears.

You can't revoke an integration that is still a flow's trigger. FlowFlex shows **Can't revoke — integration in use** and lists those flows. Change their trigger first, then revoke.

### Delete an integration

You can delete only a revoked integration. Click **Delete**, then confirm **Delete this integration?**.

The integration is removed from your integrations list. This cannot be undone. Deletion is also blocked while any flow uses the integration (**Can't delete — integration in use**).

## Permissions

| Action | Permission needed |
| --- | --- |
| See integrations and open **Manage** | `integration.view` |
| Create | `integration.create` |
| Edit, change icon, regenerate | `integration.edit` |
| Revoke, delete | `integration.delete` |

See [Roles and permissions](account/roles-and-permissions.md).
