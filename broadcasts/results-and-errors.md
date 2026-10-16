# Results and errors

See how a broadcast performed, why some messages failed, and what to do when a broadcast pauses.

Every broadcast keeps its own results: how many people it reached, who read it, who clicked, and which messages failed and why. You can pause, resume or stop a broadcast from the same page.

In this guide, Jordan Brown at Rangoli Store checks "Diwali sale – repeat buyers – Oct 2026" the morning after it starts. Jordan looks at the read and click numbers, finds a handful of failed messages, and plans a follow-up for everyone who clicked.

## The broadcast list

Go to **Broadcast**. The top of the page shows totals across all your broadcasts: **Total Sent**, **Avg delivered rate**, **Avg read rate**, **Avg fail rate**, **Avg click rate** and **CTR**. Each row shows the broadcast's Recipients, Sent, Delivered, Read, Clicked, Replied and Failed counts.

<img src="assets/broadcasts/broadcast-list.png" alt="The Broadcast list with delivery, read and click stats">

## Statuses

| Status | Meaning |
| --- | --- |
| **Draft** | Saved but not published. You can still edit it. |
| **Active** | Published and live. |
| **Paused** | Sending is on hold, because you paused it or FlowFlex paused it automatically. |
| **Completed** | Finished sending. |
| **Failed** | The broadcast couldn't be sent. |
| **Stopped** | You stopped it permanently. It can't be resumed. |

## Read a broadcast's results

1. Go to **Broadcast** and click the broadcast's name. The detail page opens.
2. Look at **Broadcast Insights**. Each card shows a count and its share of all recipients:
    - **Total recipients:** everyone the broadcast was meant for.
    - **Total recipient enqueued:** recipients queued for sending. If messages were retried, the card shows how many retry attempts it includes.
    - **Total sent**, **Total delivered**, **Total read** and **Total replied:** how far each message got.
    - **Total failed:** messages that couldn't be sent or delivered.
    - **Total link clicks:** unique recipients who clicked a tracked link, with the total number of clicks underneath.
    - **CTR:** the share of people who read the message and then clicked a link or replied.
3. To get the people behind a number, click the download icon on the card, for example **Download clicked recipients**. Most cards can be downloaded as a recipient list.
4. Check **Error Messages** to see why messages failed. [Common errors](broadcasts/results-and-errors.md?id=common-errors) explains each reason.
5. Open **Timeline** to see what happened and when. The **All**, **System** and **User** tabs show every event, only automatic ones, or only actions your team took. **Template Preview** shows the message customers received.

Jordan sees that most repeat buyers read the Diwali message and many tapped **Shop now**. A few messages failed with **Message undeliverable**, so Jordan downloads the failed recipients to fix those numbers before the next send.

## Pause, resume or stop a broadcast

The actions on the detail page depend on the status:

- **Draft:** **Publish** or **Delete**.
- **Active:** **Pause** or **Stop**.
- **Paused:** **Resume** and **Stop**, or only **Stop**, depending on why it paused (see below).

To resume a paused broadcast:

1. Click **Resume**. The **Resume broadcast** window opens.
2. Pick a **Resume time**. It follows the broadcast's time zone.
3. Click **Resume**. The status shows when the broadcast will resume, and sending starts again at that time.

To stop a broadcast, click **Stop**. FlowFlex asks **Stop this broadcast permanently?** Remaining messages, retries and scheduled resumes are cancelled. Messages already sent can't be recalled.

> [!WARNING]
> Stopping can't be undone. If you only need time to check something, use **Pause** instead.

## When a broadcast pauses automatically

FlowFlex pauses a broadcast when continuing could harm your number or would fail anyway. The detail page shows an alert that names the reason:

- **Broadcast paused: WhatsApp account unavailable:** the channel can't send messages right now. Check the channel in **Channels**.
- **Broadcast paused: Channel quality issue:** the channel's quality rating dropped too low. See [Channel quality](broadcasts/broadcast-guidelines.md?id=channel-quality).
- **Broadcast paused: Template unavailable:** the template can no longer be sent, for example because it is no longer Approved.
- **Template paused by Meta:** Meta paused the template because of low quality. **Resume** appears once the template is Approved again.
- **Broadcast paused: reupload media:** WhatsApp rejected the header media. Click **Replace media**, upload a new file, send a test message if you like, and then resume.

You can **Resume** after a manual pause, a media reupload pause, or **Template paused by Meta** once the template is Approved again. For the other automatic pauses, only **Stop** is available.

## Common errors

Each failed message has a reason in **Error Messages**. The codes come from [Meta's WhatsApp error codes](https://developers.facebook.com/documentation/business-messaging/whatsapp/support/error-codes).

| Code | Shown as | Meaning | What happens | What to do |
| --- | --- | --- | --- | --- |
| 131049 | Ecosystem health | Meta held the message back, usually because of its per-user marketing limit | Retried if retry is on | Target better; message the same people less often |
| 130472 | Recipient in a Meta experiment | The user is in a Meta experiment | Not retried | Nothing; this is outside your control |
| 131026 | Message undeliverable | Not a WhatsApp number, terms not accepted, or an old app version | Not retried | Fix or remove the number |
| 131047 | Re-engagement message | More than 24 hours since the user last replied | Not retried | Use a template |
| 131050 | Recipient opted out of marketing | The customer stopped marketing messages from your business | Not retried; the contact's WhatsApp marketing consent is turned off | Nothing; they're left out of future marketing broadcasts |
| 130429, 131056, 80007 | Rate limit hit | Sending throughput reached | Retried if retry is on | Lower the daily send count |
| 131048 | Spam rate limit hit | Sending restricted, often because users blocked or reported you | Broadcast pauses | Check quality in WhatsApp Manager; review content and audience |
| 132015 / 132016 | Template paused / disabled | Low template quality | Broadcast pauses | Create an improved template |
| 132001 / 132007 | Template not found / policy violation | Not approved in that language, or breaks policy | Broadcast pauses | Fix or replace the template |
| 131042 | Payment issue | Problem with the Meta payment method | Broadcast pauses | Fix billing in Meta Business Manager |
| 131052 / 131053 | Media download / upload error | Media unreachable, or unsupported type or size | Retried automatically | Use **Replace media** |

**Retry failed messages after 48 hrs** tries once more, and only for rate-limit and ecosystem errors (131049, 130429, 131056, 80007). The retry happens only while the broadcast is still within its schedule, so set the end date more than 48 hours after the start.

## Follow up on the results

There's no button on the results page to create a segment. Instead, build one in **Audience** → **Segments** with the **Broadcast** field and one of **Sent**, **Delivered**, **Read**, **Failed**, **Replied** or **Clicked**. With **Failed**, you can also pick the failure reasons.

Jordan builds a segment of everyone who **Clicked** the Diwali broadcast and sends them a reminder three days later. See [Broadcast activity](audience/segments.md?id=broadcast-activity).

## See also

- [Send a broadcast](broadcasts/send-broadcast.md)
- [Broadcast guidelines](broadcasts/broadcast-guidelines.md)
- [Segments](audience/segments.md)
- [Pre-send checklist](broadcasts/checklist-faq.md)
