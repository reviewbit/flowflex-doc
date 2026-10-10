# Contact-tag conditions: route by customer tags

Use contact tags in Condition split or Condition branch to distinguish interested customers, VIPs, or other groups you label.

## Example: send a follow-up to interested customers

1. Add a Condition split and open its rules.
2. Choose **Contact tags** as the rule source.
3. Set **Contact number** with Insert Variable, for example Trigger → from.
4. Choose **Has any** and select Interested.
5. Save changes.
6. Connect Yes to the follow-up and No to another action or End.

## Choose the matching rule

| Operator | Meaning | Example |
| --- | --- | --- |
| Has any | At least one selected tag is present. | Interested or VIP. |
| Has all | Every selected tag is present. | Interested and VIP. |
| Has none | None of the selected tags is present. | Neither Interested nor VIP. |

A contact with no tags matches Has none. The condition checks the contact's current tags when the step runs, so a preceding [Save tag](flows/nodes/audience-actions.md#save-tag) can affect the result.

Set the contact number once for the node's tag rules. Combine with other conditions if needed; see [Set conditions](flows/setting-conditions.md).
