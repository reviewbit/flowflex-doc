# Start loop and End loop: repeat over a list

Use these two nodes to repeat a sequence for every item in an order or every result in an API list.

## Example: send each ordered item's name

The trigger contains this list:

```json
{
  "items": [
    { "name": "Notebook", "quantity": 2 },
    { "name": "Pen", "quantity": 1 }
  ]
}
```

1. Add **Start loop** from Logic Blocks and open it.
2. In **Specify list**, open Insert Variable and select Trigger → items as the complete list.
3. Optionally enable **Limit the loop** and set a maximum number of items to process.
4. Save changes and add the action to repeat, for example a Text message.
5. In that message, choose the Start loop's current item fields through Insert Variable rather than selecting the trigger's first item.
6. Add **End loop**.
7. Connect Start loop → repeated action → End loop.
8. Connect End loop → the action that follows all items, or End.

The message runs once for Notebook and once for Pen. A message after End loop runs once after the whole list.

## Current item and position

Within the loop, the current item is available as `loop.item` and its position as `loop.index`, starting at zero. For this sample, `{{loop.item.name}}` is Notebook on the first pass and Pen on the second.

Use [the variable guide](flows/using-variables.md#choose-one-item-or-the-whole-list) for selecting lists and nested fields.

## Before publishing

Check Specify list selects a list rather than one item, use a loop limit when the list could be large, and connect End loop to a clear continuation. Draw connections forward; the loop nodes handle repetition.

For repeated attempts that stop when a rule matches, use [Repeat until](flows/nodes/repeat-until.md).
