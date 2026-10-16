# Saved data

Collect answers from your flows in tables, such as survey replies, review ratings or order requests.

> [!NOTE]
> Flow builder is in Beta. If you don't see it in the sidebar, contact FlowFlex support.

**Automations** → **Saved data** holds the data tables your flows fill in. A flow adds a row each time it reaches a [Save data](flows/nodes/save-data.md) node. Tables belong to the current branch.

At the end of its order-tracking flow, Rangoli Store asks customers to rate their order. The team creates a table called `diwali_reviews` with the columns `customer_number`, `rating` and `comment`. When Maria Garcia replies with a rating, the flow saves a row, and the team reads all the ratings in one place.

<img src="assets/flows/saved-data-tables.png" alt="Saved data tables">

## The table list

Each table shows its **Name**, its **Columns** as tags, and **Actions** with the pin and delete buttons. Click a name to see the table's rows. Use **Search by table name** to find a table.

If you have no tables, you see **No tables yet** with 'Click "New table" to create your first flow-data table.'

## Create a table

Create the table before you set up the Save data node.

1. Click **New table**.
2. In **Create flow-data table**, enter a **Title**, such as `diwali_reviews`. It's required, up to 80 characters.
3. Under **Columns**, type a column name, such as `customer_number`, and click **Add** (or press **Enter**).
4. Add the other columns, such as `rating` and `comment`. Click **×** on a tag to remove a column.
5. Click **Create**.

Column names must follow these rules:

| Rule | Message if broken |
| --- | --- |
| At least one column | **Add at least one column** |
| Letters, numbers, and `_` only, with no spaces | **Column names must be alphanumeric / underscore only** |
| No duplicates | **Column "…" already added** |

> [!TIP]
> Plan your columns before you create the table. You can't rename or add columns afterwards. To change them, create a new table.

## Pin a table

Click the pin icon to pin a table. Click it again (**Unpin**) to remove the pin.

## View the rows

Click a table's name. The rows view shows:

- the table's title and its columns;
- one row per Save data run, newest first, 10 rows per page;
- **—** in any column the flow didn't fill.

Click **Tables** to go back to the list.

If the flow hasn't written anything yet, you see **No rows yet** with "Rows are written when a flow with a Save data node referencing this table executes." Check that the flow is published and its campaign is **Active**. See [Campaigns](flows/campaigns.md).

## Delete a table

1. Click the red bin icon.
2. Confirm **Delete this table?**. All of its rows are deleted too.

Deleting a table can't be undone. Before you delete it, point any Save data node that uses it at another table.

## Permissions

| Action | Permission |
| --- | --- |
| See tables and rows | **Workflow view** |
| Create a table | **Workflow create** |
| Pin a table | **Workflow edit** |
| Delete a table | **Workflow delete** |

See [Roles and permissions](account/roles-and-permissions.md).

## See also

- [Save data](flows/nodes/save-data.md)
- [Campaigns](flows/campaigns.md)
- [Wait for and validate a reply](flows/response-wait.md)
