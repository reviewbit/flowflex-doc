# Text message: send a reply or ask a question

Use Text message for a greeting, a simple answer, or a question during an active WhatsApp conversation. Use an approved [Template message](flows/nodes/template-message.md) when messaging outside the reply window.

## Send a personalized greeting

1. Add **Text message** from WhatsApp Blocks and open it.
2. Set a Node label, such as “Welcome”.
3. In **Destination number**, open Insert Variable → Trigger → from for an incoming-chat flow.
4. In **Text message**, type “Hi ”, insert Trigger → name, then type “, how can we help?”
5. Review Live WhatsApp preview.
6. Click **Save changes** and connect Next step to the next action or End.

For a different trigger, choose its customer number and name fields. See [Select and insert variables](flows/using-variables.md).

## Ask a question and use the answer

Write your question, then enable **Wait for specific time** and choose a Unit and Value. If the answer must be an email, number, or specific message type, enable **Check format** and configure the invalid-response text.

Connect Next step to the action that uses the reply and No response to a fallback. Follow [Wait for and validate a reply](flows/response-wait.md) for a complete email-collection example.

## Settings to check

| Field | Purpose |
| --- | --- |
| Destination number | The customer's number, including country code. |
| Text message | The message content; supports variables and up to 4,096 characters. |
| Internal description | Optional explanation for your team. |
| Wait for specific time | Pause for an answer when needed. |

Keep the message clear and check personalized values fit within the limit. For delivery problems, see [WhatsApp troubleshooting](help/troubleshooting.md#a-message-does-not-arrive).
