---
description: "Send broadcasts that customers look forward to, and keep your WhatsApp number healthy enough to reach more of them every month."
---

# Broadcast guidelines

WhatsApp rewards businesses whose messages people read and act on, and slows down the ones people block. Almost every rule on this page comes back to that one idea. Follow along with Rangoli Store, a saree shop in Kochi, as it goes from its first broadcast to its busiest festive season.

Rules marked **Meta rule** come from Meta and link to the source. Everything else is FlowFlex's advice.

## How WhatsApp scores your broadcasts

Meta keeps three scores for your business. You can see each of them in FlowFlex, and each one decides how far your next broadcast can go.

### Template quality

Every approved template gets its own rating: **High quality**, **Medium quality**, **Low quality**, or **Quality pending** for a new template that hasn't been sent enough yet. Meta bases it on how people react to the messages, including blocks, reports and read rates ([Meta rule](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-quality)). You see the rating under the template's status in **Templates**.

A template that reaches low quality is paused: for 3 hours the first time, 6 hours the second time, and the third time it is disabled for good ([Meta rule](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-pausing)). Messages Meta refuses while a template is paused are not charged.

Rangoli Store sent its first sale template, `big_sale_v1`, to every number it had ever collected. Within an hour, dozens of people who didn't remember the shop tapped **Block**, the template dropped to Low quality, and Meta paused it. FlowFlex paused the broadcast straight away, before more messages could go out. The team wrote `big_sale_v2`, sent it only to customers who had bought in the last six months, and this time most of them read it.

When Meta rejects, pauses or disables a template, it usually gives a reason, which you'll find in the status tooltip in **Templates**. The reasons fall into three groups:

