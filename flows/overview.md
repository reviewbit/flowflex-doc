# Workflows overview

Answer customers, collect details and look up orders automatically, at any hour, and hand over to your team when a person is needed.

> [!NOTE]
> Flow builder is in Beta. If you don't see it in the sidebar, contact FlowFlex support.

A flow is a set of connected steps that runs on its own. Something starts it, such as a customer's WhatsApp message or a new order in a connected app, and each step does one job: send a message, wait for a reply, check a condition, call another service, or assign the chat to an agent.

At Rangoli Store, most evening messages ask the same thing: "Where is my order?" So the team built a flow. When John Smith messages at 11 PM, the flow replies with two buttons, **Track order** and **Talk to the team**. John taps **Track order**, the flow looks up the latest order and replies with its status. Customers who tap **Talk to the team** are assigned to an agent, who picks up the chat the next morning with the whole conversation in front of them.

## How a flow works

Every flow begins with a **Trigger**, the event that starts it. Each step after that is a **node**, and you connect nodes on the canvas to decide what happens next. Choices, such as the buttons in a message, each get their own path. An **End** node finishes a path.

Rangoli Store's flow looks like this:

```text
Trigger → Button message → Track order → API → Status message → End
                         → Talk to the team → Assign agent → End
```

Placing a node on the canvas doesn't connect it. Connect every button, choice and response output, or customers who pick that option reach a dead end.

To start a flow from incoming WhatsApp messages, publish it and switch it on with a [campaign](flows/campaigns.md). A saved draft, or a practice flow in Learn flow builder, doesn't message real customers.

## Get started

- [Learn flow builder](flows/learning-the-builder.md): practise on guided lessons with sample data.
- [Build your first flow](flows/building-a-flow.md): build, test and publish a flow step by step.
- [Campaigns](flows/campaigns.md): switch a published flow on for incoming messages.

## Common tasks

- [Choose the trigger](flows/triggers-and-variables.md): decide what starts the flow.
- [Select and insert variables](flows/using-variables.md): use a customer's name, phone number or order details in any step.
- [Set up WhatsApp messages](flows/whatsapp-message-setup.md): pick the message type and who receives it.
- [Template message](flows/nodes/template-message.md): send an approved template and fill its placeholders.
- [API](flows/nodes/api.md): use information from another service, such as an order status.
- [Choose files and media](flows/files-and-media.md): send a file, or one that's specific to each customer.
- [Set conditions and choose paths](flows/setting-conditions.md): route by an answer, an order value or a tag.
- [Waiting for a reply](flows/response-wait.md): capture and check what the customer types.
- [Versions and publishing](flows/versions-and-portability.md): review drafts and publish changes.

Every step you can add is listed in the [Node reference](flows/nodes.md).

## See also

- [Saved data](flows/saved-data.md)
- [Troubleshooting](help/troubleshooting.md)
