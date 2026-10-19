# Location request

Ask the customer to share their location on WhatsApp, and use it in later steps.

## When to use it

Use a location request when you need to know where the customer is. Rangoli Store asks "Share your location and we'll find your nearest store", then uses [Calculate distance](utils-function.md#calculate-distance) to compare the customer's location with the Kochi and Bengaluru branches.

## Set it up

1. Add **Location request** from **WhatsApp Blocks** and open it.
2. In **Destination number**, insert the customer's phone number, such as **Trigger** → **from**.
3. Write the **Message**, such as `Share your location and we'll find your nearest store.`
4. Under **Response handling**, set how long the flow waits for the location with **Unit** and **Value**. It starts at 24 Hours; Rangoli Store uses 10 Minutes.
5. Check the **Live WhatsApp preview** and click **Save changes**.

In later steps, open Insert Variable, choose this Location request, and select its latitude and longitude fields. A typed address isn't the same as a shared location pin, and doesn't provide coordinates.

## Connect it

Connect **Next step** to the step that uses the location, such as **Utils function**. Connect **No response** to a fallback, such as **Assign agent** or **End**.

## See also

- [Utils function](utils-function.md)
- [Send location](send-location.md), to send your own location
- [Wait for and validate a reply](../response-wait.md)
