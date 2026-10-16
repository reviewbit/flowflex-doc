# Roles and permissions

A role is a named set of permissions. Every team member gets one role, and the branches and channels you give them in [Teams](account/teams.md) limit where the role applies.

Go to **Settings** → **Teams** → **Roles**.

## The Admin role

Every organisation has an **Admin** role with **Full control** (`all.*`). It can do everything, including Billing, Plans, Teams, and Branches.

The Admin role is a default role. **Default roles cannot be edited** and **Default roles cannot be deleted**. You can copy it.

## Create a role

<img src="assets/account/create-role.png" alt="Creating the Support agent role">

1. Click **Create New Role**.
2. Enter **Role name**, such as `Support agent`. Up to 30 characters.
3. Optional: enter a **Description**, such as `Answers customer chats`. Up to 200 characters.
4. Choose a permission mode (see below).
5. For **Selected permissions only**, open each group and turn on the permissions you need. Use **Search permissions** to find one. A group's switch turns on all its permissions.
6. Click **Create role**.

The left panel shows **N of M enabled** and a count for each group. If nothing is selected, you see **Please select at least one permission.**

| Mode | What the role gets |
| --- | --- |
| **Selected permissions only** | Exactly the permissions you turn on |
| **All current permissions** | Every permission that exists today. Permissions added later are not included. |
| **Current and future permissions** | Every permission today and any added later |

> [!NOTE]
> **Current and future permissions** gives the role everything, including any permission FlowFlex adds later, the same as Admin. Billing, Plans, Teams, and Branches are included. Pick **All current permissions** if new features should not be granted automatically.

## Copy, edit, or delete a role

| Action | How | Notes |
| --- | --- | --- |
| Copy | Click **Copy role** | Opens **Copy role** with the name `Copy of …`. Click **Create copy**. |
| Edit | Click **Edit role** | Click **Update role**. Changes apply to everyone with the role. |
| Delete | Click **Delete role**, then **Yes** | Not available for default roles |

The roles list shows **Name**, **Created Date**, **Last updated**, and **Permissions**. Search with **Search by name**.

## Permissions

Permissions are grouped as they appear on the role screen.

### Audience

| Permission | Allows |
| --- | --- |
| **Audience view** | Open **Audience** and see contacts, lists, and segments |
| **Audience create** | Add contacts |
| **Audience edit** | Edit contacts, lists, segments, and tags |
| **Audience delete** | Delete contacts |
| **Audience import** | Import contacts from a file |
| **Audience export** | Export contacts |
| **Audience assign** | Assign contacts to team members |

See [Audience](audience/overview.md).

### Conversation

| Permission | Allows |
| --- | --- |
| **Conversation view** | Open **Messaging** → **Conversations** and read chats |
| **Conversation view all** | See every conversation in their branches and channels, not just their own |
| **Conversation reply** | Send replies |
| **Conversation assign** | Assign a conversation to a team member |
| **Conversation reassign** | Move a conversation that is already assigned |

See [Conversations](messaging/conversations.md).

### Messaging

| Permission | Allows |
| --- | --- |
| **Messaging settings view** | Open **Messaging** → **Settings** |
| **Messaging settings edit** | Change messaging settings |

See [Messaging settings](messaging/settings.md).

### Branch

| Permission | Allows |
| --- | --- |
| **Branch view** | View branches |
| **Branch create** | Create branches |
| **Branch edit** | Edit branches |
| **Branch delete** | Delete branches |

### Channel

| Permission | Allows |
| --- | --- |
| **Channel view** | Open **Channels** |
| **Channel create** | Connect a new channel |
| **Channel edit** | Change channel settings |
| **Channel delete** | Remove a channel |
| **Channel assign** | Assign channels |

See [Connect a WhatsApp channel](whatsapp/connect-channel.md).

### Template

| Permission | Allows |
| --- | --- |
| **Template view** | Open **Templates** |
| **Template create** | Create templates |
| **Template edit** | Edit templates |
| **Template delete** | Delete templates |

See [Create a template](whatsapp/create-template.md).

### Broadcast

