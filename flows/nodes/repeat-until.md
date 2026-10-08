# Repeat until

> Repeat steps until a condition is met, with an attempt limit.

1. Add **Repeat until** and configure its stop condition.
2. Set **Maximum iterations** to an integer from 1–10 (default 5).
3. Connect the repeated steps between Repeat until and **End loop**.
4. Connect End loop to the actions that follow the loop.

After each attempt, the flow checks whether your stop condition has been met. It repeats only until that happens or the attempt limit is reached.

Connect the steps forward through Repeat until and End loop; these nodes handle the repetition.

## Result

After End loop, select the Repeat until output through **Insert Variable**:

| Output | Meaning |
| --- | --- |
| `iterations` | Number of iterations run. |
| `conditionMet` | Whether the stop condition became true. |
| `exhausted` | Whether the attempt limit was reached without satisfying the condition. |

Exhaustion is not success. Add a condition after the loop to route unsuccessful attempts to a fallback such as Assign agent.

## Examples

To ask again until a customer provides a usable answer, place the question and answer check inside the loop. Set a small attempt limit, connect the No response path, and offer an agent handoff if the customer still needs help.

To check whether an order is ready, repeat the status check with a time delay between attempts. Check the existing order each time; keep the action that creates the order outside the loop.

For an existing array, use [For loop](flows/nodes/for-loop.md).
