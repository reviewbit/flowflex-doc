# Conversations

**Messaging** → **Conversations** is your shared WhatsApp inbox. Your team reads, replies to, assigns, and organises customer chats here.

<!-- screenshot: messaging/conversations-inbox -->

The screen has three parts:

- the conversation list on the left;
- the open chat in the middle, with its header and composer;
- the **Customer Details** panel, which opens when you click the contact's name.

## Tabs and who sees what

| Tab | Shows |
| --- | --- |
| **All** | Every conversation you are allowed to see. This is the default tab. |
| **Your chats** | Conversations assigned to you. |
| **Unassigned** | Conversations with no agent assigned. |

The active tab shows its count. What you can see depends on your role:

- With the **Conversation view all** permission for every channel in the branch, **All** and **Unassigned** show the whole team's chats.
- Without it, you see only conversations assigned to you, or with contacts you own.

See [Roles and permissions](account/roles-and-permissions.md) to change a role.

## Search and filter

- **Search chats** finds conversations by contact name or phone number.
- Click the filter icon (**Apply filter**) to open **Filter conversation**.

| Filter | What it does |
| --- | --- |
| **Channels** | Only chats on the selected WhatsApp numbers. |
| **Status** | **Open**, **Pending**, or **Resolved**. |
| **Tags** | Contacts with any of the selected tags. See [Tags](audience/tags.md). |
| **Unread only** | Only chats with unread messages. |

Click **Apply**. While a filter is on, the filter icon becomes **Reset filters**. Click it to clear all filters.

## Mark as read, change status, or assign from the list

Right-click a conversation in the list to:

- **Mark as read** or **Mark as unread**;
- **Mark as resolved**, **Reopen conversation**, or **Mark as pending**;
- **Assign agent**, then pick a teammate, such as Ananya.

## Custom folders

A folder is a saved view, such as "Open chats on the support number". Folders are shared with everyone in the branch. They appear in the sidebar under **Messaging**.

To create a folder:

1. Click the folder icon (**Create folder**) next to the conversation title.
2. Fill in the fields below.
3. Click **Create folder**.

| Field | Rule |
| --- | --- |
| **Folder Name** | Required. Must be unique in the branch. |
| **Channels** | Required. One or more WhatsApp numbers. |
| **Status** | Required. **Open**, **Pending**, or **Resolved**. |

To change a folder, open it from the sidebar and click the pencil icon (**Edit folder**). Then click **Update folder**.

To delete a folder, open it and click the red bin icon (**Delete folder**). Confirm the prompt. Deleting a folder does not delete any conversations.

Inside a folder, the tabs and the filter are hidden. You need the **Conversation reply** permission to manage folders.

## Start a new chat

1. Click **+** (**New chat**) at the top of the list. When no chat is open, you can also click **New chat** in the middle of the screen.
2. In **Start new chat**, enter a **Name**, such as `Priya Sharma`.
3. Enter the **Mobile** number with the country code, such as `+919000000001`.
4. Pick **Send from channel**.
5. Click **Start chat**.

