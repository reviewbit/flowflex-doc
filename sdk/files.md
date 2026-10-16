# SDK file attachments

Attach files, such as invoices or product photos, to an event by wrapping them in `ff.file(...)`.

Put an `ff.file(...)` anywhere in the payload. When you send the event, the SDK uploads the file to private storage through a presigned URL and replaces it with an opaque `assetId`. The flow's media node then sends the file on WhatsApp.

When Rangoli Store creates John Smith's invoice for order `RS-1042`, the website sends `invoice.created` with `invoice: ff.file("./invoice.pdf")`. The flow's **Media message** node sends the PDF to John.

<!-- tabs:start -->

#### **JavaScript**

```ts
await ff.sendEvent("invoice.created", {
  payload: {
    invoice: ff.file("./invoice.pdf"),  // ← becomes "asset_…" on the wire
    customer_id: "cust_123",
  },
});
```

#### **Python**

```python
ff.send_event("invoice.created", payload={
    "invoice": ff.file("./invoice.pdf"),  # ← becomes "asset_…" on the wire
    "customer_id": "cust_123",
})
```

<!-- tabs:end -->

Then set up the flow's **Media message** node:

1. Set **File source** to **Uploaded file**.
2. Set **Asset ID** to `{{trigger.invoice}}`.

The key you use in the payload is the key you reference in the flow: send `{ invoice: ff.file(...) }` and reference `{{trigger.invoice}}`.

## Multiple files

Put a `file()` anywhere in the payload: at the top level, nested, or in arrays. The SDK uploads them all in parallel and swaps each for its `assetId`. Reference each one by its path:

<!-- tabs:start -->

#### **JavaScript**

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

#### **Python**

```python
ff.send_event("order.shipped", payload={
    "invoice": ff.file("./invoice.pdf"),                    # {{trigger.invoice}}
    "label":   ff.file("./label.png"),                      # {{trigger.label}}
    "gallery": [ff.file("./a.jpg"), ff.file("./b.jpg")],    # {{trigger.gallery[0]}}, {{trigger.gallery[1]}}
    "order":   {"receipt": ff.file("./receipt.pdf")},       # {{trigger.order.receipt}}
    "note":    "non-file values pass through untouched",
})
```

`result.uploaded_assets` maps each payload path to its assetId, e.g.
`{"invoice": "asset_a", "gallery[0]": "asset_c", "order.receipt": "asset_e"}`.

<!-- tabs:end -->

### Reuse one file across nodes

Pass the same `file()` instance in several places. It's uploaded once, with the same `assetId` everywhere:

<!-- tabs:start -->

#### **JavaScript**

```ts
const banner = ff.file("./banner.png");
await ff.sendEvent("promo.sent", {
  payload: { header: banner, footer: banner }, // one upload, same assetId
});
```

#### **Python**

```python
banner = ff.file("./banner.png")
ff.send_event("promo.sent", payload={
    "header": banner, "footer": banner,  # one upload, same assetId
})
```

<!-- tabs:end -->

## Supplying bytes other ways

`file()` accepts a file path, raw bytes, or a file-like object. When the SDK can't infer the type, pass `filename` and `mime`:

<!-- tabs:start -->

#### **JavaScript**

```ts
ff.file(pdfBuffer, { filename: "invoice.pdf", mime: "application/pdf" });

ff.file(blob, { filename: "invoice.pdf" }); // a Blob or File; a File's name and type are read from it

ff.file("./tmp-7f3a.pdf", { filename: "Invoice-2026.pdf" }); // override stored name
```

Source types: path (string), `Buffer`/`Uint8Array`, or `Blob`/`File`.

#### **Python**

```python
# Raw bytes
ff.file(pdf_bytes, filename="invoice.pdf", mime="application/pdf")

# An open file object
with open("invoice.pdf", "rb") as fh:
    ff.send_event("invoice.created", payload={"invoice": ff.file(fh)})

# Override the stored filename
ff.file("./tmp-7f3a.pdf", filename="Invoice-2026.pdf")
```

Source types: path (`str` or `pathlib.Path`), `bytes`/`bytearray`, or any binary file-like object.

<!-- tabs:end -->

**Allowed types:** PDF, DOC(X), XLS(X), PPT(X), TXT, JPEG, PNG, MP4, 3GPP, AAC, AMR, MP3, OGG. **Maximum size:** 25 MB.

## File lifetime and cleanup

> [!WARNING]
> Read this before using file attachments in production.

Files go to private storage, never to a public URL. They don't last long:

- **Upload URL:** valid for 2 hours from `createUploadUrl` / `create_upload_url`.
- **File:** kept for 48 hours from upload, then deleted.

What this means for you:

- Don't store an `assetId` to reuse later. It expires after 48 hours.
- Give each send a fresh `assetId` with a new `ff.file(...)`. The SDK uploads the file when you call `sendEvent` / `send_event`.
- Sending the event more than 48 hours after the upload fails with `ASSET_FILE_MISSING`. Keep the send close to the upload.

<!-- tabs:start -->

#### **JavaScript**

```ts
// ✅ Upload + send together, always fresh
await ff.sendEvent("invoice.created", {
  payload: { invoice: ff.file("./invoice.pdf") },
});

// ❌ Don't stash an assetId and reuse it hours later: it's gone after 48h
```

#### **Python**

```python
# ✅ Upload + send together, always fresh
ff.send_event("invoice.created", payload={"invoice": ff.file("./invoice.pdf")})

# ❌ Don't store an assetId and reuse it hours later: it's gone after 48h
```

<!-- tabs:end -->

## See also

- [Upload assets](api/assets.md): the endpoints behind `ff.file(...)`.
- [Media message](flows/nodes/media-message.md)
- [SDK reference](sdk/reference.md)
