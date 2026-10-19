---
description: "Send an event to start every flow that uses it as its trigger."
---

# Send events

An event has a name and a JSON body. FlowFlex matches the name, sent in the `x-event` header, to the flows triggered by that event, and the body becomes the flow's `{{trigger.*}}` variables.

When John Smith places order `RS-1042`, Rangoli Store's website sends `order.placed` with John's name, order number and phone number. The confirmation flow reads them as `{{trigger.name}}`, `{{trigger.order_id}}` and `{{trigger.phone}}`.

## <span class="badge post">POST</span> `/v1/events/{integrationCode}`

Send a custom-integration event.

**Path**

| Param | Notes |
| --- | --- |
| `integrationCode` | The `ic_…` code from your integration. URL-encode it. |

**Headers**

| Header | Value |
| --- | --- |
| `Authorization` | `Basic base64(apiKey:apiSecret)`. See [Authentication](authentication.md). |
| `Content-Type` | `application/json` |
| `x-event` | The event name, e.g. `order.placed` |
| `x-idempotency-key` | A unique id for this logical event (recommended) |

**Body**

The body is the event data. Send the fields directly; don't wrap them in another object.

```json
{
  "name": "John Smith",
  "order_id": "RS-1042",
  "phone": "919000000001"
}
```

The body is any JSON you choose. The flow references each key as `{{trigger.<key>}}`, nested keys with dots and array items with `[n]`. See [Choose the trigger](../flows/triggers-and-variables.md).

### Example

```bash
curl -X POST "https://api.flowflex.ai/v1/events/ic_abc123" \
  -u "cik_xxx:cisk_yyy" \
  -H "x-event: order.placed" \
  -H "x-idempotency-key: 8f3c…-uuid" \
  -H "Content-Type: application/json" \
  -d '{ "name": "John Smith", "order_id": "RS-1042", "phone": "919000000001" }'
```

```ts
// Node, no SDK
const auth = "Basic " + Buffer.from("cik_xxx:cisk_yyy").toString("base64");
await fetch("https://api.flowflex.ai/v1/events/ic_abc123", {
  method: "POST",
  headers: {
    Authorization: auth,
    "Content-Type": "application/json",
    "x-event": "order.placed",
    "x-idempotency-key": crypto.randomUUID(),
  },
  body: JSON.stringify({ name: "John Smith", order_id: "RS-1042" }),
});
```

### Attaching files

To send media:

1. [Upload the file](assets.md) to get an `assetId`.
2. Put that `assetId` string in the request body, under the key the flow's media node uses.

The [SDK](../sdk/files.md) does both steps for you.

## Idempotency

Send a stable `x-idempotency-key` for each logical event, so retries after a timeout or restart don't run the flow twice. Requests with the same key count as the same event. If you don't have a stable key, generate a UUID for each attempt.

For example, use `order_RS-1042_placed` for John Smith's order: if the website retries the request, the confirmation still goes out once.

## Error codes

Errors come back as JSON with a `code`. Common ones:

| `code` | Meaning |
| --- | --- |
| `MIME_NOT_ALLOWED` | Uploaded file type isn't in the allowed list. |
| `ASSET_FILE_MISSING` | Referenced `assetId` expired (>48h) or was never uploaded. |
| `UNAUTHORIZED` / `401` | Bad or missing Basic-auth credentials. |
| `NOT_FOUND` / `404` | Unknown `integrationCode`. |

> [!TIP]
> 401, 404 and 422-class responses won't succeed on retry, so fix the request first. 5xx and network errors are safe to retry with the same idempotency key.

## See also

- [REST API authentication](authentication.md)
- [Upload assets](assets.md)
- [SDK errors](../sdk/reference.md#errors)
