# Set time delay

> Pause the flow before the next step — by a duration, until a time of day, until a day of
> week, or by a dynamic amount.

<div class="img-slot">
  <span class="img-slot-icon">📷</span>
  <strong>Screenshot — the Set time delay drawer</strong>
  <span>Show the duration value + unit, and the "delay until…" toggles.</span>
  <span>Save as <code>assets/flows/node-set-time-delay.png</code></span>
</div>

## What it does

Holds the flow for a while before running the next node. This is an **unconditional** wait —
unlike [Waiting for a reply](flows/response-wait.md), nothing the customer does ends it early.
The flow isn't burning resources while it waits.

## When to use

- A follow-up "still interested?" message **a day later**.
- Sending something at a **specific time** (e.g. 9am) or on a **specific day**.
- Spacing out steps so messages don't all fire at once.

## Settings

| Mode | Fields |
| --- | --- |
| **Fixed duration** | A **value** + **unit**: seconds, minutes (default), hours, or days. |
| **Until a time of day** | Toggle on; pick a **time** (15-minute increments) and a **timezone**. |
| **Until a day of week** | Toggle on; pick one or more **days** (Sun–Sat). |
| **Dynamic delay** | Toggle on; supply the delay from a **variable** (e.g. `{{trigger.delay_minutes}}`). |

## Handles

- **Next step** — runs once the wait elapses.

## Example

```
Set time delay:  1 day
   └─ Text message "Just checking in — still need a hand?"
```

## Tips

- Use **fixed duration** for "wait N hours/days"; use **until time / day** to land messages at
  business-friendly hours.
- This is different from **Wait for reply** — use that when you specifically want the
  customer's response. See [Waiting for a reply](flows/response-wait.md).

Next: **[API »](flows/nodes/api.md)**
