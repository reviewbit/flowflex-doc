# Install and use the SDK

Send custom-integration events, with files attached, from JavaScript, TypeScript or Python.

`flowflex` is the official SDK for the custom-integration API. It builds the Basic-auth header, uploads any files in your payload through presigned URLs, and sends the event, so you make one call instead of several. It's available for JavaScript/TypeScript and Python.

Rangoli Store's website uses the SDK to send `order.placed` when John Smith places order `RS-1042`. The confirmation flow reads the values as `{{trigger.name}}` and `{{trigger.order_id}}`.

## Install

<!-- tabs:start -->

#### **JavaScript**

```bash
npm install flowflex
```

Requires Node 18 or later, for the built-in `fetch`. Run it on a server, not in the browser. See [Security](sdk/reference.md?id=security).

#### **Python**

```bash
pip install flowflex
```

Requires Python 3.9 or later. It uses `requests` under the hood.

<!-- tabs:end -->

## Quick start

1. Create a custom integration and copy its API key, API secret and integration code. See [Custom integrations](integrations/custom-integration.md).
2. Create a client with those values.
3. Call `sendEvent` (JavaScript) or `send_event` (Python) with the event name and its data.

<!-- tabs:start -->

#### **JavaScript**

```ts
import { FlowFlex } from "flowflex";

const ff = new FlowFlex({
  apiKey: "cik_xxx",            // from your custom integration
  apiSecret: "cisk_yyy",
  integrationCode: "ic_abc123", // the code in your event URL: /v1/events/<code>
  baseUrl: "https://api.flowflex.ai",
});

// Plain event, no file
await ff.sendEvent("order.placed", {
  payload: { name: "John Smith", order_id: "RS-1042" },
});
```

#### **Python**

```python
from flowflex import FlowFlex

ff = FlowFlex(
    api_key="cik_xxx",            # from your custom integration
    api_secret="cisk_yyy",
    integration_code="ic_abc123", # the code in your event URL: /v1/events/<code>
    base_url="https://api.flowflex.ai",
)

# Plain event, no file
ff.send_event("order.placed", payload={"name": "John Smith", "order_id": "RS-1042"})
```

<!-- tabs:end -->

In the flow builder, the payload fields appear under `trigger`, for example `{{trigger.name}}` and `{{trigger.order_id}}`.

## Constructor options

<!-- tabs:start -->

#### **JavaScript**

| Option | Type | Required | Notes |
| --- | --- | --- | --- |
| `apiKey` | string | yes | Custom-integration key (`cik_…`). |
| `apiSecret` | string | yes | Custom-integration secret (`cisk_…`). |
| `integrationCode` | string | yes | The `<code>` in `/v1/events/<code>`. |
| `baseUrl` | string | yes | FlowFlex host. Must be `https` (except `localhost`). |
| `timeoutMs` | number | no | Per-request timeout. Default `30000`. |
| `maxFileBytes` | number | no | Client-side size cap. Default `26214400` (25 MB). |
| `fetch` | function | no | Custom fetch for runtimes without a global one. |

> [!WARNING]
> The JavaScript SDK is server-only. It throws if constructed in a browser, and browser bundlers resolve it to a stub that throws on import. It uses your integration's `apiKey` and `apiSecret`, which must never reach client code. See [Security](sdk/reference.md?id=security).

#### **Python**

| Option | Type | Required | Notes |
| --- | --- | --- | --- |
| `api_key` | str | yes | Custom-integration key (`cik_…`). |
| `api_secret` | str | yes | Custom-integration secret. |
| `integration_code` | str | yes | The `<code>` in `/v1/events/<code>`. |
| `base_url` | str | yes | FlowFlex host. Must be `https` (except `localhost`). |
| `timeout_seconds` | float | no | Per-request timeout. Default `30.0`. |
| `max_file_bytes` | int | no | Client-side size cap. Default `26214400` (25 MB). |
| `session` | requests.Session | no | Custom session for connection pooling or proxies. |

<!-- tabs:end -->

## What you can do

- **Send events:** `sendEvent` / `send_event`. See [Quick start](sdk/overview.md?id=quick-start).
- **Attach files:** wrap files in `ff.file(...)` inside the payload. See [SDK file attachments](sdk/files.md).
- **Handle errors:** catch the typed `FlowFlexError` subclasses. See [Errors](sdk/reference.md?id=errors).

## Idempotency

`sendEvent` / `send_event` generates an idempotency key (a UUID) if you don't pass one, so retrying the same call is safe. Pass your own key to avoid duplicates across process restarts. With the key below, John Smith gets one confirmation for order `RS-1042` even if the website retries the call.

<!-- tabs:start -->

#### **JavaScript**

```ts
await ff.sendEvent("order.placed", {
  payload: { order_id: "RS-1042" },
  idempotencyKey: "order_RS-1042_placed", // same key = processed once
});
```

#### **Python**

```python
ff.send_event("order.placed",
    payload={"order_id": "RS-1042"},
    idempotency_key="order_RS-1042_placed",  # same key = processed once
)
```

<!-- tabs:end -->

## See also

- [SDK reference](sdk/reference.md)
- [SDK file attachments](sdk/files.md)
- [Developer quick start](developers/quick-start.md)
