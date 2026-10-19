# Send location

Send a location as a WhatsApp map pin, such as your store or a pickup point.

## When to use it

Use Send location when the customer needs to find a place. When a customer chooses store pickup, Rangoli Store sends a pin for the Kochi branch, so the customer can open directions in their maps app. To ask for the customer's location instead, use [Location request](location-request.md).

## Set it up

1. Add **Send location** from **WhatsApp Blocks** and open it.
2. In **Destination number**, insert the customer's phone number, such as **Trigger** → **from**.
3. Enter the **Latitude** and **Longitude**, or insert variables that hold them. Latitude is between -90 and 90, and longitude between -180 and 180; check you haven't swapped them.
4. Add a **Location name**, such as `Rangoli Store Kochi`, and the **Address**, so the customer recognises the place.
5. Check the **Live WhatsApp preview** and click **Save changes**.

A name or street address on its own doesn't place the pin. The coordinates are required.

## Connect it

Connect **Next step** to the following step or to **End**.

## See also

- [Location request](location-request.md)
- [Set up WhatsApp messages](../whatsapp-message-setup.md)
- [Select and insert variables](../using-variables.md)
