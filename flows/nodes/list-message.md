# List message: create a menu of choices

Use List message when customers need more choices than fit in three reply buttons. The customer opens the list and selects one row; that row selects the next path.

## Build a service menu

1. Add **List message** and set Destination number.
2. Write the Body, such as “Choose the service you need.”
3. Set the list-opening button title, for example “View services”.
4. Add a section title, such as “Support”.
5. Add rows with clear titles and descriptions, such as “Delivery” / “Questions about your delivery”.
6. Add another section if grouping the choices helps the customer.
7. Configure the response-wait window when needed.
8. Review the preview and click **Save changes**.
9. Connect every row output to the relevant action and No response when displayed.

## Limits

| Part | Limit |
| --- | --- |
| Sections | Up to 10. |
| Rows | Up to 10 across all sections combined. |
| Section or row title | 24 characters. |
| Row description | 72 characters; fill it in to explain the choice. |
| List-opening button title | 24 characters. |
| Header or footer | 60 characters. |
| Message body | 1,024 characters. |

For three choices or fewer, [Button message](flows/nodes/button-message.md) is simpler. Use [shared WhatsApp setup](flows/whatsapp-message-setup.md) and [response waiting](flows/response-wait.md) for recipient and timeout settings.

If the wrong branch runs, check that each row is connected to the action its label promises.
