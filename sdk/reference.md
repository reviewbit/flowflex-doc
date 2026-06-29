# SDK — API reference

## `new FlowFlex(options)`

Creates a client. See [constructor options](sdk/overview.md#constructor-options).

```ts
const ff = new FlowFlex({ apiKey, apiSecret, integrationCode, baseUrl });
```

## `ff.sendEvent(event, { payload?, idempotencyKey? })`

Uploads any `file()` found in `payload`, then POSTs the event. Returns:

```ts
{
  response: unknown,                       // raw body from the events endpoint
  uploadedAssets: Record<string, string>,  // payload path → assetId
}
```

- `event` — the event name; also sent as the `x-event` header.
- `payload` — arbitrary JSON; becomes `{{trigger.*}}` in the flow. May contain `file()` refs.
- `idempotencyKey` — optional; auto-generated UUID if omitted. Safe to retry.

## `ff.file(source, { filename?, mime?, size? })`

Returns a lazy `FileRef`. Bytes are read only when the event is sent. `source` is a path,
`Buffer`/`Uint8Array`, or `Blob`/`File`. See [File attachments](sdk/files.md).

## Lower-level helpers

If you want to manage uploads yourself:

```ts
const { assetId, uploadUrl } = await ff.createUploadUrl({ filename, mime });
const assetId = await ff.uploadFile(ff.file("./x.pdf")); // upload, get assetId back
```

These map directly to the [Upload assets](api/assets.md) endpoints.

## Errors

All errors extend `FlowFlexError` (`{ message, status?, code?, details? }`):

| Class | When |
| --- | --- |
| `FlowFlexConfigError` | Bad/missing constructor options. |
| `FlowFlexUploadError` | A file couldn't be read, or storage rejected it. |
| `FlowFlexError` | API or network failure. `code` is the backend error code (e.g. `MIME_NOT_ALLOWED`, `ASSET_FILE_MISSING`). |

```ts
import { FlowFlexError } from "@fantacode/flowflex";

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

See [API → common error codes](api/events.md#error-codes) for the full list.

## Security

**This SDK is server-only.** Your `apiKey`/`apiSecret` are integration-wide credentials;
bundling them into front-end code exposes them to anyone who opens devtools. The SDK is
hard-blocked from the browser in two ways:

- **Runtime** — the constructor **always throws** if it detects a browser (no opt-out).
- **Bundle time** — browser bundlers (webpack/Vite/Next) resolve the package to a stub via
  the `"browser"` export condition; that stub **throws on import**, so the SDK can't even be
  built into client code.

Built-in protections:

- **HTTPS enforced** — `baseUrl` must be `https://` (only `localhost` may use `http`), so
  Basic-auth credentials are never sent in cleartext.
- **No credential leakage** — the `Authorization` header is never included in error
  messages, logs, or `FlowFlexError.details`.
- **Header-injection safe** — `event` and `idempotencyKey` are rejected if they contain
  control characters (CRLF).
- **Path-injection safe** — `integrationCode` is URL-encoded into the request path.
- **Prototype-pollution safe** — payload keys like `__proto__` can't pollute
  `Object.prototype` during the file-swap walk.
- **Per-request timeouts** (default 30 s) and a **client-side size cap** (default 25 MB).

If you must call FlowFlex from a browser, proxy through your own backend: the browser talks
to your server, your server holds the secret and calls this SDK.
