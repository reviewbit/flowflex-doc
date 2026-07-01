# REST API — send events

Firing an event is what **starts a flow**. The event name is matched to a flow's trigger,
and the JSON `payload` becomes the flow's `{{trigger.*}}` variables.

## <span class="badge post">POST</span> `/v1/events/{integrationCode}`

Fire a custom-integration event.

**Path**

| Param | Notes |
| --- | --- |
| `integrationCode` | The `ic_…` code from your integration. URL-encode it. |

**Headers**

| Header | Value |
| --- | --- |
| `Authorization` | `Basic base64(apiKey:apiSecret)` — see [Authentication](api/authentication.md) |
| `Content-Type` | `application/json` |
| `x-event` | The event name, e.g. `order.placed` |
| `x-idempotency-key` | A unique id for this logical event (recommended) |

**Body**

```json
{
  "payload": {
    "name": "Ada",
    "order_id": "ord_42",
    "phone": "919999999999"
  }
}
```

Everything under `payload` is arbitrary JSON of your choosing. Each key is referenced in
the flow as `{{trigger.<key>}}` (nested keys with dots, arrays with `[n]`). See
[Triggers & variables](flows/triggers-and-variables.md).

### Example

```bash
curl -X POST "https://app.flowflex.com/v1/events/ic_abc123" \
  -u "cik_xxx:cisk_yyy" \
  -H "x-event: order.placed" \
  -H "x-idempotency-key: 8f3c…-uuid" \
  -H "Content-Type: application/json" \
  -d '{ "payload": { "name": "Ada", "order_id": "ord_42", "phone": "919999999999" } }'
```

```ts
// Node, no SDK
const auth = "Basic " + Buffer.from("cik_xxx:cisk_yyy").toString("base64");
await fetch("https://app.flowflex.com/v1/events/ic_abc123", {
  method: "POST",
  headers: {
    Authorization: auth,
    "Content-Type": "application/json",
    "x-event": "order.placed",
    "x-idempotency-key": crypto.randomUUID(),
  },
  body: JSON.stringify({ payload: { name: "Ada", order_id: "ord_42" } }),
});
```

### Attaching files

To send media, first [upload the file](api/assets.md) to get an `assetId`, then put that
`assetId` string in your payload where the flow's media node expects it. The
[SDK](sdk/files.md) automates this; raw-HTTP callers do the two steps themselves.

## Idempotency

Send a stable `x-idempotency-key` per logical event so retries (timeouts, restarts) don't
fire the flow twice. The same key is treated as the same event. If you omit it, generate a
UUID per attempt.

## Error codes

Errors come back as JSON with a `code`. Common ones:

| `code` | Meaning |
| --- | --- |
| `MIME_NOT_ALLOWED` | Uploaded file type isn't in the allowed list. |
| `ASSET_FILE_MISSING` | Referenced `assetId` expired (>48h) or was never uploaded. |
| `UNAUTHORIZED` / `401` | Bad or missing Basic-auth credentials. |
| `NOT_FOUND` / `404` | Unknown `integrationCode`. |

> 401/404/422-class responses mean the call won't succeed on retry — fix the request.
> 5xx/network errors are safe to retry with the same idempotency key.
