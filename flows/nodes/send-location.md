# Send location: share a store or pickup point

Use Send location to send a known location as a WhatsApp map pin.

## Share a pickup point

1. Add **Send location** and open it.
2. Set **Destination number** using the customer's phone variable.
3. Fill **Latitude** and **Longitude** with the pickup point's coordinates, or select coordinate variables.
4. Add **Location name**, such as “Main store”, and **Address** to help the customer recognize it.
5. Review the preview and click Save changes.
6. Connect Next step to another action or End.

Latitude must be between -90 and 90; longitude between -180 and 180. Check that you have not swapped them. A name or street address alone does not supply the required coordinates.

To ask for the customer's location, use [Location request](flows/nodes/location-request.md). See [Insert Variable](flows/using-variables.md) and [WhatsApp setup](flows/whatsapp-message-setup.md).
