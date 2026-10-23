---
description: "Build a short flow that replies to a customer's WhatsApp message, then test and publish it."
---

# Build your first flow

Start small: one trigger, one message and an End node. Once that works, add choices, conditions or a call to another service. To practise first on sample data, open [Learn flow builder](learning-the-builder.md).

Before building its order-tracking flow, Rangoli Store starts with a greeting. When John Smith messages the store, the flow replies "Hi John Smith, how can we help?" Later the team swaps the text for a message with **Track order** and **Talk to the team** buttons.

## Create the flow

1. Go to **Workflows** → **Flows** and click **Create flow**.
2. Enter a **Flow name**, such as `Order help`. It's required, up to 100 characters.
3. Optionally add a **Description**, a note for your team.
4. Click **Create flow**. The builder opens.

You don't choose a WhatsApp number here. The number is set on the [worker](workers.md) that runs the flow, so one flow can run on several numbers.

A practice lesson in Learn flow builder doesn't create or switch on a real flow.

### The flow list

The **Flows** tab shows each flow as a card with its trigger, name, status (**Published** or **Draft**), description and when it was last updated. Use **Search by flow name** to find a flow, and **Refresh** to reload the list.

- **Open:** open the flow in the builder.
- **Create worker:** put the flow to work. Only published flows show this button.
- **⋯** menu: **Edit details** to change the name or description, **Duplicate** to copy the flow, or **Delete**.

Deleting a flow also removes its versions. If a worker uses the flow, you see **Flow not deleted** with the workers' names. Delete those workers first.

## Select the trigger

1. Open **Trigger** on the canvas.
2. Under **Start this flow from**, choose **WhatsApp**.
3. Select **WhatsApp Incoming Chat** from **WhatsApp events**.
4. Save the trigger.

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

See [Versions and publishing](versions-and-portability.md).

## Create a worker to go live

Publishing a flow doesn't start it for incoming messages. To put it to work:

1. On the **Flows** tab, click **Create worker** on the flow's card.
2. Choose **WhatsApp message**, name the worker, and pick the WhatsApp number.
3. Set the active dates, then review and activate the worker.

See [Workers](workers.md) for every step.

## Test the flow

Once the worker is active, message its WhatsApp number from your own test number. Check the greeting, who receives it, and what happens with each choice or when you don't reply. An active worker sends real messages to every matching customer, so check each path as soon as it goes live.

The conversation preview in Learn flow builder is separate and uses sample data.

## Extend the flow

- **Offer a small menu:** [Button message](nodes/button-message.md), like Rangoli Store's **Track order** and **Talk to the team** buttons.
- **Ask for and save an email address:** [Waiting for a reply](response-wait.md) and [Save audience](nodes/audience-actions.md#save-audience).
- **Look up an order status:** [API](nodes/api.md).
- **Send an approved order update:** [Template message](nodes/template-message.md).
- **Hand over to a person:** [Assign agent](nodes/audience-actions.md#assign-agent), then [Wait for agent reply](nodes/wait-for-agent-reply.md) to follow up if nobody answers.

## See also

- [Workflows overview](overview.md)
- [Workers](workers.md)
- [Node reference](nodes.md)
- [Troubleshooting](../help/troubleshooting.md)
