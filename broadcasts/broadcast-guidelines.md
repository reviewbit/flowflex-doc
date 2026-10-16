# Broadcast guidelines

Your number's quality rating decides how well every broadcast performs. Each block or spam report lowers it. Low quality stops your daily limit from growing, pauses templates, and can lead Meta to restrict the account.

## Meta rules you must follow

- **Opt-in is mandatory.** Message only people who agreed to hear from the business. The opt-in must state the business's name and that the person is agreeing to receive its messages ([Meta – Get opt-in](https://developers.facebook.com/documentation/business-messaging/whatsapp/getting-opt-in)). Record consent in the contact's **WhatsApp Marketing Consent** field.
- **Make opting out easy, and honour it.** Meta asks for clear opt-out instructions ([Get opt-in](https://developers.facebook.com/documentation/business-messaging/whatsapp/getting-opt-in)). In FlowFlex, the Marketing opt-out button and the STOP keyword unsubscribe the contact automatically. You can edit the START/STOP replies in **Messaging → Settings → Subscription Auto Replies**. Never re-import opted-out contacts with consent switched back on.
- **Use a template outside the 24-hour window.** Outside the customer service window you can only send approved templates ([Meta – Service messages](https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/send-messages)). A broadcast always uses a template.
- **Per-user marketing limits.** Meta limits how many marketing templates one person receives from all businesses. Blocked messages fail with error 131049; wait at least 24 hours before resending ([Meta – Per-user limits](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/marketing-templates/per-user-limits/)).
- **No marketing to US numbers.** WhatsApp does not currently deliver marketing templates to United States phone numbers ([Per-user limits](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/marketing-templates/per-user-limits/)).
- **Portfolio limit.** The daily cap on unique recipients is shared by all numbers in the Business portfolio, so two broadcasts on the same day share it ([Meta – Messaging limits](https://developers.facebook.com/documentation/business-messaging/whatsapp/messaging-limits)).
- **Enforcement escalates.** Repeated policy violations or heavy negative feedback lead to a warning, then 1–3 day template blocks, 5–30 day blocks on all messages, and finally an account lock ([Meta – Policy enforcement](https://developers.facebook.com/documentation/business-messaging/whatsapp/policy-enforcement)).

## FlowFlex best practice

- **Segment, don't blast.** Send to the contacts most likely to care, such as recent buyers, a city, or a tag. Relevance is the best defence against blocks.
- **Warm up new numbers.** Start with your most engaged contacts, a few hundred at a time. Grow the volume only while quality stays **High**.
- **Limit frequency.** Send each contact 1–2 marketing broadcasts a week at most, and leave several days between broadcasts to the same segment.
- **Send at good times.** Aim for the audience's local daytime, about 10:00–20:00, using **Time zone**.
- **Personalise** with the contact's name and something relevant, such as the last product or city. Always set a fallback.
- **Give one clear call to action**, such as **Shop now** or **Track order**.
- **Clean the data before importing.** Use E.164 numbers (`+919876543210`) and the correct default country code. Remove duplicates and landlines.
- **Turn on Retry failed messages after 48 hrs** for large marketing broadcasts, and set the end date more than 48 hours after the start.
- **Keep enough wallet balance** for the whole audience.
- **Watch the first hour.** If failures or blocks climb, or channel quality drops, **Pause** the broadcast and review the content and audience.
