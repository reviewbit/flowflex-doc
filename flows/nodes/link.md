# Link button

> Send a message with a tappable button that opens a link.

## What it does

Sends a WhatsApp message with body text and a single button. Tapping the button opens the
URL in the customer's browser — nothing is typed, and no menu appears.

This is the clean way to get a link in front of someone. The alternative — pasting a raw
URL into a [Text message](flows/nodes/text-message.md) — leaves a long, ugly link in the
chat and is easier to mistake for spam.

> [!NOTE]
> Like all free-form messages, a link button can only be sent **inside the 24-hour
> customer-service window** (within 24 hours of the customer's last message). To start a
> conversation outside that window, use a **[Template message](flows/nodes/template-message.md)**
> with a URL button instead.

> [!WARNING]
> WhatsApp does **not** tell us when the button is tapped. The node therefore has no
> "clicked" branch and cannot wait for a reply — it always continues straight to the next
> step. Click counts are not recorded yet.

## When to use

- Sending someone to a tracking page, invoice, booking form, or product page.
- Any hand-off from the conversation to the web.
- When the destination is per-customer — the URL can be built from variables, e.g.
  `https://shop.com/order/{{trigger.order_id}}`.

Use a **[Button message](flows/nodes/button-message.md)** instead when you want the customer
to *answer* and the flow to branch on their choice.

## Settings

| Field | Required | Notes |
| --- | --- | --- |
| **Destination number** | Yes | The recipient, with country code — usually a variable like `{{trigger.phone}}`. |
| **Message** | Yes | Body text, max 1024 characters. Supports **bold**, _italic_, ~strike~ and `{{variables}}` via **Insert Variable**. |
| **Footer** | No | Small grey text under the message, max 60 characters. |
| **Button label** | Yes | The text on the button, max 20 characters. No variables. |
| **Button URL** | Yes | Must start with `http://` or `https://`, or be built from variables. Max 2000 characters. |

## Handles

- **Next step** — the only output. The flow continues here as soon as the message is sent,
  whether or not the customer taps the button.

## Tips

- Keep the label short and specific — "Track order" beats "Click here". WhatsApp truncates
  past 20 characters.
- Build per-customer URLs with **Insert Variable** rather than typing `{{…}}` by hand.
- Only one button is allowed. For several links, send several Link button nodes, or put the
  extra URLs in the body text.
- Anything the customer needs to *read* belongs in the body. The button shows only its
  label — never the URL.
