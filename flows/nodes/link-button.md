# Link button: open a website from a message

Use Link button for an order page, appointment link, or help article. The customer opens the URL; this is different from choosing a reply button.

## Link to an order page

1. Add **Link button** and open it.
2. Set Destination number using the customer's phone variable.
3. Write **Message**, such as “You can view your order below.”
4. Set **Button label**, such as “View order”.
5. Fill **Button URL**. Paste a fixed page URL or use a URL variable supplied by the event.
6. Add a Footer if helpful.
7. Review the preview, click Save changes, and connect Next step.

You can combine a fixed URL with an inserted order identifier, for example `https://shop.example/orders/` followed by the order-number variable. Use the address required by your own store, and check it opens the intended page.

Clicking a URL button does not create a reply branch. Use [Button message](flows/nodes/button-message.md) when a customer choice should decide the next step.

See [Insert Variable](flows/using-variables.md) and [WhatsApp setup](flows/whatsapp-message-setup.md).
