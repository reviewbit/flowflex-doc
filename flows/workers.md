---
description: "Put a published flow to work: choose the WhatsApp messages or integration events that start it, set its dates, and pause or update it."
---

# Workers

Use a worker to run a published flow for customers, starting it from incoming WhatsApp messages or from your own integration's events.

> [!NOTE]
> Workflows is in Beta. If you don't see it in the sidebar, contact FlowFlex support.

A flow defines the steps. A worker connects those steps to your customers: it decides which messages or events start the flow, on which WhatsApp number, and for how long. You find workers in **Workflows** → **Workers**. One flow can have several workers, for example one per WhatsApp number.

Rangoli Store has published its order-tracking flow. To put it to work, Alex Lee creates a worker called `Rangoli Store – Order help` for the store's WhatsApp number and activates it. From then on, when Jane Doe messages the store, the flow replies with the **Track order** and **Talk to the team** buttons.

## How a worker works

1. You build a flow and publish it. See [Build your first flow](building-a-flow.md).
2. You create a worker for that flow, choose what starts it and set its active dates.
3. While the worker is **Active**, each matching message or event starts the flow for that customer.

A worker can start from one of two sources:

- **WhatsApp message:** a customer's message on the WhatsApp number you choose. Use it with flows whose trigger is **WhatsApp Incoming Chat**.
- **Custom integration:** an event your own system sends to FlowFlex. See [Custom integration](../integrations/custom-integration.md).

The START and STOP keywords from [Subscription Auto Replies](../messaging/settings.md#subscription-auto-replies) never start a worker.

## Create a worker

Click **Create worker** on a published flow's card in the **Flows** tab, or open the **Workers** tab and create one there. Only published flows can have a worker. The **Create worker** page has four steps: **Flow & details** → **Active dates** → **Additional settings** → **Review & activate**.

### 1. Flow & details

1. Check the flow, or pick it if you started from the **Workers** tab.
2. Under **What starts this worker?**, choose **WhatsApp message** or **Custom integration**.
3. Enter a **Worker name**, such as `Rangoli Store – Order help`.
4. For a WhatsApp message worker, choose the **WhatsApp number** whose messages start the flow.
5. If the flow has an [Assign agent](nodes/audience-actions.md#assign-agent) step set to **Choose in each worker**, answer **Who these steps assign to**. Rangoli Store's flow has a choice named "Order help team", so Alex Lee picks who those chats go to for this worker.

For a custom integration worker, **Identify the customer (optional)** tells the worker which customer each event belongs to. Choose **Every event (no ID)** to start the flow for every event, or enter a **Payload field path** that points to the customer in the event's data.

### 2. Active dates

Set when the worker is active, then answer **When should it end?**:

- **Keep active for a duration:** the worker ends after the time you choose.
- **Choose an end date:** the worker ends on that date.
- **No end date:** the worker keeps running until you pause or delete it.

### 3. Additional settings

Optionally narrow down who the worker responds to:

- **Who should this worker respond to?:** leave **No rules — any incoming message** to start the flow for every matching message, or add rules.
- Exclude customers in **Existing chats**, **Existing audience**, **Lists** or **Segments**.
- **Your frequency limit:** how often the flow can start for the same customer.
- **Your weekly windows:** the days and times the worker runs.

### 4. Review & activate

Check the summary, then activate the worker. It becomes **Active** and starts responding to matching messages or events.

## The worker list

The **Workers** tab lists every worker with its **Worker**, **Flow**, **Status** and **Active dates**. Use **Search by worker name** to find one, and the **All statuses** filter to show one status.

Each worker's **Actions** include:

- **Activate worker:** switch on a worker that isn't active yet.
- **Edit settings:** change the worker's rules, number or dates.
- **Run history:** see each time the worker started the flow.
- **View outcomes:** see the data the flow collected for each run.
- **Pause** or **Resume:** stop the worker for now, or start it again.
- **Delete worker:** remove the worker.

### Statuses

| Status | Meaning |
| --- | --- |
| **Active** | Matching messages or events start the flow. |
| **Paused** | Stopped for now. Nothing starts until you resume it. |
| **Draft** | Saved, but not activated yet. |
| **Completed** | Its active dates have ended. |

## Pause, resume or delete a worker

- To stop a worker for now, click **Pause**. Click **Resume** to start it again.
- To remove a worker, click **Delete worker** and confirm with **Delete worker**. Click **Keep worker** to cancel.

Pause a worker instead of deleting it if you may need it again. You can't delete a flow while a worker uses it; delete its workers first.

## Update to a new flow version

A worker runs the flow version it was set up with. When you publish a newer version of the flow, the worker shows **New version available**. Click **Update to vN** (for example **Update to v3**) to run the new version. Until you do, customers keep getting the version the worker already runs.

See [Versions, publishing and JSON files](versions-and-portability.md).

## See also

- [Build your first flow](building-a-flow.md)
- [Choose the trigger](triggers-and-variables.md)
- [Assign agent](nodes/audience-actions.md#assign-agent)
- [Saved data](saved-data.md)
