---
description: "Send the flow down one of several paths, depending on which set of rules matches first."
---

# Condition branch

## When to use it

Use a condition branch when there are more than two outcomes. After Rangoli Store's API node looks up an order, a condition branch checks the status: **Path 1** for `shipped` sends tracking details, and **Path 2** for `processing` tells the customer the order is being packed. For a simple Yes or No, use a [Condition split](condition-split.md).

## Set it up

1. Add **Condition branch** from **Logic Blocks** after the step that supplies the value, and open it.
2. In **Path 1**, click **Add condition**. Select the field with Insert Variable, such as the API's order status, choose an operator, and enter the value, such as `shipped`.
3. In **Path 2**, add the rules for the next outcome, such as `processing`.
4. Click **Add path** for each further outcome you need.
5. Click **Save**.

Each path can hold several rules and condition groups, combined with AND or OR. See [Set conditions and choose paths](../setting-conditions.md). To route by a contact's tags, see [Contact-tag conditions](contact-tag-conditions.md).

## Connect it

The node has one output per path. Connect each one to its next step.

Paths are checked in order and the first match wins, so put specific rules before broad ones. There is no "anything else" path. If a value might match none of your paths, put a [Condition split](condition-split.md) before the branch that checks for the expected values, and connect its **No** output to a fallback such as **Assign agent**.

## See also

- [Condition split](condition-split.md)
- [Set conditions and choose paths](../setting-conditions.md)
- [The wrong condition path runs](../../help/troubleshooting.md#the-wrong-condition-path-runs)
