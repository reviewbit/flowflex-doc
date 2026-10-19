---
description: "Send each customer down the right path, based on an order's details, an API result, a reply or a contact tag."
---

# Set conditions and choose paths

A condition compares a value from the flow with something you choose, such as "order status equals `shipped`". Condition split, Condition branch and Repeat until all use conditions. Each one then takes the path that matches.

In Rangoli Store's order-tracking flow, the API returns the order's status. A Condition branch sends `shipped` orders to a message with the delivery date and `ready` orders to "Your order is packed and ships soon". When Emma Brown's order shows `shipped`, Emma Brown gets the delivery date.

## Add a rule

1. Open a Condition split, Condition branch or Repeat until node.
2. Add or open a condition rule.
3. Select the field with [Insert Variable](using-variables.md).
4. Choose an operator that matches the field's type.
5. Enter the value to compare, if the operator needs one.
6. Save the node and connect its outputs.

For **Contact tags**, choose the contact number and the tags instead. See [Contact-tag conditions](nodes/contact-tag-conditions.md).

## Match the operator to the value

Pick an operator that fits the kind of value you're checking:

- **Number:** the number of items is greater than 3.
- **Text:** the order status equals `ready`.
- **Boolean:** payment confirmed is true.
- **Date:** the delivery date is after the selected date.
- **List:** the item list is empty.
- **Optional field:** the email exists, before you use it in a message.

For customer replies, use case-insensitive text matching when capitals shouldn't matter. A number and the text `"3"` may need different comparisons, so select the right field and type.

## Combine rules

- **AND:** every rule must match. For example, the order has more than 3 items AND payment is confirmed.
- **OR:** any rule can match. For example, the status is `ready` OR the status is `dispatched`.

If you use several groups, check the AND/OR setting inside each group and between the groups.

## Choose the right node

- **Condition split** gives you Yes and No, so cases that don't match always have a path.
- **Condition branch** checks named paths in order and takes the first one that matches. It has no default path. Use a Condition split if you need a fallback.
- **Repeat until** uses a condition to decide when to stop repeating.

Connect every path the node shows. For a guaranteed fallback, use a Condition split's **No** output.

## See also

- [Condition split](nodes/condition-split.md)
- [Condition branch](nodes/condition-branch.md)
- [The wrong condition path runs](../help/troubleshooting.md#the-wrong-condition-path-runs)
