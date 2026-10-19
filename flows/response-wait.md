---
description: "Pause a flow until the customer answers, check the answer's format, and choose what happens if no answer comes."
---

# Wait for and validate a reply

Response waiting is a setting on message nodes. Turn it on when the next step needs something from the customer, such as an email address, a menu choice or a location. The node then gets a reply output and a **No response** output for when time runs out.

In Rangoli Store's order-tracking flow, the button message waits 10 minutes. When Sam Wilson taps **Track order**, the flow looks up the order. If Sam Wilson doesn't tap anything in time, the **No response** path assigns the chat to the team.

## Set up a waiting message

1. Open a message node that offers **Wait for specific time**.
2. Write the question and set **Destination number**.
3. Turn on **Wait for specific time**.
4. Choose the **Unit** and **Value**, for example 10 minutes.
5. Click **Save changes**.
6. Connect the reply output to the step that uses the answer, and **No response** to a reminder, a handoff or End.

For Button and List messages, connect each choice to its own path. For templates with quick replies, connect the quick-reply choices. Other waiting messages continue on **Next step** when an accepted reply arrives.

## Example: collect an email address

1. Add a **Text message** with "What email address should we send your receipt to?"
2. Turn on **Wait for specific time** and set 10 minutes.
3. Turn on **Check format** and choose **Email**.
4. Enter an **Invalid response text**, such as "Please enter an email address like name@example.com."
5. Save, and connect **Next step** to **Save audience**.
6. In Save audience, use [Insert Variable](using-variables.md#use-a-customers-reply) to select this question's reply for the email field.
7. Connect **No response** to **Assign agent** or End.

## Check format

When response waiting is on, a Text message offers **Check format**. You can ask for text, a number, an email address, or a message type such as image, video, document, location, contact, audio, sticker or order.

Choose the format that matches your question. If the reply doesn't match, the customer gets your **Invalid response text** and can try again.

## What counts as an answer

| Waiting message | Expected answer |
| --- | --- |
| Text message | A reply that meets the format you set, if any. |
| Button message | A tap on one of its reply buttons. |
| List message | A choice of one of its list rows. |
| Location request | A shared location with coordinates. |

Opening a Link button's page or reacting to a message isn't an answer. Connect every **No response** output so that silence leads somewhere.

## Choose a sensible waiting time

Give customers enough time to answer, and decide what happens if they leave the conversation. After a long wait, a later free-form message can fall outside WhatsApp's reply window. Use a template there. See [The 24-hour reply window](whatsapp-message-setup.md#the-24-hour-reply-window).

For a pause that doesn't depend on an answer, use [Set time delay](nodes/set-time-delay.md).

## See also

- [Set up WhatsApp messages](whatsapp-message-setup.md)
- [Select and insert variables](using-variables.md)
- [The flow waits or takes No response](../help/troubleshooting.md#why-does-my-flow-keep-waiting-or-take-the-no-response-path)
