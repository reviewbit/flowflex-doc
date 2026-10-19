#!/usr/bin/env python3
"""Replace <!-- screenshot: section/name --> placeholders with images that exist in assets/.

Each image is written as a GitBook figure, so it keeps both a visible caption and
descriptive alt text (GitBook turns Markdown image text into a caption, leaving alt empty).

Run from the repo root after `node shoot.mjs`. Placeholders without an image stay as they are.
"""
import glob, html, os, re, sys

SHOTS = {  # name: (caption shown under the image, alt text describing the screen)
    "get-started/create-account": (
        "The Create your account form, filled in",
        "FlowFlex Create your account form with name Alex Lee, an Indian phone number, email alex@rangoli.example, a terms checkbox and the Create account button",
    ),
    "get-started/create-organisation": (
        "Creating the Rangoli Store organisation",
        "Business details step of workspace setup, with business name Rangoli Store and website filled in, and fields for country, address, state, city, time zone and postal code",
    ),
    "get-started/app-shell": (
        "The FlowFlex home page with the sidebar, top bar and setup checklist",
        "FlowFlex home page with the main sidebar, wallet balance and user in the top bar, a get-started banner and a setup checklist at 75%",
    ),
    "whatsapp/channels-list": (
        "Channel Management with the connected Rangoli Store number",
        "Channel Management table showing the Rangoli Store WhatsApp number as Connected, with its WABA ID, Available health and a 2K portfolio limit",
    ),
    "whatsapp/template-select-channel": (
        "Create template, step 1: selecting the Rangoli Store channel",
        "Create template step 1, Select channel, with the Rangoli Store WhatsApp channel and its business account chosen",
    ),
    "whatsapp/template-edit": (
        "Create template: editing the Diwali sale template",
        "Edit template step with the name diwali_sale_2026_en, English language, Standard format and the sale message body, beside a live WhatsApp preview",
    ),
    "whatsapp/templates-list": (
        "Template Management listing the approved demo templates",
        "Template Management table with two approved English templates on the Rangoli Store channel: diwali_sale_2026_en (Marketing) and order_shipped_v1 (Utility)",
    ),
    "audience/overview-tabs": (
        "The Audience page with its six tabs and overview cards",
        "Audience page on the Profiles tab, with cards counting all, email, phone and suppressed profiles above the contact list",
    ),
    "audience/add-contact-drawer": (
        "Adding a new contact with Quick add",
        "Add new contact drawer filled in for John Smith with email, phone, state Karnataka and a Bengaluru address, beside the contact list",
    ),
    "audience/contact-detail": (
        "A contact's detail page",
        "John Smith's contact page with his customer details, the repeat-buyer and vip tags, a Bengaluru address and the two lists he belongs to",
    ),
    "audience/merge-list": (
        "The Merge list drawer",
        "Merge list drawer merging Repeat buyers – Oct 2026 into Diwali early access, with Yes, keep source list selected",
    ),
    "audience/segment-builder": (
        "Building a repeat buyers segment",
        "Create segment drawer for a segment titled Bengaluru repeat buyers, with an empty condition group set to match all conditions",
    ),
    "audience/tags-table": (
        "The Tags tab with manual and auto tags",
        "Tags table listing repeat-buyer, new, vip and the automatic whatsapp-chat tag, with the number of contacts for each",
    ),
    "audience/import-upload": (
        "Import audience, step 1: Upload",
        "Import audience step 1, Upload, with All contacts chosen as the destination and a drop zone for a CSV or XLSX file",
    ),
    "audience/import-map-columns": (
        "Import audience, step 2: Map columns",
        "Import audience step 2, Map columns, with name, phone, email and tags matched to FlowFlex fields and the city column left out",
    ),
    "broadcasts/broadcast-list": (
        "The Broadcast list with delivery, read and click stats",
        "Broadcast page with sent, delivered, read, failed and click rate cards above a table of three broadcasts: active, completed and draft",
    ),
    "broadcasts/create-details": (
        "Create broadcast, step 1: Details & message",
        "Create broadcast step 1 with the broadcast name, the Rangoli Store channel and the diwali_sale_2026_en template, beside a live WhatsApp preview",
    ),
    "broadcasts/create-schedule": (
        "Create broadcast, step 2: Schedule & audience",
        "Create broadcast step 2 with start and end dates, a daily send count of 1,000 and the Repeat buyers – Oct 2026 list as the audience",
    ),
    "broadcasts/publish-modal": (
        "The Publish broadcast confirmation with a test message",
        "Publish broadcast confirmation dialog with a Send a test message button, over the broadcast summary",
    ),
    "messaging/conversations-inbox": (
        "The Conversations inbox",
        "Conversations inbox listing six customer chats with their status, channel and assigned agent, with no chat open",
    ),
    "messaging/conversations-composer": (
        "Replying to a customer in Conversations",
        "John Smith's open chat about the Diwali sale, with his tags at the top and a reply about free exchanges typed in the message box",
    ),
    "messaging/settings-page": (
        "Messaging settings: business hours and assignment",
        "Business hours of 10:00 to 20:00 Monday to Saturday with Sunday closed, and round-robin assignment across Alex Lee, Chris Taylor and Jordan Brown",
    ),
    "messaging/settings-subscription-auto-replies": (
        "Subscription Auto Replies with START and STOP keywords",
        "Subscription Auto Replies with English and Hindi tabs, the START and STOP keywords and the confirmation message for each",
    ),
    "messaging/quick-replies-table": (
        "The Quick Reply table",
        "Quick Reply table with the hours, track and returns short codes and the reply text for each",
    ),
    "flows/campaigns-list": (
        "The Auto Campaign list",
        "Auto Campaign list with four flow campaigns: two active, one paused and one draft",
    ),
    "flows/saved-data-tables": (
        "Saved data tables",
        "Saved data with two tables, Store visit requests and Feedback after delivery, and the columns each one collects",
    ),
    "integrations/integrations-page": (
        "The Integrations page",
        "Integrations page with the Custom integrations card, the Rangoli Order Events integration and apps such as Google Sheet, NocoDB, Zoho and LeadSquared",
    ),
    "integrations/custom-integration-events": (
        "Adding events to a custom integration",
        "Create custom integration form for Rangoli Order Events with an order.placed event, beside the webhook URL, headers and a sample curl request",
    ),
    "integrations/custom-integration-live": (
        "A live custom integration with its webhook details",
        "Rangoli Order Events integration with its order.placed and order.shipped events and sample payloads, and the API key in the credentials panel",
    ),
    "account/set-credit-alert": (
        "The Set credit alert drawer",
        "Set credit alert drawer with the current threshold of 1,000 credits and fields for a new threshold, an extra email and a phone number",
    ),
    "account/account-settings": (
        "Organisation and personal settings",
        "Account Settings with Rangoli Store's organisation name, website, India time zone, INR currency and admin notify email",
    ),
    "account/branches": (
        "Settings, Branches",
        "Branches table with the active Kochi and Bengaluru branches and their locations",
    ),
    "account/team-members": (
        "Teams, All Users",
        "Team Members list with Alex Lee and Chris Taylor as Admins and Jordan Brown as Channel Manager, with phone, status and last active time",
    ),
    "account/invite-user": (
        "Inviting taylor@rangoli.example as a Support agent with access to the Kochi branch",
        "Invite user form for taylor@rangoli.example with the Support agent role, the Kochi branch and access to current and future channels",
    ),
    "account/create-role": (
        "Creating the Support agent role",
        "Create new role form for Support agent with its description and the permission list, set to selected permissions only",
    ),
}

skip = set(sys.argv[1:])  # shot names to leave as placeholders (e.g. failed review)
placed, missing = 0, []
for md in glob.glob("**/*.md", recursive=True):
    if md.startswith("tools/"):
        continue
    text = open(md).read()
    def repl(m):
        global placed
        name = m.group(1)
        img = f"assets/{name}.png"
        if name in skip or not os.path.exists(img):
            missing.append(name)
            return m.group(0)
        placed += 1
        caption, alt = SHOTS.get(name, (name, name))
        # Paths are relative to the page's folder, which both Docsify and GitBook expect.
        src = os.path.relpath(img, os.path.dirname(md))
        return (f'<figure><img src="{src}" alt="{html.escape(alt)}">'
                f'<figcaption><p>{html.escape(caption, quote=False)}</p></figcaption></figure>')
    new = re.sub(r"<!-- screenshot: ([a-z0-9/-]+) -->", repl, text)
    if new != text:
        open(md, "w").write(new)
print(f"placed {placed} images; left as placeholders: {', '.join(sorted(set(missing))) or 'none'}")
