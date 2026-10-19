# Condition split

Check a rule and send the flow down a **Yes** or a **No** path.

## When to use it

Use a condition split for a decision with two outcomes. Rangoli Store offers priority support on large orders: if the order total is greater than 5000, the chat goes to an agent straight away; otherwise the customer gets the standard reply. The threshold is a rule you choose, not a built-in value.

## Set it up

1. Add **Condition split** from **Logic Blocks** after the step that supplies the value, and open it.
2. Click **Add condition** and select the field with Insert Variable, such as the order total from the trigger or an API response.
3. Choose an operator that matches the field type, such as **Greater than** for a number, and enter the value, such as `5000`.
4. To check more than one thing, add more conditions and choose how they combine: AND (all must match) or OR (any one is enough). For example, total is greater than 5000 AND payment is confirmed.
5. Click **Save**.

Use a text operator for a customer's reply, and check that an optional field exists before comparing it. See [Set conditions and choose paths](../setting-conditions.md). To check a contact's tags instead, see [Contact-tag conditions](contact-tag-conditions.md).

## Connect it

Connect **Yes** to the step for a match and **No** to the step for everything else. Rangoli Store connects **Yes** to **Assign agent** and **No** to the standard message.

## See also

- [Condition branch](condition-branch.md), for more than two outcomes
- [Set conditions and choose paths](../setting-conditions.md)
- [Select and insert variables](../using-variables.md)
