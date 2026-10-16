# Contacts

The **Profiles** tab lists every contact in the selected branch. Go to **Audience** → **Profiles** to find, add, edit, and act on contacts.

## Audience overview cards

Four cards at the top count contacts in the selected branch.

| Card | Counts |
| --- | --- |
| **All Profiles** | Every contact in the branch |
| **Email Profiles** | Contacts that have an email address |
| **Phone Profiles** | Contacts that have a phone number |
| **Suppressed** | Contacts with WhatsApp, SMS, and Email consent all off. See [What "Suppressed" means](audience/overview.md#what-suppressed-means). |

Click **Refresh** to update the cards and the table.

## The Audience List table

| Column | Shows |
| --- | --- |
| Name | The contact's name. Click it to open the contact detail page. |
| Phone | The phone number, with country code |
| Email | The email address. Hidden by default. |
| Subscribed to | A green icon for each channel with marketing consent on: SMS, WhatsApp, Email |
| Assigned to | The owner, or **Unassigned** |
| Address | The saved address |
| Country | The country |
| Tags | The first two tags. Click **View all** to see the rest. |
| Created At | The date the contact was added |
| Custom fields | One column per custom field, such as fields created by an import |

Use the pager at the bottom to show 10, 20, 50, 100, 200, or 500 contacts per page.

### Search

Type in **Search by email, mobile or name**. The table filters as you type.

### Filter

1. Click **Filter**.
2. Choose a property, a condition, and a value. For example, **Tags** → **Contains** → `repeat-buyer`.
3. Click **Add condition** to add more rules, or **Add condition group** to add a group.
4. Click **Apply Filter**.

The filter drawer uses the same builder as segments. See [Build conditions](audience/segments.md#build-conditions) for every field and operator.

To remove the filter, click **Clear Filter** next to the **Filter** button.

> [!TIP]
> A filter is temporary. To keep a rule and reuse it in broadcasts, save it as a [segment](audience/segments.md).

### Choose columns

1. Click **Show Columns**.
2. Tick the columns you want. Use **Search columns...** to find one.
3. Click **Save**. Your choice is kept for next time.

**Name** and **Phone** are always shown. **Reset** restores the default columns.

## Add a contact

1. Click **Quick add**. The **Add new contact** drawer opens.
2. Fill in the fields below.
3. Click **Create profile**.

To change a contact, click the pencil icon in its row. The **Edit contact** drawer opens. Click **Update profile** to save.

<!-- screenshot: audience/add-contact-drawer -->

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
| Consent checkbox | **This profile will be added to our marketing list directly.** Ticked by default. Ticked turns WhatsApp, SMS, and Email consent on. Unticked turns all three off. |

### Validation messages

| Message | Cause | Fix |
| --- | --- | --- |
| **Please enter name** | Name is empty on a new contact | Enter a name, such as `Priya Sharma` |
| **Please enter phone number** | Phone is empty | Enter the number with its country |
| **Invalid phone number for India (+91). Check country code or phone number length.** | The number does not fit the chosen country | Check the country and the number of digits. The country in the message changes with your choice. |
| **Customer creation failed! Customer already exists** | A contact with this phone number already exists in the branch | Search for the number and edit that contact instead |

> [!WARNING]
> When you edit a contact, the consent checkbox applies again. If it is ticked, a contact who unsubscribed is re-subscribed to all three channels. Untick it to keep them unsubscribed.

## Bulk actions

1. Tick the checkbox next to one or more contacts. The bar above the table shows how many are selected.
2. To act on every contact that matches the current search and filter, click **Select All**. Click **Undo** to go back.
3. Click **More actions** and choose an action.

| Action | What it does |
| --- | --- |
| **Add to list** | Adds the contacts to one or more lists. Type a new name to create a list. Subscription status does not change. |
| **Remove from list** | Removes the contacts from the lists you pick. Subscription status does not change. |
| **Unsubscribe** | Turns WhatsApp, SMS, and Email consent off |
| **Subscribe** | Turns WhatsApp, SMS, and Email consent on |
| **Manage Tags** | Shows the tags on the selected contacts. Add tags to add them to all selected contacts. Remove a tag to remove it from all of them. |
| **Assign owner** | Sets the owner. Leave it at **Not assigned** to clear the owner. |
| **Export** | Starts a CSV export. Download it from the [Export tab](audience/import-export.md#export) when it finishes. |
| **Delete** | Deletes the contacts permanently |

> [!NOTE]
> The **Subscribe** and **Unsubscribe** confirmation titles mention WhatsApp, but both change SMS and Email consent too.

To delete one contact, click the bin icon in its row and confirm with **Yes**.

## Contact detail page

Click a contact's name to open its page. Click **Go back** to return.

<!-- screenshot: audience/contact-detail -->

### Header buttons

| Button | What it does |
| --- | --- |
| **Chat now** | Opens a chat with the contact. Pick the **Channel** and click **Start Chat**. The channel of the last conversation is pre-selected. |
| **Edit profile** | Opens the **Edit contact** drawer |
| ⋯ → **Add to list** | Adds the contact to one list |
| ⋯ → **Suppress profile** | Turns all three consents off. Shows **Restore profile** when the contact is suppressed. |
| ⋯ → **Export profile** | Starts an export of this one contact |
| ⋯ → **Delete profile** | Deletes the contact. Confirm with **Yes, delete**. This action cannot be undone. |

If the contact has no phone number, **Chat now** shows **This user does not have a phone number.**

### Left side

| Section | Shows |
| --- | --- |
| **Customer details** | **Customer since**, **Customer ID** (click the copy icon to copy it), **Country**, **Mobile number**, **Email address**, **Assigned to** |
| **Profile tags** | Every tag on the contact |
| **Addresses** | Every saved address |

### Tabs

| Tab | Shows |
| --- | --- |
| **List** | The lists the contact belongs to. Click the bin icon to remove the contact from a list, or the arrow to open the list. |
| **Segments** | The segments the contact matches. Click one to open it. |
| **Other** | Extra data grouped by source, such as Shopify fields or custom fields from an import |
| **Notes** | Internal notes agents added in chats with this contact |

The **Notes** tab is read-only. Each note shows the agent, the channel, and the date. Use the channel filter to show one channel, or **All channels**. If there are none, you see **No internal notes yet**.

## Related

- [Lists](audience/lists.md)
- [Segments](audience/segments.md)
- [Tags](audience/tags.md)
- [Import and export](audience/import-export.md)
