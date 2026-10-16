# Meta policies and sources

These Meta pages back the rules in the broadcast guides. Meta changes limits and prices often, so check the live page before you rely on a number. Pages checked on 16 October 2026.

| Topic | Meta page | What it backs |
| --- | --- | --- |
| Opt-in | [Get opt-in for WhatsApp](https://developers.facebook.com/documentation/business-messaging/whatsapp/getting-opt-in) | Opt-in must name the business; consent per message type; clear opt-out |
| Policy | [WhatsApp Business Policy](https://business.whatsapp.com/policy) | Restricted goods; contact only people who opted in |
| Enforcement | [Policy and spam enforcement](https://developers.facebook.com/documentation/business-messaging/whatsapp/policy-enforcement) | Warning → template blocks → full blocks → account lock |
| Templates | [Template fundamentals](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/overview) | Statuses, required samples, 250 / 6,000 templates per WABA, 100 created per hour |
| Review | [Template review](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-review) | Rejection reasons: variable formatting, abusive content, duplicates |
| Categories | [Template categorization](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-categorization) | Mixed or vague content counts as Marketing; automatic re-categorisation |
| Authentication | [Authentication templates](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/authentication-templates/authentication-templates/) | OTP-only templates |
| 24-hour window | [Service messages](https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/send-messages) | Templates required outside the customer service window |
| Daily limit | [Messaging limits](https://developers.facebook.com/documentation/business-messaging/whatsapp/messaging-limits) | 250 → 2,000 → 10K → 100K → Unlimited, shared per portfolio |
| Per-user limit | [Per-user marketing limits](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/marketing-templates/per-user-limits/) | Error 131049; wait 24 h; no marketing templates to US numbers |
| Errors | [WhatsApp error codes](https://developers.facebook.com/documentation/business-messaging/whatsapp/support/error-codes) | Error meanings in [Results and errors](broadcasts/results-and-errors.md) |
| Pricing | [Pricing on the WhatsApp Business Platform](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing) | Per delivered message, by category and country |

FlowFlex is stricter than Meta in two places. Meta allows named variables and template names of up to 512 characters, but FlowFlex supports only numbered variables (`{{1}}`–`{{15}}`) and names of up to 100 characters.
