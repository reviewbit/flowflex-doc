# Choose files and media

Use this guide when a Media message, template header, or message header needs a file.

## Choose the file source

| File source | Use it for | What to provide |
| --- | --- | --- |
| **Upload new file** | The same brochure or image for every customer | Choose a file from your computer and wait for upload to finish. |
| **Public URL** | A file accessible through a direct link | Paste the file URL or insert the variable that contains it. |
| **Uploaded file** | A different private file for each customer | Select the assetId supplied by your integration. |

## Upload one reusable file

1. Choose the required media type.
2. Set **File source → Upload new file**.
3. Choose the file from your computer.
4. Wait for upload to complete and check the preview.
5. Save the node.

This file is attached each time the node runs and stays available while the flow uses it.

## Use a link

Choose **Public URL** and enter a direct link to the file. Open the link without signing in to check that WhatsApp can download it. A link to a login page or a sharing page is not the same as a direct file link.

If each customer has a different file URL, use [Insert Variable](flows/using-variables.md) to select it.

## Use a private customer file

Your integration uploads the file and includes its assetId in the event that starts the flow. Choose **Uploaded file** and insert that assetId field, for example **Trigger → invoice**.

These event-uploaded files expire after 48 hours. Keep the upload and message close together; a long delay may require a fresh upload. Integration setup is covered in [SDK file attachments](sdk/files.md).

An incoming attachment's download URL is also temporary. Do not assume a saved URL will still work after a long delay.

## File limits

| Media | Common supported formats | Maximum size |
| --- | --- | --- |
| Image | JPEG, PNG | 5 MB |
| Video | MP4, 3GP | 16 MB |
| Audio | AAC, AMR, MP3, MP4 audio, OGG | 16 MB |
| Document | PDF, Word, Excel, PowerPoint, plain text | 100 MB |

Choose a file type appropriate for the selected message or template header. If upload or sending fails, see [File troubleshooting](help/troubleshooting.md#files-do-not-upload-or-send).
