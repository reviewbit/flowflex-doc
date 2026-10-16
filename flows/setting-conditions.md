# Set conditions and choose paths

Conditions let the flow decide what to do using an order value, API result, customer reply, or contact tag.

## Add a rule

1. Open a Condition split, Condition branch, or Repeat until node.
2. Add or open a condition rule.
3. Select the field with [Insert Variable](flows/using-variables.md).
4. Choose an operator that matches the field's type.
5. Enter the value to compare, if the operator needs one.
6. Save the node and connect its outputs.

For **Contact tags**, choose the contact number and selected tags instead. See [Contact-tag conditions](flows/nodes/contact-tag-conditions.md).

## Match the operator to the value

| Value | Example rule |
| --- | --- |
| Number | Order total is greater than 1000. |
| Text | Order status equals `ready`. |
| Boolean | Payment confirmed is true. |
| Date | Delivery date is after the selected date. |
| List | Item list is empty. |
| Optional field | Email exists before including it in a message. |

For customer replies, choose case-insensitive text matching when capitalization should not matter. A numeric value and the text `"1000"` may require different comparisons; select the correct field and type.

## Combine rules

- **AND** means every rule must match. Example: total is above 1000 AND payment is confirmed.
- **OR** means any rule may match. Example: status is ready OR status is dispatched.

If you use several groups, check the AND/OR setting within each group and between groups.

## Choose the right node

- **Condition split** gives you Yes and No, including an explicit route for unmatched cases.
- **Condition branch** checks named paths in order and uses the first matching path. Condition branch has no default path. Use a Condition split if you need a fallback.
- **Repeat until** uses a condition to decide when to stop repeating.

Connect every displayed path. For guaranteed fallback routing, use a Condition split's No output.
