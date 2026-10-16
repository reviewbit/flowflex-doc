# Workflows overview

> [!NOTE]
> The flow builder is switched on per organisation. If you don't see **Flow builder** in the sidebar, contact FlowFlex support to enable it.

A flow connects actions into a customer journey: greet a customer, offer choices, collect information, look up an order, or hand the conversation to your team.

Start with [Build your first flow](flows/building-a-flow.md) or [Learn flow builder](flows/learning-the-builder.md) for guided practice.

## How a flow works

A **Trigger** starts the flow when the selected event happens. Each connected node performs a task, and **End** finishes a path.

```text
Trigger → Button message → Track order → API → Status message → End
                           Talk to team → Assign agent → End
```

Connect every choice and response output. Placing a node on the canvas does not connect it automatically.

## Common setup tasks

| What you need | Guide |
| --- | --- |
| Choose what starts the flow | [Trigger setup](flows/triggers-and-variables.md) |
| Select a name, phone number, or nested JSON field | [Select and insert variables](flows/using-variables.md) |
| Choose a WhatsApp message type and recipient | [Shared WhatsApp setup](flows/whatsapp-message-setup.md) |
| Fill a template's placeholders | [Template message](flows/nodes/template-message.md) |
| Use information returned by another service | [API](flows/nodes/api.md) |
| Upload a file or select a customer-specific attachment | [Files and media](flows/files-and-media.md) |
| Route by an answer, order value, or tag | [Conditions](flows/setting-conditions.md) |
| Capture and check a customer's reply | [Response waiting](flows/response-wait.md) |
| Review drafts and publish changes | [Versions and publishing](flows/versions-and-portability.md) |
| Fix a flow or WhatsApp message issue | [Troubleshooting](help/troubleshooting.md) |

## Choose a node

Use the [Node reference](flows/nodes.md) for the available steps. Each guide explains when to use the node, which fields to fill, how to connect it, and what to check before publishing.

For a real incoming-message flow, configure its WhatsApp channel and campaign as well as publishing the flow. A saved draft or practice lesson does not activate customer messaging.
