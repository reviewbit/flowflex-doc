# Audience overview

Audience is where you keep your contacts and group them for broadcasts and flows. Open it from **Audience** in the sidebar.

<!-- screenshot: audience/overview-tabs -->

## The six tabs

| Tab | What you do there | Guide |
| --- | --- | --- |
| **Profiles** | See, search, filter, add, and edit contacts. Run bulk actions. | [Contacts](audience/contacts.md) |
| **List** | Group contacts by hand, merge lists, subscribe or unsubscribe a list. | [Lists](audience/lists.md) |
| **Segments** | Group contacts by rules. Membership updates on its own. | [Segments](audience/segments.md) |
| **Tags** | Create and delete tags, and see how many contacts carry each one. | [Tags](audience/tags.md) |
| **Bulk Import** | Upload a CSV or XLSX file of contacts, and see past imports. | [Import and export](audience/import-export.md) |
| **Export** | Download finished contact exports. | [Import and export](audience/import-export.md#export) |

Lists and segments are the two ways to pick an audience for a [broadcast](broadcasts/send-broadcast.md).

| | List | Segment |
| --- | --- | --- |
| How contacts join | You add them: by hand, by bulk action, or by import | They match the segment's conditions |
| Updates | Only when you change it | Automatically, as contact data changes |
| Good for | A fixed group, such as `Repeat buyers – Oct 2026` | A rule, such as "Tags contains repeat-buyer and Country is India" |

## Branches scope audience data

Every contact, list, segment, tag, import, and export belongs to one branch. Audience shows only the data of the currently selected branch.

- The **All profiles** count is the total for the selected branch.
- A phone number can exist once per branch. The same number in two branches is two separate contacts.
- If you switch branch while a segment is open, FlowFlex returns you to the segment list.

> [!NOTE]
> Switch to the right branch before you import, build a segment, or send a broadcast. Contacts in another branch are not included.

## Consent and subscription

Each contact has three marketing consent fields. A new contact is subscribed to all three unless you untick the consent box. In an import, only WhatsApp consent can be set to off.

| Field | In filters and segments | Used for |
| --- | --- | --- |
| WhatsApp marketing consent | **WhatsApp subscribed** | WhatsApp marketing broadcasts |
| SMS marketing consent | **Sms subscribed** | SMS marketing |
| Email marketing consent | **Email subscribed** | Email marketing |

The **Subscribed to** column in Profiles shows a green icon for each channel the contact is subscribed to.

When you send a broadcast with a **Marketing** template, contacts with WhatsApp marketing consent turned off are skipped. See [Send a broadcast](broadcasts/send-broadcast.md).

### What changes consent

| Action | Where | Effect |
| --- | --- | --- |
| Consent checkbox | **Quick add** / **Edit contact** drawer | Ticked turns all three on. Unticked turns all three off. |
| **Subscribe** / **Unsubscribe** | Profiles → **More actions** | Turns all three on or off for the selected contacts |
| **Subscribe audience** / **Unsubscribe audience** | **List** tab | Turns all three on or off for the list's current members |
| **Subscribe current audience** / **Unsubscribe current audience** | **Segments** tab | Turns all three on or off for the segment's current members |
| **Suppress profile** / **Restore profile** | Contact detail page → ⋯ menu | Turns all three off, or back on |
| Bulk Import | **Bulk Import** | A mapped **WhatsApp marketing consent** column sets WhatsApp consent. If not mapped, WhatsApp consent is set to on. |

> [!WARNING]
> Subscribe actions also re-subscribe contacts who opted out earlier. Only subscribe contacts who agreed to receive marketing from you.

### What "Suppressed" means

A contact is **Suppressed** when all three consents are off: WhatsApp, SMS, and Email. The **Suppressed** card on the Profiles tab counts these contacts in the selected branch.

Suppressed contacts stay in your lists and segments. They are skipped by marketing broadcasts.

To suppress one contact, open it and choose ⋯ → **Suppress profile**. To undo, choose ⋯ → **Restore profile**.

## Next steps

- [Add and manage contacts](audience/contacts.md)
- [Create and manage lists](audience/lists.md)
- [Build a segment](audience/segments.md)
- [Use tags](audience/tags.md)
- [Import and export contacts](audience/import-export.md)
