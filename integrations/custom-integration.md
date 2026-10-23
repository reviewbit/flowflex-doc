---
description: "Start your flows from any system, such as your website, order system or CRM, by sending events to one webhook URL."
---

# Set up a custom integration

Create a webhook URL and credentials that let your own systems, such as your website, order system or CRM, start FlowFlex flows.

A custom integration is a named set of events with one webhook URL, an API key and a secret. Your system sends an event to the URL, and the flows that use that event start with the event's data. Use it for any system FlowFlex has no ready-made app for. For the code side, see the [Developer quick start](../developers/quick-start.md).

Rangoli Store creates an integration called `Rangoli Order Events` with an `order.placed` event. When John Smith places order `RS-1042` on the website, the website sends `order.placed` with John's name, phone number, order number and total. A flow uses those values to send John a WhatsApp confirmation.

## Create a custom integration

1. Go to **Integrations** and click **Create integration**, or **Build a custom connection** on the intro card. The **Create custom integration** page opens. The form is on the left, and the **How to send events** panel on the right updates as you fill it in.
2. Fill in the [details](custom-integration.md#details).
3. On the **Events** tab, add at least one [event](custom-integration.md#events) with its expected payload.
4. Optional: on the **Options** tab, choose where FlowFlex reads the secret, the event name and the idempotency key. Keep the defaults if the sending system can set custom headers. See [Inbound request](custom-integration.md#inbound-request).
5. Click **Create integration**. FlowFlex shows your webhook URL and credentials. See [Your integration is live](custom-integration.md#your-integration-is-live).

<figure><img src="../.gitbook/assets/custom-integration-events.png" alt="Create custom integration form for Rangoli Order Events with an order.placed event, beside the webhook URL, headers and a sample curl request"><figcaption><p>Adding events to a custom integration</p></figcaption></figure>

Click **Cancel** or **Back to integrations** to leave without creating anything.

### Details

* **Logo:** a PNG or JPG up to 5 MB. Without one, FlowFlex shows the integration's initials: "Rangoli Order Events" shows **RO**.
* **Integration name:** required, up to 80 characters, such as `Rangoli Order Events`. If you leave it empty, you see **Give the integration a name**.
* **Description:** optional, up to 300 characters. A short note on what these events represent. It shows on the integration's card.

### Events

Events are the things your system tells FlowFlex about. Flows start from these events, and several flows can share one. Each event is a card, **Event 1**, **Event 2** and so on. Click **Add event** for another one, or **Remove** on a card to delete it.

| Field                | Required | Rules                                                                                                      |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| **Event name**       | No       | A readable title shown in the flow builder, for example `Order placed`. If empty, FlowFlex uses the value. |
| **Event value**      | Yes      | The identifier your system sends, for example `order.placed`. See the rules below.                         |
| **Description**      | No       | What this event represents.                                                                                |
| **Expected payload** | Yes      | A sample of the JSON data this event carries, with at least one field.                                     |

An **Event value**:

* Has 1 to 64 characters and uses letters, numbers, dot (`.`), underscore (`_`) or hyphen (`-`). Otherwise you see **Use letters, numbers, dots, underscores or hyphens (max 64)**.
* Starts and ends with a letter or number. `order.placed` is valid; `.order` and `order-` are not.
* Is different from every other event in the integration, or you see **Each event needs a different value**. `Order.Placed` and `order.placed` count as the same value.

If the value is empty, you see **Enter the event value**.

### Expected payload

**Expected payload** describes the data your system sends with the event. It must be a JSON object with at least one field. Switch between two views, and click **Format** to tidy the JSON:

* **Code:** type or paste raw JSON.
* **Tree:** edit the same JSON as a tree of keys and values.

These messages tell you what to fix:

* **Add a sample payload with at least one field:** the payload is empty.
* **Expected payload must be a JSON object, e.g. { "userId": "usr_123" }:** the payload is a list, text or a number.
* **Invalid JSON:** a comma, quote or bracket is missing. The message says where.

The sample gives the flow builder its `{{trigger.*}}` fields. Rangoli Store uses this sample for `order.placed`:

```json
{
  "customer": { "name": "John Smith", "phone": "919000000001" },
  "order_id": "RS-1042",
  "total": 1499
}
```

It gives the flow builder `{{trigger.customer.name}}`, `{{trigger.customer.phone}}`, `{{trigger.order_id}}` and `{{trigger.total}}`. Use realistic sample values: the sample only describes the fields, and each real event brings its own values. See [Choose the trigger](../flows/triggers-and-variables.md).

### Use different request fields

Most integrations don't need this. Turn on **Use different request fields** on an event card when one event arrives in a different shape from the others, for example when a second system names its events in another body field.

With the switch **On**, the event gets its own **Authentication**, **Event name** and **Idempotency key** rows. Each **Read from** list starts at **Use integration setting**, which keeps what the Options tab says. Change only the rows that differ.

The integration still has one secret. FlowFlex accepts it from any secret field set on an event or on the Options tab.

### Inbound request

The **Options** tab sets where FlowFlex reads three things in each request. Each one has a **Read from** list:

* **Authentication:** how the sender proves the request is allowed. The default is **Basic Auth (API key + secret)**.
* **Event name:** which of your events this request is. The default is the header `x-event`.
* **Idempotency key:** a unique key per request. A request with a key FlowFlex has already processed isn't processed again. The default is the header `x-idempotency-key`, and it's optional for the sender.

Change these only when the sending system can't set custom headers, for example a tool that only accepts a callback URL. These are the **Read from** options:

| Read from                         | Used for                    | Where the value goes                                                                                         |
| --------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Basic Auth (API key + secret)** | Authentication              | The `Authorization: Basic base64(api_key:api_secret)` header. No extra setting.                              |
| **Secret in the URL path**        | Authentication              | The end of the URL: senders POST to `/v1/events/<code>/<secret>`. For tools that only accept a callback URL. |
| **Secret in a header**            | Authentication              | A header you name in **Header name**, for example `x-webhook-secret`.                                        |
| **Secret in a query parameter**   | Authentication              | A URL parameter you name in **Parameter name**, for example `…?token=<secret>`.                             |
| **Secret in a body field**        | Authentication              | A body field you name in **Field path**, for example `secret`.                                               |
| **Header**                        | Event name, Idempotency key | A header you name in **Header name**.                                                                        |
| **Body field**                    | Event name, Idempotency key | A body field you name in **Field path**, for example `eventType`.                                            |
| **Query parameter**               | Event name, Idempotency key | A URL parameter you name in **Parameter name**, for example `event`.                                         |

A few rules apply to every row:

* Header names aren't case-sensitive.
* **Field path** works for JSON and for form data (`x-www-form-urlencoded`). Nested fields use dots, such as `payload.id`, which form data sends as `payload[id]`.
* A secret field accepts the API secret (`cisk_…`), or the same value as the Basic Auth header, `base64(api_key:api_secret)`.
* Basic Auth with the `x-event` header always keeps working, whatever you choose here. The SDK uses it.

### How to send events

The **How to send events** panel shows the request for the settings you chose:

* **Endpoint:** the `POST` URL, with **Copy URL**. With **Secret in the URL path**, the URL includes the secret. With **Secret in a query parameter**, it ends in `?<parameter>=<secret>`.
* **What to send:** where the secret, the event and the idempotency key go, and the body. The body can be JSON or form data, and flows read it as `{{trigger.*}}`.
* **Events with their own fields:** the events that use different request fields.
* **Example:** a `curl` request you can copy.

When the secret is part of the URL, share the URL only with the sender, and regenerate it if it leaks. Otherwise, send over HTTPS only.

To send a file with an event, such as John Smith's invoice PDF, open **Attaching files to events** in the same panel. You upload the file first and send its `assetId` in the event. Files can be up to 25 MB. See [Upload assets](../api/assets.md).

## Your integration is live

After you click **Create integration**, FlowFlex shows **Your integration is live**. Copy the credentials now: the API secret is shown only once.

| Value           | Looks like                                            | Use                                                                                 |
| --------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **Webhook URL** | `POST https://<your-flowflex-host>/v1/events/ic_xxxx` | Where your system sends events. The last part is the integration code.              |
| **API key**     | `cik_xxxx`                                            | The username for Basic Auth.                                                        |
| **API secret**  | `cisk_xxxx`                                           | The password for Basic Auth, or the value of a secret field. Tagged **Shown once**. |

If the secret goes in the URL, the first value is labelled **Webhook URL (includes the secret)**. Treat that URL like a password.

The secret is masked. Click **Reveal** to see it, **Hide** to mask it again, and the copy icon to copy it.

> [!WARNING]
> The API secret can't be retrieved later. To get a new one, [regenerate the credentials](custom-integration.md#regenerate-credentials).

Then choose what to do next:

* **Download .env:** save a file with all three values, ready for your developer.
* **View integration:** open the integration you just created.
* **Done:** go back to the Integrations page, where the integration now has its own card.

The `.env` file looks like this:

```bash
FLOWFLEX_API_KEY=cik_xxxx
FLOWFLEX_API_SECRET=cisk_xxxx
FLOWFLEX_WEBHOOK_URL=https://<your-flowflex-host>/v1/events/ic_xxxx
```

For the full developer guides, see the [Developer quick start](../developers/quick-start.md), [Send events](../api/events.md) and [Install and use the SDK](../sdk/overview.md).

## Use the integration in a flow

1. In the flow's **Trigger**, under **Start this flow from**, choose **Custom**, then your integration, then the event. Only active integrations are listed. See [Choose the trigger](../flows/triggers-and-variables.md).
2. Publish the flow.
3. Go to **Workflows** → **Workers** and create a worker for the flow. Under **What starts this worker?**, choose **Custom integration**, then activate the worker. See [Workers](../flows/workers.md).

From then on, each matching event starts the flow with the event's data.

## Manage an integration

On the **Integrations** page, click **Manage connection** on the integration's card. The page shows:

<figure><img src="../.gitbook/assets/custom-integration-live.png" alt="Rangoli Order Events integration with its order.placed and order.shipped events and sample payloads, and the API key in the credentials panel"><figcaption><p>A live custom integration with its webhook details</p></figcaption></figure>

* The name, description and logo.
* An **Events** tab and an **Options** tab, with a summary of the settings.
* A **Credentials** card with the **API key**. The **API secret** reads **Hidden — shown only when created or regenerated**.

### Edit

1. Click **Edit**. The **Edit integration** page opens.
2. Change the details, events or options.
3. Click **Save changes**, or **Cancel** to discard them. Changes apply to new requests right away.

Editing doesn't change the API key or secret.

### Regenerate credentials

Regenerate whenever the secret may have leaked.

1. Click **Regenerate** in the **Credentials** card.
2. Confirm **Regenerate credentials?**. FlowFlex creates a new API key and secret, and the old ones stop working immediately.
3. Copy the new secret now, because it won't be shown again. Update every system that sends events before you leave the page.

If the secret is part of the URL, the URL changes too. The card shows the new **Callback URL (includes the secret)**: give it to every sender. Otherwise the webhook URL stays the same.

### Revoke an integration

1. Click **Revoke**.
2. Confirm **Revoke this integration?**. Senders can no longer start flows with these credentials.

The card shows a **Revoked** tag, and the integration leaves the flow trigger list. **Edit** and **Revoke** disappear, and **Delete** appears.

You can't revoke an integration that a flow still uses. FlowFlex shows **Can't revoke — integration in use** and lists those flows. Remove the integration from them first, then revoke.

### Delete an integration

You can delete only a revoked integration.

1. Click **Delete**.
2. Confirm **Delete this integration?**.

The integration is removed from your integrations list, and this can't be undone. Deletion is also blocked while any flow uses the integration (**Can't delete — integration in use**).

## Permissions

* **Integration view:** see integrations and open **Manage connection**.
* **Integration create:** create an integration.
* **Integration edit:** edit an integration and regenerate its credentials.
* **Integration delete:** revoke and delete.

See [Roles and permissions](../account/roles-and-permissions.md).

## See also

* [Integrations overview](overview.md)
* [Developer quick start](../developers/quick-start.md)
* [Send events](../api/events.md)
* [Choose the trigger](../flows/triggers-and-variables.md)
