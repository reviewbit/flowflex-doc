# Internal alert <span class="badge soon">Coming soon</span>

> Notify your **team** internally — via email, SMS, or WhatsApp — when a flow reaches this step.

> [!ATTENTION]
> **Not yet live.** The Internal alert node can be configured, but its **execution isn't wired
> up** — no alert is actually sent when the flow runs. This page describes the intended
> behavior.

<div class="img-slot">
  <span class="img-slot-icon">📷</span>
  <strong>Screenshot — the Internal alert drawer (preview)</strong>
  <span>Show the Email / SMS / WhatsApp channel sections.</span>
  <span>Save as <code>assets/flows/node-internal-alert.png</code></span>
</div>

## What it will do

Send an internal notification to your team when the flow hits this node — useful for
**escalations** like "no response from customer" or "an angry reply was detected." Channels:

| Channel | Fields |
| --- | --- |
| **Email** | Up to 4 recipients, subject, body. |
| **SMS** | Up to 4 recipients, body. |
| **WhatsApp** | Up to 4 recipients, using an approved template (like [Template message](flows/nodes/template-message.md)). |

> The channels are **email, SMS, and WhatsApp** — not Teams or Slack.

## In the meantime

- To message a person on WhatsApp today, use a normal
  **[Template message](flows/nodes/template-message.md)** node pointed at their number.

Next: **[Triggers & variables »](flows/triggers-and-variables.md)**
