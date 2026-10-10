# Versions, publishing & JSON files

## Save and publish

**Save** creates a draft version without replacing the published version. Use the arrow beside Save → **Save and publish** to publish the graph you just saved. In view mode, **Publish** promotes the version on screen.

The editor identifies the current version and whether it is published. **Show published** returns to the version customers receive. Fix validation errors before saving: exactly one Trigger and one End, connected nodes, and connections from every output.

Incoming-message campaigns have separate configuration and publication; publishing a flow alone does not set up its campaign.

## Version history

Open **More actions → Version history** to inspect saved versions. Historical views are read-only. Use **Edit** to return to editing, or publish the selected version when available.

A newer draft can exist while an older version remains published. Check its status before assuming edits are live.

## JSON export and import

**More actions → Export as JSON** downloads the graph on screen, including a historical version. **Import from JSON** replaces the canvas in edit mode.

Exports omit workspace-specific configuration. Read the notice and reconfigure removed fields in the destination workspace. Imports require exactly one Trigger and one End. Review variables, integrations, and all connections before saving and publishing.

Export is available in view mode; import is an editing action.

## Practice before building

Use [Learn flow builder](flows/learning-the-builder.md) to try a sample conversation without sending live messages.
