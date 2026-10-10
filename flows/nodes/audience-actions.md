# Audience actions: organize contacts and hand conversations to your team

These actions use **Contact number** to identify the customer. For WhatsApp Incoming Chat, select Trigger → from. For another event, choose its customer phone field. See [Select and insert variables](flows/using-variables.md).

## Save tag

Use Save tag to mark interest or remove an old status.

1. Add **Save tag** from Audience Blocks and open it.
2. Set Contact number using the customer's phone variable.
3. Choose **Action → Add tag(s)** or **Remove tag(s)**.
4. Select one or more tags, such as Interested.
5. Save changes and connect Next step.

Example: after the customer chooses “Tell me more”, add Interested, then send the details. A later condition can check the contact's current tags; see [Contact-tag conditions](flows/nodes/contact-tag-conditions.md).

Check the tags already exist and belong to your customer-tag list. Adding a tag does not itself send a message; connect a message node if you want one next.

## Save audience

Use Save audience to save collected information to the contact profile, creating the contact if it is not already in your audience.

1. Add **Save audience** after the step supplying the information.
2. Set Contact number with the customer's phone variable.
3. Under **Columns**, choose an existing column or type a new name.
4. For its value, insert the captured reply or another value.
5. Add more rows for additional profile fields.
6. Save changes and connect Next step.

Example: collect an email address with a waiting Text message, then map its captured reply to the email column. Use an existing column when it already represents the information to avoid duplicate profile fields.

For a separate reporting table, use [Save data](flows/nodes/save-data.md). See [Response waiting](flows/response-wait.md) before mapping an answer.

## Add Note

Use Add Note to give your team context without sending it to the customer.

1. Add **Add Note** in a flow that has an existing customer conversation.
2. Set Contact number.
3. Write **Note**, such as “Customer requested a callback tomorrow.”
4. Insert any useful customer answer or order details.
5. Save changes and connect Next step, for example to Assign agent.

The note appears privately in the conversation. It supports several lines of text. If there is no matching conversation, a note cannot be added; use this action for a conversation that already exists.

## Assign agent

Use Assign agent to hand the customer conversation to a person on your team.

1. Add **Assign agent** and set Contact number.
2. Choose **Assign to** using the options below.
3. For A specific agent, select the agent.
4. Enable **Don't reassign if this chat already has an agent** when returning customers should stay with their current agent.
5. Save changes and connect Next step to End or the action that follows the handoff.

| Option | When to use it |
| --- | --- |
| A specific agent | A particular person handles this request. |
| Round robin | Share assignments across the branch's eligible agents in rotation. |
| Least busy | Assign an agent with the fewest open chats. |

If the current agent has left the branch, the configured strategy is used. Check the selected agent is active and belongs to the current branch.

Assigning an agent does not remove subsequent flow steps. Connect End if the automated sequence should finish at the handoff.
