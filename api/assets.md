# REST API — upload assets

To send a file (PDF, image, video, document) in a flow, you upload it to **private
storage** and get an opaque `assetId`. You then put that `assetId` in your event payload;
the flow's media node resolves it to a real WhatsApp media at send time. The file bytes go
**straight to storage** via a presigned URL — never through the FlowFlex app server.

> The [SDK](sdk/files.md) does all of this for you with `ff.file(...)`. Use these raw
> endpoints only if you're not using the SDK.

## The three-step flow

```
1. POST /v1/assets/upload-url   → { assetId, uploadUrl }
2. PUT  <uploadUrl>  (raw bytes, no auth header)
3. POST /v1/events/<code>  with the assetId in your payload
```

## <span class="badge post">POST</span> `/v1/assets/upload-url`

Request a presigned upload URL.

**Headers** — `Authorization: Basic …`, `Content-Type: application/json`

**Body**

```json
{ "filename": "invoice.pdf", "mime": "application/pdf" }
```

**Response**

```json
{ "assetId": "asset_…", "uploadUrl": "https://…signed…" }
```

- `assetId` — the opaque id you reference later (and in the flow as `{{trigger.…}}`).
- `uploadUrl` — a presigned URL valid for **2 hours**.

## <span class="badge put">PUT</span> `<uploadUrl>`

Upload the raw file bytes to the URL from step 1.

> **No `Authorization` header here.** The presigned URL carries its own token; adding an
> auth header breaks the signature.

**Headers** — `Content-Type: <the same mime>`
**Body** — the raw file bytes

## <span class="badge post">POST</span> `/v1/events/{code}` (with the assetId)

Reference the `assetId` in your payload where the flow's media node expects it:

```json
{ "payload": { "invoice": "asset_…", "phone": "919999999999" } }
```

In the flow's **Media Message** node: **File source → Private file (assetId)**, and **Asset
ID → `{{trigger.invoice}}`**.

## Full example (curl)

```bash
# 1. get a presigned URL
RESP=$(curl -s -X POST "https://app.flowflex.com/v1/assets/upload-url" \
  -u "cik_xxx:cisk_yyy" -H "Content-Type: application/json" \
  -d '{ "filename": "invoice.pdf", "mime": "application/pdf" }')
ASSET_ID=$(echo "$RESP" | jq -r .assetId)
UPLOAD_URL=$(echo "$RESP" | jq -r .uploadUrl)

# 2. upload the bytes (no auth header)
curl -s -X PUT "$UPLOAD_URL" \
  -H "Content-Type: application/pdf" --data-binary @invoice.pdf

# 3. fire the event referencing the assetId
curl -s -X POST "https://app.flowflex.com/v1/events/ic_abc123" \
  -u "cik_xxx:cisk_yyy" \
  -H "x-event: invoice.created" -H "x-idempotency-key: $(uuidgen)" \
  -H "Content-Type: application/json" \
  -d "{ \"payload\": { \"invoice\": \"$ASSET_ID\", \"phone\": \"919999999999\" } }"
```

## Limits & lifetime

- **Allowed types:** PDF, DOC(X), XLS(X), PPT(X), TXT, JPEG, PNG, MP4, 3GPP, AAC, AMR, MP3,
  OGG.
- **Max size:** 25 MB.
- **Upload URL valid:** 2 hours. **File kept:** 48 hours, then auto-deleted.

Because files expire in 48h, **upload and fire the event close together**, and always
upload fresh for each send — don't stash and reuse an `assetId`. Firing against an expired
asset returns `ASSET_FILE_MISSING`. (More in [SDK → file lifetime](sdk/files.md#file-lifetime-and-cleanup).)
