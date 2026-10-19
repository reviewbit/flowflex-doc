---
description: "Every method, return value and error class in the FlowFlex SDK for JavaScript and Python."
---

# SDK reference

The SDK has one client, a method that sends events, a helper that wraps files, and two lower-level upload helpers. The examples use Rangoli Store's `order.placed` and `invoice.created` events. To get set up, see [Install and use the SDK](overview.md).

## Constructor

Creates a client. See [Constructor options](overview.md#constructor-options).

<!-- tabs:start -->

#### **JavaScript**

```ts
const ff = new FlowFlex({ apiKey, apiSecret, integrationCode, baseUrl });
```

#### **Python**

```python
ff = FlowFlex(api_key=..., api_secret=..., integration_code=..., base_url=...)
```

<!-- tabs:end -->

## Send event

Uploads any `file()` found in the payload, then sends the event.

<!-- tabs:start -->

#### **JavaScript**

### `ff.sendEvent(event, { payload?, idempotencyKey? })`

Returns:

```ts
{
  response: unknown,                       // raw body from the events endpoint
  uploadedAssets: Record<string, string>,  // payload path → assetId
}
```

- `event`: the event name, also sent as the `x-event` header.
- `payload`: any JSON; becomes `{{trigger.*}}` in the flow. May contain `file()` references.
- `idempotencyKey`: optional; a UUID is generated if you omit it. Safe to retry.

#### **Python**

### `ff.send_event(event, payload=None, idempotency_key=None)`

Returns a `SendEventResult`:

```python
result.response         # raw body from the events endpoint
result.uploaded_assets  # dict: payload path → assetId
```

- `event`: the event name, also sent as the `x-event` header.
- `payload`: any dict; becomes `{{trigger.*}}` in the flow. May contain `file()` references.
- `idempotency_key`: optional; a UUID is generated if you omit it. Safe to retry.

<!-- tabs:end -->

## File helper

Returns a lazy file reference. The SDK reads the bytes only when the event is sent. See [SDK file attachments](files.md).

<!-- tabs:start -->

#### **JavaScript**

### `ff.file(source, { filename?, mime?, size? })`

`source` is a path, `Buffer`/`Uint8Array`, or `Blob`/`File`.

#### **Python**

### `ff.file(source, filename=None, mime=None, size=None)`

`source` is a path (`str`/`Path`), `bytes`/`bytearray`, or any binary file-like object.

<!-- tabs:end -->

## Lower-level helpers

Use these if you want to manage uploads yourself:

<!-- tabs:start -->

#### **JavaScript**

```ts
const { assetId, uploadUrl } = await ff.createUploadUrl({ filename, mime });
const assetId = await ff.uploadFile(ff.file("./x.pdf")); // upload, get assetId back
```

#### **Python**

```python
info = ff.create_upload_url(filename="x.pdf", mime="application/pdf")
# → {"assetId": ..., "uploadUrl": ..., "token": ...}

asset_id = ff.upload_file(ff.file("./x.pdf"))  # upload, get assetId
```

<!-- tabs:end -->

These map directly to the [Upload assets](../api/assets.md) endpoints.

## Errors

All errors extend `FlowFlexError`:

| Class | When |
| --- | --- |
| `FlowFlexConfigError` | Bad/missing constructor options. |
| `FlowFlexUploadError` | A file couldn't be read, or storage rejected it. |
| `FlowFlexError` | API or network failure. `code` is the API error code (e.g. `MIME_NOT_ALLOWED`, `ASSET_FILE_MISSING`). |

<!-- tabs:start -->

#### **JavaScript**

```ts
import { FlowFlexError } from "flowflex";

try {
  await ff.sendEvent("invoice.created", {
    payload: { invoice: ff.file("./big.pdf") },
  });
} catch (err) {
  if (err instanceof FlowFlexError) {
    console.error(err.code, err.status, err.message);
  }
}
```

Properties: `message`, `status`, `code`, `details`.

#### **Python**

```python
from flowflex import FlowFlex, FlowFlexError

try:
    ff.send_event("invoice.created", payload={"invoice": ff.file("./big.pdf")})
except FlowFlexError as err:
    print(err.code, err.status, err.message)
```

Properties: `message`, `status`, `code`, `details`.

<!-- tabs:end -->

For the full list of codes, see [Error codes](../api/events.md#error-codes).

## Security

Your `apiKey` and `apiSecret` (`api_key` and `api_secret` in Python) are credentials for the whole integration. Anyone who has them can send events and upload files as you. Keep them in environment variables or a secrets manager, never in source control.

The JavaScript SDK is server-only, and is blocked from the browser in two ways:

- **At runtime:** the constructor always throws if it detects a browser. There's no opt-out.
- **At bundle time:** browser bundlers (webpack, Vite, Next) resolve the package to a stub through the `"browser"` export condition. The stub throws on import, so the SDK can't be built into client code.

Both SDKs also protect you in these ways:

- **HTTPS enforced:** `baseUrl` / `base_url` must start with `https://` (only `localhost` may use `http`), so Basic-auth credentials are never sent in cleartext.
- **No credential leakage:** the `Authorization` header never appears in error messages, logs or `FlowFlexError` details.
- **Header-injection safe:** `event` and `idempotencyKey` / `idempotency_key` are rejected if they contain control characters (CRLF).
- **Path-injection safe:** `integrationCode` / `integration_code` is URL-encoded into the request path.
- **Limits:** per-request timeouts (default 30 s) and a client-side size cap (default 25 MB).

If you need to call FlowFlex from a browser, proxy through your own server: the browser talks to your server, and your server holds the secret and calls the SDK.

## See also

- [Install and use the SDK](overview.md)
- [SDK file attachments](files.md)
- [Send events](../api/events.md)
