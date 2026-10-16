# Contact-tag conditions

Route customers by the tags on their contact, inside a Condition split or Condition branch.

## When to use it

Use a contact-tag condition to treat tagged customers differently. Rangoli Store tags customers `interested` when they ask about the Diwali sale. A later step in the flow checks for that tag and sends those customers the sale details, while everyone else gets the regular menu.

## Set it up

1. Open a [Condition split](flows/nodes/condition-split.md) or [Condition branch](flows/nodes/condition-branch.md) and click **Add condition**.
2. Change the condition source from **Flow variable** to **Contact tags**.
3. Under **Match**, choose how the tags should match, such as **Has any of these tags**.
4. In **Tags**, select one or more tags, such as `interested` and `vip`.
5. Set **Contact number** with Insert Variable, for example **Trigger** → **from**. One contact number applies to all the tag conditions in the node.
6. Click **Save**.

| Match | A contact matches when |
| --- | --- |
| **Has any of these tags** | At least one of the selected tags is on the contact. |
| **Has all of these tags** | Every selected tag is on the contact. |
| **Has none of these tags** | None of the selected tags is on the contact. A contact with no tags matches. |

The condition checks the contact's tags at the moment the step runs, so a [Save tag](flows/nodes/audience-actions.md#save-tag) earlier in the flow changes the result. You can combine tag conditions with other rules; see [Set conditions and choose paths](flows/setting-conditions.md).

## Connect it

Connect the outputs as usual for the node: **Yes** and **No** for a condition split, or one output per path for a condition branch.

## See also

- [Save tag](flows/nodes/audience-actions.md#save-tag)
- [Tags](audience/tags.md)
- [Segments](audience/segments.md)
