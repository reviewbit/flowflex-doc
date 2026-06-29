# Condition split

> A **Yes / No** branch — the flow goes one way if a condition is met, the other way if not.

<div class="img-slot">
  <span class="img-slot-icon">📷</span>
  <strong>Screenshot — the Condition split drawer + Yes/No handles</strong>
  <span>Show the condition builder (field, operator, value) and the node's two handles.</span>
  <span>Save as <code>assets/flows/node-condition-split.png</code></span>
</div>

## What it does

Evaluates one or more conditions and sends the flow down the **Yes** path if they're met,
otherwise the **No** path. Combine multiple conditions with **AND** / **OR**.

## When to use

- Simple two-way decisions: "is the order over ₹1000?", "did they reply 'yes'?", "is the
  customer tagged VIP?".

## Settings

- **Condition(s)** — each is a **field** (a `{{variable}}`), an **operator**, and a **value**.
- **Group logic** — combine multiple conditions with **AND** or **OR**.

**Operators** depend on the field's type:

| Type | Operators |
| --- | --- |
| **Number** | equals, not equals, greater than, greater than or equal, less than, less than or equal |
| **Text** | equals, not equals, contains, does not contain, starts with, does not start with, ends with, does not end with — each **case-sensitive or case-insensitive** |
| **Date / time** | before, on or before, equals, not equals, after, on or after |
| **Boolean** | is true, is false |
| **Array** | contains, does not contain, is empty, is null, is not null |
| **Any** | exists, does not exist, is null, is not null |

## Handles

- **Yes** — condition met.
- **No** — condition not met.

## Example

```
Condition split:  {{trigger.order_total}}  greater than  1000
   ├─ Yes ─▶ Template message "VIP thank-you"
   └─ No  ─▶ Text message "Thanks for your order"
```

## Tips

- For **more than two** outcomes, use a **[Condition branch](flows/nodes/condition-branch.md)**.
- Pick the operator that matches the field type (e.g. case-insensitive text compare for replies).

Next: **[Condition branch »](flows/nodes/condition-branch.md)**
