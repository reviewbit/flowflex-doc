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

Nodes expose their output to later nodes via the same `{{…}}` syntax. The path starts with
the **node's title** (auto-assigned or renamed on the canvas), then the property:

| Node | Example reference |
| --- | --- |
| **Message reply** (text, template, button, list) | `{{nodeName.response}}` |
| **API node response** | `{{nodeName.data}}` (or a nested path into the JSON body) |
| **Utils function result** | `{{nodeName.result}}` |

Use the **Insert Variable** picker after placing a node — it lists all upstream nodes' available outputs. See [Waiting for a reply](flows/response-wait.md) for more on captured message replies.

## Loop variables

Inside a **For loop** body, two extra variables are available:

| Variable | Value |
| --- | --- |
| `{{loop.item}}` | The current array element (object, string, number — whatever the array contains) |
| `{{loop.index}}` | The current position, starting at 0 |

These are only available **between** a Start loop and End loop node. See [For loop](flows/nodes/for-loop.md).

## JavaScript expressions

Inside `{{…}}` you can write simple JavaScript expressions — the resolver evaluates them
if a plain variable path doesn't match:

```
{{trigger.price * 1.18}}          → price with 18% tax
{{trigger.first_name + " " + trigger.last_name}}  → full name
{{trigger.items.length}}          → array length
```

> Keep expressions simple. Complex logic is better placed in a
> [Condition split](flows/nodes/condition-split.md) or an [API](flows/nodes/api.md) node.

## Files as variables

When you attach a file via the [SDK](sdk/files.md) (or upload one via the
[API](api/assets.md)), the payload key holds an `assetId`. Reference it the same way — e.g.
`{{trigger.invoice}}` — in a **Media Message** node set to **Private file (assetId)**.
