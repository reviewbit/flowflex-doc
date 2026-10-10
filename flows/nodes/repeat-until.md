# Repeat until: try again until a condition is met

Use Repeat until when you need several attempts, such as asking for a usable answer or checking whether an order is ready. The loop has an attempt limit so it does not repeat forever.

## Example: check an order until it is ready

1. Add **Repeat until** and an API node that checks the existing order's status.
2. Configure and save the API with a sample response containing that status.
3. Open Repeat until and set the stop condition: choose the API status field, a text equals operator, and `ready`.
4. Set **Maximum iterations**, for example 3. The available range is 1–10.
5. Add a Set time delay in the repeated sequence to space the checks.
6. Add **End loop** and connect the successful check sequence forward through it.
7. Handle the API's error outputs with appropriate help or End paths.
8. After End loop, add a condition to distinguish ready from an exhausted attempt limit.

After each completed attempt, the flow checks the stop condition using the latest result. The repeated sequence runs before the first check.

Keep any action that creates an order outside this loop. Each pass should check the same existing order rather than create another one.

## Choose what happens after the attempts

Use Insert Variable to select the Repeat until result after End loop:

| Field | What it tells you |
| --- | --- |
| `conditionMet` | The stop condition became true. |
| `exhausted` | The attempt limit was reached without meeting the condition. |
| `iterations` | How many attempts ran. |

Add a Condition split checking conditionMet. Connect Yes to the ready message, and No to an agent handoff or another fallback. Reaching the limit is not success.

## Ask for an answer again

Place the question and answer check inside the repeated sequence. Enable response waiting on the question and connect No response explicitly. Do not pass an absent answer to an API or use it as if the customer replied.

See [Set conditions](flows/setting-conditions.md), [Insert Variable](flows/using-variables.md), and [Response waiting](flows/response-wait.md).

For processing an existing list, use [Start loop and End loop](flows/nodes/for-loop.md).
