# Build your first customer reply

Start with a short flow that replies to a WhatsApp message. Once it is configured correctly, add choices, conditions, or integrations.

For a safe introduction using fictional data, open [Learn flow builder](flows/learning-the-builder.md).

## 1. Create a real flow

1. Open Flows and start creating a flow.
2. Enter a clear **Title**, such as “Customer welcome”.
3. Enter its **Description** and select the intended WhatsApp **Channel**.
4. Create the flow to open the builder.

Check the channel before continuing. A practice lesson does not create or activate your real customer flow.

## 2. Select the trigger

Open Trigger, choose the source that offers WhatsApp Incoming Chat, and select that event. Save it.

Trigger starts the sequence. End finishes it. Keep exactly one of each on the canvas. See [Trigger setup](flows/triggers-and-variables.md).

## 3. Add and configure a message

1. Find **Text message** in WhatsApp Blocks and add it to the canvas.
2. Open the node.
3. In Destination number, use Insert Variable → Trigger → from.
4. Write “Hi ”, insert Trigger → name, then add “, how can we help?”
5. Check the preview and click Save changes.

See [Select and insert variables](flows/using-variables.md) for nested JSON fields and [Text message](flows/nodes/text-message.md) for the full node setup.

## 4. Connect the sequence

Draw connections from the output of one node to the input of the next:

```text
Trigger → Text message → End
```

Connect Trigger's Next step to Text message, then Text message's Next step to End. A message does not run simply because it is placed beside Trigger; its connection determines when it runs.

You can also add a next step from a source connection's picker. Use Tidy layout to arrange the canvas, and Undo tidy to restore the previous positions.

## 5. Check all paths before saving

If you enable response waiting or add choices, the node may show more outputs. Connect every displayed output, including No response, to another step or End.

For a flow with branches, completed paths can all lead to the same End node. Remove unused nodes and fix any errors shown before saving.

## 6. Save and publish

**Save** keeps a draft version. Use the arrow beside Save → **Save and publish** to publish your current changes. Check the version status to confirm the intended version is published.

For incoming WhatsApp messages, configure and publish the campaign that uses this flow and channel. Publishing the flow alone does not create its incoming-message campaign.

See [Versions and publishing](flows/versions-and-portability.md).

## 7. Try the intended customer journey

Use your own test contact in the configured channel. Check the greeting, recipient, and any choices or timeout behavior before using the flow for customers. A real customer journey can send real messages.

The learning lesson's conversation preview is separate and uses fictional information.

## Extend the flow

| Next customer task | Guide |
| --- | --- |
| Offer a small menu | [Button message](flows/nodes/button-message.md) |
| Ask for and save an email address | [Response waiting](flows/response-wait.md) and [Save audience](flows/nodes/audience-actions.md#save-audience) |
| Retrieve an order status | [API](flows/nodes/api.md) |
| Send an approved order update | [Template message](flows/nodes/template-message.md) |
| Hand over to a person | [Assign agent](flows/nodes/audience-actions.md#assign-agent) |

If a message or flow does not behave as expected, use [Troubleshooting](flows/troubleshooting.md).
