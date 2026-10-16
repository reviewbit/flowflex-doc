# Set up WhatsApp messages

Use this guide for the settings shared by Text, Template, Button, List, Media, Send location, Location request, and Link button nodes.

## Before you start

Choose the correct WhatsApp channel for your real flow. For customer-initiated conversations, configure the incoming-message campaign that should use the flow. Saving or publishing the flow alone does not create that campaign.

Choose your message type:

| Customer task | Node |
| --- | --- |
| Reply during an active conversation | [Text message](flows/nodes/text-message.md) |
| Send an approved message, including outside the reply window | [Template message](flows/nodes/template-message.md) |
| Offer up to three reply choices | [Button message](flows/nodes/button-message.md) |
| Offer a menu with more choices | [List message](flows/nodes/list-message.md) |
| Send an image, video, audio file, or document | [Media message](flows/nodes/media-message.md) |
| Share your store's location | [Send location](flows/nodes/send-location.md) |
| Ask for the customer's location | [Location request](flows/nodes/location-request.md) |
| Open a website or order page | [Link button](flows/nodes/link-button.md) |

## Choose the recipient

1. Open the message node.
2. Click **Destination number** and open Insert Variable.
3. Choose the field containing the recipient's number, including the country code.
4. For **WhatsApp Incoming Chat**, choose **Trigger → from** to reply to the sender.
5. For an order event, choose its customer phone field, for example **Trigger → customer → phone**.

Use a variable for customer-specific messages. A fixed number sends every run to that same recipient. Detailed picker instructions are in [Select and insert variables](flows/using-variables.md).

## Write and preview the content

Fill the node's required fields. Insert name, order, or other variables where needed. Review **Live WhatsApp preview** to check the message layout, buttons, and media.

Previewing the message does not confirm delivery. Check that the recipient and inserted fields will be available when the flow runs.

## Choose whether to wait for a reply

Where offered, enable **Wait for specific time** if the next action depends on the customer's answer. Set a Unit and Value, then connect both the reply path and **No response**.

For a quick-reply template, Button message, or List message, connect each choice to the intended action. A URL button opens a page; clicking it does not act as a quick reply.

See [Wait for and validate a reply](flows/response-wait.md) for the full setup.

## Save and connect

Click **Save changes** in the node drawer. Connect every output to another node or End, then save the flow. **Save and publish** makes the new version available for use.

## The 24-hour reply window

Free-form text and interactive messages are used within the customer service window, generally 24 hours after the customer's latest message. If you are starting or resuming a conversation outside that window, use an approved Template message.

A delay can move a later message outside the window. Review the message type after long delays.

If a message cannot be sent, use [WhatsApp and workflow troubleshooting](help/troubleshooting.md).
