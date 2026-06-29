# Webhook <span class="badge soon">Coming soon</span>

> Pause the flow until an external system calls back, or react to a webhook event.

> [!ATTENTION]
> **Not yet live.** The Webhook node can be placed and configured on the canvas, but its
> **execution isn't wired up** — it won't do anything when the flow runs. This page describes
> the intended behavior; treat the node as a preview until it ships.

<div class="img-slot">
  <span class="img-slot-icon">📷</span>
  <strong>Screenshot — the Webhook node (preview)</strong>
  <span>Add once the node is live.</span>
  <span>Save as <code>assets/flows/node-webhook.png</code></span>
</div>

## What it will do

Let a flow **wait for an external system to call back** (a webhook), then continue once the
callback arrives — useful for long-running external processes (payment confirmation, a
fulfilment system, an approval step).

## In the meantime

- To call out to another system and continue immediately, use the **[API](flows/nodes/api.md)**
  node.
- To start a flow from an external event, fire a [custom-integration event](api/events.md)
  via the [SDK](sdk/overview.md) or REST API.

Next: **[Save variable »](flows/nodes/save-variable.md)**
