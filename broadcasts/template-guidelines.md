# Template guidelines

Most rejections come from five mistakes: the wrong category, badly placed variables, vague samples, a missing brand name, or prohibited content.

These rules follow Meta's [Template review](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-review), [Template categorization](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-categorization), and [WhatsApp Business Policy](https://business.whatsapp.com/policy). Items marked *(FlowFlex)* are our own recommendations.

## Content rules

- **Say who is writing.** Put the brand name in the body or header, so the customer recognises the sender at once.
- **Match the category.** Utility is an update on an existing order, booking, or account, with no promotion. Meta treats mixed or vague content as Marketing ([categorization](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-categorization)).
- **Give variables context.** A template cannot start or end with a variable ([review](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-review)). *(FlowFlex)* Also avoid two variables side by side, or a body that is mostly variables.
- **Number variables in order**, from `{{1}}` with no gaps. Do not use `#`, `$`, or `%` inside a variable ([review](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-review)).
- **Give realistic samples** for every variable and media header. Meta reviews the sample media too ([fundamentals](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/overview)).
- **No abusive or threatening content**, such as threats of legal action or public shaming ([review](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-review)).
- **No full payment card numbers** or other sensitive data. Partial identifiers are allowed ([review](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-review)).
- **Respect restricted categories**, such as firearms, alcohol, tobacco, and drugs ([Business Policy](https://business.whatsapp.com/policy)).
- **No duplicates** of an existing template ([review](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-review)).
- *(FlowFlex)* **Keep it clean**: no all-caps, no runs of emoji or `!!!`, no spelling mistakes, no fake urgency or fake prizes.
- *(FlowFlex)* **Use your own domain** in links, not third-party shorteners. FlowFlex adds click tracking itself.
- *(FlowFlex)* **Add the Marketing opt-out button** to every Marketing template. Fewer blocks and reports protect the template's quality rating.
- *(FlowFlex)* **Version your names**, for example `_v2`. A rejected or deleted name cannot always be reused straight away.

## Examples

**Utility – approved**

```text
Hi {{1}}, your order {{2}} from Rangoli Store has been shipped.
It should reach you by {{3}}. Track it using the button below.

Footer: Reply HELP for support
Button (Visit website, dynamic): Track order -> https://rangoli.store/track/{{1}}
Body samples: {{1}} = Priya, {{2}} = ORD-48213, {{3}} = 18 Oct
Button URL sample: {{1}} = ORD-48213
```

**Utility that Meta re-categorises as Marketing**

```text
Hi {{1}}, your order {{2}} has shipped! Use code EXTRA10 for 10% off your next order.
```

The discount code makes it promotional. Remove it, or submit the template as Marketing.

**Marketing – approved**

```text
Header (image): festive collection banner
Hi {{1}}, the Rangoli Store Diwali Sale is live.
Get up to 40% off sarees and kurtas until 25 October.

Footer: Tap "Stop promotions" to unsubscribe
Buttons: Visit website -> Shop now | Copy offer code -> DIWALI40 | Quick reply -> Stop promotions
Samples: {{1}} = Priya
```

**Likely rejected**

| Template body | Why it fails | Fix |
| --- | --- | --- |
| `{{1}}` | Only a variable | Write the fixed text. Use variables only for the personal parts. |
| `Hi {{1}} {{2}}, {{3}}` | Ends with a variable; adjacent variables; no context | `Hi {{1}}, your appointment at {{2}} is on {{3}}.` |
| `Your order is ready {{1}}` | Ends with a variable; no brand | `Rangoli Store: your order {{1}} is ready for pickup.` |
| `CLICK NOW!!! FREE GIFT 🎁🎁🎁 bit.ly/xyz` | Shouting, misleading, third-party shortener | A clear offer, a brand name, and your own link in a button |
| `Your OTP is {{1}}` (category Utility) | OTPs must use Authentication | Create an Authentication template |
