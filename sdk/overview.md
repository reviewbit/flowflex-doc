# SDK — overview & install

`@fantacode/flowflex` is the official Node/browser SDK for firing **custom-integration
events** and attaching **private files** to them — without dealing with presigned URLs,
Basic-auth headers, or the multi-step upload dance yourself.

```bash
npm install @fantacode/flowflex
```

Requires **Node 18+** (for the built-in `fetch`) or any modern browser. Use it from a
**server**, not the browser — see [Security](sdk/reference.md#security).

## Quick start

```ts
import { FlowFlex } from "@fantacode/flowflex";

const ff = new FlowFlex({
  apiKey: "cik_xxx",            // from your custom integration
  apiSecret: "cisk_yyy",
  integrationCode: "ic_abc123", // the code in your event URL: /v1/events/<code>
  baseUrl: "https://app.flowflex.com",
});

// Plain event, no file
await ff.sendEvent("order.placed", {
  payload: { name: "Ada", order_id: "ord_42" },
});
```

In the flow builder these land under `trigger` — e.g. `{{trigger.name}}`,
`{{trigger.order_id}}`.

## Constructor options

| Option | Type | Required | Notes |
| --- | --- | --- | --- |
| `apiKey` | string | yes | Custom-integration key (`cik_…`). |
| `apiSecret` | string | yes | Custom-integration secret (`cisk_…`). |
| `integrationCode` | string | yes | The `<code>` in `/v1/events/<code>`. |
| `baseUrl` | string | yes | FlowFlex host. Must be `https` (except `localhost`). A trailing `/api` is stripped. |
| `timeoutMs` | number | no | Per-request timeout. Default `30000`. |
| `maxFileBytes` | number | no | Client-side size cap. Default `26214400` (25 MB). |
| `fetch` | function | no | Custom fetch for runtimes without a global one. |

> **Server-only.** This SDK cannot run in a browser — it throws if constructed in one,
> and browser bundlers resolve it to a stub that throws on import. It uses your
> integration `apiKey`/`apiSecret`, which must never reach client code. See
> [Security](sdk/reference.md#security).

## What you can do

- **[Fire events](sdk/overview.md#quick-start)** — `ff.sendEvent(event, { payload })`.
- **[Attach files](sdk/files.md)** — wrap files in `ff.file(...)` inside the payload.
- **[Handle errors](sdk/reference.md#errors)** — typed `FlowFlexError` subclasses.

## Idempotency

`sendEvent` auto-generates an `idempotencyKey` (UUID) if you don't pass one, so retrying
the same call is safe. Pass your own to dedupe across process restarts:

```ts
await ff.sendEvent("order.placed", {
  payload: { order_id: "ord_42" },
  idempotencyKey: "order_42_placed", // same key = processed once
});
```
