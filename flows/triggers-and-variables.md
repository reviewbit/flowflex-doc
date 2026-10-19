---
description: "Decide what starts your flow, such as a customer's WhatsApp message or a new order in a connected app."
---

# Choose the trigger

The **Trigger** is the first node in every flow, and each flow has exactly one. Besides starting the flow, it supplies the event's information, such as the sender's number or the order details, for later steps to use.

Rangoli Store's order-tracking flow uses **WhatsApp Incoming Chat**, so it starts when a customer messages the store. The store's order confirmation flow starts from a different event: a new order in its connected shop. That event brings the customer's phone number and the order items with it.

## Choose an event

1. Open **Trigger** on the canvas.
2. Choose the source: a connected app, Custom, WhatsApp, or FlowFlex.
3. Select the event you want.
4. Review the event's example information, then save the trigger.
5. Connect Trigger's **Next step** to your first action.

Pick an event that matches the job. An order event suits an order confirmation, and **WhatsApp Incoming Chat** suits a reply to a customer.

## WhatsApp Incoming Chat

Select **WhatsApp Incoming Chat** from the event list. To reply to the customer, use **Trigger** → **from** as the **Destination number**. Use **Trigger** → **name** in a greeting, and **Trigger** → **text** to check what the customer wrote.

A real flow starts from incoming messages only once its channel is set and its [campaign](campaigns.md) is published. Practice in Learn flow builder uses sample data and doesn't start a campaign.

## Connected app events

Choose the connected app and the event. What information you get depends on the event: an order event may include a customer object and an item list, while another event has a different structure.

Open [Insert Variable](using-variables.md) to see the fields the event really has, rather than copying paths from another event.

## Custom events and sample JSON

For a custom event, give a sample of the data your system sends. Include every field you want the flow to use, such as name, phone, order number and items.

```json
{
  "customer": { "name": "John Smith", "phone": "919000000001" },
  "order": { "number": "ORD-1042", "total": 1250 },
  "items": [{ "name": "Silk saree", "quantity": 2 }]
}
```

The sample only describes the fields. Each real event brings its own values. With this sample, choose **Trigger** → **customer** → **phone** for **Destination number**.

To send custom events from your system, see [SDK setup](../sdk/overview.md) or [Send events](../api/events.md).

## See also

- [Select and insert variables](using-variables.md)
- [Build your first flow](building-a-flow.md)
- [The flow does not start](../help/troubleshooting.md#the-flow-does-not-start)
