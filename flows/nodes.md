# Node reference

Nodes are the steps in a flow. Drag them from the toolbox onto the canvas and connect them
with edges — see [Building a flow](flows/building-a-flow.md). Every node opens a **config
drawer** when you click it, and all text fields accept `{{…}}`
[variables](flows/triggers-and-variables.md).

The toolbox groups nodes into four categories. Each node has its own page below.

## 💬 WhatsApp message nodes

The nodes that send something to the customer on WhatsApp. Every message node has a
**Destination number** field and can optionally **wait for a reply**
([details](flows/response-wait.md)).

| Node | What it sends |
| --- | --- |
| **[Text message](flows/nodes/text-message.md)** | A free-form text message (in-session). |
| **[Template message](flows/nodes/template-message.md)** | A pre-approved template (works outside the 24h window). |
| **[Button message](flows/nodes/button-message.md)** | Up to 3 quick-reply buttons; branches per tap. |
| **[List message](flows/nodes/list-message.md)** | A selectable list; branches per row. |
| **[Media message](flows/nodes/media-message.md)** | Image, video, document, audio, location or contacts. |

## 🔀 Logic nodes

Branch and repeat — no message is sent.

| Node | What it does |
| --- | --- |
| **[Condition split](flows/nodes/condition-split.md)** | A Yes / No branch on a condition. |
| **[Condition branch](flows/nodes/condition-branch.md)** | A multi-path branch (first match wins, plus default). |
| **[For loop](flows/nodes/for-loop.md)** | Repeat steps over each item in an array. |

## ⏱️ Timing nodes

| Node | What it does |
| --- | --- |
| **[Set time delay](flows/nodes/set-time-delay.md)** | Pause the flow (duration, time of day, day of week, or dynamic). |

## 🔌 Data & integration nodes

| Node | What it does |
| --- | --- |
| **[API](flows/nodes/api.md)** | Call an external HTTP API and use the response. |
| **[Save data](flows/nodes/save-data.md)** | Write values into a flow data table. |
| **[Utils function](flows/nodes/utils-function.md)** | Run a built-in utility (e.g. distance). |
| **[Save variable](flows/nodes/save-variable.md)** <span class="badge soon">Coming soon</span> | Store a value under a name. |

## Handles & branching

The little dots on a node are its **handles** — drag from one to the next node to draw an
edge.

- Most nodes have a single **Next step** handle.
- **Button / List** nodes have one handle per button/row, plus a **No response** handle
  (when waiting).
- **Condition** nodes have a handle per path (Yes/No, or each branch + default).
- A node only follows the edges you draw — an unconnected handle simply ends that path.

## Hidden / not in the toolbox yet

These exist in the product but are hidden from the toolbox until their execution is finished:

- **Subflow** — run another flow as a step. Hidden while end-to-end execution is completed.
- **Catalogue message** — send a WhatsApp catalogue. Hidden until catalogue-capable templates
  are available.
