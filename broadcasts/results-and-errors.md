# Results and errors

The **Broadcast** list shows totals across all broadcasts: Total Sent, Avg delivered rate, Avg read rate, Avg fail rate, Avg click rate, and CTR. Each row shows Recipients, Sent, Delivered, Read, Clicked, Replied, and Failed.

<img src="assets/broadcasts/broadcast-list.png" alt="The Broadcast list with delivery, read and click stats">

**Broadcast statuses:** Draft → Active → Completed. A broadcast can also be Paused (by you, or automatically), Stopped (by you, permanently), or Failed.

Open a broadcast to see **Broadcast Insights**: recipients, enqueued, sent, delivered, read, replied, failed, link clicks, and CTR. You can export the recipient list for most of these. The page also shows **Error Messages**, a **Timeline**, and the **Template Preview**. From here you can **Pause**, **Resume**, **Stop**, or **Delete** the broadcast.

## Common errors

Meanings come from [Meta – WhatsApp error codes](https://developers.facebook.com/documentation/business-messaging/whatsapp/support/error-codes).

| Code | Shown as | Meaning | What happens | What to do |
| --- | --- | --- | --- | --- |
| 131049 | Ecosystem health | Meta held the message back to protect engagement, usually because of the per-user marketing limit | Retried after 48 h if retry is on | Target better; send less often to the same people |
| 130472 | Recipient in a Meta experiment | Not sent because the user is in a Meta experiment | Not retried | Nothing; outside your control |
| 131026 | Message undeliverable | Not a WhatsApp number, terms not accepted, or an old app version | Not retried | Clean the list |
| 131047 | Re-engagement message | More than 24 hours since the user last replied | Not retried | Use a template |
| 131050 | Recipient opted out of marketing | The customer chose to stop marketing messages from your business | Not retried; the contact's WhatsApp marketing consent is turned off | Nothing; they're excluded from future marketing broadcasts |
| 130429, 131056, 80007 | Rate limit hit | Sending throughput reached | Retried after 48 h if retry is on | Lower the daily send count |
| 131048 | Spam rate limit hit | Sending restricted, often because users blocked or reported you | Broadcast auto-pauses | Check quality in WhatsApp Manager; review content and audience |
| 132015 / 132016 | Template paused / disabled | Low template quality | Broadcast auto-pauses | Create an improved template |
| 132001 / 132007 | Template not found / policy violation | Not approved in that language, or breaks policy | Broadcast auto-pauses | Fix or replace the template |
| 131042 | Payment issue | Problem with the Meta payment method | Broadcast auto-pauses | Fix billing in Meta Business Manager |
| 131052 / 131053 | Media download / upload error | Media unreachable, or unsupported type or size | Retried after 1 minute | Use **Replace media** |

When a broadcast pauses automatically, the page names the reason, for example **Broadcast paused: Template unavailable**. Fix the cause, then click **Resume**.
