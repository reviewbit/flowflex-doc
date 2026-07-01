# Button message

> An interactive message with **up to 3 quick-reply buttons** — branch on which one the
> customer taps.

![The Button message node and its config drawer](../../assets/flows/button-message-node.png)

## What it does

Sends a message with **1–3 tappable quick-reply buttons**. Each button is its own outgoing
path, so the flow can branch on exactly which button the customer taps. The node inherently
**waits** for the tap.

## When to use

- Simple menus and yes/no/maybe style choices.
- Any point where you want the customer to **choose**, and you branch on the choice.

## Settings

| Field | Required | Notes |
| --- | --- | --- |
| **Destination number** | Yes | Recipient with country code. |
| **Header** | No | Type: **none, text, image, video, or document**. |
| **Body** | Yes | The message text (supports variables and formatting). |
| **Footer** | No | Small text under the body. |
| **Buttons** | Yes (1–3) | Each button has a **title** (max **20** characters). IDs are assigned automatically (`BUTTON_1…3`). |
| **Wait for specific time** | No | Set how long to wait for a tap before the **No response** path is taken. |

## Handles

- **One handle per button** — wire each to the path that should run when that button is tapped.
- **No response** — taken if the customer doesn't tap within the wait window.

## Tips

- WhatsApp allows **at most 3** quick-reply buttons. Need more options? Use a
  **[List message](flows/nodes/list-message.md)**.
- Keep titles short (≤20 chars) — longer titles are rejected.
- Always wire the **No response** path so a silent customer doesn't get stuck.
