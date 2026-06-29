# Quick start

This walks you end-to-end: create credentials, build a tiny flow, and fire your first
event so a WhatsApp message goes out.

## 1. Create a custom integration

In the FlowFlex dashboard, create a **Custom Integration**. You'll get three values:

| Value | Looks like | Use |
| --- | --- | --- |
| **API key** | `cik_…` | Identifies the integration (the “username” in Basic auth). |
| **API secret** | `cisk_…` | The secret (the “password”). **Shown once — store it safely.** |
| **Integration code** | `ic_abc123` | Goes in the event URL: `/v1/events/<code>`. |

> [!WARNING]
> The secret is only displayed at creation (and on rotate). If you lose it, rotate the
> credentials to get a new one.

## 2. Build a flow with a custom trigger

In the **flow builder**:

1. Add a **Trigger** node and choose your custom-integration event (e.g. `order.placed`).
2. Add a **Text message** node and connect the trigger to it.
3. In the message body, type a greeting and insert a variable from the event payload with
   **Insert Variable** — e.g. `Hi {{trigger.name}}, your order {{trigger.order_id}} is confirmed!`
4. Set the **Destination number** to the recipient — usually a variable like
   `{{trigger.phone}}`.
5. **Save / Publish** the flow.

See [Flows → Triggers & variables](flows/triggers-and-variables.md) for how payload fields
become `{{trigger.*}}`.

## 3. Fire the event

### With the SDK (recommended)

```bash
npm install @fantacode/flowflex
```

```ts
import { FlowFlex } from "@fantacode/flowflex";

const ff = new FlowFlex({
  apiKey: process.env.FLOWFLEX_KEY!,         // cik_…
  apiSecret: process.env.FLOWFLEX_SECRET!,   // cisk_…
  integrationCode: "ic_abc123",
  baseUrl: "https://app.flowflex.com",
});

await ff.sendEvent("order.placed", {
  payload: { name: "Ada", order_id: "ord_42", phone: "919999999999" },
});
```

### With raw HTTP

```bash
curl -X POST "https://app.flowflex.com/v1/events/ic_abc123" \
  -u "cik_xxx:cisk_yyy" \
  -H "x-event: order.placed" \
  -H "x-idempotency-key: $(uuidgen)" \
  -H "Content-Type: application/json" \
  -d '{ "payload": { "name": "Ada", "order_id": "ord_42", "phone": "919999999999" } }'
```

Both do the same thing. The keys you put in `payload` (`name`, `order_id`, `phone`) are
exactly what you reference in the flow as `{{trigger.name}}`, `{{trigger.order_id}}`,
`{{trigger.phone}}`.

## 4. Attach a file (optional)

To send a PDF/image, wrap it with `ff.file(...)` and reference it in a **Media** node — the
SDK handles the upload for you:

```ts
await ff.sendEvent("invoice.created", {
  payload: { invoice: ff.file("./invoice.pdf"), phone: "919999999999" },
});
```

Then in the Media node set **File source → Private file (assetId)** and the **Asset ID** to
`{{trigger.invoice}}`. Full details in [SDK → File attachments](sdk/files.md).

## Where to next

- **[Flows → Overview](flows/overview.md)** — what each node does.
- **[SDK → Overview](sdk/overview.md)** — full SDK usage.
- **[API → Authentication](api/authentication.md)** — call the REST API from any language.
