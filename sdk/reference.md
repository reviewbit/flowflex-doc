# SDK — API reference

## Constructor

Creates a client. See [constructor options](sdk/overview.md#constructor-options).

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

Uploads any `file()` found in the payload, then POSTs the event.

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

- `event` — the event name; also sent as the `x-event` header.
- `payload` — arbitrary JSON; becomes `{{trigger.*}}` in the flow. May contain `file()` refs.
- `idempotencyKey` — optional; auto-generated UUID if omitted. Safe to retry.

#### **Python**

### `ff.send_event(event, payload=None, idempotency_key=None)`

Returns a `SendEventResult`:

```python
result.response         # raw body from the events endpoint
result.uploaded_assets  # dict: payload path → assetId
```

- `event` — the event name; also sent as the `x-event` header.
- `payload` — arbitrary dict; becomes `{{trigger.*}}` in the flow. May contain `file()` refs.
- `idempotency_key` — optional; auto-generated UUID if omitted. Safe to retry.

<!-- tabs:end -->

## File helper

Returns a lazy file reference. Bytes are read only when the event is sent.
See [File attachments](sdk/files.md).

<!-- tabs:start -->

#### **JavaScript**

### `ff.file(source, { filename?, mime?, size? })`

`source` is a path, `Buffer`/`Uint8Array`, or `Blob`/`File`.

#### **Python**

### `ff.file(source, filename=None, mime=None, size=None)`

`source` is a path (`str`/`Path`), `bytes`/`bytearray`, or any binary file-like object.

<!-- tabs:end -->

## Lower-level helpers

If you want to manage uploads yourself:

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

These map directly to the [Upload assets](api/assets.md) endpoints.

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

See [API → common error codes](api/events.md#error-codes) for the full list.

## Security

Your `apiKey`/`apiSecret` (`api_key`/`api_secret` in Python) are integration-wide
credentials — anyone who obtains them can fire events and upload files as you. Keep them
in environment variables or a secrets manager, never in source control.

**The JavaScript SDK is server-only.** It is hard-blocked from the browser in two ways:

- **Runtime** — the constructor **always throws** if it detects a browser (no opt-out).
- **Bundle time** — browser bundlers (webpack/Vite/Next) resolve the package to a stub via
  the `"browser"` export condition; that stub **throws on import**, so the SDK can't even be
  built into client code.

Built-in protections (both SDKs):

- **HTTPS enforced** — `baseUrl` / `base_url` must be `https://` (only `localhost` may use
  `http`), so Basic-auth credentials are never sent in cleartext.
- **No credential leakage** — the `Authorization` header is never included in error
  messages, logs, or `FlowFlexError` details.
- **Header-injection safe** — `event` and `idempotencyKey` / `idempotency_key` are rejected
  if they contain control characters (CRLF).
- **Path-injection safe** — `integrationCode` / `integration_code` is URL-encoded into the
  request path.
- **Per-request timeouts** (default 30 s) and a **client-side size cap** (default 25 MB).

If you must call FlowFlex from a browser, proxy through your own backend: the browser talks
to your server, your server holds the secret and calls this SDK.
