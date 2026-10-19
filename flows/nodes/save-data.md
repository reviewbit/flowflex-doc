# Save data

Add a row to one of your flow data tables, such as a survey answer or an order detail.

## When to use it

Use Save data to keep a record you can review later in **Saved data**. After a delivery, Rangoli Store asks "How would you rate your delivery, 1 to 5?" and saves each customer's number and answer to a `delivery_feedback` table. To save details to the contact's own profile instead, use [Save audience](audience-actions.md#save-audience).

## Set it up

1. Create the table first, with columns such as `customer_number` and `rating`. See [Create a table](../saved-data.md#create-a-table).
2. Add **Save data** from **Data Blocks** after the step that collects the answer, and open it.
3. In **Choose table**, select the table. Its columns appear under **Columns**.
4. For each column, enter the value or select it with Insert Variable. Rangoli Store maps `customer_number` to **Trigger** → **from**, and `rating` to the question's captured reply.
5. Click **Save**.

If you pick a different table, the columns change, so check the values again.

## Connect it

Connect **Next step** to a thank-you message or **End**. Make sure the question waits for a reply before this step, and send **No response** somewhere else, so silence isn't saved as an answer. See [Wait for and validate a reply](../response-wait.md).

## See also

- [Saved data](../saved-data.md)
- [Save variable](save-variable.md)
- [Use a customer's reply](../using-variables.md#use-a-customers-reply)
