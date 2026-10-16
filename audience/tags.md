# Tags

Label contacts with short tags, then use those tags to filter contacts, build segments and branch flows.

A tag is a short label on a contact, such as `repeat-buyer` or `new`. A contact can carry many tags. FlowFlex creates some tags for you (auto tags), and you create the rest (manual tags).

Rangoli Store tags every customer who has ordered twice or more `repeat-buyer`. Jordan Brown, the marketing manager, then builds a segment on that tag and sends the Diwali offer only to those customers. When John Smith places a second order, an agent adds the tag and John joins the segment.

Go to **Audience** → **Tags** to see every tag in the selected branch.

<img src="assets/audience/tags-table.png" alt="The Tags tab with manual and auto tags">

The table shows each tag's **Name**, how many **Contacts** carry it, whether it is an **Auto Tag** (**Yes** for tags FlowFlex manages, **No** for tags you create), and the date it was **Created**. Click a contact count to open **Profiles** filtered to those contacts. Use **Search tag name** to find a tag.

Creating and deleting tags needs edit access to Audience in the branch.

## Create a tag

1. Click **Create new**. The **Create tag** dialog opens.
2. Enter a **Name**, such as `repeat-buyer`.
3. Optionally add a **Description**, such as `Bought 2 or more times`.
4. Click **Create tag**. The tag appears in the table with **Auto Tag** set to **No**.

| Field | Rule | Message |
| --- | --- | --- |
| Name | Required | **Please enter a tag name** |
| Name | Not only spaces | **Name cannot be empty or contain only spaces** |
| Name | Up to 40 characters | **Name cannot exceed 40 characters** |
| Name | Saved in lowercase. `VIP` becomes `vip`. | **Saved in lowercase so the same tag can't exist twice.** |
| Name | Unique in the branch | **Tag already exists** |
| Description | Optional, up to 200 characters | **Description cannot exceed 200 characters** |

You can also create a tag while you work:

- **Contact drawer:** in **Quick add** or **Edit contact**, type a name in **Tags** and click **Create tag: name**.
- **Bulk tagging:** in Profiles → **More actions** → **Manage Tags**, the same way.
- **Filters and segments:** on the **Tags** field, click **Create : name**.
- **Imports:** in a [Bulk Import](audience/import-export.md), a **Tags** column creates any tag that doesn't exist yet.

> [!TIP]
> Use short, lowercase names with hyphens, such as `repeat-buyer`. A space ends a tag in the contact drawer, so `repeat buyer` would become two tags.

## Auto tags

FlowFlex creates an auto tag for each WhatsApp channel you connect, named `channel:` plus the number's digits, such as `channel:919000000000`. It shows which channel a contact came in through, and its description is **Automatically added for this channel.**

Every other tag is a manual tag: you or your team create it, or an import does.

## Add tags automatically from a channel

Each channel can add tags to the contacts who message it. Rangoli Store's Kochi number, for example, could add `kochi` to everyone who writes in.

1. Open **Channels**, open the channel, and find the **Default Audience Tags** card.
2. Click **Edit**.
3. Pick tags in **Select tags**. Type a new name and click **Create tag: name** to create one.
4. Click **Save**.

New chats and messages from this channel now add these tags to the contact. Existing contacts aren't updated, and removing a tag here doesn't remove it from contacts. A new channel starts with its own auto tag in this list.

## Add or remove tags on contacts

- **One contact:** edit the contact and change **Tags**.
- **Many contacts:** in **Profiles**, select them, then **More actions** → **Manage Tags**.
- **From a flow:** use the tag action in [Audience actions](flows/nodes/audience-actions.md).

To use tags afterwards, branch a flow with [Contact-tag conditions](flows/nodes/contact-tag-conditions.md), or build a segment with the **Tags** field. See [Segments](audience/segments.md?id=fields).

## Delete a tag

Click the bin icon at the end of the tag's row, then confirm with **Yes**. This can't be undone.

Deleting is blocked in two cases:

- **Contacts still carry the tag.** The bin icon is greyed out, with a message such as **Remove this tag from 3 contacts before deleting.** Click the contact count, select all, and remove the tag with **Manage Tags**.
- **A flow uses the tag.** **Tag is in use** lists each flow, with its status (such as **Draft** or **Published**) and version. Remove the tag from those flows, then delete it again. A flow uses a tag when a Save tag action or a tag condition refers to it.

## See also

- [Segments](audience/segments.md): group contacts by their tags.
- [Audience actions](flows/nodes/audience-actions.md): tag contacts automatically in a flow.
- [Contact-tag conditions](flows/nodes/contact-tag-conditions.md): route flow contacts by their tags.
