# Wait for and validate a reply

Use response waiting when the next step needs an answer, such as an email address, menu choice, or shared location.

## Set up a waiting message

1. Open a message node that offers **Wait for specific time**.
2. Write the question and set Destination number.
3. Enable **Wait for specific time**.
4. Choose **Unit** and **Value**, for example 10 minutes.
5. Click Save changes.
6. Connect the reply output to the step that uses the answer and **No response** to a reminder, handoff, or End.

For Button and List messages, connect every choice to its intended branch. For templates with quick replies, connect the quick-reply choices. Other waiting messages use Next step when an accepted reply arrives.

## Example: collect an email address

1. Add Text message and write “What email address should we send your receipt to?”
2. Turn on Wait for specific time and set 10 minutes.
3. Enable **Check format** and choose **Email**.
4. Enter an **Invalid response text**, such as “Please enter an email address like alex@example.com.”
5. Save and connect Next step to Save audience.
6. In Save audience, use [Insert Variable](flows/using-variables.md#use-a-customers-reply) to select this question's captured reply for the email column.
7. Connect No response to Assign agent or End.

## Check format

Text message offers Check format while response waiting is enabled. You can request text, number, email, or supported message types such as image, video, document, location, contact, audio, sticker, or order.

Choose the format that matches your question. When an invalid response is received, the configured invalid-response text helps the customer try again.

## What counts as an answer

| Waiting message | Expected answer |
| --- | --- |
| Text message | A reply that meets the configured format, if enabled. |
| Button message | A matching reply-button selection. |
| List message | A matching list-row selection. |
| Location request | A shared location with coordinates. |

Opening a Link button URL or reacting to a message does not count as selecting a reply. Configure every No response output so silence has a clear next step.

## Choose a sensible waiting time

Give the customer enough time to answer, but decide what should happen if they leave the conversation. A long wait can move a later free-form message outside WhatsApp's reply window; use a template when appropriate.

For a pause that does not depend on an answer, use [Set time delay](flows/nodes/set-time-delay.md).

See [WhatsApp setup](flows/whatsapp-message-setup.md) and [Troubleshooting](flows/troubleshooting.md#the-flow-waits-or-takes-no-response).
