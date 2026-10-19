# Choose files and media

Attach a file to a Media message, a template header or a message header, either the same file for everyone or one for each customer.

Where a node needs a file, you choose a **File source**. The source decides whether every customer gets the same file or the flow picks one per customer:

- **Upload new file:** the same file for every customer, such as a brochure or a store photo. You upload it from your computer.
- **Public URL:** a file at a direct link. Paste the link, or insert the variable that holds it.
- **Uploaded file:** a different private file for each customer, such as an invoice. In **Asset ID**, insert the assetId your integration supplies.

Rangoli Store's order-tracking flow sends each customer's own invoice. The store's system uploads the invoice and passes its assetId in the order event. When David Chen taps **Track order**, the flow sends the status with David Chen's invoice attached.

## Upload one reusable file

1. Choose the media type.
2. Set **File source** to **Upload new file**.
3. Choose the file from your computer.
4. Wait for the upload to finish and check the preview.
5. Save the node.

The node attaches this file every time it runs, and the file stays available while the flow uses it.

## Use a link

1. Set **File source** to **Public URL**.
2. Enter a direct link to the file. If each customer has a different link, use [Insert Variable](using-variables.md) to select it.
3. Open the link in a browser without signing in, to check that WhatsApp can download it.
4. Save the node.

A link to a sign-in page or a sharing page isn't a direct file link, and the file won't send.

## Use a private customer file

1. Make sure your integration uploads the file and includes its assetId in the event that starts the flow. See [SDK file attachments](../sdk/files.md).
2. Set **File source** to **Uploaded file**.
3. In **Asset ID**, insert that assetId field, for example **Trigger** → **invoice**.
4. Save the node.

Files uploaded this way expire after 48 hours, so keep the upload and the message close together. After a long delay, upload the file again.

The download link of a file a customer sends you is temporary too. Don't rely on a saved link still working much later.

## File limits

| Media | Common supported formats | Maximum size |
| --- | --- | --- |
| Image | JPEG, PNG | 5 MB |
| Video | MP4, 3GP | 16 MB |
| Audio | AAC, AMR, MP3, MP4 audio, OGG | 16 MB |
| Document | PDF, Word, Excel, PowerPoint, plain text | 100 MB |

Choose a file type that suits the message or template header you picked.

## See also

- [Media message](nodes/media-message.md)
- [Template message](nodes/template-message.md)
- [Files do not upload or send](../help/troubleshooting.md#files-do-not-upload-or-send)
