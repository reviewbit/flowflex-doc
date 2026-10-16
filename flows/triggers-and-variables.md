# Choose the trigger

Trigger decides what starts your flow and supplies information for its later steps. Every flow has one Trigger.

## Choose an event

1. Open Trigger on the canvas.
2. Choose the appropriate source: a connected app, Custom, WhatsApp, or FlowFlex.
3. Select the available event you want to use.
4. Review its example information, then save the trigger.
5. Connect Trigger's **Next step** to your first action.

Choose an event that matches the task. For example, an order event can start an order confirmation; WhatsApp Incoming Chat can start a reply to a customer.

## WhatsApp Incoming Chat

Select **WhatsApp Incoming Chat** from the available event list. For a message reply, use **Trigger → from** as Destination number. Use **Trigger → name** for a greeting and **Trigger → text** when checking the message.

Configure the real flow's channel and incoming-message campaign before expecting messages to start it. Practice in Learn flow builder uses fictional information and does not activate a campaign.

## Connected app events

Choose the connected app and event. The information available depends on that event. An order event may contain a customer object and item list; another event may have a different structure.

Open [Insert Variable](flows/using-variables.md) to explore the actual available fields rather than copying paths from another event.

## Custom events and sample JSON

For a custom event, provide a representative sample of the data your integration sends. Include the fields you want customers' flows to use, such as name, phone, order number, and items.

```json
{
  "customer": { "name": "Alex", "phone": "919000000001" },
  "order": { "number": "ORD-1042", "total": 1250 },
  "items": [{ "name": "Notebook", "quantity": 2 }]
}
```

A sample describes the available fields; each event must supply its own real values. If the sample has `customer.phone`, choose Trigger → customer → phone for Destination number.

For sending custom events from your system, see [SDK setup](sdk/overview.md) or [Send events](api/events.md).

## Next steps

- [Select and insert variables](flows/using-variables.md): choose nested JSON fields and earlier-node results.
- [Build a flow](flows/building-a-flow.md): add and connect your first message.
- [Troubleshooting](help/troubleshooting.md#the-flow-does-not-start): check a flow that does not start.
