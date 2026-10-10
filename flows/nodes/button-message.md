# Button message: offer up to three choices

Use a Button message when the customer should choose between a few answers, such as “Track order”, “Talk to team”, and “Finish”. Each reply button leads to its own path.

## Build a small support menu

1. Add **Button message** and open it.
2. Set Destination number using the customer's phone variable.
3. Write the message, for example “How can we help?”
4. Add two or three reply buttons and give each a clear label.
5. If needed, add the optional header or footer shown in the form.
6. Set the response-wait window if you need a timed fallback.
7. Review the preview and click **Save changes**.
8. Connect each button output to its action. For example, Track order → API; Talk to team → Assign agent; Finish → End.
9. Connect No response when it is displayed.

## Limits and content

Use 1–3 buttons, each with a label up to 20 characters. The message body supports up to 1,024 characters. Optional text headers and footers support up to 60 characters.

If the header offers a file source, follow [Choose files and media](flows/files-and-media.md). Use [Insert Variable](flows/using-variables.md) for personalized body content.

## Before publishing

Check every choice is connected and the labels explain what happens next. Use [List message](flows/nodes/list-message.md) for more than three choices, or [Link button](flows/nodes/link-button.md) for opening a website.

See [Response waiting](flows/response-wait.md) and [WhatsApp troubleshooting](flows/troubleshooting.md).
