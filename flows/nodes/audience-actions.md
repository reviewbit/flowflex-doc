# Audience actions

Audience Blocks update the contact or conversation without sending a customer-facing message. Set **Contact number**, usually using the trigger's number from **Insert Variable**. Every action has a **Next step** output.

## Save tag

Choose **Add tag(s)** or **Remove tag(s)** and select one or more customer tags. Record interest, qualify a lead, or remove an old status.

A later [contact-tag condition](flows/nodes/contact-tag-conditions.md) reads the contact's current tags.

## Save audience

Save profile values against a contact, creating the contact if the number is not already in your audience.

Under **Columns**, select an existing column or type a new name, then map a literal or variable value. Add rows for more fields. This updates the contact profile; [Save data](flows/nodes/save-data.md) writes rows to a separate flow data table.

## Add Note

Set **Contact number** and **Note**. Notes support multiline text and variables.

The note appears privately in the customer's conversation for your team to read. For example, save “Customer asked for a callback tomorrow” before assigning an agent. The customer does not receive this note.

Use this step for a contact with an existing conversation.

## Assign agent

| Strategy | Behavior |
| --- | --- |
| **A specific agent** | Pick an active, eligible agent in this branch. |
| **Round robin** | Assign the next agent in the branch rotation. |
| **Least busy** | Assign an agent with the fewest open chats. |

Enable **Don't reassign if this chat already has an agent** to keep its assignment. If the existing agent has left the branch, the selected strategy is used. Rotation currently covers the whole branch.

Connect **Next step** to the action you want after assignment, or to End if the handoff finishes the flow.
