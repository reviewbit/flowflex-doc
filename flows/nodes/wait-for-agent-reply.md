---
description: "Wait a set time for someone on your team to reply to the customer, then take one path if they did and another if nobody did."
---

# Wait for agent reply

Branch your flow on whether a team member replies to the customer in time.

**Wait for agent reply** sits in **Logic Blocks**. It waits up to the time you set and watches the contact who started the flow. As soon as an agent messages that contact, the flow continues on **Agent replied**. If nobody replies in time, it continues on **No agent reply**.

## When to use it

Use it after you hand a chat to your team, so a customer is never left waiting without an answer. When Emma Brown taps **Talk to the team**, Rangoli Store's flow assigns the chat to an agent, then waits 15 minutes. If Chris Taylor replies within that time, the flow ends there. If nobody replies, the flow sends "Sorry for the wait, we'll get back to you within the hour", or assigns the chat to someone else.

Messages the flow sends itself don't count as a reply. Only replies from your team in **Conversations** count, plus replies from the WhatsApp Business app if you allow them.

The node watches the contact who started the flow, so use it in flows started by **WhatsApp Incoming Chat**.

## Set it up

1. Add **Wait for agent reply** from **Logic Blocks**, usually after **Assign agent**, and open it.
2. In **Wait for**, enter a whole number, such as `15`, and choose the **Unit**: **Minutes**, **Hours** or **Days**. The wait must be between 1 minute and 7 days.
3. Under **Who counts as a reply**, choose **Any agent** or **Only the assigned agent**.
4. Leave **Count replies from the WhatsApp Business app** ticked if your team also replies from the phone. Replies sent from the phone can't be traced to one agent, so they count for both options above. Untick it to ignore them.
5. Check the summary at the bottom of the drawer. For Rangoli Store it reads that **Agent replied** runs right away when any agent messages the contact within 15 minutes, and **No agent reply** runs after 15 minutes if nobody replied.
6. Click **Save**.

On the canvas, the node shows a summary such as "Waits 15 minutes for any agent".

If the drawer shows an error, check the wait:

| Message | Fix |
| --- | --- |
| **Enter how long to wait.** | Enter a number in **Wait for**. |
| **Enter a whole number of 1 or more.** | Use a whole number, such as `15`. |
| **Wait at least 1 minute.** | Make the wait longer. |
| **Wait at most 7 days.** | Make the wait shorter. |

## Connect it

The node has two outputs. Connect both before you publish:

- **Agent replied:** the next step when someone replied in time, often **End**.
- **No agent reply:** the fallback, such as an apology message or another **Assign agent** step.

> [!WARNING]
> More than 24 hours after the customer's latest message, WhatsApp only allows template messages. If the wait is longer than 24 hours, use a [Template message](template-message.md) on the **No agent reply** path. The builder warns you when you publish if a free-form message follows a longer wait.

## See also

- [Assign agent](audience-actions.md#assign-agent)
- [Set time delay](set-time-delay.md)
- [The 24-hour reply window](../whatsapp-message-setup.md#the-24-hour-reply-window)
- [Node reference](../nodes.md)
