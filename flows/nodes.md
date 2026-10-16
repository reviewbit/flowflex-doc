# Node reference

Find the node for each job in your flow, and open its page for setup steps and examples.

A node is one step in a flow. The builder's toolbox groups nodes into **WhatsApp Blocks**, **Logic Blocks**, **Data Blocks**, **Audience Blocks** and **Other Blocks**. Every flow also has a **Trigger** and an **End**, which aren't in the toolbox.

Rangoli Store's order-tracking flow uses a node from most groups: a **Button message** to offer **Track order** and **Talk to the team**, an **API** node to look up the order, a **Text message** for the status, and **Assign agent** to hand the chat to the team.

Some settings work the same way in many nodes. See [Select and insert variables](flows/using-variables.md), [Set up WhatsApp messages](flows/whatsapp-message-setup.md), [Choose files and media](flows/files-and-media.md) and [Set conditions and choose paths](flows/setting-conditions.md).

## WhatsApp Blocks

- **[Text message](flows/nodes/text-message.md):** send free-form text.
- **[Template message](flows/nodes/template-message.md):** send an approved template.
- **[Button message](flows/nodes/button-message.md):** send quick-reply buttons, with a path for each button.
- **[List message](flows/nodes/list-message.md):** send a menu of choices, with a path for each row.
- **[Media message](flows/nodes/media-message.md):** send an image, video, audio file or document.
- **[Send location](flows/nodes/send-location.md):** send a location pin.
- **[Location request](flows/nodes/location-request.md):** ask the customer to share a location.
- **[Link button](flows/nodes/link-button.md):** open a web page from a message button.

Several of these can wait for the customer's answer. See [Waiting for a reply](flows/response-wait.md).

## Logic Blocks

- **[Condition split](flows/nodes/condition-split.md):** route to Yes or No.
- **[Condition branch](flows/nodes/condition-branch.md):** route to one of several named paths.
- **[Start loop / End loop](flows/nodes/for-loop.md):** repeat steps for each item in a list.
- **[Repeat until](flows/nodes/repeat-until.md):** repeat steps until a condition is met or the attempt limit is reached.

Condition split and Condition branch can also check a contact's tags as they are when the flow runs. See [Contact-tag conditions](flows/nodes/contact-tag-conditions.md).

## Data Blocks

- **[API](flows/nodes/api.md):** call another service, set retries, and take a different path for each response outcome.
- **[Save data](flows/nodes/save-data.md):** add a row to a [Saved data](flows/saved-data.md) table.

## Audience Blocks

- **[Save tag](flows/nodes/audience-actions.md?id=save-tag):** add or remove a customer's tags.
- **[Save audience](flows/nodes/audience-actions.md?id=save-audience):** create a contact or update its profile fields.
- **[Add Note](flows/nodes/audience-actions.md?id=add-note):** save a private note on the conversation.
- **[Assign agent](flows/nodes/audience-actions.md?id=assign-agent):** hand the conversation to a specific agent, by round robin, or to the least busy agent.

## Other Blocks

- **[Set time delay](flows/nodes/set-time-delay.md):** pause before continuing.
- **[Save variable](flows/nodes/save-variable.md):** store named values for this run of the flow.
- **[Utils function](flows/nodes/utils-function.md):** work out a distance, or find place names in text.

## Trigger, End and outputs

Every flow has one **Trigger**, which starts it, and one **[End](flows/nodes/end.md)**, which finishes it. See [Choose the trigger](flows/triggers-and-variables.md).

Every output a node shows must connect to another node or to End:

- **Next step:** the usual way on.
- **One output per button, row or condition:** for choices and branches.
- **No response:** when the node waits for a reply.
- **Success**, **Non-2xx response** and **Request failed:** on new API nodes.

An unconnected output is an error, which you fix before saving. See [Build your first flow](flows/building-a-flow.md).

## See also

- [Workflows overview](flows/overview.md)
- [Build your first flow](flows/building-a-flow.md)
- [Troubleshooting](help/troubleshooting.md)
