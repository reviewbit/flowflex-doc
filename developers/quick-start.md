# Developer quick start

Send an event from your own app or website and have FlowFlex reply to the customer on WhatsApp.

Your app sends FlowFlex an event, such as `order.placed`, with some JSON data. The event starts every flow that uses it as its trigger, and the flow can put any field from the data into a WhatsApp message. You can send events with the FlowFlex SDK for JavaScript or Python, or with plain HTTP from any language.

In this guide, Rangoli Store's website sends `order.placed` when John Smith places order `RS-1042`. A flow replies to John: "Hi John Smith, your order RS-1042 is confirmed!"

> [!NOTE]
> You need a connected WhatsApp channel first. See [Set up your account](../getting-started.md).

## How it works

1. A custom integration gives you an API key, an API secret and an integration code.
2. A flow uses one of the integration's events as its trigger.
3. Your app sends the event to `/v1/events/<code>`, authenticated with the key and secret.
4. The flow runs, and each key in the event data is available as `{{trigger.<key>}}`.

## Create a custom integration

In FlowFlex, create a custom integration with an `order.placed` event. See [Custom integrations](../integrations/custom-integration.md). You get three values:

- **API key** (`cik_…`): identifies the integration. It's the username in Basic auth.
- **API secret** (`cisk_…`): the password in Basic auth. It's shown once, so store it safely.
- **Integration code** (`ic_abc123`): goes in the event URL, `/v1/events/<code>`.

> [!WARNING]
> The secret is shown only when you create or regenerate the credentials. If you lose it, regenerate the credentials to get a new one.

## Build a flow with a custom trigger

1. In the flow builder, add a **Trigger** and choose your integration's `order.placed` event.
2. Add a **Text message** node and connect the trigger to it.
3. In the message, type a greeting and use **Insert Variable** to add fields from the event data, for example `Hi {{trigger.name}}, your order {{trigger.order_id}} is confirmed!`
4. Set **Destination number** to the customer's number from the event, `{{trigger.phone}}`.
5. Click the arrow beside **Save** and choose **Save and publish**.

A Text message reaches customers only during an active conversation. To message customers who haven't written to you recently, use an approved [Template message](../flows/nodes/template-message.md) instead. See [Choose the trigger](../flows/triggers-and-variables.md) for how event fields become `{{trigger.*}}` variables.

## Send the event

### With the SDK (recommended)

```bash
npm install flowflex
```

```ts
import { FlowFlex } from "flowflex";

const ff = new FlowFlex({
  apiKey: process.env.FLOWFLEX_KEY!,         // cik_…
  apiSecret: process.env.FLOWFLEX_SECRET!,   // cisk_…
  integrationCode: "ic_abc123",
  baseUrl: "https://api.flowflex.ai",
});

await ff.sendEvent("order.placed", {
  payload: { name: "John Smith", order_id: "RS-1042", phone: "919000000001" },
});
```

### With raw HTTP

```bash
curl -X POST "https://api.flowflex.ai/v1/events/ic_abc123" \
  -u "cik_xxx:cisk_yyy" \
  -H "x-event: order.placed" \
  -H "x-idempotency-key: $(uuidgen)" \
  -H "Content-Type: application/json" \
  -d '{ "name": "John Smith", "order_id": "RS-1042", "phone": "919000000001" }'
```

Both do the same thing. With the SDK you pass the data as `payload`; with raw HTTP it's the whole JSON body. The keys `name`, `order_id` and `phone` are what the flow uses as `{{trigger.name}}`, `{{trigger.order_id}}` and `{{trigger.phone}}`.

## Attach a file (optional)

To send a PDF or image, wrap it with `ff.file(...)`. The SDK uploads it for you before sending the event:

```ts
await ff.sendEvent("invoice.created", {
  payload: { invoice: ff.file("./invoice.pdf"), phone: "919000000001" },
});
```

In the flow, add a **Media message** node, set **File source** to **Uploaded file**, and set **Asset ID** to `{{trigger.invoice}}`. See [SDK file attachments](../sdk/files.md).

## See also

- [Workflows overview](../flows/overview.md): what each node does.
- [Install and use the SDK](../sdk/overview.md): full SDK usage.
- [REST API authentication](../api/authentication.md): call the API from any language.
