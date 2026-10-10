# Media message: send a file or contact card

Use Media message for a product image, video, voice/audio file, document, or contact card. For a map pin, use [Send location](flows/nodes/send-location.md).

## Send a fixed brochure

1. Add **Media message** and open it.
2. Set Destination number with the customer's phone variable.
3. In **Type**, choose Document.
4. In **File source**, choose Upload new file and pick your brochure.
5. Wait for upload to finish and review the file preview.
6. Fill any additional fields shown for that media type.
7. Click Save changes and connect Next step to another action or End.

The same uploaded brochure is attached each time this node runs.

## Send a different invoice for each customer

Choose Document, then select **Public URL** if the event contains a direct invoice URL, or **Uploaded file** if it contains an assetId. Use [Insert Variable](flows/using-variables.md) to select that customer-specific field.

See [Choose files and media](flows/files-and-media.md) for file sources, expiry, and the type-specific size limits. Image files can be up to 5 MB, video/audio up to 16 MB, and documents up to 100 MB.

## Add a caption

Where the selected type offers a caption field, add a short explanation or a personalized message. Keep it within the displayed limit and check the preview. Audio messages and contact cards have different fields from images and documents.

## Send a contact card

Choose **Type → Contact**, then fill the name and contact details shown in the form. Add further contact entries if needed, up to the supported limit of 10 contacts. Review the customer's card before saving.

## Wait for an answer

If the form offers response waiting and you need an answer, enable it and connect No response as well as Next step. See [Response waiting](flows/response-wait.md).

For failures, see [File troubleshooting](flows/troubleshooting.md#files-do-not-upload-or-send) and [WhatsApp setup](flows/whatsapp-message-setup.md).
