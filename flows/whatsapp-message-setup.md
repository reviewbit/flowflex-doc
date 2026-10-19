# Set up WhatsApp messages

Pick the right message type, send it to the right customer, and decide what happens after it's sent.

These settings are shared by the Text message, Template message, Button message, List message, Media message, Send location, Location request and Link button nodes. Each node's own page covers the rest.

In Rangoli Store's order-tracking flow, the first message is a Button message with **Track order** and **Talk to the team**. Its **Destination number** is **Trigger** → **from**, so it goes to whoever messaged the store, such as Olivia Martin. It waits for a tap, and each button leads to its own path.

## Before you start

Choose the right WhatsApp channel for your flow. For conversations customers start, set up the [campaign](campaigns.md) that uses the flow. Saving or publishing the flow doesn't create that campaign.

Then choose the message type:

| Customer task | Node |
| --- | --- |
| Reply during an active conversation | [Text message](nodes/text-message.md) |
| Send an approved message, including outside the reply window | [Template message](nodes/template-message.md) |
| Offer up to three reply choices | [Button message](nodes/button-message.md) |
| Offer a menu with more choices | [List message](nodes/list-message.md) |
| Send an image, video, audio file or document | [Media message](nodes/media-message.md) |
| Share your store's location | [Send location](nodes/send-location.md) |
| Ask for the customer's location | [Location request](nodes/location-request.md) |
| Open a website or order page | [Link button](nodes/link-button.md) |

## Choose the recipient

1. Open the message node.
2. Click **Destination number** and open **Insert Variable**.
3. Choose the field that holds the recipient's number, including the country code.
4. For **WhatsApp Incoming Chat**, choose **Trigger** → **from** to reply to the sender.
5. For an order event, choose its customer phone field, for example **Trigger** → **customer** → **phone**.

Use a variable for customer-specific messages. A fixed number sends every run to that same number. See [Select and insert variables](using-variables.md).

## Write and preview the content

1. Fill in the node's required fields.
2. Insert the name, order details or other variables where you need them.
3. Check the **Live WhatsApp preview** for the layout, buttons and media.

The preview doesn't confirm delivery. Check that the recipient and the inserted fields will have values when the flow runs.

## Choose whether to wait for a reply

Where the node offers it, turn on **Wait for specific time** if the next step depends on the customer's answer. Set a **Unit** and **Value**, then connect both the reply path and **No response**.

For a quick-reply template, Button message or List message, connect each choice to its own step. A URL button opens a page, and tapping it doesn't count as a quick reply.

See [Wait for and validate a reply](response-wait.md) for the full setup.

## Save and connect

1. Click **Save changes** in the node drawer.
2. Connect every output to another node or to End.
3. Save the flow. **Save and publish** makes the new version live.

## The 24-hour reply window

Free-form text and interactive messages can be sent within the customer service window, generally 24 hours after the customer's latest message. To start or pick up a conversation outside that window, use an approved [Template message](nodes/template-message.md).

A delay can push a later message outside the window, so check the message type after a long wait.

## See also

- [Node reference](nodes.md)
- [Choose files and media](files-and-media.md)
- [A message does not arrive](../help/troubleshooting.md#a-message-does-not-arrive)
