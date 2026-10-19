---
description: "Send an image, video, audio file, document or contact card on WhatsApp."
---

# Media message

## When to use it

Use a media message when the customer needs a file rather than text. Rangoli Store sends its Diwali catalogue as a PDF to every customer who asks for it, and sends each customer their own invoice after an order. To send a map pin, use [Send location](send-location.md).

## Set it up

1. Add **Media message** from **WhatsApp Blocks** and open it.
2. In **Destination number**, insert the customer's phone number, such as **Trigger** → **from**.
3. In **Type**, choose **Image**, **Video**, **Document**, **Audio** or **Contact**.
4. In **File source**, choose where the file comes from:
   - **Upload new file:** pick a file from your computer, such as the Diwali catalogue. The same file is sent every time the node runs.
   - **Public URL:** insert a link to the file in **Media URL**, such as an invoice link from the trigger.
   - **Uploaded file:** insert the file's **Asset ID** from the trigger, for a private file your system uploaded to FlowFlex.
5. Optionally, add a **Caption (optional)**, such as `Your invoice for order ORD-48213`. Audio files and contact cards don't have captions.
6. Click **Save changes**.

Images can be up to 5 MB, video and audio up to 16 MB, and documents up to 100 MB. See [Choose files and media](../files-and-media.md) for how each file source works.

### Send a contact card

Choose **Type** → **Contact** and fill in the name, such as **First name** and **Last name**, and the contact details, such as **Mobile number**. Rangoli Store sends its Kochi branch's contact this way. You can add up to 10 contacts in one message.

## Connect it

Connect **Next step** to the following step or to **End**. If you set a waiting time for a reply, connect **No response** too. See [Wait for and validate a reply](../response-wait.md).

## See also

- [Choose files and media](../files-and-media.md)
- [Files do not upload or send](../../help/troubleshooting.md#why-wont-my-file-upload-or-send)
- [Template message](template-message.md), for files outside the 24-hour window
