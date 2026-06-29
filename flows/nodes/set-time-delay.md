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

The node always starts with a **fixed duration**. The three checkboxes below it are
**additive** — you can enable any combination of them to layer constraints.

| Field | Notes |
| --- | --- |
| **Set time delay** | A number ≥ 1. Default: `1`. |
| **Unit** | Seconds, Minutes, Hours, or **Days** (default). |
| **Delay until a scheduled time of day** | When checked: pick a **time** (15-minute increments, e.g. `9:00 am`) and a **UTC offset** for the timezone. The delay won't release until that time of day is reached in the chosen timezone. |
| **Delay until scheduled days of the week** | When checked: pick one or more **days** (Sunday–Saturday). The delay won't release until the flow lands on one of those days. |
| **Delay until a dynamic time of day** | When checked: supply the delay amount from a **variable** (e.g. `{{trigger.delay_minutes}}`). |

## Handles

- **Next step** — runs once the wait elapses.

## Example

```
Set time delay:  1 day
   └─ Text message "Just checking in — still need a hand?"
```

## Tips

- Combine the checkboxes to be precise: e.g. **1 day** duration + **9:00 am** time-of-day + **Monday–Friday** days = "wait at least a day, then resume on a weekday morning."
- Use **fixed duration** for simple waits ("2 hours after purchase"); layer the time/day constraints to land messages at business-friendly hours.
- This is different from **Wait for specific time** — use that when you specifically want the customer's reply. See [Waiting for a reply](flows/response-wait.md).

Next: **[API »](flows/nodes/api.md)**
