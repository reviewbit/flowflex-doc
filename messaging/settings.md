# Messaging settings

**Messaging** → **Settings** controls how your WhatsApp inbox behaves: opening hours, who gets new chats, automatic replies, and quick replies. Most changes save automatically.

These settings apply to your whole organisation. The agent rotation order is set per branch.

<!-- screenshot: messaging/settings-page -->

## Who can use this page

| Permission | Access |
| --- | --- |
| **Messaging settings view** | See the page, read-only. |
| **Messaging settings edit** | Change the settings. |
| Neither | The page shows **Access denied** with "You do not have permission to view messaging settings." |

See [Roles and permissions](account/roles-and-permissions.md).

## Business hours

Business hours decide when the **Away Message** is sent. Pick a mode from the menu next to the title.

| Mode | How each day works |
| --- | --- |
| **Open for selected hours** | Tick a day to open it, then set **From** and **To** in 24-hour time. The default is 09:00 to 17:30. An unticked day shows **Closed**. |
| **Always open** | Tick a day to keep it **Open 24 hours**. An unticked day is **Closed**. |

> [!NOTE]
> Hours use the time zone of the computer that saved them. Set them from a computer in your business's time zone.

## Conversation assignment

This decides who gets a new conversation that has no agent. Pick an option from the menu next to the title.

| Option | What happens |
| --- | --- |
| **Not assigned** | New chats land in **Unassigned**. Agents pick them up. |
| **Round-robin** | New chats are handed to agents in turn. |

FlowFlex keeps an existing assignee first. If the contact already has an owner in Audience, the chat goes to that person. Round-robin is used only when neither applies.

### Agent rotation order

With **Round-robin**, the agents in the branch are listed in order. Drag a name to reorder; FlowFlex saves it and shows **Rotation order saved**.

New team members join the end of the list automatically. People who leave are skipped. If nobody has access to the branch, you see **No agents have access to this branch yet**. See [Teams](account/teams.md).

## Conversation privacy

Turn on **Mask prospect phone numbers** to hide most of each customer's number in Conversations, for example `+91 XXXXXX0001`.

- Only users with **Full control** see this card.
- Users with **Conversation view all** still see full numbers.
- Masking applies to the chat screens only.

## Greeting Message

The greeting is sent automatically when a customer starts a new conversation.

1. Tick **Enable**.
2. Type the message, such as "Hi! Thanks for messaging Rangoli Store. An agent will reply shortly."

The text saves as you type.

## Away Message

The away message is sent instead of the greeting when a new conversation starts outside business hours.

1. Tick **Enable**.
2. Type the message, such as "Rangoli Store is closed right now. We reply from 10 am."

### When each message is sent

A conversation counts as new when it is the customer's first message, or the chat had no activity for 24 hours.

| Situation | Message sent |
| --- | --- |
| New conversation, outside business hours, Away Message enabled | **Away Message** |
| New conversation, any other time, Greeting Message enabled | **Greeting Message** |
| Ongoing conversation (activity in the last 24 hours) | None |
| The contact is currently in a running flow | None |

Only one of the two is sent. If the Away Message is off, the greeting is sent outside hours too.

## Subscription Auto Replies

Customers send a keyword to subscribe to or unsubscribe from your marketing messages. Here you set those keywords and the confirmation replies, per language.

<!-- screenshot: messaging/settings-subscription-auto-replies -->

**Default (English)** is always there and cannot be removed. Its defaults are:

| | Keyword | Auto reply |
| --- | --- | --- |
| **Subscribe** | `START` | You have been subscribed. Reply STOP to unsubscribe anytime. |
| **Unsubscribe** | `STOP` | You have been unsubscribed. Reply START to subscribe again. |

For each language:

| Field | Rule |
| --- | --- |
| **Keyword** (Subscribe and Unsubscribe) | Required. Up to 100 characters. Must be unique across all languages. |
| **Enable auto reply** | When ticked, the confirmation text is required. Untick it to change consent without replying. |

To add a language:

1. Click **Add language**.
2. Pick a language and click **Add**.
3. Fill in both keywords and replies.
4. Click **Save**. **Cancel** discards unsaved changes.

To remove a language, click the bin icon on its tab.

The keyword must be the whole message. Matching ignores upper and lower case, so `stop` and `Stop` both work. A keyword message never starts an automation campaign.

### Link with the Marketing opt-out button

The **Marketing opt-out** button on a template uses your **Unsubscribe** keyword as its text. FlowFlex picks the keyword for the template's language, or falls back to Default (English). Tapping it unsubscribes the contact, just like typing the keyword. See [Create a template](whatsapp/create-template.md#buttons).

Unsubscribed contacts are skipped for Marketing templates in broadcasts and chats. See [Broadcast guidelines](broadcasts/broadcast-guidelines.md).

## Quick Reply

The last card manages saved replies for agents. See [Quick replies](messaging/quick-replies.md).
