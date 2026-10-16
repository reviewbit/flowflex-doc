# Import and export contacts

Bulk Import adds many contacts at once from a CSV or XLSX file. Export gives you a CSV of contacts to download.

## Bulk Import

Go to **Audience** → **Bulk Import** → **Import**. The **Import audience** wizard has three steps: **Upload** → **Map columns** → **Confirm**.

Click **Watch a demo** on the Import History page to see the wizard in action.

### File rules

| Rule | Limit |
| --- | --- |
| Format | CSV or XLSX. For XLSX, only the first sheet is read. |
| Rows | Up to 100,000 data rows |
| Size | Up to 10 MB |
| Header row | Required. The first row must hold the column names. |
| Phone column | Required. Every contact needs a phone number. |

Click **Download sample CSV** on the Upload step for a ready-made template.

A file for Rangoli Store could look like this:

```csv
name,phone,email,tags,city
Priya Sharma,+919000000001,priya@example.com,"repeat-buyer",Pune
Arjun Mehta,9000000002,,"repeat-buyer,new",Delhi
Fatima Khan,+919000000003,,new,Mumbai
```

Separate several tags in one cell with commas. Arjun's number has no `+`, so it needs a default country code.

### 1. Upload

<img src="assets/audience/import-upload.png" alt="Import audience, step 1: Upload">

1. Choose the **Destination**:
    - **All contacts**: import to the main audience. This is the default.
    - **To a list**: add the contacts to a list too. Pick it in **Select list**, or click **+ Create new list**. A list name can have up to 80 characters.
2. **Assign owner** (optional): pick a team member to own every imported contact. Leave **Not assigned** to skip.
3. **Default country code** (optional): pick a country for numbers written without `+`. Numbers that already include a country code stay unchanged.
4. Drop the file on the box, or click **Click to upload**.
5. Check the summary under the preview, then click **Next: Map columns**.

FlowFlex reads the file in your browser first and shows the first 5 rows. The summary tells you what will happen:

| Line | Meaning |
| --- | --- |
| **Phone column detected: phone** | FlowFlex found the phone column by its name |
| **No phone column auto-detected. Map the phone column in the next step.** | Choose the phone column yourself in step 2 |
| **N unique rows ready to import** | Rows with a valid, unique phone number |
| **N local-format numbers will use India (+91)** | Numbers without `+` will get the default country code |
| **N local-format numbers have no default country code selected.** | Pick a **Default country code**, or these rows may be skipped |
| **N rows have an invalid or non-mobile phone number — they will be skipped.** | Fix these numbers in the file, or accept that they are skipped |
| **N duplicate phone rows already appear earlier in the file — they will be skipped.** | Only the first row for each number is imported |

To use a different file, click **Replace**.

#### Upload errors

| Error | Cause | Fix |
| --- | --- | --- |
| **Unsupported file format** | The file is not CSV or XLSX | Save it as CSV or XLSX |
| **File too large** | Over 10 MB | Split the file and import in batches |
| **Too many rows** | Over 100,000 rows | Split the file and import in batches |
| **No data rows** | Headers but no contacts | Add at least one contact |
| **Couldn't read the file** | No header row, or the file is damaged | Check the header row and save the file again |

Click **Try a different file** to start again.

### 2. Map columns

<img src="assets/audience/import-map-columns.png" alt="Import audience, step 2: Map columns">

Each column in your file is one row here. FlowFlex matches common column names for you.

1. Tick **Import** for each column you want. Unticked columns are skipped.
2. In **Import as**, pick the FlowFlex field for each column.
3. Make sure one column is imported as **Phone**. Until then you see **Phone is required. Check the phone column and import it as Phone before continuing.**
4. Click **Next: Confirm**.

The counter shows how many columns are selected, such as **4 of 5 columns selected**. The **Status** column shows a tick when a column is mapped.

