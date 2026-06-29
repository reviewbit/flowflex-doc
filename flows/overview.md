# Flows — overview

A **flow** is a visual automation. It starts when an **event** fires (an order placed, a
checkout abandoned, an invoice created) and then runs a sequence of **nodes** you arrange
on a canvas — sending WhatsApp messages, waiting for replies, branching on conditions,
delaying, calling APIs, and so on.

```
Trigger ──▶ Text message ──▶ Wait for reply ──▶ Condition ──▶ … 
 (event)                                          ├─ yes ─▶ Template message
                                                  └─ no  ─▶ Internal alert
```

## The building blocks

| Concept | What it is |
| --- | --- |
| **Trigger** | The single starting node. It defines *which event* starts this flow and exposes the event payload as `{{trigger.*}}`. |
| **Nodes** | The steps that run: messages, logic, delays, data actions. See the [Node reference](flows/nodes.md). |
| **Edges** | The arrows connecting nodes — they decide the order and the branches. |
| **Variables** | `{{trigger.*}}` from the event, plus values captured from earlier nodes (like a customer's reply). See [Triggers & variables](flows/triggers-and-variables.md). |
| **Handles** | The little connection points on a node. Most nodes have a single **Next step**; interactive and logic nodes have several (one per button, list row, or condition path), plus a **No response** handle when waiting for a reply. |

## How an event becomes a running flow

1. You build and **publish** a flow with a custom-integration **trigger**.
2. Your app **fires that event** with a JSON payload — via the
   [SDK](sdk/overview.md) or the [REST API](api/events.md).
3. FlowFlex matches the event to the flow and starts it, with your payload available as
   `{{trigger.*}}`.
4. Each node runs in turn; branches follow the edge that matches (the button tapped, the
   condition met, whether a reply arrived).

## A typical flow

> **Order confirmation with follow-up**
>
> 1. **Trigger** — `order.placed` (payload: `name`, `order_id`, `phone`)
> 2. **Text message** → `Hi {{trigger.name}}, order {{trigger.order_id}} is confirmed 🎉`
>    — with **Wait for specific time** on, so it waits for a reply
>    - **reply received** → **Button message** "Need help?" → branches per button
>    - **no response** → **Internal alert** to the support team

## Good to know

- **Test before you ship.** Use the flow's **Test** action (on localhost builds) to run it
  once against a sample payload without waiting for a real event.
- **Personalize everything.** Any text field accepts `{{…}}` variables via the **Insert
  Variable** picker — it reads the fields from your trigger's sample payload.
- **Branching is explicit.** Each outgoing path is a separate edge from a node handle, so
  what you wire on the canvas is exactly what runs.

Next: **[Building a flow »](flows/building-a-flow.md)**
