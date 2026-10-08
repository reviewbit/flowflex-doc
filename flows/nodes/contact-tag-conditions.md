# Contact-tag conditions

Condition split and Condition branch support live contact tags.

1. Choose **Contact tags** in the condition drawer.
2. Set **Contact number** with the variable picker.
3. Choose an operator and one or more tags.
4. Connect all resulting paths.

| Operator | Matches when |
| --- | --- |
| **Has any** | At least one selected tag is present. |
| **Has all** | Every selected tag is present. |
| **Has none** | None of the selected tags is present. |

The condition checks the selected contact's current tags. A contact without tags matches **Has none**.

For example, choose **Has any → Interested** to send a follow-up only to interested customers. Set the contact number once for the node's rules.

Combine tag and variable rules using AND/OR groups. [Save tag](flows/nodes/audience-actions.md) changes tags before a later condition.
