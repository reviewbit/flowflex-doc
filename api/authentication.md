# REST API — authentication

The custom-integration API lets you fire events and upload files from **any language** —
the [SDK](sdk/overview.md) is just a convenience wrapper over these endpoints.

## Base URL

```
https://app.flowflex.com
```

Use your own FlowFlex host if self-hosted. All endpoints below are under `/v1`.

## Credentials

From a **Custom Integration** (see [Quick start](getting-started.md#1-create-a-custom-integration)):

| Credential | Looks like | Role |
| --- | --- | --- |
| API key | `cik_…` | Basic-auth username |
| API secret | `cisk_…` | Basic-auth password (shown once) |
| Integration code | `ic_abc123` | Path segment in `/v1/events/<code>` |

## HTTP Basic auth

Authenticate every `/v1` request (except the presigned `PUT` to storage) with an
`Authorization: Basic` header — base64 of `apiKey:apiSecret`:

```
Authorization: Basic base64("cik_xxx:cisk_yyy")
```

With `curl`, `-u` builds the header for you:

```bash
curl -u "cik_xxx:cisk_yyy" https://app.flowflex.com/v1/...
```

Manually in Node:

```ts
const auth = "Basic " + Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
```

> **Always over HTTPS.** Basic auth sends credentials base64-encoded (not encrypted), so
> the connection must be TLS. Only `localhost` should ever use `http`.

## Headers summary

| Header | Required on | Value |
| --- | --- | --- |
| `Authorization` | all `/v1` calls | `Basic base64(apiKey:apiSecret)` |
| `Content-Type` | events, upload-url | `application/json` |
| `x-event` | events | the event name (e.g. `order.placed`) |
| `x-idempotency-key` | events (recommended) | a unique id per logical event |

## Rotating credentials

If a secret leaks, **rotate** the integration in the dashboard. This issues a new
`apiKey` + `apiSecret` and invalidates the old pair. Update your environment variables and
redeploy.

Next: **[Send events »](api/events.md)**
