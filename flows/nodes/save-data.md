# Save data: record information in a flow data table

Use Save data to record a survey answer, order detail, or other information in a selected flow data table. For a contact's profile, use [Save audience](flows/nodes/audience-actions.md#save-audience).

## Record a survey answer

1. Create or choose the data table you want to use in the flow's saved-data area. Include columns such as customer_number and answer.
2. Add **Save data** after the question's reply path.
3. Open the node and select **Choose table**.
4. For each displayed column, select its value with Insert Variable.
5. Map customer_number to the trigger's contact number and answer to the question's captured reply.
6. Save changes and connect Next step to a thank-you message or End.

Selecting a different table changes the columns to fill, so review the mappings again.

## Before publishing

Make sure the table exists, each intended column has the correct value, and the question waits for a reply before this step. Route silence separately so you do not record it as an answer.

See [Insert Variable](flows/using-variables.md) and [Response waiting](flows/response-wait.md).
