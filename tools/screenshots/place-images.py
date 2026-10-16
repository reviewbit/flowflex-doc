#!/usr/bin/env python3
"""Replace <!-- screenshot: section/name --> placeholders with images that exist in assets/.

Run from the repo root after `node shoot.mjs`. Placeholders without an image stay as they are.
"""
import glob, os, re, sys

ALT = {
    "get-started/create-account": "The Create your account form, filled in for Ananya",
    "get-started/create-organisation": "Creating the Rangoli Store organisation",
    "get-started/app-shell": "The FlowFlex home page with the sidebar, top bar and setup checklist",
    "whatsapp/channels-list": "Channel Management with the connected Rangoli Store number",
    "whatsapp/template-select-channel": "Create template, step 1: selecting the Rangoli Store channel",
    "whatsapp/template-edit": "Create template: editing the Diwali sale template",
    "whatsapp/templates-list": "Template Management listing the approved demo templates",
    "audience/overview-tabs": "The Audience page with its six tabs and overview cards",
    "audience/add-contact-drawer": "Adding Priya Sharma with Quick add",
    "audience/contact-detail": "A contact's detail page",
    "audience/merge-list": "The Merge list drawer",
    "audience/segment-builder": "Building the Bengaluru repeat buyers segment",
    "audience/tags-table": "The Tags tab with manual and auto tags",
    "audience/import-upload": "Import audience, step 1: Upload",
    "audience/import-map-columns": "Import audience, step 2: Map columns",
    "broadcasts/broadcast-list": "The Broadcast list with delivery, read and click stats",
    "broadcasts/create-details": "Create broadcast, step 1: Details & message",
    "broadcasts/create-schedule": "Create broadcast, step 2: Schedule & audience",
    "broadcasts/publish-modal": "The Publish broadcast confirmation with a test message",
    "messaging/conversations-inbox": "The Conversations inbox",
    "messaging/conversations-composer": "Replying to a customer in Conversations",
    "messaging/settings-page": "Messaging settings: business hours and assignment",
    "messaging/settings-subscription-auto-replies": "Subscription Auto Replies with START and STOP keywords",
    "messaging/quick-replies-table": "The Quick Reply table",
    "flows/campaigns-list": "The Auto Campaign list",
    "flows/saved-data-tables": "Saved data tables",
    "integrations/integrations-page": "The Integrations page",
    "integrations/custom-integration-events": "Adding events to a custom integration",
    "integrations/custom-integration-live": "A live custom integration with its webhook details",
    "account/billing-overview": "Billing Overview with message credits and usage",
    "account/set-credit-alert": "The Set credit alert drawer",
    "account/plans-page": "The Plans page",
    "account/account-settings": "Organisation and personal settings",
    "account/branches": "Settings, Branches",
    "account/team-members": "Teams, All Users",
    "account/invite-user": "Inviting a teammate",
    "account/create-role": "Creating the Support agent role",
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
        # Raw <img>: Docsify rewrites markdown image paths relative to the page folder.
        return f'<img src="{img}" alt="{ALT.get(name, name)}">'
    new = re.sub(r"<!-- screenshot: ([a-z0-9/-]+) -->", repl, text)
    if new != text:
        open(md, "w").write(new)
print(f"placed {placed} images; left as placeholders: {', '.join(sorted(set(missing))) or 'none'}")
