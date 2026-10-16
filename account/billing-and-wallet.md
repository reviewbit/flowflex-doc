# Billing and wallet

Billing is where you add message credits, track WhatsApp spend, and download receipts and invoices. Only Admins see **Billing** in the sidebar.

Go to **Billing**. The page has five tabs: **Billing Overview**, **Wallet**, **Transactions**, **Invoices**, and **Billing details**.

## How message charges work

WhatsApp charges are paid from your wallet in message credits. One credit is anchored to ₹1.

- Meta charges per delivered message. The rate depends on the message category (Marketing, Utility, Authentication, Service) and the recipient's country. See [Meta – Pricing](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing).
- FlowFlex reads Meta's usage data and deducts credits in batches, so deductions can take up to 2 hours to show.
- GST is added to message charges for organisations outside India.
- Current rates are on the **WhatsApp message charges** page. The link appears on the overview, in the **Add message credits** drawer, and on every plan card.

> [!NOTE]
> Plan and add-on fees are not taken from the wallet. You pay them through Razorpay on the [Plans](account/plans-and-add-ons.md) page.

## Billing Overview

<img src="assets/account/billing-overview.png" alt="Billing Overview with message credits and usage">

| Card | What it shows |
| --- | --- |
| **Available message credits** | Your wallet balance and **Last activity at** time. Buttons: **Set alert** and **Add credits**. |
| **Current plan** | Your plan name, or **Trial Plan**, or **No Active Plan** if the subscription is expired, suspended, or cancelled. Below it: **Trial ends on**, **Renews on**, **Cancels on**, **Upgrades to** / **Switches to** a new plan, or a payment-pending warning. Button: **View plans**. |
| **Current month spend** | Credits used this month. **View usage summary** scrolls to the usage tables. |

If a channel has a billing problem at Meta, a red **Billing issues (n channels)** bar appears. Click **Details** to see each channel and how long it has been failing. Click **Refresh** to check again.

### Usage limit

The bar compares **Usage** (credits used / credits recharged) with **Remaining usage**. If you set an alert, **Minimum balance threshold** shows your threshold.

### Platform usage breakdown by services

A day-by-day table for the month you pick. Costs here may exclude taxes and fees.

| Column | Meaning |
| --- | --- |
| **Marketing**, **Utility**, **Authentication** | Qty and cost of messages in that category |
| **Authentication — International** | Verification codes charged at Meta's international authentication rate |
| **Paid service** | Charged service conversations |
| **Free service** | Free service conversations (count only) |
| **Total Cost** | Day total |

Click the arrow at the end of a row to split that day by country. **Monthly Totals** sums the month.

### Monthly Usage history

A stacked chart of monthly spend by category: Marketing, Utility, Authentication, Authentication — International, and Service. Pick **Last 6 months** or **Last 12 months**.

## Wallet

The **Wallet** tab shows **Available message credits** and **Wallet activity**: recharges, adjustments, and migration entries.

| Column | Meaning |
| --- | --- |
| Transaction ID | FlowFlex order reference |
| Amount | Credits added (+) or removed (−) |
| Date | Date and time |
| Status | **Success**, **Failed**, or the pending state |
| Description | What the entry was for |
| Error Reason | Why a payment failed. Hover it for details. |
| Download | **Download receipt** for successful payments |

Filter by **Last 7 days**, **Last 30 days**, or **Custom Range**.

### Add message credits

1. Click **Add credits**.
2. Enter **Enter message credits**, or click a quick amount such as 1,000, 2,500, 5,000, 10,000, 25,000, or 50,000. Quick amounts can differ by currency.
3. Check the **Payment summary**.
4. Click **Proceed to Payment** and pay in the Razorpay window.
5. Wait for **Credits added successfully. Balance updated.** If you see **Payment succeeded. Balance will update shortly.**, the balance appears within a few minutes.

| Line | Rule |
| --- | --- |
| **Message credits** | Credits you are buying |
| **Amount to pay** | Credits converted to your payment currency |
| **Service charges (2.5%)** | 2.5% of the amount to pay. Applies to every recharge. |
| **GST (18%)** | 18% of amount plus service charges. Only for organisations in India paying in INR. |
| **Total amount** | What Razorpay charges |

The minimum recharge depends on your payment currency. If you enter less, the drawer shows **Message credits must be at least N for CUR payments.**

### Set credit alert

<img src="assets/account/set-credit-alert.png" alt="The Set credit alert drawer">

1. Click **Set alert**.
2. Check **Current credit threshold**.
3. Enter **New credit threshold**. It must be greater than 0.
4. Optional: add **Additional email** addresses and **Phone number** entries.
5. Click **Set alert**.

When credits fall below the threshold, FlowFlex emails a reminder with a link to the Wallet. It repeats every 24 hours a few times while the balance stays low.

> [!NOTE]
> Low-balance reminders are sent by email to the addresses on the alert. Add every inbox that should hear about a low balance, such as `accounts@rangoli.example`.

## Transactions

The **Transactions** tab lists subscription payments and their receipts.

| Status | Meaning |
| --- | --- |
| **Success** | Paid. Click the download icon for the receipt. |
| **Failed** | See **Error Reason**. |
| **Retry Payment** | Payment not finished. Click the link to pay on Razorpay. |
| **Refunded** / **Partially refunded** | Money returned, with the amount refunded. |
| **Refund pending** | Normal refunds take 5–7 working days to reach your account. |
| **Refund failed** | Contact support. |

The receipt shows the transaction reference, payment ID, method, gateway, your billing details, and the payment breakdown.

## Invoices

| Column | Meaning |
| --- | --- |
| **Invoice number** | Invoice reference |
| **Amount** | Invoice total |
| **Issued on** / **Due on** | Dates |
| **Payment status** | **Paid**, **Failed**, **Cancelled**, **Overdue**, or pending |
| Download | **Download invoice**. Shows **No file available** if the PDF is not ready. |

Use **Search invoices** to find one. Tick several rows and click **Download all**.

## Billing details

These details print on receipts and invoices. Click the edit icon (**Edit billing details**), change the fields, and click **Save**.

| Field | Rule |
| --- | --- |
| **Full name** | Optional |
| **Company name** | Optional. Defaults to the organisation name. |
| **Billing email** | Required. Must be a valid email. |
| **Use business address as billing address** | Copies the address from [Organisation settings](account/organisation.md) and locks the address fields |
| **GSTIN (optional)** | India only. 15 characters, such as `29ABCDE1234F1Z5`. |
| **Address line 1**, **Address line 2**, **City**, **State**, **Country**, **Postal code** | Billing address |

Example: for Rangoli Store, set **Billing email** to `accounts@rangoli.example` and add the GSTIN so the GST on recharges can be claimed.
