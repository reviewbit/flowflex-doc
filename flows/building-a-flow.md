# Build your first flow

Build a short flow that replies to a customer's WhatsApp message, then test and publish it.

Start small: one trigger, one message and an End node. Once that works, add choices, conditions or a call to another service. To practise first on sample data, open [Learn flow builder](learning-the-builder.md).

Before building its order-tracking flow, Rangoli Store starts with a greeting. When John Smith messages the store, the flow replies "Hi John Smith, how can we help?" Later the team swaps the text for a message with **Track order** and **Talk to the team** buttons.

## Create the flow

1. Go to **Flows** and click **Create new**.
2. Enter a **Title**, such as `Order help`, and a **Description**.
3. Select the WhatsApp **Channel** for the flow. Check it carefully: it's the number the flow works with.
4. Create the flow. The builder opens.

A practice lesson in Learn flow builder doesn't create or switch on a real flow.

## Select the trigger

1. Open **Trigger** on the canvas.
2. Choose the source that offers **WhatsApp Incoming Chat**, and select that event.
3. Save the trigger.

Every flow has exactly one Trigger, which starts it, and one End, which finishes it. See [Choose the trigger](triggers-and-variables.md).

## Add a message

1. Find **Text message** in **WhatsApp Blocks** and add it to the canvas.
2. Open the node.
3. In **Destination number**, use **Insert Variable** → **Trigger** → **from**. The reply goes to whoever sent the message.
4. Type `Hi `, insert **Trigger** → **name**, then type `, how can we help?`
5. Check the preview and click **Save changes**.

See [Select and insert variables](using-variables.md) for nested fields, and [Text message](nodes/text-message.md) for every setting.

## Connect the steps

1. Draw a connection from Trigger's **Next step** output to the Text message.
2. Draw a connection from the Text message's **Next step** output to End.

```text
Trigger → Text message → End
```

A node placed beside Trigger doesn't run until it's connected. You can also add the next step from a connection's picker. **Tidy layout** arranges the canvas, and **Undo tidy** puts the nodes back where they were.

## Check every path

If you turn on response waiting or add choices, a node shows more outputs. Connect every output, including **No response**, to another step or to End.

In a flow with branches, all finished paths can lead to the same End node. Remove nodes you don't use, and fix any errors the builder shows before you save.

## Save and publish

1. Click **Save** to keep a draft version.
2. Click the arrow beside **Save** and choose **Save and publish** to publish your changes.
3. Check the version status to confirm the version you want is published.

Publishing a flow doesn't start it for incoming messages. Create and publish a [campaign](campaigns.md) that uses the flow. See [Versions and publishing](versions-and-portability.md).

## Test the flow

Message the channel from your own test number. Check the greeting, who receives it, and what happens with each choice or when you don't reply. A real flow sends real messages, so test it before customers reach it.

The conversation preview in Learn flow builder is separate and uses sample data.

## Extend the flow

- **Offer a small menu:** [Button message](nodes/button-message.md), like Rangoli Store's **Track order** and **Talk to the team** buttons.
- **Ask for and save an email address:** [Waiting for a reply](response-wait.md) and [Save audience](nodes/audience-actions.md#save-audience).
- **Look up an order status:** [API](nodes/api.md).
- **Send an approved order update:** [Template message](nodes/template-message.md).
- **Hand over to a person:** [Assign agent](nodes/audience-actions.md#assign-agent).

## See also

- [Workflows overview](overview.md)
- [Campaigns](campaigns.md)
- [Node reference](nodes.md)
- [Troubleshooting](../help/troubleshooting.md)
