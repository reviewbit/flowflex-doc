# End

Finish a path in the flow.

## When to use it

Every flow has one **Trigger** and one **End**, and every path finishes at that End node. In Rangoli Store's order-tracking flow, the path that sends the order status ends there, and so does the path that assigns an agent.

## Connect it

1. Find the output that should finish the flow, such as **Next step** after the last message.
2. Drag a connection from that output to **End**.
3. Connect every other finished path to the same **End** node.

End has no outputs and no settings. You don't need a separate End for each path, and you can't add another one from the toolbox.

Don't leave an output unconnected to mean "stop here". An unconnected output stops the flow from saving. See [Build your first flow](../building-a-flow.md#check-every-path).

## See also

- [Workflows overview](../overview.md)
- [I cannot save the flow](../../help/troubleshooting.md#i-cannot-save-the-flow)
