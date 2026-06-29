# Save variable <span class="badge soon">Coming soon</span>

> Store a value under a name so later steps can reuse it.

> [!ATTENTION]
> **Not yet live.** The Save variable node can be configured, but its **execution isn't wired
> up** — it won't store anything when the flow runs. This page describes the intended
> behavior.

<div class="img-slot">
  <span class="img-slot-icon">📷</span>
  <strong>Screenshot — the Save variable node (preview)</strong>
  <span>Add once the node is live.</span>
  <span>Save as <code>assets/flows/node-save-variable.png</code></span>
</div>

## What it will do

Save a value (literal or `{{variable}}`) under a name, so later nodes can reference it by that
name — handy for stashing a computed or captured value to reuse across several steps.

## In the meantime

- To persist values for reporting/later use, use the **[Save data](flows/nodes/save-data.md)**
  node (it writes to a data table).
- Values from earlier nodes (like a captured reply or an API response) are already available
  downstream via **Insert Variable** — see [Triggers & variables](flows/triggers-and-variables.md).

Next: **[Internal alert »](flows/nodes/internal-alert.md)**
