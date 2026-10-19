---
description: "Authenticate your requests to the FlowFlex API with your custom integration's API key and secret."
---

# REST API authentication

The custom-integration API lets you send events and upload files from any language. Every request uses HTTP Basic auth, with the API key as the username and the API secret as the password. The [SDK](../sdk/overview.md) is a convenience wrapper over the same endpoints and builds the header for you.

For example, when Rangoli Store's website sends `order.placed` for John Smith's order, it signs the request with the key and secret from its `Rangoli Order Events` integration.

## Base URL

```
https://api.flowflex.ai
```

All endpoints are under `/v1`.

## Credentials

You get these from a custom integration. See [Create a custom integration](../developers/quick-start.md#create-a-custom-integration).

| Credential | Looks like | Role |
| --- | --- | --- |
| API key | `cik_…` | Basic-auth username |
| API secret | `cisk_…` | Basic-auth password (shown once) |
| Integration code | `ic_abc123` | Path segment in `/v1/events/<code>` |

## HTTP Basic auth

Authenticate every `/v1` request with an `Authorization: Basic` header, the base64 of `apiKey:apiSecret`. The one exception is the presigned `PUT` that uploads file bytes, which carries its own token.

```
Authorization: Basic base64("cik_xxx:cisk_yyy")
```

With `curl`, `-u` builds the header for you:

```bash
curl -u "cik_xxx:cisk_yyy" https://api.flowflex.ai/v1/...
```

To build it yourself in Node:

```ts
const auth = "Basic " + Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
```

> [!WARNING]
> Always use HTTPS. Basic auth encodes credentials in base64 but doesn't encrypt them, so the connection must use TLS. Only `localhost` should ever use `http`.

## Headers summary

| Header | Required on | Value |
| --- | --- | --- |
| `Authorization` | all `/v1` calls | `Basic base64(apiKey:apiSecret)` |
| `Content-Type` | events, upload-url | `application/json` |
| `x-event` | events | the event name (e.g. `order.placed`) |
| `x-idempotency-key` | events (recommended) | a unique id per logical event |

## Rotate credentials

If a secret leaks, regenerate the integration's credentials:

1. In FlowFlex, open the integration and click **Regenerate**. See [Regenerate credentials](../integrations/custom-integration.md#regenerate-credentials).
2. Copy the new API key and secret. The old pair stops working immediately.
3. Update your environment variables and redeploy.

## See also

- [Send events](events.md)
- [Upload assets](assets.md)
- [Security](../sdk/reference.md#security)
