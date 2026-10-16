# Connect Shopify

Connect your Shopify store so its orders, checkouts and fulfilments can start WhatsApp flows. You need four values from your Shopify admin.

## Before you start

- You need to be able to create apps in your Shopify admin (the store owner, or a staff member with app development permission).
- Connect one store per FlowFlex branch. Switch to the right branch first. See [Branches](account/branches.md).
- Have a connected WhatsApp channel, so your flows can send messages. See [Connect a WhatsApp channel](whatsapp/connect-channel.md).

## 1. Create a custom app in Shopify

1. In your Shopify admin, open the app development area and create a custom app, for example "FlowFlex Rangoli Store".
2. Give the app Admin API access. FlowFlex needs to read your customers, orders, checkouts and fulfilments.
3. Install the app on your store.
4. Copy the values in the table below from the app's API credentials.

> [!NOTE]
> Shopify's menu names change over time, and FlowFlex does not list exact scope names. In Shopify, grant the read scopes that cover customers, orders, checkouts and fulfilments.

| FlowFlex field | Where to find it in Shopify | Example |
| --- | --- | --- |
| **API Key** | API key of the custom app | `xxxx` |
| **API Secret** | API secret key of the custom app | `xxxx` |
| **Access Token** | Admin API access token. Shopify shows it only once, right after you install the app. | `shpat_xxxx` |
| **Shop Domain** | Your store's `.myshopify.com` address, without `https://` | `rangoli-store.myshopify.com` |

> [!WARNING]
> Copy the Admin API access token as soon as Shopify reveals it. If you lose it, you must create a new token in Shopify.

## 2. Connect the store in FlowFlex

1. Go to **Integrations**, find the **Shopify** card and click **Connect**.
2. Fill in **API Key**, **API Secret**, **Access Token** and **Shop Domain**. All four are required.
3. Click **Connect & sync**.

<!-- screenshot: integrations/shopify-connect -->

**Connect & sync** does three things:

1. It saves your credentials and shows **Shopify integration created successfully**.
2. It registers your store's order, checkout and fulfilment events with FlowFlex.
3. It starts a customer sync in the background. Your Shopify customers are imported into [Audience](audience/overview.md).

The sync runs in the background, so you can leave the page.

> [!NOTE]
> FlowFlex does not test your credentials when you click **Connect & sync**. If a value is wrong, the save still succeeds, but customers and store events do not arrive. Check each value carefully before you connect.

## After you connect

When you open the Shopify page again, it shows the saved details:

- **API Key**, **API Secret** and **Access Token** are masked. Only the first 4 characters are visible.
- **Shop Domain** is shown in full.
- All fields are read-only, and **Connect & sync** is disabled.

## What FlowFlex syncs

### Customers

The customer sync imports each Shopify customer into your Audience with their name, email and phone number. A customer whose phone number already exists in the branch is updated, not duplicated.

FlowFlex also adds these Shopify fields for your audience:

| Field | Meaning |
| --- | --- |
| Orders Count | Number of orders the customer has placed |
| Total Spent | Total amount the customer has spent |
| Last Order ID | ID of the customer's latest order |
| Last Order Name | Name of the latest order, for example `#1042` |
| Admin GraphQL API ID | The customer's Shopify ID |
| Currency | The customer's currency |

### Store events

After you connect, these Shopify events can start a flow. Choose them in the flow trigger under **Shopify**.

| Trigger event | Starts when |
| --- | --- |
| **Order Created** | A new order is placed |
| **Order Cancelled** | An order is cancelled |
| **Checkout Created** | A shopper starts a checkout (use it for abandoned-cart reminders) |
| **Checkout Updated** | A shopper changes an open checkout |
| **Fulfillment Created** | An order, or part of it, is fulfilled |

The trigger picker may list more Shopify events, such as product or discount events. Only the five events above are sent by your store today.

The event data becomes your flow's `{{trigger.*}}` variables. For example, a checkout event carries `{{trigger.abandoned_checkout_url}}`, `{{trigger.total_price}}` and `{{trigger.shipping_address.phone}}`. See [Choose the trigger](flows/triggers-and-variables.md).

> [!TIP]
> A flow runs only while its campaign is **Active**. See [Campaigns](flows/campaigns.md).

### How checkout events behave

- FlowFlex needs a phone number to message the shopper. It looks in the shipping address, customer, billing address and checkout phone fields, in that order. A checkout with no phone number is skipped.
- The phone number found is placed in `{{trigger.shipping_address.phone}}`. Use that variable as the destination number.
- One shopper gets one abandoned-cart run at a time. Further checkout changes from the same phone number, within 4 hours, update the running flow instead of starting a new one.
- When the shopper places an order, the open checkout is cleared, so a later checkout starts fresh.

## Update or reconnect your store

The Shopify page does not let you edit saved credentials. If your access token changes, or you move to another store, contact support. Use **Contact support** in the profile drawer, or the WhatsApp support button.

## Common problems

| Problem | Cause | Fix |
| --- | --- | --- |
| **Please input your API Key!** (or another field) | A field is empty | Fill in all four fields |
| **Failed to save Shopify integration** | FlowFlex could not save the details | Try again. If it keeps failing, contact support |
| **Failed to initiate customer sync.** | The credentials were saved, but the sync could not start | Contact support |
| Flows do not start on new orders | Wrong shop domain, or missing Admin API scopes | Check the domain is `yourstore.myshopify.com` and the app's scopes, then contact support |
| No message for an abandoned checkout | The checkout had no phone number | Ask shoppers for a phone number at checkout |
