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

| Channel | Recipients | Fields |
| --- | --- | --- |
| **Email** | Up to 4 email addresses | Subject + body. Sent from `info@reviewbit.app`. |
| **SMS** | Up to 4 phone numbers | Body only. |
| **WhatsApp** | Up to 4 phone numbers | Pick an **approved template** (same categories as [Template message](flows/nodes/template-message.md): Marketing, Utility, or Authentication). Fill in any template variables. |

You can configure any combination of the three channels in the same node — enabling Email, SMS, and WhatsApp simultaneously sends all three.

> Channels are **email, SMS, and WhatsApp** — not Teams or Slack.

## In the meantime

- To message a person on WhatsApp today, use a normal
  **[Template message](flows/nodes/template-message.md)** node pointed at their number.

Next: **[Triggers & variables »](flows/triggers-and-variables.md)**
