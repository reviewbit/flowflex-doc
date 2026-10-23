---
description: "Write WhatsApp templates that Meta approves the first time and customers are glad to receive."
---

# Template guidelines

Write WhatsApp templates that Meta approves the first time and customers are glad to receive.

Most rejections come from five mistakes: the wrong category, badly placed variables, vague samples, a missing brand name, or prohibited content. Rules marked **Meta rule** come from Meta and link to the source. Everything else is FlowFlex's advice. Rules marked **Checked** are ones FlowFlex checks while you write, in the panel beside the preview. See [Check the template before you submit](create-template.md#check-the-template-before-you-submit).

Rangoli Store's first shipping update, `Your order is ready {{1}}`, was rejected within minutes: it ended with a variable and never said who was writing. The team rewrote it as `order_shipped_v1`, with the shop's name, fixed text around each variable and a realistic order number as the sample. Meta approved it the same day.

How a template's quality is rated after approval, and when Meta pauses it, is covered in [Template quality](../broadcasts/broadcast-guidelines.md#template-quality).

## Content rules

- **Say who is writing.** Put the brand name in the body or header, so the customer recognises the sender at once.
- **Match the category.** Utility is an update on an existing order, booking or account, with no promotion. Meta treats mixed or vague content as Marketing ([Meta rule](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-categorization)). If approved as Marketing, every send costs the marketing rate, and customers who turned off marketing messages won't get it. **Checked**: a Utility template that reads like a promotion shows **May be rejected**. See [Choose the right category](../broadcasts/broadcast-guidelines.md#choose-the-right-category).
- **Give variables context.** A template can't start or end with a variable ([Meta rule](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-review)). Also avoid two variables side by side, and keep at least about three words of fixed text for each variable, so the body isn't mostly variables. **Checked.**
- **Number variables in order,** from `{{1}}` with no gaps. Don't use `#`, `$` or `%` inside a variable ([Meta rule](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-review)). **Checked.**
- **Named variables use lowercase letters, digits and underscores,** such as `{{first_name}}`. **Checked.**
- **Give realistic samples** for every variable and media header. Meta reviews the sample media too ([Meta rule](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/overview)).
- **No abusive or threatening content,** such as threats of legal action or public shaming ([Meta rule](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-review)).
- **No full payment card numbers** or other sensitive data. Partial identifiers are allowed ([Meta rule](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-review)).
- **Respect restricted categories,** such as firearms, alcohol, tobacco and drugs ([Meta rule](https://business.whatsapp.com/policy)).
- **No duplicates** of an existing template ([Meta rule](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-review)).
- **Keep it clean:** no all-caps, no runs of emoji or `!!!`, no spelling mistakes, no fake urgency or fake prizes. More than 10 emojis in a template may be rejected. **Checked** (emoji count).
- **No extra spacing:** avoid tabs, long runs of spaces and several blank lines in a row. **Checked.**
- **Use your own domain** in links, not third-party shorteners. FlowFlex adds click tracking itself. **Checked** (shorteners).
- **Add the Marketing opt-out button** to every Marketing template. Fewer blocks and reports protect the template's quality rating.
- **Version your names,** for example `_v2`. A rejected or deleted name can't always be reused straight away.

## Header, footer and button rules

- **Header text:** up to 60 characters, at most one variable, and no formatting characters (`*`, `_`, `~`, `` ` ``) ([Meta rule](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/components)). **Checked.**
- **No emojis or line breaks in the header.** Meta may reject them. **Checked.**
- **Footer:** up to 60 characters and no variables ([Meta rule](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/components)). **Checked.**
- **Body:** required, up to 1,024 characters ([Meta rule](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/components)). **Checked.**
- **Buttons:** up to 10 buttons in total, including up to 10 quick replies, 2 link buttons, 1 call button and 1 copy-code button. Each button needs a label of up to 25 characters, and labels must be different. Quick replies sit together; FlowFlex groups them automatically ([Meta rule](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/components)). **Checked.**
- **Links** start with `https://` or `http://`, are up to 2,000 characters, and have at most one variable, at the end. **Checked.**
- **Call numbers** include the country code, digits only, such as `+919000000001`. **Checked.**

## Examples that get approved

**Utility: shipping update**

```text
Hi {{1}}, your order {{2}} from Rangoli Store has been shipped.
It should reach you by {{3}}. Track it using the button below.

Footer: Reply HELP for support
Button (Visit Website, Dynamic): Track order -> https://rangoli.example/track/{{1}}
Body samples: {{1}} = John, {{2}} = ORD-48213, {{3}} = 18 Oct
Button URL sample: {{1}} = ORD-48213
```

**Marketing: Diwali sale**

```text
Header (image): festive collection banner
Hi {{1}}, the Rangoli Store Diwali Sale is live.
Get up to 40% off sarees and kurtas until 25 October.

Footer: Tap STOP to unsubscribe
Buttons: Visit Website -> Shop now | Copy offer Code -> DIWALI40 | Quick reply (Marketing opt-out) -> STOP
Samples: {{1}} = John
```

The opt-out button's text is your STOP keyword, so the footer should name the same word.

## Common mistakes and fixes

**A promotion in a Utility template.** Meta re-categorises this as Marketing, because the discount code makes it promotional. Remove the code, or submit the template as Marketing.

```text
Hi {{1}}, your order {{2}} has shipped! Use code EXTRA10 for 10% off your next order.
```

**A body that is only variables.** `{{1}}` on its own, or `Hi {{1}} {{2}}, {{3}}`, gives Meta no context: it ends with a variable and puts two side by side. Write the fixed text and use variables only for the personal parts:

```text
Hi {{1}}, your appointment at {{2}} is on {{3}}.
```

**No brand, and a variable at the end.** `Your order is ready {{1}}` breaks two rules at once. Put the name first and the variable inside the sentence:

```text
Rangoli Store: your order {{1}} is ready for pickup.
```

**Shouting and shortened links.** `CLICK NOW!!! FREE GIFT 🎁🎁🎁 bit.ly/xyz` looks like spam. Write a clear offer with the brand name, and put your own link in a **Visit Website** button.

**A passcode in the wrong category.** `Your OTP is {{1}}` sent as Utility is likely to be rejected, because one-time passcodes must use an **Authentication** template.

## See also

- [Create a template](create-template.md)
- [Broadcast guidelines](../broadcasts/broadcast-guidelines.md)
- [Meta policies and sources](../help/meta-policies.md)
