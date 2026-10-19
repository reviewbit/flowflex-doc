# Select and insert variables

Fill any field with a customer's own details, such as their name, phone number or order status.

A variable is a value the flow fills in when it runs. It can come from the event that started the flow, from the customer's reply, or from an earlier step such as an API call. You don't type a path to use one: **Insert Variable** opens a picker where you choose the value.

In Rangoli Store's order-tracking flow, one status message serves every customer. When John Smith taps **Track order**, the API looks up the order and the message reads "Hi John Smith, order ORD-1042 arrives on 12 October." For Jane Doe, the same message shows Jane Doe's order and date.

## Insert a variable into a field

1. Open the node you want to set up.
2. Click the field that should use customer-specific information.
3. Open **Insert Variable**. In the API drawer, use the field's actions menu → **Insert variable**.
4. In **Select Variable**, choose **Trigger** or the earlier node that supplies the information.
5. Open the fields until you reach the value you need, then select it.
6. Check that a variable chip appears in your field, then click **Save changes** in the node drawer.

For **Destination number**, select only the phone number. In a message, you can mix text and variables: type `Hi `, insert the customer's name, then type the rest of your greeting.

The value shown in the picker is an example. Each real run uses that customer's information.

## Select a field from nested JSON

Suppose an order event has this sample:

```json
{
  "customer": { "name": "John Smith", "phone": "919000000001" },
  "order": { "number": "ORD-1042", "total": 1250 },
  "items": [
    { "name": "Silk saree", "quantity": 2 },
    { "name": "Cotton dupatta", "quantity": 1 }
  ]
}
```

Choose fields like this:

| What you want | Choices in Select Variable | Where to use it |
| --- | --- | --- |
| Customer's number | Trigger → customer → phone | Destination number |
| Customer's name | Trigger → customer → name | Greeting or template placeholder |
| Order number | Trigger → order → number | Message or API request |
| Order total | Trigger → order → total | A number condition |
| The complete item list | Trigger → items, in a list-selection field | Start loop → Specify list |

For the name, the inserted reference stands for `{{trigger.customer.name}}`. Selecting it in the picker avoids typing mistakes.

**Search key...** filters the fields at the level you're viewing. If the field is nested, open its parent first. Use the back arrow or the breadcrumbs to go back up a level.

## Choose one item or the whole list

A list holds several items. Selecting the first item's name gives you only that one name. It doesn't repeat the message for every item.

To work through all the items, add a **Start loop** and choose the complete list in **Specify list**. The picker offers list selection in fields that need a list. Inside the loop, use the current item's fields. See [Repeat over a list](nodes/for-loop.md).

## Use an API response

1. Set up and save the API node with a response example.
2. Place the message or condition after the API's matching response output.
3. Open **Insert Variable** and choose that API node.
4. Choose the response example, such as **200**, then open its nested fields.
5. Select the value you need, such as **order** → **delivery_date**.

For example, with this response:

```json
{
  "order": { "number": "ORD-1042", "status": "shipped", "delivery_date": "12 October" }
}
```

Choose the API node → **200** → **order** → **delivery_date** to put the date in Rangoli Store's status message. The example helps you find the field. When the flow runs, the service supplies the real date.

An error response can have different fields. On an error path, select fields from that error example rather than assuming the success fields exist. See [API](nodes/api.md).

## Fill a template placeholder

Template placeholders such as `{{1}}` are positions in the approved message, and you fill each one with a value. For the approved message `Hi {{1}}, order {{2}} is confirmed.`:

- **Body `{{1}}`:** select **Trigger** → **customer** → **name**.
- **Body `{{2}}`:** select **Trigger** → **order** → **number**.

The customer then receives "Hi John Smith, order ORD-1042 is confirmed." Use the picker in each placeholder field. You don't need to rewrite the approved message. See [Template message](nodes/template-message.md).

## Use a customer's reply

Turn on response waiting on the question node and save it first. In a later node, choose that question in **Insert Variable** and select its reply. Use the reply path, not the **No response** path, for steps that need the answer.

For example, ask for an email address, turn on **Check format** → **Email**, then use the reply in **Save audience**. See [Wait for and validate a reply](response-wait.md).

## If a field is missing

- For a custom trigger, check that its sample includes the field. See [Choose the trigger](triggers-and-variables.md).
- For an API, add or update its response example and save the node.
- For a reply, turn on response waiting and save the question node.
- Check that you selected the right source and opened the right nested object.
- Use a condition to handle optional information before you use it in a message.

Renaming a node's display label keeps its variable references working. Use the picker when you replace a field or change where a value comes from.

## See also

- [Choose the trigger](triggers-and-variables.md)
- [API](nodes/api.md)
- [A variable is missing or has the wrong value](../help/troubleshooting.md#a-variable-is-missing-or-has-the-wrong-value)
