# Save variable: remember a value for later steps

Use Save variable when several later steps need the same value during this flow run. Use Save audience or Save data when you want to keep information beyond the run.

## Save a preferred delivery date

1. Add **Save variable** after the step that supplies the date.
2. Open the node.
3. Enter a name, such as `preferred_date`.
4. In its Value field, use Insert Variable to choose the date from the earlier step.
5. Use **Add variable** if you need another named value.
6. Save changes and connect Next step.
7. In later steps, select the saved variable through Insert Variable.

For example, you can use `{{preferred_date}}` in a confirmation message and a later API request.

## Names and values

Start names with a letter and use letters, numbers, and underscores. Choose clear, distinct names. Values can be fixed text or selected from earlier steps.

Save variable does not create a contact profile field or a table row. Use [Save audience](flows/nodes/audience-actions.md#save-audience) for profiles, or [Save data](flows/nodes/save-data.md) for reporting.

See [Select and insert variables](flows/using-variables.md).
