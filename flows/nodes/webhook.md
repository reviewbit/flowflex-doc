# Webhook <span class="badge soon">Coming soon</span>

> Pause the flow until an external system calls back, or react to a webhook event.

> [!ATTENTION]
> **Not yet live.** The Webhook node can be placed and configured on the canvas, but its
> **execution isn't wired up** — it won't pause or respond when the flow runs. This page
> describes the intended behavior; treat the node as a preview until it ships.

<div class="img-slot">
  <span class="img-slot-icon">📷</span>
  <strong>Screenshot — the Webhook node drawer (Custom and Shopify modes)</strong>
  <span>Add once the node is live.</span>
  <span>Save as <code>assets/flows/node-webhook.png</code></span>
</div>

## What it will do

Let a flow **pause and wait for an external signal**, then continue when that signal arrives.
Two modes are supported:

| Mode | When to use |
| --- | --- |
| **Custom** | Any external system that can make an HTTP POST. You get a unique URL; point your system at it. |
| **Shopify** | Subscribe to a specific Shopify event (e.g. `order/paid`) and optionally filter which orders trigger the resume. |

## Settings — Custom mode

| Field | Notes |
| --- | --- |
| **Webhook name** | A unique identifier (letters, numbers, and underscores only). Used to tell webhooks apart inside the flow. |
| **Generated webhook URL** | Auto-created when you save the name. Copy it and configure your external system to POST to this URL. |
| **Set time delay** | Optional. If the callback hasn't arrived after this duration the flow continues anyway (without webhook data). |
| **Delay value + unit** | Seconds / minutes / hours / days. |

## Settings — Shopify mode

| Field | Notes |
| --- | --- |
| **Choose event** | The Shopify event topic to subscribe to (e.g. `orders/paid`, `customers/update`). |
| **Filters** | Optional condition rules — only resume the flow if the event payload matches (same filter syntax as [Condition split](flows/nodes/condition-split.md)). |

## In the meantime

- To **call out** to another system right now and continue immediately, use the
  **[API](flows/nodes/api.md)** node.
- To **start** a flow from an external event, fire a [custom-integration event](api/events.md)
  via the [SDK](sdk/overview.md) or REST API.

Next: **[Save variable »](flows/nodes/save-variable.md)**
