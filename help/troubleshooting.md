---
description: "Find the likely cause and the fix for common problems with flows, messages, broadcasts and channels."
---

# Troubleshooting

Each section below starts with a symptom. Most flow problems come down to three things: which version is published, how the flow is triggered, and the settings on the step where it goes wrong. Check those first.

When Rangoli Store's order-update flow stopped sending messages, Alex Lee opened the flow and found that the latest changes were saved as a draft but never published. Publishing the draft fixed it.

## The flow does not start

1. Open the flow and check which version is published. A saved draft isn't live until you publish it.
2. Open **Trigger** and confirm it uses the event you intended.
3. For a custom event, confirm your integration sends that event with the expected data.
4. For WhatsApp incoming chats, check that the right channel and incoming-message campaign are set up and published.

See [Trigger setup](../flows/triggers-and-variables.md) and [Publishing](../flows/versions-and-portability.md).

## A message does not arrive

1. Check that **Destination number** includes the country code and points to the intended customer.
2. Check that the connected WhatsApp channel is available.
3. For free-form messages, confirm the customer's reply window is still open. Outside that window, use an approved template.
4. For templates, check approval and availability, then fill every required placeholder and header field.
5. Review any delivery error shown in FlowFlex before you try again.

A preview shows the message layout. It doesn't prove WhatsApp delivered it. See [Shared message setup](../flows/whatsapp-message-setup.md).

## A chat message shows as failed

When a message can't be sent from **Conversations**, FlowFlex keeps it in the chat marked as failed, with a red icon. Hover over the information icon next to it to see the reason. Common reasons:

- **Negative wallet balance:** agent replies can't be sent while your wallet balance is below zero. [Add message credits](../account/billing-and-wallet.md#add-message-credits), then send the reply again.
- **Channel needs reconnecting:** the WhatsApp channel has to be reconnected. Go to **Channels** and reconnect it. See [Connect a WhatsApp channel](../whatsapp/connect-channel.md#common-problems).

## My template is missing

Check that the template belongs to the WhatsApp account the flow uses, is approved, and matches your search. Clear the search and look under Marketing, Utility or Authentication.

If it's still pending or was rejected, sort that out in **Templates** before you set up the node. See [Create a template](../whatsapp/create-template.md) and [Template message](../flows/nodes/template-message.md).

## A variable is missing or has the wrong value

Check the selected source, the nested field and the sample data. Add the field to the custom trigger sample or the API response example, and save it. For a captured reply, turn on response waiting on the question node.

Don't use an answer on the **No response** path, or a success-only API field on its error path. See [Variable troubleshooting](../flows/using-variables.md#if-a-field-is-missing).

## The flow waits or takes No response

Check the waiting node's **Unit** and **Value**. Button and List messages need a matching choice: a URL click or a reaction isn't an answer. A location request needs a shared location. With **Check format** turned on, an invalid answer may lead to another prompt.

Connect **No response** to a reminder, an agent handoff, or **End**. See [Response waiting](../flows/response-wait.md).

## I cannot save the flow

Check that the flow has one **Trigger** and one **End**, no unused nodes, and a connection from every output shown. That includes button choices, list rows, conditions, **No response**, and every API outcome.

Open any node that shows an error and fill in its required settings. See [Build and connect a flow](../flows/building-a-flow.md).

## My API request fails

- **Non-2xx response:** check the service's error response, the required credentials, and the request details.
- **Request failed:** check the endpoint address and the timeout settings.
- **JSON error while editing:** put quotes around variable placeholders, and check commas and brackets.

Use the API drawer's request test with safe sample data. A test can change records in the connected service. See [API setup](../flows/nodes/api.md).

## Files do not upload or send

Check the selected media type, the file format and its size. For a public URL, make sure the file opens without a login. For a file a customer uploaded, check the `assetId` and whether the file has expired. For **Upload new file**, wait for the upload to finish before you save.

See [Choose files and media](../flows/files-and-media.md).

## The wrong condition path runs

Check the field type, operator, comparison value, and AND/OR groups. In a condition branch, the first matching path wins, so put specific rules before broader ones.

See [Set conditions](../flows/setting-conditions.md).

## A repeated sequence never reaches the intended result

Check that the **Repeat until** stop condition uses the latest answer or API result. After **End loop**, route on whether the condition was met. Reaching the attempt limit doesn't mean the task succeeded.

See [Repeat until](../flows/nodes/repeat-until.md).

## A broadcast did not reach everyone

Open the broadcast and check **Error Messages**. Each error shows Meta's code and what to do. See [Results and errors](../broadcasts/results-and-errors.md).

Opted-out, invalid and duplicate contacts are skipped before sending. Contacts after the end date are never sent. See [Pre-send checklist and FAQ](../broadcasts/checklist-faq.md).

## My channel shows Disconnected or Limited

See [Common problems](../whatsapp/connect-channel.md#common-problems) in Connect a WhatsApp channel.

## Ask for help

Tell FlowFlex support the flow name, the label of the affected node, the published version, the error shown, and what you expected to happen. Include a screenshot with customer numbers, API keys and other private information hidden.

## See also

- [Results and errors](../broadcasts/results-and-errors.md)
- [Connect a WhatsApp channel](../whatsapp/connect-channel.md)
- [Response waiting](../flows/response-wait.md)