| FlowFlex field | Column names matched automatically | Notes |
| --- | --- | --- |
| **Phone** | phone, phone number, mobile, mobile number, telephone, tel, whatsapp, whatsapp number, contact number, contact | Required. With country code, or use the default country. |
| **Name** | name, full name, contact name, first name, display name | |
| **Email** | email, email address, email id, mail | Invalid emails are left empty |
| **Country** | country, country name | |
| **State** | state, region, province | |
| **Note** | note, notes, comment, comments, remarks | |
| **Tags** | tags, tag, labels, label | Comma-separated. Missing tags are created. |
| **Address line 1** | address, address 1, address line 1, street | |
| **Address line 2** | address 2, address line 2 | |
| **WhatsApp marketing consent** | whatsapp consent, whatsapp marketing consent, whatsapp subscribed | `no`, `false`, `0`, `n`, `opt-out`, `opted out`, `unsubscribe`, or `unsubscribed` means off. Anything else, or empty, means on. |
| **Custom field** | Any other column | Creates a custom field. See below. |

Matching ignores capitals, spaces, and punctuation, so `Mobile Number` matches **Phone**.

When you map **Country**, you can tick **Use this country column to detect phone country codes**. Numbers without `+` then use each row's country.

#### Custom fields

Pick **Custom field** to keep any other data, such as `city` or `last_order_date`.

1. In **Import as**, choose **Custom field**.
2. Check the **Custom field name**. FlowFlex suggests one from the column name, in lowercase with underscores.
3. Change it if needed.

The custom field is created when the import runs. It then appears as a column in **Profiles**, on the contact's **Other** tab, and as a field in filters and [segments](audience/segments.md). Custom fields created by an import are text fields.

Some names belong to built-in fields and cannot be used, such as `phone`, `email`, `lists`, or `order_count`. You see **"name" is reserved — it would collide with a built-in field. Pick a different name.**

### 3. Confirm

The last step lists each mapping: **Your imported headers** and **FlowFlex profile headers**. Click **Previous** to change anything.

Click **Import contacts**. You see **Import queued** and how many contacts are on the way. Click **Done**.

FlowFlex sends a notification when the import finishes. It includes a link to download any rows that could not be imported.

If you see **Import didn't start**, your file and mapping are kept. Click **Retry**.

### What happens to existing contacts

A row whose phone number already exists in the branch does not create a new contact. Instead:

| Field | What happens |
| --- | --- |
| Destination list | The contact is added to the list |
| Owner | Set to the **Assign owner** choice, if you picked one |
| WhatsApp consent | Not changed, unless the consent column says `no`, which turns it off. An import never subscribes a contact who opted out. |
| Name, email, tags, and other fields | Not changed |

> [!NOTE]
> A contact who opted out stays opted out after an import, even if the file says `yes`. They can subscribe again only themselves, for example by sending the START keyword.

### Skipped rows

| Reason | Example |
| --- | --- |
| No phone number | The phone cell is empty |
| Invalid phone number | Wrong number of digits, or no country code and no default country |
| Duplicate in the file | The same number appears in an earlier row |

### Import History

The **Bulk Import** tab lists past imports. Search with **Search by file name**, and click **Refresh** to update statuses.

| Column | Shows |
| --- | --- |
| Name | The import name |
| Audience count | Contacts added or updated |
| Status | **Pending** while running, **Completed** when done, or **Failed** |
| Import date | When the import started |
| Actions | Download the original file. Download the error file (red icon), when rows were skipped. Delete the record from the ⋯ menu. |

The error file is a CSV of the skipped rows with an extra `error` column. Fix the rows and import that file again.

> [!TIP]
> To create a list from a file while building a broadcast, use **Quick Import** in [Send a broadcast](broadcasts/send-broadcast.md). It follows the same file rules.

## Export

Exports run in the background. You get a notification when the file is ready.

### Start an export

| What to export | Where |
| --- | --- |
| Selected contacts, or all contacts that match a filter | **Profiles** → select contacts (or **Select All**) → **More actions** → **Export** → **Confirm** |
| One list | Open the list → ⋯ → **Export list** → **Confirm** |
| One contact | Open the contact → ⋯ → **Export profile** |

### Download an export

Go to **Audience** → **Export**. The **Export List** table shows finished exports.

| Column | Shows |
| --- | --- |
| Name | The export name |
| Audience count | How many contacts it holds |
| Status | The export status |
| Export date | When it was created |
| Actions | Download the CSV, or delete the record from the ⋯ menu |

Search with **Search by file name**. To delete several records, select them and choose **Delete Selected**.

The CSV holds the contacts' main fields, such as name, phone, email, marketing consent, and tags.

> [!WARNING]
> Exports contain personal data. Store and share them only as your privacy policy allows.
