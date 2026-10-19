# Button message

Send a WhatsApp message with up to three reply buttons, and send each answer down its own path.

## When to use it

Use a button message when the customer picks from a few clear choices. Rangoli Store's order-tracking flow opens with "Hi, how can we help?" and two buttons, **Track order** and **Talk to the team**. Each button leads to a different next step.

## Set it up

1. Add **Button message** from **WhatsApp Blocks** and open it.
2. In **Destination number**, insert the customer's phone number, such as **Trigger** → **from**. See [Set up WhatsApp messages](../whatsapp-message-setup.md#choose-the-recipient).
3. Write the **Message**, such as `Hi {{trigger.name}}, how can we help?`.
4. Under **Quick replies**, enter a label for each button. Click **+ Add response** to add another, up to three.
5. Optionally, add a **Header** (text or a file) and, under **More message options**, a **Footer**.
6. Under **Response handling**, set a waiting time if you want a fallback when the customer doesn't tap anything. See [Wait for and validate a reply](../response-wait.md).
7. Check the **Live WhatsApp preview** and click **Save changes**.

Button labels can be up to 20 characters, the message up to 1,024, and a text header or footer up to 60. For a file header, see [Choose files and media](../files-and-media.md).

## Connect it

The node has one output per button, named after its label. Connect each one: Rangoli Store connects **Track order** to the API lookup and **Talk to the team** to **Assign agent**. If you set a waiting time, connect **No response** too.

## See also

- [List message](list-message.md), for more than three choices
- [Link button](link-button.md), to open a website
- [Workflows overview](../overview.md)
