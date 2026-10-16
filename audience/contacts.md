# Contacts

Find, add, edit and act on the contacts in a branch from the **Profiles** tab.

Each contact, or profile, holds a customer's phone number, name, email, tags, owner, marketing consent and any custom fields. Go to **Audience** → **Profiles** to see every contact in the selected branch.

A new customer, Maria Garcia, phones Rangoli Store's Kochi branch to ask about a saree. Chris Taylor, a support agent, adds Maria with **Quick add**, tags the profile `new`, and opens a WhatsApp chat straight from Maria's contact page to send the photos.

## Overview cards

Four cards at the top count contacts in the selected branch:

- **All Profiles:** every contact in the branch.
- **Email Profiles:** contacts that have an email address.
- **Phone Profiles:** contacts that have a phone number.
- **Suppressed:** contacts with WhatsApp, SMS and Email consent all off. See [Suppressed contacts](audience/overview.md?id=suppressed-contacts).

Click **Refresh** to update the cards and the table.

## Find contacts

The **Audience List** table shows each contact's **Name**, **Phone** (with country code), **Subscribed to** (a green icon for each channel with marketing consent on), **Assigned to** (the owner, or **Unassigned**), **Address**, **Country**, the first two **Tags** (click **View all** for the rest) and **Created At** date. **Email** and one column per custom field are also available. Click a name to open the contact's page.

Use the pager at the bottom to show 10, 20, 50, 100, 200 or 500 contacts per page.

### Search

Type in **Search by email, mobile or name**. The table filters as you type.

### Filter

1. Click **Filter**.
2. Choose a property, a condition and a value, such as **Tags** → **Contains** → `repeat-buyer`.
3. Click **Add condition** to add more rules, or **Add condition group** to add a group.
4. Click **Apply Filter**. The table shows only the contacts that match.

The filter drawer uses the same builder as segments. See [Build conditions](audience/segments.md?id=build-conditions) for every field and operator. To remove the filter, click **Clear Filter** next to the **Filter** button.

> [!TIP]
> A filter is temporary. To keep a rule and reuse it in broadcasts, save it as a [segment](audience/segments.md).

### Choose columns

1. Click **Show Columns**.
2. Tick the columns you want. Use **Search columns...** to find one.
3. Click **Save**. Your choice is kept for next time.

**Name** and **Phone** are always shown. **Reset** restores the default columns.

## Add a contact

1. Click **Quick add**. The **Add new contact** drawer opens.
2. Fill in the fields below. For Maria Garcia, Chris enters the name, picks **India** and types `9000000004`, and adds the tag `new`.
3. Check the consent checkbox, then click **Create profile**. The contact appears in the table.

<img src="assets/audience/add-contact-drawer.png" alt="Adding a new contact with Quick add">

To change a contact, click the pencil icon in its row. The **Edit contact** drawer opens. Click **Update profile** to save.

| Field | Rule |
| --- | --- |
| Name | Required when adding. Optional when editing. Some invisible control characters are rejected: **Name contains unsupported characters**. |
| Email | Optional. Must be a valid email address. |
| Phone | Required. Pick the country, then type the number. One contact per phone number per branch. |
| Country | Optional. Start typing to pick from the list. |
| State | Optional |
| Address | Optional. One address. |
| Assigned to | Optional owner. **Not assigned** by default. |
| Tags | Optional. Pick existing tags, or type a new one and click **Create tag: name**. New tags are saved in lowercase. A space ends a tag. |
| Consent checkbox | **This profile will be added to our marketing list directly.** Ticked by default. Ticked turns WhatsApp, SMS and Email consent on. Unticked turns all three off. |

> [!WARNING]
> Check the consent checkbox before you save; saving applies the consent shown.

### If the contact won't save

| Message | Cause | Fix |
| --- | --- | --- |
| **Please enter name** | Name is empty on a new contact | Enter a name, such as `Maria Garcia` |
| **Please enter phone number** | Phone is empty | Enter the number with its country |
| **Invalid phone number for India (+91). Check country code or phone number length.** | The number doesn't fit the chosen country | Check the country and the number of digits. The country in the message changes with your choice. |
| **Customer creation failed! Customer already exists** | A contact with this phone number already exists in the branch | Search for the number and edit that contact instead |

## Act on many contacts

1. Tick the checkbox next to one or more contacts. The bar above the table shows how many are selected.
2. To act on every contact that matches the current search and filter, click **Select All**. Click **Undo** to go back.
3. Click **More actions** and choose an action:
    - **Add to list:** adds the contacts to one or more lists. Type a new name to create a list. Subscription status doesn't change.
    - **Remove from list:** removes the contacts from the lists you pick. Subscription status doesn't change.
    - **Unsubscribe:** turns WhatsApp, SMS and Email consent off.
    - **Subscribe:** turns WhatsApp, SMS and Email consent on.
    - **Manage Tags:** shows the tags on the selected contacts. Add a tag to add it to all of them, or remove one to remove it from all of them.
    - **Assign owner:** sets the owner. Leave it at **Not assigned** to clear the owner.
    - **Export:** starts a CSV export. Download it from the [Export tab](audience/import-export.md?id=export-contacts) when it finishes.
    - **Delete:** deletes the contacts permanently.

To delete one contact, click the bin icon in its row and confirm with **Yes**.

## Open a contact

Click a contact's name to open its page. Click **Go back** to return.

<img src="assets/audience/contact-detail.png" alt="A contact's detail page">

The buttons at the top:

- **Chat now:** opens a chat with the contact. Pick the **Channel** and click **Start Chat**; the channel of the last conversation is pre-selected. If the contact has no phone number, you see **This user does not have a phone number.**
- **Edit profile:** opens the **Edit contact** drawer.
- ⋯ → **Add to list:** adds the contact to one list.
- ⋯ → **Suppress profile:** turns all three consents off. When the contact is suppressed, it shows **Restore profile**, which turns them back on.
- ⋯ → **Export profile:** starts an export of this one contact.
- ⋯ → **Delete profile:** deletes the contact. Confirm with **Yes, delete**. This can't be undone.

The left side shows **Customer details** (**Customer since**, **Customer ID** with a copy icon, **Country**, **Mobile number**, **Email address** and **Assigned to**), the contact's **Profile tags**, and every saved address under **Addresses**. The **Overview** shows **WhatsApp**, **Email** and **SMS** as **Subscribed** or **Not Subscribed**.

The tabs below hold more detail:

- **List:** the lists the contact belongs to. Click the bin icon to remove the contact from a list, or the arrow to open the list.
- **Segments:** the segments the contact matches. Click one to open it.
- **Other:** extra data grouped by source, such as Shopify fields or custom fields from an import.
- **Notes:** internal notes agents added in chats with this contact. Each note shows the agent, the channel and the date. Use the channel filter to show one channel, or **All channels**. The tab is read-only; if there are no notes, you see **No internal notes yet**.

## See also

- [Import and export contacts](audience/import-export.md): add many contacts from a file.
- [Lists](audience/lists.md): group contacts by hand.
- [Segments](audience/segments.md): group contacts by rules.
- [Tags](audience/tags.md): label contacts.
