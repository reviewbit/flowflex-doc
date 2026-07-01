# Building a flow

The **flow builder** is a drag-and-drop canvas where you lay out the steps of an
automation. You drag **nodes** from the toolbox, connect them with **edges**, and
configure each one in a side drawer. This page walks you through building a flow end to
end. For what every node does, see the [Node reference](flows/nodes.md).

## The builder at a glance

The builder has three areas:

- **Toolbox** (left) — the palette of nodes, grouped into WhatsApp, Logic, Timing and Data.
- **Canvas** (center) — where you place and connect nodes. Pan by dragging the background;
  zoom with the scroll wheel or the zoom controls.
- **Config drawer** (right) — opens when you click a node, for setting it up.
- **Top bar** — **Save**, **Publish**, and (on localhost builds) **Test**.

![Builder layout](../assets/flows/sample.gif)

## 1. Start with the trigger

Every flow begins with a single **Trigger** node — it's already on the canvas when you
start. Click it and choose the event that should start this flow (e.g. your
custom-integration event `order.placed`). The trigger exposes the event payload to every
later node as `{{trigger.*}}` — see [Triggers & variables](flows/triggers-and-variables.md).

![Trigger node setup](../assets/flows/trigger-setup.png)

## 2. Add a node from the toolbox

Find the node you want in the toolbox and **drag it onto the canvas**. Nodes are grouped by
type (WhatsApp messages, Logic, Timing, Data) so related steps are easy to find.

![Dragging a node from the toolbox onto the canvas](../assets/flows/add-node.gif)

## 3. Connect nodes with edges

Each node has one or more **handles** — the small dots on its edges. Drag from a node's
handle to the next node to draw an **edge**. The edges decide the **order** the flow runs in
and which path each branch takes.

- Most nodes have a single **Next step** handle.
- **Button** and **List** nodes have one handle per button/row, plus a **No response** handle.
- **Condition** nodes have a handle per path (Yes/No, or each branch + a default).
- An unconnected handle simply **ends that path**.

<div class="img-slot">
  <span class="img-slot-icon">📷</span>
  <strong>Screenshot — connecting two nodes</strong>
  <span>Show an edge being dragged from one node's handle to another.</span>
  <span>Save as <code>assets/flows/connect-nodes.png</code></span>
</div>

## 4. Configure a node

Click a node to open its **config drawer**. Fill in its settings — message body,
destination number, condition, delay, and so on. Any text field accepts `{{…}}` variables:
click **Insert Variable** to pick a field from the trigger payload (or an earlier node's
output) instead of typing the path by hand.

<div class="img-slot">
  <span class="img-slot-icon">📷</span>
  <strong>Screenshot — a node's config drawer + Insert Variable picker</strong>
  <span>Show, e.g., a Text message drawer with the Insert Variable picker open.</span>
  <span>Save as <code>assets/flows/node-drawer.png</code></span>
</div>

## 5. Save and publish

**Save** keeps your work in progress. **Publish** makes the flow live so it runs whenever
its trigger event fires. Until a flow is published, firing the event won't start it.

<div class="img-slot">
  <span class="img-slot-icon">📷</span>
  <strong>Screenshot — the Save / Publish controls</strong>
  <span>Show the top bar with the Save and Publish buttons.</span>
  <span>Save as <code>assets/flows/save-publish.png</code></span>
</div>

## 6. Test before you ship

On localhost builds, use the **Test** action to run the flow once against a sample payload —
no need to wait for a real event. Confirm the right messages go out and the branches behave,
then publish.

<div class="img-slot">
  <span class="img-slot-icon">📷</span>
  <strong>Screenshot — running a Test</strong>
  <span>Show the Test action and a sample-payload run.</span>
  <span>Save as <code>assets/flows/test-flow.png</code></span>
</div>

## Tips

- **Build the happy path first**, then add branches (conditions, No-response) once it works.
- **Always wire the No-response path** on anything that waits for a reply, so a silent
  customer doesn't leave the flow stuck. See [Waiting for a reply](flows/response-wait.md).
- **Personalize with variables** everywhere via **Insert Variable** — it only offers fields
  your trigger's sample payload actually contains.

Next: **[Node reference »](flows/nodes.md)**
