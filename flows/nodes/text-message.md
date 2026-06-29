# Text message

> Send a free-form WhatsApp text message — the most common node in a flow.

<div class="img-slot">
  <span class="img-slot-icon">📷</span>
  <strong>Screenshot — the Text message node + its config drawer</strong>
  <span>Show the node on the canvas and the drawer with a message body typed in.</span>
  <span>Save as <code>assets/flows/node-text-message.png</code></span>
</div>

## What it does

Sends a plain WhatsApp text message to the customer. The body is free-form, supports
variables, and can be formatted. Optionally, the node can **wait for the customer's reply**
before the flow continues.

> [!NOTE]
> Free-form text can only be sent **inside the 24-hour customer-service window** (i.e. within
> 24 hours of the customer's last message). To start a conversation outside that window, use a
> **[Template message](flows/nodes/template-message.md)** instead.

## When to use

- Confirmations, updates, reminders, and replies **during an active conversation**.
- Any message where you want plain text rather than buttons, a list, or media.
- When you want to **wait for a reply** and branch on whether one arrives.

## Settings

| Field | Required | Notes |
| --- | --- | --- |
| **Destination number** | Yes | The recipient, with country code — usually a variable like `{{trigger.phone}}`. |
| **Message body** | Yes | Free-form text. Supports **bold**, _italic_, ~strike~ and `{{variables}}` via **Insert Variable**. |
| **Header** | No | Optional text header above the body. |
| **Footer** | No | Optional small text below the body. |
| **Wait for reply** | No | Toggle on to pause for a reply. Set a **value** + **unit** (seconds / minutes / hours / days; default minutes). |
| **Validate reply** | No | Optionally require a valid response format and show a custom "invalid response" message. |

## Handles

- **Next step** — the normal continuation.
- **No response** — appears when *Wait for reply* is on; taken if no reply arrives in the window.

## Example

```
Text message
  Destination: {{trigger.phone}}
  Body: "Hi {{trigger.name}}, your order {{trigger.order_id}} is confirmed 🎉"
  Wait for reply: 2 hours
   ├─ reply received ─▶ Next step …
   └─ no response   ─▶ Internal alert / reminder …
```

## Tips

- Keep the **destination number** a variable so the same flow works for every customer.
- Use **Insert Variable** instead of typing `{{…}}` by hand — it guarantees a valid path.
- Wire the **No response** path for anything important. See [Waiting for a reply](flows/response-wait.md).

Next: **[Template message »](flows/nodes/template-message.md)**
