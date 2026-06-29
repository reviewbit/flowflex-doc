# For loop

> Repeat a set of steps — over each item in a list, or a fixed number of times.

<div class="img-slot">
  <span class="img-slot-icon">📷</span>
  <strong>Screenshot — Start loop / End loop on the canvas</strong>
  <span>Show the Start loop and End loop nodes with steps wired between them.</span>
  <span>Save as <code>assets/flows/node-for-loop.png</code></span>
</div>

## What it does

Runs the steps placed **between a Start loop and an End loop** node repeatedly — once per item
in a list, or a fixed number of times. Inside the loop, the current item and position are
available as variables.

## When to use

- Sending a message **per item** in an order (`{{trigger.items}}`).
- Repeating an action a set number of times.

## Settings

| Field | Notes |
| --- | --- |
| **Iterate over a list** | Point `loop_list` at an array variable, e.g. `{{trigger.items}}`. |
| **Fixed count** | Toggle on and set a **limit** (a number ≥ 1) to repeat that many times. |

### Loop variables

Inside the loop you can reference:

- **`{{loop.item}}`** — the current array item (list mode).
- **`{{loop.index}}`** — the current position (0-based), in both modes.

## Handles

- Place the steps to repeat **between** the **Start loop** and **End loop** nodes. The End loop
  marks where one iteration finishes and the next begins.

## Example

```
Start loop  over {{trigger.items}}
   └─ Text message:  "Item {{loop.index}}: {{loop.item.name}} — ₹{{loop.item.price}}"
End loop
   └─ Text message:  "That's your full order 🧾"
```

## Tips

- Use **list mode** when you have an array; **fixed count** when you just need N repetitions.
- Keep per-iteration messaging mindful of WhatsApp rate/spam limits.

Next: **[Set time delay »](flows/nodes/set-time-delay.md)**
