# Template message: send an approved WhatsApp message

Use Template message for order updates, reminders, authentication, or approved marketing messages. An approved template lets you contact a customer outside the 24-hour reply window.

## Before you start

Create the template in Templates and wait for approval. See [Create a template](whatsapp/create-template.md) and [Template guidelines](whatsapp/template-guidelines.md). Choose a template belonging to the WhatsApp account used by your flow. The node's picker lists approved templates under Marketing, Utility, and Authentication.

Read [Shared WhatsApp setup](flows/whatsapp-message-setup.md) for choosing the recipient and understanding the reply window.

## Example: personalize an order confirmation

Suppose your approved template says:

```text
Hi {{1}}, your order {{2}} is confirmed.
```

And the event contains the customer name and order number. You want each customer to receive their own information, such as “Hi Alex, your order ORD-1042 is confirmed.”

### 1. Choose the template

1. Add **Template message** from WhatsApp Blocks and open it.
2. Set a clear Node label, such as “Order confirmation”.
3. In **Destination number**, insert the customer's phone field. For an incoming-chat reply, select Trigger → from.
4. Open **Choose a template**, search for your approved template by name, and select it.
5. Review its body, header, buttons, and language to make sure you chose the correct approved message.

Use **Create template** if you need to go to Templates first. A template that is pending or rejected is not ready to use here.

### 2. Fill every body placeholder

The drawer displays a field for each placeholder in the chosen template.

| Placeholder | What this example needs | Choices in Insert Variable |
| --- | --- | --- |
| Body `{{1}}` | Customer name | Trigger → customer → name |
| Body `{{2}}` | Order number | Trigger → order → number |

Click the placeholder field, open Insert Variable, and choose its value. You can use fixed text when the same value should be sent to everyone. Fill all required placeholders before saving.

A placeholder such as `{{1}}` is a position in the approved template. The customer-data variable you select is the value that fills that position. See [Fill a template placeholder](flows/using-variables.md#fill-a-template-placeholder).

### 3. Supply a header when required

The required fields depend on the approved template's header:

| Header | What to supply |
| --- | --- |
| Text with a placeholder | The value requested by the header field. |
| Image, video, or document | The matching file using File source. |
| Location | Latitude, longitude, and other location fields shown in the drawer. |
| No header | No header settings are needed. |

For a fixed brochure, use **Upload new file**. For a customer invoice, insert its Public URL or Uploaded file value. See [Choose files and media](flows/files-and-media.md).

The header type comes from the selected template; a document template needs a document, not an image.

### 4. Fill button or code values when shown

For a dynamic URL button, fill **Button** variables with the value required by the approved URL pattern. For example, if the template's fixed URL is `https://shop.example/orders/` followed by a placeholder, supply the order identifier rather than rewriting the fixed address.

Authentication or copy-code templates show the code field. Select the code generated for that customer. Do not use the same fixed verification code for everyone.

A URL or phone button is an action the customer opens; it does not create a quick-reply branch.

### 5. Review, save, and connect

1. Review Live WhatsApp preview and each selected value.
2. If you need a reply, enable Wait for specific time and set the waiting window.
3. Click **Save changes**.
4. Connect the outputs displayed on the canvas.
5. Save the flow, then Save and publish when ready.

A template with quick replies has an output for each quick-reply choice. A template without quick replies uses Next step. When waiting is enabled, also connect No response. See [Response waiting](flows/response-wait.md).

## Before publishing

Check the template is approved and available, its language is correct, all placeholders are filled, its header is valid, and every response path is connected.

If a template is missing or a message cannot be delivered, use [WhatsApp troubleshooting](help/troubleshooting.md).
