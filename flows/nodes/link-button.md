# Link button

Send a message with a button that opens a web page, such as an order page or a help article.

## When to use it

Use a link button when the next step happens on a website. After an order ships, Rangoli Store sends "Your order is on its way" with a **View order** button that opens the order's tracking page. Tapping the button opens the page; it doesn't send a reply or choose a path in the flow.

## Set it up

1. Add **Link button** from **WhatsApp Blocks** and open it.
2. In **Destination number**, insert the customer's phone number, such as **Trigger** → **from**.
3. Write the **Message**, such as `Your order is on its way.`
4. Under **Call-to-action**, enter the **Button label**, such as `View order`.
5. Enter the **Button URL**. Use a fixed address, or combine one with a variable, such as `https://rangoli.example/orders/` followed by the order number. Check that the finished link opens the right page.
6. Optionally, add a **Footer** under **More message options**.
7. Check the **Live WhatsApp preview** and click **Save changes**.

## Connect it

Connect **Next step** to the following step or to **End**. To let the customer's choice decide what happens next, use a [Button message](flows/nodes/button-message.md) instead.

## See also

- [Button message](flows/nodes/button-message.md)
- [Select and insert variables](flows/using-variables.md)
- [Set up WhatsApp messages](flows/whatsapp-message-setup.md)
