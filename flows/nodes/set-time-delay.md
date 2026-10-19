---
description: "Pause the flow for a set time, or until a time of day you choose, before the next step."
---

# Set time delay

## When to use it

Use a time delay to space out messages or follow up later. Two hours after a customer browses the Diwali sale without ordering, Rangoli Store sends a reminder. A delay doesn't end early when the customer replies; to wait for a reply, use [response waiting](../response-wait.md) on a message.

## Set it up

1. Add **Set time delay** from **Other Blocks** between the two steps, and open it.
2. In **Set time delay**, enter the amount, such as `2`.
3. In **Unit**, choose **Seconds**, **Minutes**, **Hours** or **Days**, such as **Hours**.
4. Optionally, add a schedule on top of the delay:
   - **Delay until a scheduled time of day:** continue at a time you pick, in the time zone you pick.
   - **Delay until a scheduled days of the week:** continue only on the days you select.
   - **Delay until a dynamic time of day:** continue at a time taken from a variable in **Dynamic delay**, in the format the field asks for.
5. Click **Save**.

To follow up on the next business morning, Rangoli Store combines a 1-day delay with 10:00 AM in Asia/Kolkata on Monday to Saturday. Check the time zone matches your customers.

## Connect it

Connect **Next step** to the follow-up. After a long delay, the 24-hour reply window may have closed, so use an approved [Template message](template-message.md) for the follow-up. See [The 24-hour reply window](../whatsapp-message-setup.md#the-24-hour-reply-window).

## See also

- [Wait for and validate a reply](../response-wait.md)
- [Template message](template-message.md)
- [Repeat until](repeat-until.md)
