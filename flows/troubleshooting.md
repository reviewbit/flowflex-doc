# WhatsApp and workflow troubleshooting

Start by checking the flow's published version, its trigger or incoming-message campaign, and the settings on the step where the problem occurs.

## The flow does not start

1. Open the flow and check which version is published. A saved draft is not live until published.
2. Open Trigger and confirm it uses the intended event.
3. For a custom event, confirm your integration sends that event and the expected data.
4. For WhatsApp Incoming Chat, check the correct channel and incoming-message campaign are configured and published.

See [Trigger setup](flows/triggers-and-variables.md) and [Publishing](flows/versions-and-portability.md).

## A message does not arrive

1. Check Destination number includes the country code and selects the intended customer.
2. Check the connected WhatsApp channel is available.
3. For free-form messages, confirm the customer's reply window is still open. Use an approved template outside that window.
4. For templates, check approval and availability, then fill every required placeholder and header field.
5. Review any delivery error shown in FlowFlex before trying again.

A preview shows the message layout; it does not prove WhatsApp delivered it. See [Shared message setup](flows/whatsapp-message-setup.md).

## My template is missing

Check the template belongs to the WhatsApp account used by the flow, is approved, and matches your search. Clear the search and look under Marketing, Utility, or Authentication.

If it is still pending or rejected, resolve that in Templates before configuring the node. See [Template message](flows/nodes/template-message.md).

## A variable is missing or has the wrong value

Check the selected source, nested field, and sample data. Add the field to the custom trigger sample or API response example and save it. For a captured reply, enable response waiting on the question node.

Do not use an answer on the No response path or a success-only API field on its error path. See [Variable troubleshooting](flows/using-variables.md#if-a-field-is-missing).

## The flow waits or takes No response

Check the waiting node's Unit and Value. Button and List messages require a matching choice; a URL click or reaction is not an answer. Location request needs a shared location. With Check format enabled, an invalid answer may lead to another prompt.

Connect No response to a reminder, agent handoff, or End. See [Response waiting](flows/response-wait.md).

## I cannot save the flow

Check that there is one Trigger and one End, no unused nodes, and a connection from every displayed output. Include button choices, list rows, conditions, No response, and all API outcomes.

Open any node showing an error and fill its required settings. See [Build and connect a flow](flows/building-a-flow.md).

## My API request fails

- **Non-2xx response:** check the service's error response, required credentials, and request details.
- **Request failed:** check the endpoint address and timeout settings.
- **JSON error while editing:** quote variable placeholders and check commas and brackets.

Use the API drawer's request test with safe sample data. A test can change records in the connected service. See [API setup](flows/nodes/api.md).

## Files do not upload or send

Check the selected media type, supported format, and size. For a public URL, verify the file opens without login. For an uploaded customer file, check the assetId and whether the file has expired. For Upload new file, wait for the upload to finish before saving.

See [Choose files and media](flows/files-and-media.md).

## The wrong condition path runs

Check the field type, operator, comparison value, and AND/OR groups. In Condition branch, the first matching path wins; place specific rules before broader ones.

See [Set conditions](flows/setting-conditions.md).

## A repeated sequence never reaches the intended result

Check the Repeat until stop condition uses the latest answer or API result. After End loop, route on whether the condition was met. Reaching the attempt limit does not mean the task succeeded.

See [Repeat until](flows/nodes/repeat-until.md).

## Ask for help

Share the flow name, affected node label, published version, the error shown, and what you expected to happen. Include a screenshot with customer numbers, API keys, and private information hidden.
