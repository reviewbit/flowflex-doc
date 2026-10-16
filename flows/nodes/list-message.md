# List message

Send a menu of up to 10 choices that the customer opens and picks from, and send each choice down its own path.

## When to use it

Use a list message when there are more choices than fit on three buttons. Rangoli Store's help menu has a **View options** button that opens a list: **Track my order**, **Returns and exchanges**, **Store timings** and **Talk to the team**. Each row leads to a different next step.

## Set it up

1. Add **List message** from **WhatsApp Blocks** and open it.
2. In **Destination number**, insert the customer's phone number, such as **Trigger** → **from**.
3. Write the **Body**, such as `What can we help you with?`. Optionally add **Header text (optional)** and **Footer (optional)**.
4. In **List title**, enter the label of the button that opens the list, such as `View options`.
5. Give the section a title, such as `Orders`, and add rows. Each row needs a title, and can have a description, such as `Track my order` / `See where your parcel is`.
6. Click **Add Row** for more rows, or **Add Section** to group them. With more than one section, each section needs a title.
7. Set a waiting time under response handling if you want a fallback when the customer doesn't pick anything. See [Wait for and validate a reply](flows/response-wait.md).
8. Check the **Live WhatsApp preview** and click **Save changes**.

| Part | Limit |
| --- | --- |
| Sections | Up to 10, each with at least one row |
| Rows | Up to 10 across all sections |
| Section title, row title, list title | 24 characters |
| Row description | 72 characters |
| Header and footer | 60 characters |
| Body | 1,024 characters |

## Connect it

The node has one output per row, named after its title. Connect each row to the step its title promises, and connect **No response** if you set a waiting time.

## See also

- [Button message](flows/nodes/button-message.md), for three choices or fewer
- [Set up WhatsApp messages](flows/whatsapp-message-setup.md)
- [The wrong condition path runs](help/troubleshooting.md?id=the-wrong-condition-path-runs)