| Permission | Allows |
| --- | --- |
| **Broadcast view** | Open **Broadcast** and see results |
| **Broadcast create** | Create broadcasts and drafts |
| **Broadcast edit** | Edit broadcasts |
| **Broadcast delete** | Delete broadcasts |
| **Broadcast publish** | Publish a broadcast so it sends |
| **Broadcast export** | Export broadcast reports |

See [Send a broadcast](broadcasts/send-broadcast.md).

### Workflow

| Permission | Allows |
| --- | --- |
| **Workflow view** | Open the Flow builder and **Automations** |
| **Workflow create** | Create flows |
| **Workflow edit** | Edit flows |
| **Workflow delete** | Delete flows |
| **Workflow publish** | Publish flows so they run |

### Campaign

| Permission | Allows |
| --- | --- |
| **Campaign view** | Open **Automations** → **All campaigns** |
| **Campaign create** | Create campaigns |
| **Campaign edit** | Edit campaigns |
| **Campaign delete** | Delete campaigns |
| **Campaign launch** | Launch campaigns |

See [Campaigns](flows/campaigns.md).

### Member

| Permission | Allows |
| --- | --- |
| **View Team Members** | View team members and their access setup |
| **Invite Team Members** | Invite new members |
| **Edit Team Members** | Change a member's role and access |
| **Remove Team Members** | Remove members |

### Billing

| Permission | Allows |
| --- | --- |
| **Billing view** | View billing |
| **Billing manage** | Manage billing |
| **Billing export** | Export billing |

### Integration

| Permission | Allows |
| --- | --- |
| **Integration view** | Open **Integrations** |
| **Integration create** | Add integrations |
| **Integration edit** | Change integrations |
| **Integration delete** | Remove integrations |

## What each permission shows in the sidebar

A sidebar item appears only when the role has the permission below. A group disappears when none of its items are allowed.

| Sidebar item | Needs |
| --- | --- |
| Flow builder | **Workflow view**, and Flow builder turned on for your organisation |
| **Automations** | **Workflow view** |
| **Automations** → **All campaigns** | **Workflow view** and **Campaign view** |
| **Automations** → **Saved data** | **Workflow view**, and Flow builder turned on |
| **Broadcast** | **Broadcast view** |
| **Templates** | **Template view** |
| **Channels** | **Channel view** |
| **Audience** | **Audience view** |
| **Messaging** | **Conversation view**, **Messaging settings view**, or **Messaging settings edit** |
| **Messaging** → **Conversations** and chat folders | **Conversation view** |
| **Messaging** → **Settings** | **Messaging settings view** or **Messaging settings edit** |
| **Integrations** | **Integration view** |
| **Settings** → **Account** | **Conversation view** |
| **Billing**, **Settings** → **Plans**, **Teams**, **Branches** | Admin (Full control) |

Opening a page by its URL without the matching permission sends the user back to the home page.

## Example roles

### Support agent

For Rahul, who answers customer chats at the Kochi store.

| Group | Permissions |
| --- | --- |
| Conversation | **Conversation view**, **Conversation reply**, **Conversation assign** |
| Audience | **Audience view**, **Audience edit** |
| Template | **Template view** |
| Messaging | **Messaging settings view** |

In [Teams](account/teams.md), give Rahul **Selected branches only** → **Kochi** and **Selected channels only** → the Kochi number. He sees **Messaging**, **Audience**, and **Templates**, and only Kochi chats.

### Marketing manager

For someone who plans broadcasts and campaigns for both stores.

| Group | Permissions |
| --- | --- |
| Audience | **Audience view**, **Audience create**, **Audience edit**, **Audience import**, **Audience export** |
| Template | **Template view**, **Template create**, **Template edit** |
| Broadcast | **Broadcast view**, **Broadcast create**, **Broadcast edit**, **Broadcast publish**, **Broadcast export** |
| Workflow | **Workflow view** |
| Campaign | **Campaign view**, **Campaign create**, **Campaign edit**, **Campaign launch** |
| Channel | **Channel view** |

Give access to **All current branches** or **Current and future branches**. **Workflow view** is needed for the **Automations** menu that holds **All campaigns**.

> [!TIP]
> Start from the smallest set of permissions. Add more when someone hits a page they need.
