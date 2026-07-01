# SDK — file attachments

Wrap any file in `ff.file(...)` and drop it into the payload. The SDK uploads it through a
presigned URL and replaces it with an opaque `assetId` before the event is sent. **The
file bytes go straight to storage — they never pass through the FlowFlex app server.**

```ts
await ff.sendEvent("invoice.created", {
  payload: {
    invoice: ff.file("./invoice.pdf"),  // ← becomes "asset_…" on the wire
    customer_id: "cust_123",
  },
});
```

Then in your flow's **Media Message** node:

1. Set **File source** → `Private file (assetId)`
2. Set the **Asset ID** field → `{{trigger.invoice}}`

> The key you use in the payload is the key you reference in the flow. Send
> `{ invoice: ff.file(...) }` → reference `{{trigger.invoice}}`.

## Multiple files

Put a `file()` anywhere in the payload — top-level, nested, or in arrays. The SDK uploads
them **all in parallel** and swaps each for its `assetId`. Reference each by its path:

```ts
await ff.sendEvent("order.shipped", {
  payload: {
    invoice: ff.file("./invoice.pdf"),                 // {{trigger.invoice}}
    label:   ff.file("./label.png"),                   // {{trigger.label}}
    gallery: [ff.file("./a.jpg"), ff.file("./b.jpg")], // {{trigger.gallery[0]}}, {{trigger.gallery[1]}}
    order:   { receipt: ff.file("./receipt.pdf") },    // {{trigger.order.receipt}}
    note:    "non-file values pass through untouched",
  },
});
```

`result.uploadedAssets` maps each payload path to its assetId, e.g.
`{ "invoice": "asset_a", "gallery[0]": "asset_c", "order.receipt": "asset_e" }`.

**Reusing one file across nodes** — pass the *same* `file()` instance in multiple places
and it's uploaded once, same `assetId` everywhere:

```ts
const banner = ff.file("./banner.png");
await ff.sendEvent("promo.sent", {
  payload: { header: banner, footer: banner }, // one upload, same assetId
});
```

## Supplying bytes other ways

`file()` accepts a path (Node), a `Buffer`/`Uint8Array`, or a `Blob`/`File` (browser). When
the type can't be inferred, pass `filename` and `mime`:

```ts
ff.file(pdfBuffer, { filename: "invoice.pdf", mime: "application/pdf" });

const f = document.querySelector("input[type=file]").files[0];
ff.file(f); // name + type read from the File

ff.file("./tmp-7f3a.pdf", { filename: "Invoice-2026.pdf" }); // override stored name
```

**Allowed types:** PDF, DOC(X), XLS(X), PPT(X), TXT, JPEG, PNG, MP4, 3GPP, AAC, AMR, MP3,
OGG. **Max size:** 25 MB.

## File lifetime and cleanup

> Read this before using file attachments in production.

Files go to **private storage** only the FlowFlex backend can read — not a public URL.

| Phase | Duration |
| --- | --- |
| Presigned upload URL valid | **2 hours** from `createUploadUrl` |
| File kept in storage | **48 hours** from upload |
| After 48 hours | File **deleted** + record removed (hourly cleanup job) |

What this means for you:

- **Don't store `assetId` long-term** expecting to reuse it — it expires in 48h.
- **Each send should get a fresh `assetId`** via a new `ff.file(...)`. The SDK handles the
  upload automatically when you call `sendEvent`.
- Firing the event more than 48h after upload fails with `ASSET_FILE_MISSING`. Keep the
  send close to the upload.

```ts
// ✅ Upload + fire together — always fresh
await ff.sendEvent("invoice.created", {
  payload: { invoice: ff.file("./invoice.pdf") },
});

// ❌ Don't stash an assetId and reuse it hours later — it's gone after 48h
```

## How it works under the hood

```
ff.sendEvent("invoice.created", { payload: { invoice: file("invoice.pdf") } })
   ├─ 1. POST /v1/assets/upload-url   → { assetId, uploadUrl }
   ├─ 2. PUT  <uploadUrl>  (bytes straight to private storage)
   └─ 3. POST /v1/events/<code>  with { invoice: "asset_…" }
            └─ flow runs; media node resolves assetId → WhatsApp media at send time
```

The same three steps are documented for raw HTTP in [API → Upload assets](api/assets.md).