You need the **Audience create** permission to start a chat. A new chat has no open 24-hour window, so your first message must be a template. See [The 24-hour window](#the-24-hour-window).

## Chat header actions

The header shows the contact's name, tags, and number.

| Action | How |
| --- | --- |
| Change status | Click the status pill, such as **Open**. In **Set status**, pick **Open**, **Pending**, or **Resolved**. A resolved chat shows **Reopen** instead of **Open**. |
| Add or remove tags | Click **+ Tag**. In **Categorize contact**, tick tags, or type a new name and click **Create "…"**. Needs the **Audience edit** permission. |
| Assign to yourself | If the chat is not yours, a banner appears above the composer. Click **Assign to me →**. |
| Assign to someone else | Right-click the chat in the list → **Assign agent**. Or use **Assigned to** in **Customer Details**. |
| Clear chat | Click **⋮** → **Clear chat** → **Yes**. This removes the messages from FlowFlex only. The customer's WhatsApp is not affected. |

On a phone, **⋮** also holds **Mark as pending** (or **Mark as reopened**) and **Assign to me**.

## Write a message

<!-- screenshot: messaging/conversations-composer -->

Type in the composer and press **Enter** to send. Press **Shift+Enter** for a new line.

| Tool | What it does |
| --- | --- |
| **Bold**, **Italic**, **Bulleted list**, **Numbered list** | Formats your text. |
| **Emoji** | Inserts an emoji. |
| **Attach file** | Adds one file. See the limits below. |
| **Record a voice note** | Records up to 4 minutes, then click **Send**. Click the bin icon to discard it. |
| **Assign** (@) | Mentions a teammate. See [Mentions](#mentions-and-internal-notes). |
| **Choose template** | Opens the template drawer. |
| **Expand composer** | Opens a larger editor. |

### Attachments

| Limit | Value |
| --- | --- |
| File types | JPG, PNG, MP4, MKV, PDF, Word (.doc, .docx), Excel (.xls, .xlsx), CSV |
| Maximum size | 10 MB per file |

Other files are rejected with **You can only upload JPG, PNG, MP4,  MKV, PDF, Word, Excel, or CSV files!**. Larger files show **File size must be smaller than 10MB!**.

### Reply to a specific message

Hover over a message and click **Reply**. A **Replying to** strip appears above the composer. Click **×** to cancel.

### Quick replies

Type `/` to see your quick replies. Keep typing to narrow the list, such as `/hours`. Press **Enter** or click one to insert its text. You can edit the text before sending.

See [Quick replies](messaging/quick-replies.md) to create them.

## Mentions and internal notes

An internal note is visible to your team only. The customer never sees it.

- To add a note, type it and click **Internal note**.
- To edit or delete your note, hover over it and click **Edit note** or **Delete note**.

To hand a chat to a teammate, type `@` or click **Assign**, then pick a name, such as Rahul. The button changes to **Save note & assign**. Clicking it saves the note and assigns the chat to Rahul.

A message that mentions a teammate is always saved as a note. It is never sent to the customer. You need the **Conversation assign** permission to mention.

## The 24-hour window

WhatsApp lets you send free-form messages only within 24 hours of the customer's last message. FlowFlex counts from the last incoming message in the chat.

After the window closes:

- the composer shows **WhatsApp requires an approved template to start or restart this conversation. Pick one to message the customer, or add an internal note below.**;
- **Send** and voice notes are hidden, so you can only send a template or add an internal note;
- the chat ends with "To restart the conversation, you need to send a template message and wait for customer response".

When the customer replies, the window opens again for 24 hours.

## Send a template in a chat

1. Click **Choose template**.
2. In **Choose a template**, search with **Search approved templates**. Only Approved templates for this chat's channel appear.
3. Click a template to see its **Preview**.
4. Fill in each field under **Dynamic variables**, such as the customer's name. For a location header, fill in **Latitude**, **Longitude**, **Location name**, and **Address**.
5. Click **Send to** followed by the contact's number.

If the list is empty, click **Create Template**. See [Create a template](whatsapp/create-template.md). You need the **Template view** permission to see templates.

> [!WARNING]
> If the contact has opted out of WhatsApp marketing, a dot appears on **Choose template**. Hover over it to see **This customer is not subscribed to WhatsApp marketing. Marketing templates will be skipped.** Send a Utility template instead, or ask the customer to reply START. See [Messaging settings](messaging/settings.md#subscription-auto-replies).

## Customer Details

Click the contact's name or avatar in the header to open **Customer Details**.

| Section | What you can do |
| --- | --- |
| **Profile** | Edit the name and email with the pencil icon. The phone number is read-only. |
| **Tags** | Click the pencil to add or remove tags. |
| **Channel ID** / **Channel Name** | The WhatsApp number this chat uses. |
| **Assigned to** | Pick the agent who owns the chat. |
| **Events history** | Status changes, assignments, and other events on this chat. |

If **Mask prospect phone numbers** is on, you may see numbers like `+91 XXXXXX0001`. See [Conversation privacy](messaging/settings.md#conversation-privacy).

## Read-only conversations

If the chat's WhatsApp channel was removed or is no longer available, the list shows **Channel unavailable** on the chat. The chat becomes read-only. You can still read the history and add internal notes, but you cannot send messages or templates.

Next: set up [Messaging settings](messaging/settings.md) and [Quick replies](messaging/quick-replies.md).
