# Waiting for a reply

Message nodes can **pause the flow until the customer replies**, then branch on whether a
reply arrived in time. This is the **"Wait for specific time"** option in a message node's
setup.

## How it works

1. Enable **Wait for specific time** on a message node (Text, Media, Template, Button, or
   List).
2. Set the **Unit** and **Value** (e.g. 2 hours) — the maximum time to wait for a reply.
3. The node sends the message, then waits:
   - **A reply arrives in time** → the flow continues down the normal **Next step** path,
     and the reply is captured for downstream nodes.
   - **No reply within the window** → the flow takes the **No response** path.

```
Text message  (wait: 2 hours)
   ├─ reply received ─▶ Next step …
   └─ no response   ─▶ No response …  (e.g. Internal alert, or a reminder)
```

> If a valid response isn't received within the configured time, the step is marked
> **"No Response"** and the No-response path runs.

## Format validation (Text message only)

When *Wait for specific time* is on for a **Text message** node, you can also enable
**Check format** to require the reply to match a specific type. If the customer sends a
reply that doesn't match, the node re-sends the **Invalid response text** and continues
waiting.

Supported format types:

| Format | What the reply must be |
| --- | --- |
| **Text** | Any text reply |
| **Number** | A numeric value |
| **Email** | A valid e-mail address |
| **Image** | An image attachment |
| **Video** | A video attachment |
| **File** | Any file/document |
| **Location** | A shared location |
| **Contact** | A shared contact card |
| **Audio** | An audio or voice note |
| **Sticker** | A sticker |
| **Order** | A WhatsApp order |

> **Check format** is only available on Text message nodes. Button and List messages don't
> need it — the response IS the button tap or list row selection.

## Button & list messages

Interactive **Button** and **List** messages inherently wait for the customer to tap a
button or pick a row — that's how their per-button / per-row branches are chosen. The
**Wait for specific time** value sets how long to wait for that interaction before giving
up to the **No response** path.

## Using the reply downstream

When a reply is captured, later nodes can reference it (for example, to branch on what the
customer said, or to store it with **Save data**). Insert it via the **Insert Variable**
picker, which lists the message node's captured reply alongside the trigger fields.

## Tips

- **Pick realistic windows.** Hours/days are fine — the flow simply waits; it isn't
  burning resources while idle.
- **Always wire the No-response path** for anything important (a reminder, an internal
  alert), so a silent customer doesn't leave the flow stuck with nothing to do.
- **Delay vs. wait-for-reply are different.** Use **Set time delay** for an unconditional
  pause; use **Wait for specific time** when you specifically want the customer's reply.

See the [Node reference](flows/nodes.md) for which nodes support waiting.
