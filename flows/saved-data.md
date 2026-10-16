# Saved data

**Automations** → **Saved data** holds the data tables that your flows fill in. A flow writes a row each time it reaches a [Save data](flows/nodes/save-data.md) node.

> [!NOTE]
> Flow builder is in Beta. If you don't see it in the sidebar, contact FlowFlex support.

Use a table to collect survey answers, review ratings, or order requests. Tables belong to the current branch.

<img src="assets/flows/saved-data-tables.png" alt="Saved data tables">

## The table list

| Column | Shows |
| --- | --- |
| **Name** | Click it to see the table's rows. |
| **Columns** | The column names, as tags. |
| **Actions** | Pin and delete buttons. |

Use **Search by table name** to find a table.

If you have no tables, you see **No tables yet** with 'Click "New table" to create your first flow-data table.'

## Create a table

Create the table before you set up the Save data node.

1. Click **New table**.
2. In **Create flow-data table**, enter a **Title**, such as `diwali_reviews`. It is required, up to 80 characters.
3. Under **Columns**, type a column name, such as `customer_number`, and click **Add** (or press **Enter**).
4. Add the other columns, such as `rating` and `comment`. Click **×** on a tag to remove a column.
5. Click **Create**.

Column rules:

| Rule | Message if broken |
| --- | --- |
| At least one column | **Add at least one column** |
| Letters, numbers, and `_` only, with no spaces | **Column names must be alphanumeric / underscore only** |
| No duplicates | **Column "…" already added** |

> [!TIP]
> Plan your columns before you create the table. You cannot rename or add columns afterwards. To change them, create a new table.

## Pin a table

Click the pin icon to mark a table as pinned. Click it again (**Unpin**) to remove the pin.

## View the rows

Click a table's name. The rows view shows:

- the table's title and its columns;
- one row per Save data run, newest first, 10 rows per page;
- **—** in any column the flow did not fill.

Click **Tables** to go back to the list.

If the flow has not written anything yet, you see **No rows yet** with "Rows are written when a flow with a Save data node referencing this table executes." Check that the flow is published and its campaign is **Active**. See [Campaigns](flows/campaigns.md).

## Delete a table

1. Click the red bin icon.
2. Confirm **Delete this table?**. All of its rows are removed too.

> [!WARNING]
> Deleting a table cannot be undone. Before you delete it, point any Save data node that uses it at another table.

## Permissions

| Action | Permission |
| --- | --- |
| See tables and rows | **Workflow view** |
| Create a table | **Workflow create** |
| Pin a table | **Workflow edit** |
| Delete a table | **Workflow delete** |

See [Roles and permissions](account/roles-and-permissions.md).
