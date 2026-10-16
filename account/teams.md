# Teams

Teams is where you invite people to your organisation and control which branches and channels they can use. What they can do there comes from their role; see [Roles and permissions](account/roles-and-permissions.md).

Go to **Settings** → **Teams**. Only Admins see this page in the sidebar. The page has two tabs: **All Users** and **Roles**.

## All Users

<!-- screenshot: account/team-members -->

| Column | Shows |
| --- | --- |
| **Member** | Name and email. Click the copy icon to copy the email. |
| **Phone number** | Number and whether it is verified |
| **Status** | **Active**, **Invited**, **Invite expired**, or **Disabled by Plan** |
| **Role** | Role name, or **No role** |
| **Last active** | Last activity time. **Never** for people who have not joined yet. |
| **Actions** | See below |

Filter the list with **Search by email or name**, **Status** (**Active**, **Invited**, **Disabled by plan**), and **Role**.

### Actions

| Action | When | What it does |
| --- | --- | --- |
| **Edit access** | Any member | Opens **Edit user** |
| **Resend invitation** | Status is **Invited** | Sends a new invitation email |
| **Cancel invitation** | Status is **Invited** | Removes the invitation |
| **Delete user** | Active members | Removes the person from this organisation |

You cannot edit or remove yourself or the organisation owner. Members marked **Disabled by Plan** cannot be edited until your plan has room for them.

## Invite a user

1. Click **Invite User**. You can also click your name at the top right and choose **Invite a user**.
2. FlowFlex checks your user limit first.
3. In **User email**, type one or more addresses. Separate them with a comma or space, such as `rahul@rangoli.example`.
4. Pick a **Role**.
5. Under **Access Control**, set **Branches** and **Channels** (see below).
6. Click **Invite user**.

You see **Successfully sent an invitation to … with the role: ….** The invitation link is valid for 24 hours. After that, the status shows **Invite expired**; click **Resend invitation**.

<!-- screenshot: account/invite-user -->

### Branch and channel access

| Option | Access |
| --- | --- |
| **Selected branches only** / **Selected channels only** | Only the branches or channels you pick. You must pick at least one. |
| **All current branches** / **All current channels** | Everything that exists today. New ones are not added. |
| **Current and future branches** / **Current and future channels** | Everything today, plus anything created later |

The channel list shows each number with its branch name.

Example: Rahul answers chats for the Kochi store only. Give him the **Support agent** role, **Selected branches only** → **Kochi**, and **Selected channels only** → the Kochi number.

## Edit a user

1. Click **Edit access** on the member's row.
2. Change **Name**, **Role**, **Branches**, or **Channels**. **User email** cannot be changed.
3. Admins can also set and verify the member's **Phone number**.
4. Click **Update user**.

## Limits and messages

| Message | Cause | Fix |
| --- | --- | --- |
| **User limit reached. You can purchase additional users for … each in Billing.** | All user seats are in use | Add **Additional Users** on [Plans](account/plans-and-add-ons.md). FlowFlex opens **Plans** for you. |
| **User limit reached. Please upgrade your plan to add more users.** | Your plan has no user add-on | Upgrade on [Plans](account/plans-and-add-ons.md) |
| **Cannot invite N users. Your … plan allows only … users.** | You invited more people than you have seats | Invite fewer people, or add seats |
| **Select at least one branch.** / **Select at least one channel.** | **Selected** is chosen with nothing picked | Pick one, or choose another option |
| **Invalid email: …** | An address is mistyped | Fix it |

> [!NOTE]
> Removing a user or cancelling an invitation cannot be undone. To bring the person back, invite them again.
