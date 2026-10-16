# API: look up information or call another service

Use API to check an order, look up availability, or send information to another service. Ask the service provider for its endpoint, request method, and any required API key.

## Before you start

Have a sample response available so you can choose the returned fields later. If you only want to practice, use sample values and a test service; the request test sends a real request.

## Example: look up an order and send its status

Build this sequence:

```text
Trigger → API → Success → Text message → End
              Non-2xx response → Assign agent → End
              Request failed → Assign agent → End
```

### 1. Add the request

1. Add **API** from Data Blocks and open it.
2. Give it a clear Node label, such as “Look up order”.
3. Set **Method** to the method supplied by the service, for example GET.
4. Set **URL** to its order endpoint. An illustrative URL is `https://api.example.com/orders`; use your provider's real URL.
5. If the service accepts the order number as a query parameter, open **Query params**, add its required key, and select the order number with Insert variable. For the sample in our variable guide, choose Trigger → order → number.
6. Add required **Headers**, such as Authorization, using the provider's exact instructions.

Do not add a parameter simply because it appears in this example; the connected service decides the required names and format. See [Select and insert variables](flows/using-variables.md).

### 2. Add a body when the service requires one

For GET, HEAD, and OPTIONS, no body is sent. For a request that sends information, open **Body** and select the format the service expects.

| Service expects | Choose |
| --- | --- |
| A JSON object | raw with JSON format |
| Form fields | x-www-form-urlencoded |
| Plain text, XML, HTML, or other supported text | raw and the matching format |
| No body | none |

In a JSON body, keep inserted variables quoted. For example:

```json
{
  "order_number": "{{trigger.order.number}}",
  "customer_name": "{{trigger.customer.name}}"
}
```

Use the actual fields selected in your flow. Quote variables even when the selected value is a number or list; the field's whole-variable value retains the supplied type. Keep the surrounding JSON valid, with matching braces and commas.

### 3. Try the request

1. Open the drawer's request test.
2. Review the URL, method, headers, and body.
3. Supply sample values for the variables used by this request.
4. Run the test and inspect the response status, body, and headers.
5. Apply the returned response as an example if it matches what you need.

A successful connection does not guarantee a successful business result. An order can still be pending or unavailable. If the request creates a booking or changes a record, use test data and follow the service's guidance for avoiding duplicate actions.

### 4. Save response examples

You can also enter examples manually in **Response body**. Choose the relevant status and provide a representative body, such as:

```json
{
  "order": {
    "number": "ORD-1042",
    "status": "ready",
    "delivery_date": "12 October"
  }
}
```

Add error examples if later steps need their fields. Save changes in the API node so its fields are available in the variable picker.

### 5. Use the returned information

1. Add a Text message on the API's Success path.
2. Set its Destination number using the customer's phone variable.
3. Type “Your order is expected on ” in the message.
4. Open Insert Variable → Look up order → the 200 response → order → delivery_date.
5. Save the message and connect it to End.

The customer receives the real response value, not the example date. See [Select from an API response](flows/using-variables.md#use-an-api-response).

## Connect every response path

| Output | Meaning | Example next step |
| --- | --- | --- |
| **Success** | A successful HTTP response. | Check order status, then message the customer. |
| **Non-2xx response** | The service returned an error response. | Handle an order-not-found response or assign an agent. |
| **Request failed** | The request could not complete. | Offer help or assign an agent. |

Connect all three outputs to an action or End. If you read an error field, choose it from the corresponding error response example.

## Time limits and retries

Open **Settings** when you need to adjust waiting or retry behavior. Retries are off by default.

| Setting | What it controls |
| --- | --- |
| **Timeout per attempt** | How long one request can wait: 1–45 seconds. |
| **Overall time limit** | All attempts and waiting combined: up to 10 minutes. |
| **Maximum retries** | Additional attempts after the first request: 0–9. |
| **Retry rate-limited requests** | Try again when the service asks you to slow down. Use the service's retry header or your chosen delay. |
| **Retry other HTTP failures** | Try again for the error statuses you select. More options include connection failures and timeouts. |

Choose a fixed interval or an increasing wait. The maximum wait must be at least the first wait. For bookings, payments, or record creation, only enable retries after checking how the provider prevents duplicates.

## Import a supplied cURL example

1. Open the URL field's actions menu → **Import cURL**.
2. Paste the command supplied by the service and import it.
3. Review the populated method, URL, headers, parameters, and body.
4. Replace sample customer data with flow variables.
5. Add response examples, connect outputs, and save.

Import fills the form without sending the request. If the command is unsupported, use the service's instructions to fill the form manually.

## Update an older API node

If offered, select **Upgrade request** or **Convert to response outputs** to use the current settings and three paths. Review the request and connect every new output before saving and publishing.

## Before publishing

Confirm required credentials are supplied, sample fields match actual responses, all outputs are connected, and failure paths do not assume success data exists. Use [API troubleshooting](help/troubleshooting.md#my-api-request-fails) for request errors.
