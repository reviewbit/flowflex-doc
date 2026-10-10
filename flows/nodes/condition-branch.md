# Condition branch: route across named paths

Use Condition branch when several rules should lead to different actions, such as routing orders by status. The first matching path wins.

## Example: route by order status

1. Add **Condition branch** after the order lookup.
2. Open the node and name its first path “Ready”.
3. Add a rule: select the API's order status, choose a text equals operator, and enter `ready`.
4. Name the second path “Pending” and compare the same field with `pending`.
5. Add further paths only for the outcomes you need.
6. Save changes.
7. Connect each named output to its action, such as Ready → delivery message and Pending → waiting update.

Use [Insert Variable](flows/using-variables.md#use-an-api-response) to select the real field from the correct response example.

## Order your rules

Place specific paths before broader ones. If two paths match, only the first is selected. Check each path's rules and AND/OR groups using [Set conditions](flows/setting-conditions.md).

## Plan for an unmatched value

The current drawer does not add a separate Default output. If you need an explicit fallback for any other status, use a Condition split before the branch to check whether the status is one of the supported values. Connect its No path to help or End.

## Before publishing

Connect every named output and consider a status you did not expect. You can also use [contact-tag conditions](flows/nodes/contact-tag-conditions.md) to route by customer tags.
