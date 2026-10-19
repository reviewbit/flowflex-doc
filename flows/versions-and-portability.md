---
description: "Save changes as drafts, publish the version customers get, look back at earlier versions, and move a flow between workspaces as a JSON file."
---

# Versions, publishing and JSON files

Each time you save, the flow gets a new version. A draft doesn't change what customers receive until you publish it, so you can edit a live flow safely.

Rangoli Store wants to add a **Return an item** button to its order-tracking flow. Alex Lee adds the button and clicks **Save**. Customers keep getting the published version while Chris Taylor tests the draft. Once it works, Alex Lee publishes it.

## Save and publish

1. Click **Save** to create a draft version. The published version stays as it is.
2. To publish what you just saved, click the arrow beside **Save** and choose **Save and publish**.
3. Check the version status in the editor, which shows the current version and whether it's published.

In view mode, **Publish** publishes the version on screen. **Show published** takes you back to the version customers receive.

Fix errors before saving: the flow needs exactly one Trigger and one End, every node connected, and a connection from every output.

Publishing a flow doesn't set up its campaign. Incoming-message campaigns are created and published separately. See [Campaigns](campaigns.md).

## Version history

1. Open **More actions** → **Version history** to see saved versions.
2. Select a version to view it. Earlier versions are read-only.
3. Click **Edit** to go back to editing, or publish the selected version where that's offered.

A newer draft can exist while an older version is still published. Check the status before you assume your edits are live.

## Export and import JSON

1. To export, open **More actions** → **Export as JSON**. It downloads the version on screen, including an earlier one. Export works in view mode.
2. To import, open the flow in edit mode and choose **Import from JSON**. The file replaces what's on the canvas.

Exports leave out settings that belong to your workspace. Read the notice, then set those fields again in the destination workspace. An imported flow needs exactly one Trigger and one End. Review variables, integrations and every connection before you save and publish.

## See also

- [Build your first flow](building-a-flow.md)
- [Campaigns](campaigns.md)
- [Learn flow builder](learning-the-builder.md)
- [I cannot save the flow](../help/troubleshooting.md#i-cannot-save-the-flow)
