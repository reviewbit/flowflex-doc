# Building a flow

The **flow builder** is a drag-and-drop canvas where you lay out the steps of an
automation. You drag **nodes** from the toolbox, connect them with **edges**, and
configure each one in a side drawer. This page walks you through building a flow end to
end. For what every node does, see the [Node reference](flows/nodes.md).

## The builder at a glance

The builder has these main areas:

- **Toolbox** (left) — the palette of nodes, grouped into WhatsApp, Logic, Data, Audience and Other Blocks.
- **Canvas** (center) — where you place and connect nodes. Pan by dragging the background;
  zoom with the scroll wheel or the zoom controls.
- **Config drawer** (right) — opens when you click a node, for setting it up.
- **Top bar** — **Save**, **Save and publish**, **Learn flow builder**, and **More actions** for version history and JSON files.

![Builder layout](../assets/flows/sample.gif)

## 1. Start with the trigger

Every flow contains exactly one **Trigger** and one **End** node. It begins with the **Trigger** node — it's already on the canvas when you
start. Click it and choose the event that should start this flow (e.g. your
custom-integration event `order.placed`). The trigger exposes the event payload to every
later node as `{{trigger.*}}` — see [Triggers & variables](flows/triggers-and-variables.md).

![Trigger node setup](../assets/flows/trigger-setup.png)

## 2. Add a node from the toolbox

Find the node you want in the searchable toolbox and **drag it onto the canvas**. You can also add a next step from a source handle's picker. Nodes are grouped by
type (WhatsApp, Logic, Data, Audience, Other) so related steps are easy to find.

![Dragging a node from the toolbox onto the canvas](../assets/flows/add-node.gif)

## 3. Connect nodes with edges

Each node has one or more **handles** — the small dots on its edges. Drag from a node's
handle to the next node to draw an **edge**. The edges decide the **order** the flow runs in
and which path each branch takes.

- Most nodes have a single **Next step** handle.
- **Button** and **List** nodes have one handle per button/row, plus a **No response** handle.
- **Condition** nodes have a handle per configured path.
- New **API** nodes have Success, Non-2xx response, and Request failed outputs.
- Connect every rendered output to another node or the single **End** node. An unconnected output is a validation error.

![Connecting two nodes with an edge](../assets/flows/connect-node.gif)

## 4. Configure a node

Click a node to open its **config drawer**. Fill in its settings — message body,
destination number, condition, delay, and so on. Any text field accepts `{{…}}` variables:
click **Insert Variable** to pick a field from the trigger payload (or an earlier node's
output) instead of typing the path by hand.

![A node's config drawer with the Insert Variable picker](../assets/flows/add-node.gif)

## 5. Save and publish

**Save** creates a draft version. Use the arrow beside Save → **Save and publish** to publish your current edits. Publishing a saved version makes it available for its configured trigger. Incoming-message campaigns need their own setup and publication.

See [Versions, publishing & JSON files](flows/versions-and-portability.md) for history, import/export, and testing.

## Tips

- **Build the happy path first**, then add branches (conditions, No-response) once it works.
- **Always wire the No-response path** on anything that waits for a reply, so a silent
  customer doesn't leave the flow stuck. See [Waiting for a reply](flows/response-wait.md).
- **Personalize with variables** everywhere via **Insert Variable** — it only offers fields
  your trigger's sample payload actually contains.


## Canvas tools and labels

Use **Tidy layout** to arrange nodes and **Undo tidy** to restore their previous positions.

Node drawers include a **Node label** and its **Variable reference**. Renaming the display label keeps the variable reference stable. Trigger and End labels are fixed.

For a guided demo and safe practice, open [Learn flow builder](flows/learning-the-builder.md).
