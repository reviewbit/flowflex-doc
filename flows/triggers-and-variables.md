# Triggers & variables

## The trigger

Every flow begins with a **Trigger** node. It defines which event starts the flow and
makes the event's payload available to all downstream nodes.

For a **custom integration**, the trigger is your event (e.g. `order.placed`). When you
fire it with a payload:

```json
{ "payload": { "name": "Ada", "order_id": "ord_42", "phone": "919999999999" } }
```

…those fields become variables inside the flow.

### Sample payload

When configuring the trigger you provide (or the integration captures) a **sample
payload** — an example of the JSON your event sends. This is what powers the **Insert
Variable** picker: it lists the fields so you can click to insert them instead of typing
the path by hand.

> Keep the sample payload representative of real events — the picker can only offer fields
> it knows about.

## Referencing variables: `{{trigger.*}}`

Reference any payload field with `{{trigger.<path>}}`:

| Payload | Reference |
| --- | --- |
| `{ "name": "Ada" }` | `{{trigger.name}}` |
| `{ "customer": { "email": "a@b.com" } }` | `{{trigger.customer.email}}` |
| `{ "items": ["A", "B"] }` | `{{trigger.items[0]}}` |

Use them anywhere a field accepts text — message bodies, the destination number, headers,
API URLs, condition values, etc.:

```
Hi {{trigger.name}}, your order {{trigger.order_id}} ships to {{trigger.city}}.
```

## The Insert Variable picker

In message bodies and other text fields, click **Insert Variable** to open the **Select
Variable** picker. Pick a field from the trigger payload (or from an earlier node's output)
and it's inserted as a styled chip. Behind the chip is the real `{{…}}` token that resolves
when the flow runs.

This is the recommended way to add variables — it guarantees the path is valid and matches
what the event actually sends.

## Using earlier nodes' output

Nodes can expose values to later nodes — most importantly, a **message reply**. When a
message node has **Wait for specific time** enabled and the customer replies, the reply is
captured and available to downstream nodes (e.g. to branch on, or echo back). See
[Waiting for a reply](flows/response-wait.md).

## Files as variables

When you attach a file via the [SDK](sdk/files.md) (or upload one via the
[API](api/assets.md)), the payload key holds an `assetId`. Reference it the same way — e.g.
`{{trigger.invoice}}` — in a **Media Message** node set to **Private file (assetId)**.

Next: **[Waiting for a reply »](flows/response-wait.md)**
