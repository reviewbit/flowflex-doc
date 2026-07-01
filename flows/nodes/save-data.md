# Save data

> Write values from the flow into a **data table** for reporting or later use.

![The Save data node and its config drawer](../../assets/flows/save-data-node.png)

## What it does

Records selected values into one of your flow **data tables**. When the node runs, each column
in the chosen table is filled with the value (or `{{variable}}`) you map to it — building up a
table of rows you can report on later.

## When to use

- Capturing customer replies, choices, or computed values for reporting.
- Logging outcomes (e.g. who responded, what they picked) across many flow runs.

## Settings

| Field | Required | Notes |
| --- | --- | --- |
| **Data table** | Yes | Pick an existing flow data table. |
| **Column values** | Yes | The table's columns load automatically; map each to a value or `{{variable}}`. |

## Handles

- **Next step** — runs after the row is written.

## Tips

- Create the **data table** (with its columns) first; the node maps to that schema.
- This is the supported way to persist values today — the **[Save variable](flows/nodes/save-variable.md)**
  node isn't live yet.
