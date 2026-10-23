---
description: "Authenticate your requests to the FlowFlex API with your custom integration's API key and secret."
---

# REST API authentication

Authenticate your requests to the FlowFlex API with your custom integration's API key and secret.

The custom-integration API lets you send events and upload files from any language. By default every request uses HTTP Basic Auth, with the API key as the username and the API secret as the password. Basic Auth always works. For tools that can't set headers, the events endpoint can also read the secret from the URL, a header, a query parameter or a body field. The [SDK](../sdk/overview.md) is a convenience wrapper over the same endpoints and builds the header for you.

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
| API key | `cik_…` | Basic Auth username |
| API secret | `cisk_…` | Basic Auth password, or the value of a secret field (shown once) |
| Integration code | `ic_abc123` | Path segment in `/v1/events/<code>` |

## HTTP Basic Auth

Authenticate `/v1` requests with an `Authorization: Basic` header, the base64 of `apiKey:apiSecret`. The one exception is the presigned `PUT` that uploads file bytes, which carries its own token.

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
> Always use HTTPS. Basic Auth encodes credentials in base64 but doesn't encrypt them, so the connection must use TLS. Only `localhost` should ever use `http`.

## Other places for the secret (events only)

On the integration's **Options** tab, you can choose where the events endpoint reads the secret instead:

- **Secret in the URL path:** `POST /v1/events/<code>/<secret>`. For tools that only accept a callback URL.
- **Secret in a header:** a header you name, such as `x-webhook-secret`.
- **Secret in a query parameter:** a parameter you name, such as `?token=<secret>`.
- **Secret in a body field:** a JSON or form field you name, such as `secret`.

Each of these fields accepts the API secret (`cisk_…`) or `base64(apiKey:apiSecret)`. Basic Auth keeps working alongside them. File uploads always use Basic Auth. See [Other ways to send the secret and event](events.md#other-ways-to-send-the-secret-and-event).

## Headers summary

| Header | Required on | Value |
| --- | --- | --- |
| `Authorization` | uploads; events unless the secret is sent elsewhere | `Basic base64(apiKey:apiSecret)` |
| `Content-Type` | events, upload-url | `application/json` |
| `x-event` | events (default event field) | the event value (e.g. `order.placed`) |
| `x-idempotency-key` | events (recommended) | a unique id per logical event |

## Rotate credentials

If a secret leaks, regenerate the integration's credentials:

1. In FlowFlex, open the integration and click **Regenerate**. See [Regenerate credentials](../integrations/custom-integration.md#regenerate-credentials).
2. Copy the new API key and secret. The old pair stops working immediately. If the secret is part of the URL, the URL changes too.
3. Update your environment variables and redeploy.

## See also

- [Send events](events.md)
- [Upload assets](assets.md)
- [Security](../sdk/reference.md#security)
