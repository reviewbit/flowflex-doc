# Node reference

Choose the task you want the flow to perform, then open its guide for setup steps, a practical example, and connections.

For tasks used by several nodes, see [Insert Variable](flows/using-variables.md), [WhatsApp setup](flows/whatsapp-message-setup.md), [Files and media](flows/files-and-media.md), and [Conditions](flows/setting-conditions.md).

The toolbox groups nodes into **WhatsApp Blocks**, **Logic Blocks**, **Data Blocks**, **Audience Blocks**, and **Other Blocks**.

## WhatsApp Blocks

| Node | Purpose |
| --- | --- |
| [Text message](flows/nodes/text-message.md) | Send free-form text. |
| [Template message](flows/nodes/template-message.md) | Send an approved template. |
| [Button message](flows/nodes/button-message.md) | Send quick replies and branch per button. |
| [List message](flows/nodes/list-message.md) | Send choices and branch per row. |
| [Media message](flows/nodes/media-message.md) | Send media or attachments. |
| [Send location](flows/nodes/send-location.md) | Send a location pin. |
| [Location request](flows/nodes/location-request.md) | Ask the customer to share a location. |
| [Link button](flows/nodes/link-button.md) | Open a URL from a message button. |

See [Waiting for a reply](flows/response-wait.md) for nodes with response-wait settings.

## Logic Blocks

| Node | Purpose |
| --- | --- |
| [Condition split](flows/nodes/condition-split.md) | Yes/No routing. |
| [Condition branch](flows/nodes/condition-branch.md) | Named condition paths. |
| [Start loop / End loop](flows/nodes/for-loop.md) | Repeat a sequence for an array. |
| [Repeat until](flows/nodes/repeat-until.md) | Repeat until a condition is met or the attempt limit is reached. |

Condition split and Condition branch also support [live contact-tag conditions](flows/nodes/contact-tag-conditions.md).

## Data Blocks

| Node | Purpose |
| --- | --- |
| [API](flows/nodes/api.md) | Call HTTP APIs, configure retries, and branch on response outcomes. |
| [Save data](flows/nodes/save-data.md) | Write rows to a flow data table. |

## Audience Blocks

See [Audience actions](flows/nodes/audience-actions.md) for setup and behavior.

| Node | Purpose |
| --- | --- |
| **Save tag** | Add or remove customer tags. |
| **Save audience** | Create or update a contact's profile fields. |
| **Add Note** | Save a private conversation note. |
| **Assign agent** | Hand the conversation to a specific agent, round robin, or least busy agent. |

## Other Blocks

| Node | Purpose |
| --- | --- |
| [Set time delay](flows/nodes/set-time-delay.md) | Pause before continuing. |
| [Save variable](flows/nodes/save-variable.md) | Store named values for this run. |
| [Utils function](flows/nodes/utils-function.md) | Calculate distance or identify places in text. |

## Structural nodes and outputs

Every flow has one **Trigger** and one **[End](flows/nodes/end.md)**. These are structural nodes rather than toolbox actions.

Every rendered output must be connected to another node or End:

- **Next step** for ordinary continuation.
- Per-button, per-row, or condition outputs for branches.
- **No response** when response waiting is enabled.
- **Success**, **Non-2xx response**, and **Request failed** for new API nodes.

An unconnected output is a validation error. See [Building a flow](flows/building-a-flow.md).
