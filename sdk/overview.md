# SDK — overview & install

`flowflex` is the official SDK for firing **custom-integration events** and
attaching **private files** to them — without dealing with presigned URLs,
Basic-auth headers, or the multi-step upload dance yourself.

Available for **JavaScript/TypeScript** and **Python**.

<!-- tabs:start -->

#### **JavaScript**

```bash
npm install flowflex
```

Requires **Node 18+** (for the built-in `fetch`) or any modern browser. Use it from a
**server**, not the browser — see [Security](sdk/reference.md#security).

#### **Python**

```bash
pip install flowflex
```

Requires **Python 3.9+**. Uses `requests` under the hood.

<!-- tabs:end -->

## Quick start

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
  payload: { name: "Ada", order_id: "ord_42" },
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
ff.send_event("order.placed", payload={"name": "Ada", "order_id": "ord_42"})
```

<!-- tabs:end -->

In the flow builder these land under `trigger` — e.g. `{{trigger.name}}`,
`{{trigger.order_id}}`.

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

> **Server-only.** This SDK cannot run in a browser — it throws if constructed in one,
> and browser bundlers resolve it to a stub that throws on import. It uses your
> integration `apiKey`/`apiSecret`, which must never reach client code. See
> [Security](sdk/reference.md#security).

#### **Python**

| Option | Type | Required | Notes |
| --- | --- | --- | --- |
| `api_key` | str | yes | Custom-integration key (`cik_…`). |
| `api_secret` | str | yes | Custom-integration secret. |
| `integration_code` | str | yes | The `<code>` in `/v1/events/<code>`. |
| `base_url` | str | yes | FlowFlex host. Must be `https` (except `localhost`). |
| `timeout_seconds` | float | no | Per-request timeout. Default `30.0`. |
| `max_file_bytes` | int | no | Client-side size cap. Default `26214400` (25 MB). |
| `session` | requests.Session | no | Custom session for connection pooling / proxies. |

<!-- tabs:end -->

## What you can do

- **[Fire events](sdk/overview.md#quick-start)** — `sendEvent` / `send_event`.
- **[Attach files](sdk/files.md)** — wrap files in `ff.file(...)` inside the payload.
- **[Handle errors](sdk/reference.md#errors)** — typed `FlowFlexError` subclasses.

## Idempotency

`sendEvent` / `send_event` auto-generates an `idempotencyKey` (UUID) if you don't pass
one, so retrying the same call is safe. Pass your own to dedupe across process restarts:

<!-- tabs:start -->

#### **JavaScript**

```ts
await ff.sendEvent("order.placed", {
  payload: { order_id: "ord_42" },
  idempotencyKey: "order_42_placed", // same key = processed once
});
```

#### **Python**

```python
ff.send_event("order.placed",
    payload={"order_id": "ord_42"},
    idempotency_key="order_42_placed",  # same key = processed once
)
```

<!-- tabs:end -->
