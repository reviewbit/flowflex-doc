# Lists

A list is a fixed group of contacts that you choose. Go to **Audience** → **List** to create, merge, and manage lists.

Contacts join a list only when you add them. To group contacts by a rule that updates on its own, use a [segment](audience/segments.md).

## The List table

| Column | Shows |
| --- | --- |
| Name | The list name. Click it to open the list. |
| Audience count | How many contacts are in the list |
| Created At | The date the list was created |
| Updated date | The date the list last changed |
| Actions | Rename (pencil), delete (bin), and the ⋯ menu |

Search with **Search list name**.

## Create a list

1. Click **Create new**.
2. Enter a **Title**, such as `Repeat buyers – Oct 2026`.
3. Click **Create list**.

The name must not be empty. Two lists in the same branch cannot have the same name: you see **List already exists**.

You can also create a list on the spot:

- In Profiles → **More actions** → **Add to list**, type a new name and pick **+ Create new list: "name"**.
- In **Bulk Import**, choose **To a list** → **+ Create new list**. See [Import and export](audience/import-export.md).

## Add and remove contacts

| To | Do this |
| --- | --- |
| Add many contacts | In **Profiles**, select them, then **More actions** → **Add to list** |
| Add one contact | Open the contact, then ⋯ → **Add to list** |
| Add a new contact | Open the list, then ⋯ → **Quick add**. Fill in the form and click **Create profile**. |
| Import contacts | In **Bulk Import**, choose **To a list** and pick the list |
| Remove many contacts | In **Profiles**, select them, then **More actions** → **Remove from list** |
| Remove one contact | Open the contact, go to the **List** tab, and click the bin icon |

Adding or removing contacts does not change their subscription status. It does not start any flows.

## Rename or delete a list

- To rename, click the pencil icon, edit the name in **Edit list name**, and click **Confirm**.
- To delete, click the bin icon and confirm with **Yes**. To delete several, select them, then **More actions** → **Delete**.

Deleting a list does not delete its contacts.

## Merge lists

Merging copies every contact from one or more source lists into a destination list. Each contact appears only once in the destination.

<img src="assets/audience/merge-list.png" alt="The Merge list drawer">

1. In the List table, click ⋯ → **Merge list** on a source list. Or open the list and choose ⋯ → **Merge list**.
2. **Source list**: the list you clicked is filled in. Add more lists if needed.
3. **Destination list**: pick the list that receives the contacts. It cannot also be a source: **Can't be the same source and destination.**
4. Under **Delete Source Lists After Merging**, choose:
    - **Yes, keep source list**: the source lists stay as they are. This is the default.
    - **No, delete source list**: the source lists are deleted after the merge. This cannot be undone.
5. Click **Merge**.

Merging does not start flows or send opt-in messages. It does not change any contact data.

> [!WARNING]
> Read the two options carefully. The option that deletes the source lists starts with "No". Only the destination list remains if you choose it.

## Subscribe or unsubscribe a list

These actions change marketing consent for everyone currently in the list.

1. In the List table, click ⋯ → **Subscribe audience** or **Unsubscribe audience**. For several lists, select them, then use **More actions**.
2. Click **Confirm**.

| Action | Effect |
| --- | --- |
| **Subscribe audience** | Turns WhatsApp, SMS, and Email consent on for the list's members |
| **Unsubscribe audience** | Turns WhatsApp, SMS, and Email consent off for the list's members |

Contacts added to the list later are not affected.

> [!WARNING]
> **Subscribe audience** also re-subscribes contacts who opted out. Use it only for contacts who agreed to receive marketing.

## List detail page

Open a list to see its members. The header shows **Total audience** and **Created at**.

The **Members** tab lists Name, Email, Phone number, Country, and Created At. Search with **Search by name, email or phone**.

The ⋯ menu has:

| Item | What it does |
| --- | --- |
| **Export list** | Starts a CSV export of the list's members. Download it from the [Export tab](audience/import-export.md#export). |
| **Quick add** | Creates a new contact directly in this list |
| **Merge list** | Opens the merge drawer with this list as the source |
| **Delete list** | Deletes the list. The contacts stay in your audience. |

## Find a list's ID

Integrations and APIs sometimes ask for a list ID. Open the list: the ID is the last part of the page address, after `/audience/list/`.

## Use a list

- Send a broadcast to it: choose **Audience Type** → **List** in [Send a broadcast](broadcasts/send-broadcast.md).
- Filter or segment by it: use the **List** field with **Contains**. See [Segments](audience/segments.md#fields).
