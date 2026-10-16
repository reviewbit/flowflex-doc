# Utils function

Use a ready-made helper to work out how far a customer is from a branch, or to recognise a place name in a customer's message.

Add **Utils function** from **Other Blocks**, open it, and pick a helper in **Choose a function**. Each helper's result is available to later steps through Insert Variable.

## Calculate distance

Work out how far a customer's shared location is from one of your branches.

**When to use it:** Rangoli Store asks the customer to share their location, then checks the distance to the Kochi branch. If the customer is nearby, the flow offers store pickup; otherwise it offers home delivery.

1. Add a [Location request](flows/nodes/location-request.md) before this step.
2. Add **Utils function** on the location request's **Next step**, open it, and choose **Calculate distance**.
3. In **Source latitude** and **Source longitude**, insert the latitude and longitude from the location request.
4. In **Choose a target location**, select the branch, such as **Kochi**.
5. Click **Save**.

Use the result in a [Condition split](flows/nodes/condition-split.md) or a message. The branch's stored location is used as the target, so check it's correct.

## Identify Places

Find a country, state or city in text the customer typed.

**When to use it:** Rangoli Store asks "Which city should we deliver to?". When Daniel Kim replies "bangalore please", the helper recognises Bengaluru, and the next message confirms the city.

1. Add **Utils function** after the step that collects the text, open it, and choose **Identify Places**.
2. In **Text**, insert the customer's reply or another text field. It can be up to 2,000 characters.
3. In **Entity type**, choose **Country**, **State** or **City**.
4. In **Language**, leave **Any** or choose the language of the text: English, Arabic, Hindi, Urdu, Malayalam, Tamil, Spanish or Russian.
5. For a state or city, you can narrow the search with **Country filter (optional)**, a two-letter country code such as `IN` or `AE`.
6. Click **Save**.

In Insert Variable, the result includes the confirmed places, how many were found, and suggestions. Check that a place was confirmed before routing on it: suggestions are possible matches, not answers. If no place is confirmed or several match, ask the customer to clarify, or assign an agent.

## Connect it

Connect **Next step** to a condition or message that uses the result.

## See also

- [Location request](flows/nodes/location-request.md)
- [Set conditions and choose paths](flows/setting-conditions.md)
- [Select and insert variables](flows/using-variables.md)
