# Connect a WhatsApp channel

You connect a number through Meta Embedded Signup. You cannot type in a WABA ID or phone number ID by hand.

FlowFlex connects in **coexistence** mode, so the business can keep using the WhatsApp Business app. Its contacts and chat history are synced into FlowFlex.

## Before you start

Have ready:

- The business's legal name and address.
- The display name that will appear on the WhatsApp profile. It must match the business's brand, or Meta declines it.
- A phone number. For a new setup, it must not already be registered on WhatsApp. For coexistence, use the number already on the WhatsApp Business app.
- Access to the business's Meta (Facebook) Business portfolio.

## Steps

1. Go to **Channels** → **Add New Channel**. During onboarding, the Home page shows **Continue with Facebook** instead.
2. FlowFlex checks your plan's channel limit first. If you see **Channel limit reached**, add an extra channel under **Settings** → **Plans** → **Configure Add-ons**, or upgrade your plan. See [Plans and add-ons](account/plans-and-add-ons.md).
3. In the Meta popup, pick or create the Business portfolio and WhatsApp Business Account (WABA). Add the number and verify it with the code Meta sends.
4. Wait for **WhatsApp number configured successfully**. If you see **Finalizing channel setup**, registration is still running. Click **Refresh status** after a minute.
5. Open the channel and fill in the **Business Profile**: description (up to 150 characters), address, email, and website.

## What the Channels table shows

| Column | Values | Meaning |
| --- | --- | --- |
| Status | Connected / Pending / Disconnected | Only **Connected** channels can create templates or send broadcasts. |
| Health | Available / Limited / Blocked | Limited or Blocked means Meta is restricting the number. Fix this before you broadcast. |
| Portfolio limit | 250 / 1K / 2K / 10K / 100K / Unlimited | Unique recipients per rolling 24 hours, shared across the whole Business portfolio. |
| Display Name | editable | Change it with **Update Display Name**. Meta reviews every change. |

Open a channel to see its Quality Rating, Business Verification Status, Display Name Status, Official Business Account (blue tick), and Throughput Level.

## Grow the Portfolio limit

A new Business portfolio starts at 250 unique recipients per 24 hours. It moves to 2,000 after **Business Verification**, or after delivering 2,000 messages to unique users in 30 days with high-quality templates.

After that, Meta raises the limit one level at a time (10K, 100K, Unlimited), within 6 hours, when quality stays high and you used at least half the limit in the last 7 days. Source: [Meta – Messaging limits](https://developers.facebook.com/documentation/business-messaging/whatsapp/messaging-limits).

## Common problems

| Message | Cause | Fix |
| --- | --- | --- |
| Channel disconnected | The WhatsApp Business app was uninstalled or logged out on the phone | Reconnect from the channel page |
| Display name declined | The name does not match the brand | Rename it to match the website or signage, then resubmit |
| BSP setup issue | Meta shows the number as connected, but the provider setup blocks messages | Click **Contact Support** |
