# Integrations

The Integrations page connects other systems to FlowFlex, so their events can start your flows. Open it from the sidebar: **SETTINGS** → **Integrations**.

<!-- screenshot: integrations/integrations-page -->

## What you can connect

Two integrations work today.

| Integration | Use it to | Button | Guide |
| --- | --- | --- | --- |
| **Custom integrations** | Trigger flows from any system via webhook or API, with your own API key and secret | **New** | [Custom integrations](integrations/custom-integration.md) |
| **Shopify** | Start flows from store events such as new orders, abandoned checkouts and fulfilments | **Connect** | [Connect Shopify](integrations/shopify.md) |

Other cards on the page show a greyed-out **Connect** button. Those integrations are not available yet.

## Your custom integrations

Each custom integration you create gets its own card below the **Custom integrations** card. The card shows its name and description.

- Click **Manage** to see its events, credentials and webhook instructions.
- A **Revoked** tag means the integration no longer accepts events. See [Custom integrations](integrations/custom-integration.md).

## Integrations belong to a branch

Integrations are saved per branch. An integration you set up in one branch does not appear in another. To work in a different branch, switch branch first. See [Branches](account/branches.md).

## Permissions

You see **Integrations** in the sidebar only if your role includes `integration.view`.

| Action | Permission needed |
| --- | --- |
| Open the Integrations page and view integrations | `integration.view` |
| Create a custom integration | `integration.create` |
| Edit a custom integration or regenerate its credentials | `integration.edit` |
| Revoke or delete a custom integration | `integration.delete` |

To change what a role can do, see [Roles and permissions](account/roles-and-permissions.md).

> [!NOTE]
> If your plan is not active, clicking a sidebar item shows **Upgrade Required**. Choose a plan to continue. See [Plans and add-ons](account/plans-and-add-ons.md).

## Next steps

- [Connect Shopify](integrations/shopify.md)
- [Create a custom integration](integrations/custom-integration.md)
- [Developer quick start](developers/quick-start.md)
