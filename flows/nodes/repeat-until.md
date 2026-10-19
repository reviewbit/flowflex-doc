# Repeat until

Repeat a set of steps until a condition is met or the attempt limit is reached.

## When to use it

Use Repeat until when you need to try something more than once. Rangoli Store checks whether an order has shipped: the flow asks the order system for the status, waits an hour, and checks again, up to three times. Once the status is `shipped`, it sends the tracking message; if it never ships within the attempts, an agent follows up.

## Set it up

1. Add **Repeat until** from **Logic Blocks**.
2. Add the steps to repeat after it, such as an [API](api.md) node that looks up the order and a [Set time delay](set-time-delay.md) of 1 hour. Save the API node with a response example that includes the status.
3. Add **End loop** after the repeated steps.
4. Open Repeat until and set **Maximum iterations**, from 1 to 10, such as `3`.
5. Under **Stop when (checked after each iteration)**, add the condition, such as the API's order status equals `shipped`.
6. Click **Save**.

The repeated steps always run once before the first check. After each pass, the flow checks the condition against the latest result.

Keep any step that creates something, such as a new order or booking, outside the loop, so each pass checks the same order instead of creating another.

To ask a question again until the customer gives a usable answer, put the question and its check inside the loop. Turn on waiting for a reply and connect **No response**, so a missing answer isn't treated as a reply.

## Connect it

Connect **Repeat until** → the repeated steps → **End loop**, and connect the API's failure outputs to a fallback. After End loop, add a [Condition split](condition-split.md) on the result, because reaching the attempt limit isn't the same as success.

In Insert Variable, the Repeat until result has these fields:

| Field | What it tells you |
| --- | --- |
| `conditionMet` | The stop condition became true. |
| `exhausted` | The attempt limit was reached without meeting the condition. |
| `iterations` | How many passes ran. |

Rangoli Store's condition split checks `conditionMet`: **Yes** sends the tracking message, and **No** goes to **Assign agent**.

## See also

- [Start loop and End loop](for-loop.md), to repeat for each item in a list
- [Set conditions and choose paths](../setting-conditions.md)
- [A repeated sequence never reaches the intended result](../../help/troubleshooting.md#a-repeated-sequence-never-reaches-the-intended-result)
