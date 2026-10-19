# Save variable

Store a value under a name you choose, so later steps in the same flow run can reuse it.

## When to use it

Use Save variable when several steps need the same value. Rangoli Store asks customers for their preferred delivery date, saves it as `preferred_date`, and uses it in the confirmation message and in the API request that books the delivery.

## Set it up

1. Add **Save variable** from **Other Blocks** after the step that supplies the value, and open it.
2. Under **Variables**, enter a name, such as `preferred_date`. Names start with a letter and can contain letters, numbers and underscores.
3. Enter the value, either fixed text or a field from an earlier step selected with Insert Variable.
4. Click **Add variable** to store another value.
5. Click **Save**.

In later steps, select the saved variable through Insert Variable, for example `{{preferred_date}}` in a message.

A saved variable lasts only for this run of the flow. It doesn't create a profile field or a table row. To keep the value, use [Save audience](audience-actions.md#save-audience) for the contact's profile or [Save data](save-data.md) for a table.

## Connect it

Connect **Next step** to the following step.

## See also

- [Select and insert variables](../using-variables.md)
- [Save data](save-data.md)
- [Audience actions](audience-actions.md)
