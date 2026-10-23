---
description: "Send a WhatsApp template that Meta has approved, filled in with each customer's details."
---

# Template message

## When to use it

Use a template message for order updates, reminders, one-time codes and marketing, and whenever you message a customer outside the 24-hour reply window. When Rangoli Store's order system reports a shipment, the flow sends the `order_shipped_v1` template, so John Smith receives "Hi John, your order ORD-48213 from Rangoli Store has been shipped. It should reach you by 18 Oct."

Create the template in **Templates** and wait for approval first. See [Create a template](../../whatsapp/create-template.md) and [Template guidelines](../../whatsapp/template-guidelines.md).

## Set it up

1. Add **Template message** from **WhatsApp Blocks** and open it. Give it a **Node label**, such as `Shipping update`.
2. In **Destination number**, insert the customer's phone field from the trigger. For a reply to an incoming WhatsApp message, use **Trigger** → **from**.
3. Under **Choose a template**, search for the template and select it, such as `order_shipped_v1` under **Utility**. Only approved templates are listed, under **Marketing**, **Utility** and **Authentication**.
4. Check the body, header, buttons and language are the ones you expect.
5. Fill each placeholder in the body with Insert Variable. `order_shipped_v1` reads `Hi {{1}}, your order {{2}} from Rangoli Store has been shipped. It should reach you by {{3}}.`, so set `{{1}}` to the customer's first name, `{{2}}` to the order number and `{{3}}` to the delivery date. Use fixed text only when everyone should see the same value. See [Fill a template placeholder](../using-variables.md#fill-a-template-placeholder).
6. Fill the header if the template has one (see the table below).
7. Fill any button or code values the drawer shows. For a URL button such as `https://rangoli.example/orders/{{1}}`, enter only the order number; the fixed part of the address comes from the template. For an authentication template, insert the code generated for that customer, never a fixed code.
8. To wait for a reply, turn on waiting and set the time. See [Wait for and validate a reply](../response-wait.md).
9. Check the **Live WhatsApp preview** and click **Save changes**.

| Template header | What to fill in |
| --- | --- |
| Text with a placeholder | The value for the header placeholder. |
| Image, video or document | A file of the same type, from **File source**. See [Choose files and media](../files-and-media.md). |
| Location | The latitude, longitude and other location fields shown. |
| None | Nothing. |

## Connect it

A template with quick-reply buttons has one output per button, named after the button. A template without quick replies has **Next step**. If you turned on waiting, connect **No response** too. URL and phone buttons open a page or start a call, so they don't get their own output.

## See also

- [Create a template](../../whatsapp/create-template.md)
- [Set up WhatsApp messages](../whatsapp-message-setup.md)
- [My template is missing](../../help/troubleshooting.md#why-cant-i-find-my-template)
