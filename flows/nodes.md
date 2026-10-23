---
description: "Find the node for each job in your flow, and open its page for setup steps and examples."
---

# Node reference

A node is one step in a flow. The builder's toolbox groups nodes into **WhatsApp Blocks**, **Logic Blocks**, **Data Blocks**, **Audience Blocks** and **Other Blocks**. Every flow also has a **Trigger** and an **End**, which aren't in the toolbox.

Rangoli Store's order-tracking flow uses a node from most groups: a **Button message** to offer **Track order** and **Talk to the team**, an **API** node to look up the order, a **Text message** for the status, and **Assign agent** to hand the chat to the team.

Some settings work the same way in many nodes. See [Select and insert variables](using-variables.md), [Set up WhatsApp messages](whatsapp-message-setup.md), [Choose files and media](files-and-media.md) and [Set conditions and choose paths](setting-conditions.md).

## WhatsApp Blocks

- **[Text message](nodes/text-message.md):** send free-form text.
- **[Template message](nodes/template-message.md):** send an approved template.
- **[Button message](nodes/button-message.md):** send quick-reply buttons, with a path for each button.
- **[List message](nodes/list-message.md):** send a menu of choices, with a path for each row.
- **[Media message](nodes/media-message.md):** send an image, video, audio file or document.
- **[Send location](nodes/send-location.md):** send a location pin.
- **[Location request](nodes/location-request.md):** ask the customer to share a location.
- **[Link button](nodes/link-button.md):** open a web page from a message button.

Several of these can wait for the customer's answer. See [Waiting for a reply](response-wait.md).

## Logic Blocks

- **[Condition split](nodes/condition-split.md):** route to Yes or No.
- **[Condition branch](nodes/condition-branch.md):** route to one of several named paths.
- **[Start loop / End loop](nodes/for-loop.md):** repeat steps for each item in a list.
- **[Repeat until](nodes/repeat-until.md):** repeat steps until a condition is met or the attempt limit is reached.
- **[Wait for agent reply](nodes/wait-for-agent-reply.md):** branch on whether a team member replies in time.

Condition split and Condition branch can also check a contact's tags as they are when the flow runs. See [Contact-tag conditions](nodes/contact-tag-conditions.md).

## Data Blocks

- **[API](nodes/api.md):** call another service, set retries, and take a different path for each response outcome.
- **[Save data](nodes/save-data.md):** add a row to a [Saved data](saved-data.md) table.

## Audience Blocks

- **[Save tag](nodes/audience-actions.md#save-tag):** add or remove a customer's tags.
- **[Save audience](nodes/audience-actions.md#save-audience):** create a contact or update its profile fields.
- **[Add Note](nodes/audience-actions.md#add-note):** save a private note on the conversation.
- **[Assign agent](nodes/audience-actions.md#assign-agent):** hand the conversation to an agent: chosen in each worker, by round robin, or the least busy agent.

## Other Blocks

- **[Set time delay](nodes/set-time-delay.md):** pause before continuing.
- **[Save variable](nodes/save-variable.md):** store named values for this run of the flow.
- **[Utils function](nodes/utils-function.md):** work out a distance, or find place names in text.

## Trigger, End and outputs

Every flow has one **Trigger**, which starts it, and one **[End](nodes/end.md)**, which finishes it. See [Choose the trigger](triggers-and-variables.md).

Every output a node shows must connect to another node or to End:

- **Next step:** the usual way on.
- **One output per button, row or condition:** for choices and branches.
- **No response:** when the node waits for a reply.
- **Success**, **Non-2xx response** and **Request failed:** on new API nodes.
- **Agent replied** and **No agent reply:** on Wait for agent reply.

An unconnected output is an error, which you fix before saving. See [Build your first flow](building-a-flow.md).

## See also

- [Workflows overview](overview.md)
- [Build your first flow](building-a-flow.md)
- [Troubleshooting](../help/troubleshooting.md)