- **Policy:** the content is abusive, looks like a scam, or breaks the [WhatsApp Business Policy](https://business.whatsapp.com/policy). Rewrite it. Repeated policy problems put the whole account at risk.
- **Wrong category:** the content doesn't match the category you picked, for example a "shipping update" with a discount code in it. Change the category or remove the promotion. See [Choose the right category](broadcasts/broadcast-guidelines.md?id=choose-the-right-category).
- **Format:** something is technically wrong, such as two variables side by side (`{{1}}{{2}}`) with no text between them. Meta's message says what to fix. See the [template guidelines](whatsapp/template-guidelines.md).

A disabled template can't be used again. Create a new one with a new name, such as `big_sale_v2`, and change whatever people disliked.

### Channel quality

Your WhatsApp number has a quality rating too, shown on the channel in **Channels** as **GREEN** (high), **YELLOW** (medium) or **RED** (low). Meta works it out from the last seven days, with recent days counting most, using blocks, reports, mutes, archives, and the reasons people give when they block you ([Meta rule](https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/send-messages#message-quality)).

YELLOW is an early warning: look at what you sent recently and who you sent it to. If the rating turns RED, FlowFlex pauses your active broadcasts and shows **Broadcast paused: Channel quality issue**, so one bad week doesn't turn into a blocked number.

If the problems keep coming, Meta escalates: first a warning, then a 1 to 3 day block on templates, then a 5 to 30 day block on all messages, and finally a locked account ([Meta rule](https://developers.facebook.com/documentation/business-messaging/whatsapp/policy-enforcement)). The way back is always the same: smaller, better-targeted broadcasts to people who asked to hear from you.

### Daily messaging limit

Your messaging limit is how many different people your business can message first in any rolling 24 hours. It is shared by every number in your Meta business portfolio, so two broadcasts on the same day share it too ([Meta rule](https://developers.facebook.com/documentation/business-messaging/whatsapp/messaging-limits)). You see it as **Portfolio limit** on the channel page.

The limit climbs in steps: 250, then 2,000, 10,000, 100,000, and finally unlimited.

- **From 250 to 2,000:** verify your business with Meta, or send good-quality templates to 2,000 different people within 30 days.
- **Every step after that** happens on its own, usually within 6 hours, once you've used at least half of your current limit in the last 7 days and your messages are high quality.

Conversations customers start don't use the limit. If John Smith messages Rangoli Store first, the replies to John don't count.

## Grow a new number gently

A brand-new number is a stranger to WhatsApp. Its first few broadcasts decide how quickly it earns trust, so start with the people most likely to be glad to hear from you.

Rangoli Store connected a new number in September. In the first week it sent a "thank you" offer to 200 customers who had bought in the last month. In the second week it sent a new-arrivals broadcast to 600 people who had chatted with the shop. Quality stayed GREEN, the business was verified, and by Diwali the limit had grown to 10,000 without a single paused template.

That pace is our advice; Meta doesn't publish a warm-up schedule. What works:

- **Start with your warmest contacts:** recent buyers and people who have messaged you.
- **Grow the audience step by step,** a few hundred more each time, and only while channel and template quality stay high.
- **Verify your business early** in Meta Business Manager. It is the quickest way past the first limit.
- **Leave cold lists out:** old event sign-ups, bought lists, contacts from years ago. They bring the blocks that hold a new number back.

### Let FlowFlex send in batches

You don't have to send everything at once. In **Schedule & audience**, set **Daily send count** to the number of people to reach each day. FlowFlex sends the broadcast in daily batches, 24 hours apart, until everyone has it or the **End date** arrives. Leave it empty to use your full portfolio limit.

Batches protect you twice. If the first day gets a poor reaction, you can **Pause** before the rest go out. And the daily count can't go over your portfolio limit. If you plan two broadcasts for the same days, split the limit between them, because they share it.

Pick an end date that leaves room for every batch. If 5,000 people get 1,000 a day, the broadcast needs at least five days. The review screen warns you when part of your audience won't fit in the schedule.

### Meta tests your first messages too

Meta runs its own checks on large sends. For a template that is new, was just unpaused, or isn't rated high quality, Meta delivers the first part of the broadcast and holds the rest while it watches how people react. Good reactions release the held messages, usually within the hour. Bad ones pause the template, and the held messages fail with **Template is paused** ([Meta rule](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-pacing)).

Businesses that are new to sending can also have big bursts delivered in stages, with feedback checked in between ([Meta rule](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/portfolio-pacing)).

So a slow start isn't a fault. It's Meta deciding whether your broadcast deserves the rest of the audience, and the best way to pass is a message people are glad to get.

## Earn the right to message

**Get clear permission first** ([Meta rule](https://developers.facebook.com/documentation/business-messaging/whatsapp/getting-opt-in)). People must agree to hear from your business, and the opt-in must name your business. It can happen anywhere: a checkbox at checkout, a form on your website, a QR code at the counter, or a signed paper form.

Rangoli Store added a checkbox to its checkout page: "Send me order updates and offers from Rangoli Store on WhatsApp." It names the shop and says what's coming, so nobody is surprised when the Diwali sale arrives.

Meta also suggests asking separately for each kind of message (order updates, offers, recommendations) and saying what's in it for the customer. People block messages they didn't expect, not messages they asked for.

**Record consent in FlowFlex.** Each contact has a **WhatsApp Marketing Consent** field, shown on the profile as **Subscribed** or **Not Subscribed**. Contacts who aren't subscribed are left out of Marketing broadcasts automatically, and the publish window tells you how many were excluded.

**Make leaving easy, and honour it** ([Meta rule](https://business.whatsapp.com/policy)). Add the **Marketing opt-out** quick-reply button to every Marketing template. When Jane Doe taps it, or replies STOP, FlowFlex unsubscribes the contact and sends a confirmation. Customers can also stop your marketing from WhatsApp's own settings, and FlowFlex updates the contact for you. You can change the keywords and confirmation messages, in every language you use, in **Messaging → Settings → Subscription Auto Replies**.

It sounds backwards, but an easy opt-out protects your number. Someone who taps the opt-out button leaves quietly. Someone who can't find a way out taps **Block** or **Report**, and that counts against you.

FlowFlex keeps an opt-out even if the contact turns up again in a later import, so an old spreadsheet can't subscribe someone by accident.

## Choose the right category

Every template is **Marketing**, **Utility** or **Authentication**, and Meta checks that you picked the right one ([Meta rule](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-categorization)).

- **Utility** is about something the customer already started: an order, a booking, an account. "Your order RS-4821 has shipped and should arrive by Friday." It must not promote anything.
- **Marketing** is everything that sells, re-engages or announces: sales, new arrivals, abandoned carts, birthday wishes, renewal offers. A message that mixes an update with an offer is Marketing.
- **Authentication** is only for one-time passcodes.

Rangoli Store once added "Use code EXTRA10 on your next order!" to its shipping update. Meta moved the template to Marketing, so it was billed as Marketing, and customers who had opted out of offers stopped receiving their shipping updates in broadcasts. The fix was two templates: a clean shipping update for everyone, and a separate offer for subscribed customers.

Putting promotions in Utility templates again and again leads Meta to restrict your Utility templates, so keep the two apart from the start.

## Send something worth opening

Meta's own advice is short: make each message personal and useful, avoid open-ended "Hi, we're here!" messages, and don't send too many in a day ([Meta rule](https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/send-messages#message-quality)). Here's what that looks like in practice.

**Send to the people it's for.** "Repeat buyers in Kochi" will always beat "everyone". Use a [segment](audience/segments.md) to pick contacts by what they bought, where they live, or how they reacted to your last broadcast. When Rangoli Store launched its silk collection, it sent the news only to customers who had bought silk before, and far more of them read it than usual.

**Make it personal.** Start with the customer's name and add one detail that's theirs: their city, their last purchase, their appointment date. In FlowFlex, choose **Audience field** for a variable and fill in a fallback value, so nobody gets "Hi ," when a field is empty.

**Ask for one thing.** One button that says what happens next, such as **Shop now**, **Book a slot** or **Track order**, works better than four competing ones. FlowFlex tracks taps on **Visit Website** buttons, so you'll see exactly who clicked.

**Say it in fewer words.** Customers read WhatsApp on a small screen between other chats. Put the offer in the first line, the details in the second, and leave the rest out. One clear image does more than a long paragraph.

**Write like a person.** No ALL CAPS, no row of 🎁🎁🎁, no "LAST CHANCE!!!" when it isn't. Shouting looks like spam, and people treat it that way.

**Send at a good time.** Aim for your customers' daytime, roughly 10 AM to 8 PM, and set **Time zone** to where they live, not where you are. Rangoli Store sends at 11 AM on Saturdays, when its customers are planning their weekend shopping.

**Don't send too often.** One or two marketing broadcasts a week is plenty for most audiences, with a few days between broadcasts to the same people. Meta also limits how many marketing messages each person receives from all businesses together, so someone with a busy inbox may not get yours that day ([Meta rule](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/marketing-templates/per-user-limits/)). Those messages fail with **Ecosystem health** and are worth trying again later. Turn on **Retry failed messages after 48 hrs**, set an end date more than 48 hours after the start, and FlowFlex tries them once more for you.

**Test before you publish.** In the publish window, use **Send a test message** to send the broadcast to your own phone first. Check the name, the image, the link, and that the button opens the right page.

## Watch, learn and recover

**Watch the first hour.** Open the broadcast after it starts and look at the **Overview** tab, especially **Failed messages**. If failures climb, or the channel or template quality drops, choose **Actions** → **Pause**, find the cause, and only then **Resume**.

**Read the results the next day.** Delivered, read, replied and link taps tell you what worked, and the **Overview** tab compares each rate with your average. A high read rate with few clicks means the message landed but the offer didn't. A low read rate means the audience or the timing was off.

**Follow up with the people who cared.** In the broadcast's **Recipients** tab, choose a group such as **Clicked a link** and click **Send follow-up** to create a draft for just those people, then send them a reminder a few days later. You can also build a [segment](audience/segments.md?id=broadcast-activity) from the broadcast, for example everyone who **Clicked**. Sending more to people who engage, and less to people who don't, raises your quality for everyone.

**Clean your list as you go.** **Message undeliverable** usually means the number isn't on WhatsApp. Fix or remove those contacts before the next send, and keep numbers in international format, such as `+919876543210`.

**Keep enough wallet balance for the whole audience.** FlowFlex checks your balance when you publish and stops with **Insufficient wallet balance** if it's too low.

When something does go wrong, [Results and errors](broadcasts/results-and-errors.md) explains each error and what to do about it.

## Rules that catch people out

- **The 24-hour window** ([Meta rule](https://developers.facebook.com/documentation/business-messaging/whatsapp/messages/send-messages)). You can reply freely for 24 hours after a customer messages you. Outside that window, and in every broadcast, you can only send approved templates.
- **No marketing to US numbers** ([Meta rule](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/marketing-templates/per-user-limits/)). WhatsApp doesn't deliver Marketing templates to phone numbers in the United States. Utility templates still go through.
- **Meta's experiment** ([Meta rule](https://developers.facebook.com/documentation/business-messaging/whatsapp/support/experiments)). A very small share of WhatsApp users receive no marketing templates at all. Those messages fail with **Recipient is in a Meta experiment**, aren't charged, and won't succeed if you try again.
- **Opted out means opted out.** When a customer stops your marketing from WhatsApp, the message fails with **Recipient opted out of marketing**, and FlowFlex unsubscribes the contact so they're left out next time.
- **Restricted products** ([Meta rule](https://business.whatsapp.com/policy)). Weapons, drugs, tobacco, adult products, real-money gambling, dating and several other categories can't be promoted, and some are allowed only in certain countries. Never ask for full card numbers or ID numbers in a message.

## See also

- [Template guidelines](whatsapp/template-guidelines.md)
- [Send a broadcast](broadcasts/send-broadcast.md)
- [Pre-send checklist](broadcasts/checklist-faq.md)
- [Meta policies and sources](help/meta-policies.md)
