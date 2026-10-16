# Tags

A tag is a short label on a contact, such as `repeat-buyer` or `new`. Use tags to filter contacts, build segments, and branch flows.

Go to **Audience** → **Tags** to see every tag in the selected branch.

## The Tags table

<!-- screenshot: audience/tags-table -->

| Column | Shows |
| --- | --- |
| Name | The tag name |
| Contacts | How many contacts carry the tag. Click the number to open **Profiles** filtered to those contacts. |
| Auto Tag | **Yes** for tags FlowFlex creates and manages, **No** for tags you create |
| Created | The date the tag was created |

Search with **Search tag name**. Creating and deleting tags needs edit access to Audience in the branch.

## Create a tag

1. Click **Create new**. The **Create tag** dialog opens.
2. Enter a **Name**, such as `repeat-buyer`.
3. Optionally add a **Description**, such as `Bought 2 or more times`.
4. Click **Create tag**.

| Field | Rule | Message |
| --- | --- | --- |
| Name | Required | **Please enter a tag name** |
| Name | Not only spaces | **Name cannot be empty or contain only spaces** |
| Name | Up to 40 characters | **Name cannot exceed 40 characters** |
| Name | Saved in lowercase. `VIP` becomes `vip`. | **Saved in lowercase so the same tag can't exist twice.** |
| Name | Unique in the branch | **Tag already exists** |
| Description | Optional, up to 200 characters | **Description cannot exceed 200 characters** |

You can also create a tag while you work:

- In the **Quick add** or **Edit contact** drawer, type a name in **Tags** and click **Create tag: name**.
- In Profiles → **More actions** → **Manage Tags**, the same way.
- In a filter or segment, on the **Tags** field, click **Create : name**.
- In a [Bulk Import](audience/import-export.md), a **Tags** column creates any tag that does not exist yet.

> [!TIP]
> Use short, lowercase names with hyphens, such as `repeat-buyer`. A space ends a tag in the contact drawer, so `repeat buyer` would become two tags.

## Auto tags and manual tags

| Kind | How it is created | Example |
| --- | --- | --- |
| Auto tag | FlowFlex creates one for each WhatsApp channel you connect, named `channel:` plus the number's digits | `channel:919000000000` |
| Manual tag | You or your team create it, or an import does | `repeat-buyer`, `new` |

An auto tag shows which channel a contact came in through. Its description is **Automatically added for this channel.**

## Default Audience Tags on a channel

Each channel can add tags to contacts automatically. Open **Channels**, then open a channel, and find the **Default Audience Tags** card.

1. Click **Edit**.
2. Pick tags in **Select tags**. Type a new name and click **Create tag: name** to create one.
3. Click **Save**.

New chats and messages from this channel add these tags to the contact. Existing contacts are not updated. Removing a tag here does not remove it from contacts.

A new channel starts with its own auto tag in this list.

## Add or remove tags on contacts

| To | Do this |
| --- | --- |
| Tag one contact | Edit the contact and change **Tags** |
| Tag many contacts | In **Profiles**, select them, then **More actions** → **Manage Tags** |
| Tag contacts from a flow | Use the tag action in [Audience actions](flows/nodes/audience-actions.md) |
| Branch a flow by tag | Use [Contact-tag conditions](flows/nodes/contact-tag-conditions.md) |
| Build a segment by tag | Use the **Tags** field. See [Segments](audience/segments.md#fields). |

## Delete a tag

Click the bin icon at the end of the tag's row, then confirm with **Yes**. This can't be undone.

Deleting is blocked in two cases:

| Case | What you see | Fix |
| --- | --- | --- |
| Contacts still carry the tag | The bin icon is greyed out: **Remove this tag from 3 contacts before deleting.** | Click the contact count, select all, and remove the tag with **Manage Tags** |
| A flow uses the tag | **Tag is in use** lists each flow, with **Draft**, **Published**, or **Subflow** and the version | Remove the tag from those flows, then delete it again |

A flow uses a tag when a Save tag action or a tag condition refers to it.
