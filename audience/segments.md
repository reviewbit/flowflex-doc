# Segments

A segment is a group of contacts defined by conditions. FlowFlex keeps its members up to date as contact data, tags, lists, and broadcast results change.

Go to **Audience** → **Segments** to create and manage segments. To pick contacts by hand instead, use a [list](audience/lists.md).

## Create a segment

1. Click **Create new**. The **Create segment** drawer opens.
2. Enter a **Title**, such as `Pune repeat buyers who read the Diwali sale`.
3. Build the conditions. See [Build conditions](audience/segments.md#build-conditions).
4. Click **Create**.

The segment's members are then computed. See [Computing state](audience/segments.md#computing-state).

| Title rule | Message |
| --- | --- |
| Required, not only spaces | **Please enter a valid segment name** |
| At least 2 characters | **Segment name must be at least 2 characters** |
| At most 100 characters | **Segment name cannot exceed 100 characters** |
| Unique in the branch | **Segment with this name already exists. Please choose a different name.** |

## Build conditions

<img src="assets/audience/segment-builder.png" alt="Building the Bengaluru repeat buyers segment">

Conditions sit inside **condition groups**. Each condition has three parts: a property, a condition, and a value.

1. In the first group, click **Select property** and pick a field, such as **Tags**.
2. Click **Enter condition** and pick an operator, such as **Contains**.
3. Enter or pick the value, such as `repeat-buyer`.
4. Click **Add condition** to add another condition to the same group.
5. Click **Add condition group** to start a new group.

Click the bin icon next to a condition to remove it. Click **Clear all** to start over.

### AND and OR

You set the logic at two levels.

| Setting | Where | Options |
| --- | --- | --- |
| Within a group | **Match** **ALL** / **ANY** at the top of each group | **ALL**: a contact must meet every condition in the group (AND). **ANY**: one condition is enough (OR). |
| Between groups | **Condition type** at the top | **ALL** – **Match all of the condition groups** (AND). **ANY** – **Match any of the condition groups** (OR). |

The builder shows **AND** or **OR** between conditions and between groups, so you can read the logic at a glance.

> [!TIP]
> To mix AND and OR, put the OR conditions in their own group with **ANY**, and set **Condition type** to **ALL**. The worked example below does this.

### Fields

| Field | Type | Notes |
| --- | --- | --- |
| **Created At** | Date | The date the contact was added |
| **Name** | Text | |
| **Tags** | Tags | Pick one or more tags. Type a new name and click **Create : name** to create a tag. |
| **List** | Lists | Pick one or more lists |
| **Broadcast** | Broadcast activity | What happened to a broadcast sent to the contact. See [Broadcast activity](audience/segments.md#broadcast-activity). |
| **Phone** | Text | |
| **Email subscribed** | Yes/No | Email marketing consent |
| **Sms subscribed** | Yes/No | SMS marketing consent |
| **WhatsApp subscribed** | Yes/No | WhatsApp marketing consent |
| **Email** | Text | |
| **Country** | Text | |
| **Assigned to** | User | The contact's owner |
| Custom fields | Usually text | Fields from imports or integrations. The source shows under the name, such as **Custom** or **Shopify**. |

Once you pick a field, the condition list shows only the operators for its type.

### Operators by type

**Text** (Name, Phone, Email, Country, text custom fields). Each operator comes in a **Case Sensitive** and a **Case Insensitive** version.

| Operator | Matches when the field… |
| --- | --- |
| **Equals to** | is exactly the value |
| **Not Equal to** | is not the value |
| **Contains** | includes the value anywhere |
| **Does Not Contain** | does not include the value |
| **Starts With** | begins with the value |
| **Does Not Start With** | does not begin with the value |
| **Ends With** | ends with the value |
| **Does Not End With** | does not end with the value |

Case Insensitive treats `Pune`, `pune`, and `PUNE` as the same. Use it unless capitals matter.

**Number** (number custom fields)

| Operator | Matches when the field is… |
| --- | --- |
| **Less than or Equal** | ≤ the value |
| **Less than** | < the value |
| **Equals** | = the value |
| **Not Equals** | ≠ the value |
| **Greater than** | > the value |
| **Greater than or equal** | ≥ the value |

**Date** (Created At, date custom fields). Pick the day in the date picker.

| Operator | Matches when the date is… |
| --- | --- |
| **On or Before** | on that day or earlier |
| **Before** | before that day |
| **Equals** | on that day |
| **After** | after that day |
| **On or After** | on that day or later |

**Yes/No** (Email subscribed, Sms subscribed, WhatsApp subscribed). No value is needed.

| Operator | Matches when consent is… |
| --- | --- |
| **Is True** | on |
| **Is False** | off |

**Tags and List**

| Operator | Matches when the contact… |
| --- | --- |
| **Contains** | has at least one of the selected tags or lists |
| **Does not contains** | has none of the selected tags or lists |
| **Is null** | has no tags (or is in no list) |
| **Is not null** | has at least one tag (or is in at least one list) |

**User** (Assigned to). The value list includes **Not assigned** for contacts without an owner.

| Operator | Matches when the owner… |
| --- | --- |
| **Equals** | is the selected user |
| **Not Equals** | is not the selected user |
| **In** | is one of the selected users |
| **Not In** | is none of the selected users |

### Broadcast activity

Choose **Broadcast**, pick an operator, then pick the broadcast in **Select broadcast**.

| Operator | Matches contacts whose message… |
| --- | --- |
| **Sent** | was sent. Includes delivered and read messages. |
| **Delivered** | was delivered. Includes read messages. |
| **Read** | was read |
| **Failed** | failed. Optionally pick reasons in **Optional failure reason(s)**; each shows how many messages failed for it. |
| **Replied** | got a reply from the contact |
| **Clicked** | had a tracked link clicked by the contact |

There is no "did not read" operator. Each operator matches contacts who reached that status.

## Worked example: repeat buyers in two cities who read the last broadcast

Rangoli Store wants to follow up with repeat buyers in Pune or Mumbai who read the broadcast `Diwali sale – repeat buyers – Oct 2026`. The city is stored in a custom field named `city`, created by an import.

1. Click **Create new** and enter the title `Pune and Mumbai repeat buyers – read Diwali sale`.
2. Leave **Condition type** on **ALL** – **Match all of the condition groups**.
3. In group 1, leave **Match** on **ALL** and add:
    - **Tags** → **Contains** → `repeat-buyer`
    - **Broadcast** → **Read** → `Diwali sale – repeat buyers – Oct 2026`
4. Click **Add condition group**. In group 2, set **Match** to **ANY** and add:
    - **city** (Custom) → **Equals to Case Insensitive** → `Pune`
    - **city** (Custom) → **Equals to Case Insensitive** → `Mumbai`
5. Click **Create**.

The segment reads: (Tags contains repeat-buyer AND read the Diwali broadcast) AND (city is Pune OR city is Mumbai).

| Contact | Tags | city | Read the broadcast | In the segment? |
| --- | --- | --- | --- | --- |
| Priya Sharma (+919000000001) | repeat-buyer | Pune | Yes | Yes |
| Arjun Mehta (+919000000002) | repeat-buyer | Delhi | Yes | No: city does not match |
| Fatima Khan (+919000000003) | new | Mumbai | Yes | No: no repeat-buyer tag |

## Computing state

After you create or edit a segment, FlowFlex works out who matches. While it does:

- The **Audience count** column shows **Updating**.
- The segment page shows **Computing** instead of the member count.
- The **Members** tab shows **Segment is computing. Members will refresh when it finishes.**
- The ⋯ menu is disabled, with the tip **Segment is recomputing — try again in a moment**.

The page refreshes on its own when computing ends.

## The Segments table

| Column | Shows |
| --- | --- |
| + / − | Expands the row to show the segment's conditions |
| Name | The segment name. Click it to open the segment. |
| Audience count | The current number of members, or **Updating** |
| Created At | The date the segment was created |
| Actions | Edit (pencil), delete (bin), and the ⋯ menu |

Search with **Search by segment name**.

## Segment detail page

Open a segment to see it. The header shows the name, the member count, and **Created at**. Click the pencil next to the name to rename it in **Edit segment name**, then click **Update**.

| Tab | Shows |
| --- | --- |
| **Members** | The contacts in the segment: Name, Email, Phone numbers, Country, Created At. Search with **Search segment**. |
| **Conditions** | The saved conditions, and whether contacts must match **all** or **any** of the groups. Click **Edit** to change them. |

## Edit a segment

1. Click the pencil icon in the Segments table, or open the segment and click **Edit** on the **Conditions** tab.
2. Change the title or conditions in the **Update Segment** drawer.
3. Click **Update**.

The segment then computes again.

## Segment actions

| Action | Where | What it does |
| --- | --- | --- |
| **Subscribe current audience** | ⋯ menu | Turns WhatsApp, SMS, and Email consent on for current members |
| **Unsubscribe current audience** | ⋯ menu | Turns WhatsApp, SMS, and Email consent off for current members |
| **Delete segment** | ⋯ menu, or the bin icon | Deletes the segment. Its contacts are not deleted. |
| **Subscribe Audience** / **Unsubscribe Audience** | Select segments → **More actions** | The same, for several segments at once |
| **Delete Segments** | Select segments → **More actions** | Deletes the selected segments |

Subscribe and unsubscribe affect only the contacts in the segment right now. Contacts who join later are not changed.

> [!WARNING]
> **Subscribe current audience** also re-subscribes contacts who opted out. Use it only for contacts who agreed to receive marketing.

## Use a segment

- Send a broadcast to it: choose **Audience Type** → **Segment** in [Send a broadcast](broadcasts/send-broadcast.md).
- In flows, route contacts by their tags with [Contact-tag conditions](flows/nodes/contact-tag-conditions.md).
