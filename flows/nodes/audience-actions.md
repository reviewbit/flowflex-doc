---
description: "Tag a contact, save details to their profile, leave a note for your team, or hand the chat to an agent, all from inside a flow."
---

# Audience actions

The four audience actions sit in **Audience Blocks**. Each one finds the customer by **Contact number**. For a flow started by an incoming WhatsApp message, insert **Trigger** → **from**; for another trigger, choose its customer phone field. See [Select and insert variables](../using-variables.md).

None of these actions sends a message to the customer. Add a message node after them if the customer should hear something.

## Save tag

Add or remove tags on the contact, so you can find them later or route them differently.

**When to use it:** when Jane Doe taps **Tell me more** on Rangoli Store's Diwali offer, the flow adds the `interested` tag, then sends the details. A later [contact-tag condition](contact-tag-conditions.md) or [segment](../../audience/segments.md) can pick up everyone with that tag.

1. Add **Save tag** and open it.
2. Set **Contact number**, for example **Trigger** → **from**.
3. In **Action**, choose **Add tag(s)** or **Remove tag(s)**.
4. In **Tags**, select one or more tags, such as `interested`.
5. Click **Submit**, then connect **Next step**.

## Save audience

Save information the flow collected to the contact's profile. If the contact isn't in your audience yet, it's created.

**When to use it:** Rangoli Store asks new customers for their email address, then saves the reply to the contact's email field.

1. Add **Save audience** after the step that collects the information, and open it.
2. Set **Contact number**.
3. Under **Columns**, choose a column from **Existing columns** or **Profile fields**, or type a new name.
4. Enter its value, such as the customer's captured reply. See [Use a customer's reply](../using-variables.md#use-a-customers-reply).
5. Click **Add column** for each extra field.
6. Click **Submit**, then connect **Next step**.

Choose an existing column when one already holds that information, so the profile doesn't end up with duplicate fields. To record answers in a table for reporting instead, use [Save data](save-data.md).

## Add Note

Add a private note to the customer's conversation. Your team sees it in the inbox; the customer doesn't.

**When to use it:** before handing a chat to an agent, Rangoli Store adds a note such as "Asked for a callback about order ORD-48213", so the agent has context straight away.

1. Add **Add Note** and open it.
2. Set **Contact number**.
3. Write the **Note**. You can insert variables, such as the customer's answer or an order number.
4. Click **Submit**, then connect **Next step**, for example to **Assign agent**.

The note needs an existing conversation with the customer. Use it in flows that reply to a customer's message.

## Assign agent

Hand the conversation to a person on your team. The chat appears in that agent's inbox.

**When to use it:** in Rangoli Store's order-tracking flow, a customer who taps **Talk to the team** is assigned to an agent, who picks up the chat with the whole conversation in front of them.

1. Add **Assign agent** and open it.
2. Set **Contact number**.
3. In **Assign to**, choose how to pick the agent:
   - **A specific agent:** always assign one person, such as Chris Taylor. Select them in **Agent**.
   - **Round robin (next agent in rotation):** share chats across the branch's agents in turn.
   - **Least busy (fewest open chats):** assign the agent with the fewest open chats.
4. Select **Don't reassign if this chat already has an agent** to keep returning customers with the agent who already knows them.
5. Click **Submit**, then connect **Next step**, usually to **End**.

Only active agents with access to the branch are listed. If a customer's current agent has left the branch, the option you chose in **Assign to** picks a new one. The chat stays with the assigned agent until someone reassigns it in the inbox.

The flow doesn't stop at the handover. Connect **Next step** to **End** if nothing else should happen.

## See also

- [Contact-tag conditions](contact-tag-conditions.md)
- [Save data](save-data.md)
- [Workflows overview](../overview.md)
