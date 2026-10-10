# Condition split: choose Yes or No

Use Condition split for a decision with two outcomes, such as whether an order is paid or whether a reply is valid.

## Example: offer priority support for larger orders

1. Add **Condition split** after the step that supplies the order information.
2. Open the node and give it a clear label, such as “Large order?”.
3. Add a condition and use Insert Variable to select the order total.
4. Choose a number comparison: **greater than**.
5. Enter `1000` as the comparison value.
6. Save changes.
7. Connect **Yes** to the priority-support action and **No** to the standard action or End.

The value in this example is a rule you choose, not a built-in threshold. Select the actual total field available in your event or API response.

## Add more rules

Use **AND** when all rules must match, or **OR** when any one is enough. For example, total is above 1000 AND payment is confirmed.

For a customer's reply, use a text operator; for an optional field, check whether it exists first. See [Set conditions](flows/setting-conditions.md) for field types and rule groups.

## Check contact tags

Choose Contact tags to route customers with particular tags. See [Contact-tag conditions](flows/nodes/contact-tag-conditions.md).

## Before publishing

Connect both Yes and No, check the field type and comparison, and decide what should happen when the rule does not match. Use [Insert Variable](flows/using-variables.md) to avoid selecting a sample field from the wrong source.
