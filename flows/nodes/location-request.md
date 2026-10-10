# Location request: ask where the customer is

Use Location request to ask a customer to share their location, for example to find a nearby store.

## Ask and use the shared location

1. Add **Location request** and open it.
2. Set **Destination number** using the customer's phone variable.
3. Write **Message**, such as “Please share your location so we can find your nearest store.”
4. Enable **Wait for specific time** and set a Unit and Value.
5. Review the preview and click Save changes.
6. Connect Next step to the action that uses the location, such as Calculate distance.
7. Connect No response to Assign agent, another suitable fallback, or End.

In the later node, choose the saved Location request through [Insert Variable](flows/using-variables.md) and select its latitude and longitude fields. A text address is not the same as sharing a location pin.

See [Calculate distance](flows/nodes/utils-function.md#calculate-distance) and [Response waiting](flows/response-wait.md). To send your store's location instead, use [Send location](flows/nodes/send-location.md).
