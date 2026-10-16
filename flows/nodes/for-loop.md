# Start loop and End loop

Repeat the same steps for every item in a list, such as each product in an order.

## When to use it

Use a loop when the trigger or an API response contains a list and you want to act on each item. When Rangoli Store's order system sends an order with two items, a loop sends one message per item, "Brass diya set: shipped" and then "Cotton kurta: shipped", and then one closing message after the loop.

The examples below use this order:

```json
{
  "items": [
    { "name": "Brass diya set", "quantity": 2 },
    { "name": "Cotton kurta", "quantity": 1 }
  ]
}
```

## Set it up

1. Add **Start loop** from **Logic Blocks** and open it.
2. In **Specify list**, use Insert Variable to select the whole list, such as **Trigger** → **items**, not a single item. See [Choose one item or the whole list](flows/using-variables.md?id=choose-one-item-or-the-whole-list).
3. To cap how many items are processed, select **Limit the loop to a defined count.** and enter **Set the loop limit**.
4. Click **Save**.
5. Add the steps to repeat, such as a Text message. In it, insert the current item's fields from **Start loop** in Insert Variable, such as `{{loop.item.name}}`, rather than the trigger's first item.
6. Add **End loop** after the repeated steps.

Inside the loop, `loop.item` is the current item and `loop.index` is its position, starting at 0. On the first pass `{{loop.item.name}}` is "Brass diya set", and on the second it's "Cotton kurta".

## Connect it

Connect **Start loop** → the repeated steps → **End loop**. Then connect End loop's **Next step** to what should happen once, after every item, or to **End**.

Always draw connections forward. The loop nodes handle the repetition, so don't connect a step back to Start loop.

## See also

- [Repeat until](flows/nodes/repeat-until.md), to repeat until a condition is met
- [Select and insert variables](flows/using-variables.md)
- [A repeated sequence never reaches the intended result](help/troubleshooting.md?id=a-repeated-sequence-never-reaches-the-intended-result)
