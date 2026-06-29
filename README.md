<!-- README.md — docs home -->

# FlowFlex Documentation

FlowFlex lets you build **WhatsApp automation flows** with a visual builder and drive
them from your own application. An event you fire from your app (an order placed, a
checkout abandoned, an invoice generated) starts a flow that sends WhatsApp messages,
waits for replies, branches on conditions, calls APIs, and more.

There are three things to know about, and a page for each:

| | What it is | Start here |
| --- | --- | --- |
| **Flows** | The visual automations themselves — triggers, message nodes, logic, delays. | [Flows → Overview](flows/overview.md) |
| **SDK** | `@fantacode/flowflex` — a Node/browser library to fire events and attach files without touching presigned URLs. | [SDK → Overview](sdk/overview.md) |
| **REST API** | The raw HTTP endpoints the SDK calls — use these from any language. | [API → Authentication](api/authentication.md) |

## How it fits together

```
Your app ──fires event──▶  FlowFlex  ──starts──▶  Flow
   │                          │                     │
   │  SDK or REST API         │  matches event      │  Text / Buttons / List / Media
   │  (apiKey + secret)       │  to a flow trigger   │  Logic · Delay · Wait for reply
   └──────────────────────────┘                     └──▶  WhatsApp message to customer
```

1. In the **flow builder** you pick a **trigger** (the event that starts the flow) and
   lay out the nodes that run when it fires.
2. From your backend you **fire that event** with a JSON payload — using the
   [SDK](sdk/overview.md) or a direct [API](api/events.md) call.
3. The payload is available inside the flow as `{{trigger.*}}` variables, so your
   messages can be personalized (`Hi {{trigger.name}}, your order {{trigger.order_id}}…`).

## New here?

Follow the [Quick start](getting-started.md) — it walks you from creating credentials to
firing your first event end-to-end.

> [!NOTE]
> These docs are a static [Docsify](https://docsify.js.org) site.
