# Select and insert variables

Variables fill a field with information from the customer, the event that started the flow, or an earlier step. Use them to send each customer's own order number, reply to the correct person, or choose a path based on an API result.

You do not need to type a JSON path to use a variable. **Insert Variable** opens a picker where you choose the information you want.

## Insert a variable into a field

1. Open the node you want to configure.
2. Click the field that should use customer-specific information.
3. Open **Insert Variable**. In the API drawer, use the field's actions menu → **Insert variable**.
4. In **Select Variable**, choose **Trigger** or the earlier node that supplies the information.
5. Open the relevant fields until you reach the value you need, then select it.
6. Check that a variable chip appears in your field, and click **Save changes** in the node drawer.

For **Destination number**, select just the phone number. For a message, you can mix ordinary text and variables: type `Hi `, insert the customer's name, then type the rest of your greeting.

The value shown in the picker is an example. Each real flow run uses the information for that customer.

## Select a field from nested JSON

Suppose an order event has this sample:

```json
{
  "customer": { "name": "Alex", "phone": "919000000001" },
  "order": { "number": "ORD-1042", "total": 1250 },
  "items": [
    { "name": "Notebook", "quantity": 2 },
    { "name": "Pen", "quantity": 1 }
  ]
}
```

Choose fields as follows:

| What you want | Choices in Select Variable | Where to use it |
| --- | --- | --- |
| Customer's number | Trigger → customer → phone | Destination number |
| Customer's name | Trigger → customer → name | Greeting or template placeholder |
| Order number | Trigger → order → number | Message or API request |
| Order total | Trigger → order → total | A number condition |
| The complete item list | Trigger → items, in a list-selection field | Start loop → Specify list |

For the name, the inserted reference represents `{{trigger.customer.name}}`. Selecting it through the picker avoids typing mistakes.

**Search key...** filters the fields in the level you are viewing. If the field is nested, open its parent first. Use the back arrow or breadcrumbs to return to an earlier level.

## Choose one item or the whole list

A list contains several items. Selecting the first item's name gives you only that item's name; it does not repeat the message for every item.

To process all items, add a **Start loop** and choose the complete list in **Specify list**. The picker offers list selection for fields that require a list. Inside the loop, use the current item's fields. See [Repeat over a list](flows/nodes/for-loop.md).

## Use an API response

1. Configure and save the API node with a response example.
2. Place the message or condition after the API's appropriate response output.
3. Open Insert Variable and choose that API node.
4. Choose the relevant response example, such as **200**, then open its nested fields.
5. Select the value you need, such as **order → delivery_date**.

For example, given this response:

```json
{
  "order": { "number": "ORD-1042", "status": "ready", "delivery_date": "12 October" }
}
```

Choose the API node → 200 → order → delivery_date to personalize a delivery message. The example helps you find the field; the service supplies the actual delivery date when the flow runs.

An error response can have different fields. On an error path, select fields from that error example rather than assuming the success fields exist. See [Set up an API request](flows/nodes/api.md).

## Fill a template placeholder

Template placeholders such as `{{1}}` are positions in the approved message. You fill each position with a value:

| Approved message | Fill this field | Select this value |
| --- | --- | --- |
| `Hi {{1}}, order {{2}} is confirmed.` | Body `{{1}}` | Trigger → customer → name |
| Same message | Body `{{2}}` | Trigger → order → number |

The customer then receives “Hi Alex, order ORD-1042 is confirmed.” Use the picker inside each placeholder field; you do not need to rewrite the approved message. See [Template message](flows/nodes/template-message.md).

## Use a customer's reply

Enable response waiting on the question node and save it first. In a later node, choose that question in Insert Variable and select the captured reply. Use the reply path rather than the No response path for steps that need an answer.

For example, ask for an email address, enable **Check format → Email**, then use the saved reply in Save audience. See [Wait for and validate a reply](flows/response-wait.md).

## If a field is missing

- For a custom trigger, check its sample includes the field you need. See [Set up the trigger](flows/triggers-and-variables.md).
- For an API, add or update its response example and save the node.
- For a reply, enable response waiting and save the question node.
- Confirm you selected the correct source and opened the correct nested object.
- Use a condition to handle optional information before using it in a message.

Changing a node's display label keeps its Variable reference. Use the picker when replacing a field or changing the source of a value.
