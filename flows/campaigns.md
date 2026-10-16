# Campaigns

A campaign switches on a published flow so that incoming WhatsApp messages start it. You find campaigns under **Automations** → **All campaigns**, on the **Auto Campaign** page.

> [!NOTE]
> Flow builder is in Beta. If you don't see it in the sidebar, contact FlowFlex support.

## How a campaign works

1. You build a flow whose trigger is **WhatsApp Incoming Chat**, and publish it. See [Choose the trigger](flows/triggers-and-variables.md).
2. You create a campaign for that flow and set its dates.
3. While the campaign is **Active**, a customer's message on the flow's channel starts the flow for that customer.

Each contact goes through a campaign once. A second message from the same contact does not restart it until the campaign's end date passes.

The START and STOP keywords from [Subscription Auto Replies](messaging/settings.md#subscription-auto-replies) never start a campaign.

> [!TIP]
> To react only to certain words, such as "price" or "offer", set a **Trigger filter** on the flow's incoming-message trigger. See [Choose the trigger](flows/triggers-and-variables.md).

## The campaign list

<img src="assets/flows/campaigns-list.png" alt="The Auto Campaign list">

| Column | Shows |
| --- | --- |
| **Campaign name** | Click it to open **Campaign Outcomes**. |
| **Status** | **Active**, **Paused**, **Draft**, or **Completed**. |
| **Actions** | The **⋯** menu. |

Use **Search by name** to find a campaign. Use **Filter by Status** to show one or more statuses.

### Statuses and actions

| Status | Meaning | **⋯** menu |
| --- | --- | --- |
| **Active** | Incoming messages start the flow. | **Pause**, **Delete** |
| **Paused** | Stopped for now. Nothing starts. | **Resume**, **Delete** |
| **Draft** | Saved, but publishing did not finish. | **Publish**, **Delete** |
| **Completed** | Finished. | **Delete** |

> [!WARNING]
> **Delete** runs at once, with no confirmation. Pause a campaign instead if you may need it again.

If you resume a campaign whose flow is switched off, you see **Campaign not resumed**. Activate the flow under **Flow builder** first, then click **Resume** again.

### Paused by plan

Your plan limits how many flows can be on. If a flow is switched off because the limit is exceeded, its Active campaigns pause automatically. They show **Paused** with **by plan** next to it.

Upgrade your plan or switch off another flow. When the flow comes back on, these campaigns resume by themselves. Campaigns you paused by hand stay paused.

## Create a campaign

Click **Create new campaign**. The wizard has three steps: **Details & flow** → **Duration** → **Review & publish**. Click **Watch a demo** for a short walkthrough first.

### 1. Details & flow

| Field | Rule |
| --- | --- |
| **Campaign name** | Required. Must be unique in the branch, such as `Rangoli Store – Diwali enquiries`. |
| **Description** | Optional. A note for your team. |
| **Select flow** | Required. Only active flows with the WhatsApp incoming-message trigger are listed. Use **Search flows** to find one. |

Flows marked **Not published** cannot be picked. Publish them first. See [Versions, publishing and JSON files](flows/versions-and-portability.md).

The preview on the right shows the flow's published version, read-only. Click **Expand preview** for a larger view. Click **Continue**.

### 2. Duration

| Field | Rule |
| --- | --- |
| **Start date** | Required. |
| **Run for** | Required. **1 week**, **2 weeks**, **3 weeks**, **4 weeks**, or **Custom**. The default is **1 week**. FlowFlex shows the end date, such as "Ends 22 Oct 2026". |
| **End date** | Shown for **Custom** only. Required, and must be on or after the start date. |

Click **Review campaign**.

### 3. Review & publish

1. Check the **Campaign summary**: **Campaign**, **Published flow**, **Start date**, and **End date**.
2. Check the flow preview.
3. Click **Publish campaign**.

FlowFlex shows **Campaign published.** and the campaign becomes **Active**. If you see **Campaign saved, but publishing did not finish**, the campaign is kept as a **Draft**. Fix the issue, then use **⋯** → **Publish**.

Publishing fails if the flow is inactive, not published, or switched off by your plan's flow limit.

> [!NOTE]
> A campaign runs the flow version that was published when you published the campaign. Later changes to the flow do not reach the campaign on their own.

## Campaign Outcomes

Click a campaign's name to open **Campaign Outcomes**. It shows one row for each time the flow ran for a contact, with the data the flow collected.

| Tool | What it does |
| --- | --- |
| **Select column** + search | Pick a column, then search inside it. |
| **Filter** | Build conditions on the columns, then click **Apply Filter**. |
| **Clear All Filters** | Removes the search and filters. |
| **Show Columns** | Choose which columns are shown. |
| **Export CSV** | Downloads the outcomes. |

Related: [Saved data](flows/saved-data.md), [Audience actions](flows/nodes/audience-actions.md).
