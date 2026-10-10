# Set time delay: pause before the next step

Use Set time delay to space out updates or send a follow-up later. This pause does not end when the customer replies; for that, use [Response waiting](flows/response-wait.md).

## Wait two hours before a follow-up

1. Add **Set time delay** between the current action and the follow-up.
2. Open the node and set **Set time delay** to 2.
3. Set **Unit** to Hours.
4. Save changes.
5. Connect Next step to the follow-up.

The duration can use Seconds, Minutes, Hours, or Days.

## Resume at a suitable time

The scheduling checkboxes add constraints to the duration:

| Option | What to set |
| --- | --- |
| Delay until a scheduled time of day | Choose the time and timezone. |
| Delay until scheduled days of the week | Select the allowed weekdays. |
| Delay until a dynamic time of day | Supply the variable requested by the form. |

For example, use a one-day duration with a morning time and weekday selection for a business-day follow-up. Check the chosen timezone matches your intention.

Use [Insert Variable](flows/using-variables.md) for dynamic values, and use the unit and meaning expected by the field rather than inserting a formatted date into an amount field.

## Before publishing

Review the duration and any additional restrictions together. After a long delay, the WhatsApp reply window may be closed; choose an approved [Template message](flows/nodes/template-message.md) for the follow-up when needed.
