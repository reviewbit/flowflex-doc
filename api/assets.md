---
description: "Upload a file, such as an invoice PDF, so a flow can send it on WhatsApp."
---

# Upload assets

You upload the file to private storage and get back an opaque `assetId`. You then put the `assetId` in your event body, and the flow's media node sends the file when it runs. The upload goes straight to storage through a presigned URL.

When Rangoli Store creates John Smith's invoice, the website uploads `invoice.pdf`, gets an `assetId`, and sends `invoice.created` with that `assetId` and John's phone number. The flow sends the PDF to John.

> [!TIP]
> The [SDK](../sdk/files.md) does all of this for you with `ff.file(...)`. Use these endpoints only if you're not using the SDK.

## How it works

```
1. POST /v1/assets/upload-url   → { assetId, uploadUrl }
2. PUT  <uploadUrl>  (raw bytes, no auth header)
3. POST /v1/events/<code>  with the assetId in your payload
```

## <span class="badge post">POST</span> `/v1/assets/upload-url`

Request a presigned upload URL.

**Headers:** `Authorization: Basic …`, `Content-Type: application/json`

**Body**

```json
{ "filename": "invoice.pdf", "mime": "application/pdf" }
```

**Response**

```json
{ "assetId": "asset_…", "uploadUrl": "https://…signed…" }
```

- `assetId`: the opaque id you reference later, and in the flow as `{{trigger.…}}`.
- `uploadUrl`: a presigned URL, valid for 2 hours.

## <span class="badge put">PUT</span> `<uploadUrl>`

Upload the raw file bytes to the URL from the previous step.

> [!WARNING]
> Don't send an `Authorization` header here. The presigned URL carries its own token, and an auth header breaks the signature.

**Headers:** `Content-Type: <the same mime>`

**Body:** the raw file bytes

## <span class="badge post">POST</span> `/v1/events/{code}` (with the assetId)

Send the `assetId` as a field of the event body. The body is the event data itself; see [Send events](events.md).

```json
{ "invoice": "asset_…", "phone": "919000000001" }
```

In the flow's **Media message** node, set **File source** to **Uploaded file** and **Asset ID** to `{{trigger.invoice}}`.

## Full example (curl)

```bash
# 1. get a presigned URL
RESP=$(curl -s -X POST "https://api.flowflex.ai/v1/assets/upload-url" \
  -u "cik_xxx:cisk_yyy" -H "Content-Type: application/json" \
  -d '{ "filename": "invoice.pdf", "mime": "application/pdf" }')
ASSET_ID=$(echo "$RESP" | jq -r .assetId)
UPLOAD_URL=$(echo "$RESP" | jq -r .uploadUrl)

# 2. upload the bytes (no auth header)
curl -s -X PUT "$UPLOAD_URL" \
  -H "Content-Type: application/pdf" --data-binary @invoice.pdf

# 3. fire the event referencing the assetId
curl -s -X POST "https://api.flowflex.ai/v1/events/ic_abc123" \
  -u "cik_xxx:cisk_yyy" \
  -H "x-event: invoice.created" -H "x-idempotency-key: $(uuidgen)" \
  -H "Content-Type: application/json" \
  -d "{ \"invoice\": \"$ASSET_ID\", \"phone\": \"919000000001\" }"
```

## Limits and lifetime

- **Allowed types:** PDF, DOC(X), XLS(X), PPT(X), TXT, JPEG, PNG, MP4, 3GPP, AAC, AMR, MP3, OGG.
- **Maximum size:** 25 MB.
- **Upload URL:** valid for 2 hours.
- **File:** kept for 48 hours, then deleted.

Because files expire after 48 hours, upload and send the event close together, and upload a fresh file for each send. Don't store an `assetId` to reuse later. If the file has expired, the event is still accepted, but the flow can't attach the file when it sends the message. See [File lifetime and cleanup](../sdk/files.md#file-lifetime-and-cleanup).

## See also

- [Send events](events.md)
- [SDK file attachments](../sdk/files.md)
- [Media message](../flows/nodes/media-message.md)
