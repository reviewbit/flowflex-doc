# Utils function: calculate distance or identify places

Choose a built-in helper when you need to calculate proximity or understand a place mentioned in a customer's reply.

## Calculate distance

Use this function to check how far the customer is from a configured branch.

1. Ask for the customer's location using Location request and enable response waiting.
2. Add **Utils function** on the reply path and open it.
3. In **Choose a function**, select Calculate distance.
4. Use Insert Variable to map **Source latitude** and **Source longitude** from the Location request's captured location.
5. Select the branch in **Choose a target location**.
6. Save changes and connect Next step to a condition or message.
7. Select this function's result through Insert Variable in the later step.

Use a shared coordinate location rather than a street-address string. Verify the branch has the correct stored location. See [Location request](flows/nodes/location-request.md).

## Identify Places

Use this function to recognize a country, state, or city in customer text.

1. Add **Utils function** after the step containing the text to read.
2. Choose **Identify Places**.
3. In **Text**, insert the captured customer reply or another text field.
4. Choose **Entity type**: Country, State, or City.
5. Choose **Language** or leave it as Any.
6. Optionally restrict the search with **Country filter**, a two-letter code such as IN or AE.
7. Save changes and connect Next step to a condition or message.

Text supports up to 2,000 characters. Available languages include English, Arabic, Hindi, Urdu, Malayalam, Tamil, Spanish, and Russian, as well as Any.

### Use the result safely

In Insert Variable, choose the Identify Places node to find confirmed entities, count, and suggestions. For example, use the confirmed city name in a follow-up question.

Check that a place was confirmed before routing on it. Suggestions are possible matches, not confirmed answers. If several places are possible or none is confirmed, ask the customer to clarify or assign an agent.

See [Select and insert variables](flows/using-variables.md) and [Set conditions](flows/setting-conditions.md).
