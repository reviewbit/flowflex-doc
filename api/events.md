---
description: "Send an event to start every flow that uses it as its trigger."
---

# Send events

Send an event to FlowFlex to start the flows that use it as their trigger.

An event has a name and a body. FlowFlex matches the name, sent by default in the `x-event` header, to your integration's events, and the body becomes the flow's `{{trigger.*}}` variables.

When John Smith places order `RS-1042`, Rangoli Store's website sends `order.placed` with John's name, order number and phone number. The confirmation flow reads them as `{{trigger.name}}`, `{{trigger.order_id}}` and `{{trigger.phone}}`.

## <span class="badge post">POST</span> `/v1/events/{integrationCode}`

Send a custom-integration event. These defaults always work, whatever the integration's **Options** tab says.

**Path**

| Param | Notes |
| --- | --- |
| `integrationCode` | The `ic_…` code, the last part of your integration's Webhook URL. URL-encode it. |

**Headers**

| Header | Value |
| --- | --- |
| `Authorization` | `Basic base64(apiKey:apiSecret)`. See [Authentication](authentication.md). |
| `Content-Type` | `application/json` |
| `x-event` | The event value, e.g. `order.placed` |
| `x-idempotency-key` | Optional. A unique id for this logical event (recommended) |

**Body**

The body is the event data. Send the fields directly; don't wrap them in another object.

```json
{
  "name": "John Smith",
  "order_id": "RS-1042",
  "phone": "919000000001"
}
```

The body is any JSON object you choose. The flow references each key as `{{trigger.<key>}}`, nested keys with dots and array items with `[n]`. See [Choose the trigger](../flows/triggers-and-variables.md).

### Example

```bash
curl -X POST "https://api.flowflex.ai/v1/events/ic_abc123" \
  -u "cik_xxx:cisk_yyy" \
  -H "x-event: order.placed" \
  -H "x-idempotency-key: order_RS-1042_placed" \
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

### Response

A `200` response means FlowFlex accepted the event:

```json
{ "ok": true, "id": "…", "idempotent": false }
```

| Field | Meaning |
| --- | --- |
| `ok` | `true` when the event was accepted. |
| `id` | An id for the accepted event. |
| `idempotent` | `true` when a request with the same idempotency key was already processed, so the flows don't run again. |

## Other ways to send the secret and event

Some tools can't set custom headers, or accept only a callback URL. For them, choose on the integration's **Options** tab where FlowFlex reads the secret, the event name and the idempotency key. See [Inbound request](../integrations/custom-integration.md#inbound-request).

**Secret**

| Option | Request |
| --- | --- |
| Basic Auth (default) | `Authorization: Basic base64(apiKey:apiSecret)` |
| URL path | `POST /v1/events/{integrationCode}/{secret}` |
| Header | A header you name, e.g. `x-webhook-secret: cisk_yyy` |
| Query parameter | A parameter you name, e.g. `POST /v1/events/ic_abc123?token=cisk_yyy` |
| Body field | A field you name, e.g. `{ "secret": "cisk_yyy", … }` |

A secret field accepts the API secret (`cisk_…`) or `base64(apiKey:apiSecret)`, the same value as the Basic Auth header.

**Event name and idempotency key**

Each can come from a header (defaults `x-event` and `x-idempotency-key`), a body field or a query parameter. Nested body fields use dots in the setting, such as `payload.id`.

**Body format**

Send JSON (`application/json`) or form data (`application/x-www-form-urlencoded`). In form data, nested fields use brackets: `payload[id]=RS-1042` arrives as `{ "payload": { "id": "RS-1042" } }`.

For example, a tool that posts form data to a callback URL, with the secret in the path and the event name in a body field set to `eventType`:

```bash
curl -X POST "https://api.flowflex.ai/v1/events/ic_abc123/cisk_yyy" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "eventType=order.placed&order_id=RS-1042&customer[name]=John%20Smith"
```

> [!WARNING]
> When the secret is part of the URL, anyone with the URL can send events. Share it only with the sender, and regenerate the credentials if it leaks. The URL changes when you regenerate.

### Attaching files

To send media:

1. [Upload the file](assets.md) to get an `assetId`.
2. Put that `assetId` string in the request body, under the key the flow's media node uses.

The [SDK](../sdk/files.md) does both steps for you.

## Idempotency

Send a stable idempotency key for each logical event, so retries after a timeout or restart don't run the flow twice. Requests with the same key count as the same event. If you don't have a stable key, generate a UUID for each attempt.

For example, use `order_RS-1042_placed` for John Smith's order: if the website retries the request, the confirmation still goes out once, and the retry's response has `"idempotent": true`.

## Error codes

Errors come back as JSON with an `error` message:

```json
{ "error": "Invalid API secret" }
```

| Status | `error` | What to do |
| --- | --- | --- |
| `400` | `Invalid JSON body` | Fix the JSON, or send form data with the right `Content-Type`. |
| `400` | `Missing event (expected in header "x-event")` | Send the event name where the integration expects it. The message names the place. |
| `400` | `Missing raw body` | Send a request body. |
| `401` | `Missing API credentials` | Send the API key and secret, or the secret where the integration expects it. |
| `401` | `Missing API secret` | Send the secret. |
| `401` | `Invalid API key` | Check the API key, or regenerate the credentials. |
| `401` | `Invalid API secret` | Check the secret, or regenerate the credentials. |
| `401` | `Integration code mismatch` | The code in the URL doesn't belong to these credentials. Use the integration's own Webhook URL. |
| `422` | `Unknown event "…" for this integration` | Send one of the integration's event values, or add the event to the integration. |
| `422` | `Ambiguous event: …` | The request matches more than one event. Check the events that use different request fields. |
| `500` | `Internal auth error` | Retry with the same idempotency key. |

> [!TIP]
> 400, 401 and 422 responses won't succeed on retry, so fix the request first. 5xx and network errors are safe to retry with the same idempotency key.

For upload errors such as `MIME_NOT_ALLOWED`, see [Upload assets](assets.md).

## See also

- [REST API authentication](authentication.md)
- [Upload assets](assets.md)
- [SDK errors](../sdk/reference.md#errors)
