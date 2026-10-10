# End: finish a flow path

Every flow has one Trigger and one End. Use the existing End node to finish a completed path.

## Finish a branch

1. Find the output that should finish, such as a “No thanks” button.
2. Connect that output to End.
3. Connect other completed branches to the same End node.
4. Check all remaining outputs continue to a step or End before saving.

End has no next step. You do not need a separate End for each branch, and you cannot add extra End nodes from the toolbox.

Do not leave an output unconnected to indicate completion; an unconnected output prevents a valid save. See [Build and connect a flow](flows/building-a-flow.md).
