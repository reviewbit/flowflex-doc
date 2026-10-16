# Send a broadcast

Go to **Broadcast** → **Create Broadcast**. The wizard has three steps: **Details & message** → **Schedule & audience** → **Review & publish**. You can **Save as draft** at any step.

## 1. Details & message

<img src="assets/broadcasts/create-details.png" alt="Create broadcast, step 1: Details & message">

1. **Broadcast name**: an internal name, such as `Diwali sale – repeat buyers – Oct 2026`.
2. **Select channel**: Connected channels only.
3. **Select Template**: only **Approved** templates from that channel's WABA are listed.
4. **Map variables** under **Header Variables**, **Body Variables**, and **Button URL Variables**. Each variable is either:
    - **Static text**: the same value for everyone, such as `25 October`.
    - **Audience field**: a contact field, such as Name, Phone, Email, Country, State, or Tags, or any custom field.
5. **Set a fallback** for every Audience field, such as `there` for Name, so the message reads "Hi there" when the name is empty. Tracked URL variables must have a fallback.
6. **Media header**: keep the template's media, or click **Upload Header Image / Video / Document** to use different media for this broadcast. The template's size limits still apply.

## 2. Schedule & audience

<img src="assets/broadcasts/create-schedule.png" alt="Create broadcast, step 2: Schedule & audience">

| Field | Rule |
| --- | --- |
| Time zone | Required. The start and end times use this time zone, so pick your audience's time zone. |
| Schedule date | Required. It cannot be in the past, and there is no "send now", so set it a few minutes ahead. |
| End date | Required. Defaults to one week after the start. Sending stops at the end date, even if some contacts were not reached. |
| Daily send count | Optional. Empty means the channel's Portfolio limit. It cannot exceed that limit. Contacts are sent in 24-hour batches. |
| Retry failed messages after 48 hrs | Optional. Retries once the messages Meta held back for health or rate limits. The schedule must be longer than 48 hours. |
| Audience Type | **List**, **Segment**, or **Audience** (individual contacts). You can select several. |
| Quick Import | Upload a CSV or XLSX file to create a list on the spot. Set **Default country code** for numbers without `+`. Invalid, non-mobile, and duplicate numbers are skipped. |

If you see **Some audience members may not receive this broadcast**, the audience is larger than the daily send count × the number of days. Extend the end date or raise the daily count.

For **Marketing** templates, contacts who opted out of WhatsApp marketing are excluded automatically, and FlowFlex shows how many.

## 3. Review & publish

<img src="assets/broadcasts/publish-modal.png" alt="The Publish broadcast confirmation with a test message">

1. Check the **Broadcast summary**.
2. Click **Publish broadcast**. The confirmation shows the number of eligible contacts, the batch size, and the date range.
3. **Send a test first.** Tick **Send a test message**, enter your own number with the country code, and check the message on your phone: variables, fallbacks, media, buttons, and links.
4. Click **Yes, publish**.

Publishing is blocked if:

- the wallet balance is below the minimum (**Insufficient wallet balance**);
- the template is no longer Approved, or its quality is low;
- the channel is Blocked, or its quality is low;
- a Quick Import is still processing.

## Cost

Charges are taken from the wallet at Meta's per-message rate. The rate depends on the template category and the recipient's country, and Meta charges only for delivered messages ([Meta – Pricing](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing)). Marketing costs the most. GST is added for organisations outside India.

Next: follow the [Broadcast guidelines](broadcasts/broadcast-guidelines.md) to protect your number's quality.
