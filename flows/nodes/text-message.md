---
description: "Send a WhatsApp text message, or ask a question and wait for the answer."
---

# Text message

## When to use it

Use a text message to reply during an open conversation, such as a greeting or a short answer. When a customer messages Rangoli Store, the flow replies "Hi Maria Garcia, thanks for messaging Rangoli Store." To message a customer outside the 24-hour reply window, use an approved [Template message](template-message.md) instead.

## Set it up

1. Add **Text message** from **WhatsApp Blocks** and open it. Give it a **Node label**, such as `Welcome`.
2. In **Destination number**, insert the customer's number. For a flow started by an incoming WhatsApp message, use **Trigger** → **from**. The number must include the country code.
3. In **Text message**, write the message and insert variables where needed. Rangoli Store types `Hi `, inserts **Trigger** → **name**, and adds `, thanks for messaging Rangoli Store.` The message can be up to 4,096 characters, including inserted values. To add an emoji, click **Emoji** in the editor's toolbar.
4. Optionally, add an **Internal description** under **More message options** to explain the step to your team.
5. Check the **Live WhatsApp preview** and click **Save changes**.

### Ask a question

To collect an answer, write the question, then under **Response handling** select **Wait for specific time** and set the **Unit** and **Value**. To accept only a certain kind of answer, such as an email address, turn on **Check format** and write the message to send when the answer doesn't match. See [Wait for and validate a reply](../response-wait.md#example-collect-an-email-address) for a full example.

## Connect it

Connect **Next step** to the following step or to **End**. If the message waits for a reply, **Next step** is used when the customer answers; connect **No response** to a fallback.

## See also

- [Wait for and validate a reply](../response-wait.md)
- [Select and insert variables](../using-variables.md)
- [A message does not arrive](../../help/troubleshooting.md#why-didnt-my-whatsapp-message-arrive)
