# API: look up information or call another service

Use API to fetch information from another service, such as an order's status, or to send information to it.

## When to use it

Use API when the answer a customer needs lives in another system. In Rangoli Store's order-tracking flow, a customer taps **Track order**, the API node asks the store's order system for the latest order on that phone number, and the next message replies with its status. Ask the service's provider for the URL, the method, and any key the request needs.

## Set it up

1. Add **API** from **Data Blocks** and open it. Give it a **Node label**, such as `Look up order`, so you can find its fields later.
2. Set **Method** to the one the service expects, such as `GET`, and enter the **URL**, such as `https://api.rangoli.example/orders`.
3. On the **Headers** tab, add any headers the service requires, such as `Authorization`, exactly as the provider describes them.
4. On the **Query params** tab, add the parameters the service expects. For example, add `phone` and insert **Trigger** → **from** with [Insert Variable](../using-variables.md). The service decides the names and format, so copy them from its instructions.
5. If the service expects data in the request, open **Body** and choose its format: **none**, **x-www-form-urlencoded** for form fields, or **raw** for JSON, XML or plain text. `GET`, `HEAD` and `OPTIONS` requests send no body.
6. Under **Response examples**, add an example of what the service returns for each status you use, starting with `200`. Later steps pick fields from these examples.
7. Click **Save**.

In a JSON body, keep inserted variables inside quotes and keep the JSON valid:

```json
{
  "phone": "{{trigger.from}}",
  "customer_name": "{{trigger.name}}"
}
```

The quoted variable still sends the original value, so a number stays a number.

### Test the request

Save the flow first, then click **Test request**. Check the method, URL, headers and body, fill in sample values for any variables, and click **Send real request**. If the response looks right, click **Use as example** to save it as a response example.

The test sends a real request, so use test data when the request creates a booking, payment or record.

### Import a cURL command

If the provider gives you a cURL command, open the **URL** field's menu and choose **Import cURL**. Paste the command and click **Import**. This fills in the method, URL, headers, parameters and body without sending anything. Replace the sample customer values with variables before you save.

### Use the response in later steps

In the next message, open Insert Variable and choose the API node, then the response status, then the field. For Rangoli Store: **Look up order** → **200** → **order** → **status**. The customer receives the real value from the service, not the example. See [Use an API response](../using-variables.md#use-an-api-response).

## Connect it

| Output | When it's used |
| --- | --- |
| **Success** | The service returned a successful response. |
| **Non-2xx response** | The service returned an error, such as "order not found". |
| **Request failed** | The request didn't complete, for example because the service didn't answer in time. |

Connect all three. Rangoli Store sends **Success** to the status message, and both failure outputs to **Assign agent**, so a person follows up. If an older API node shows **Upgrade request** or **Convert to response outputs**, select it to get these three outputs, then connect each one.

## Time limits and retries

Open the **Settings** tab to change how long the request waits and whether it tries again. Retries are off by default.

| Field | What to enter |
| --- | --- |
| **Timeout per attempt (seconds)** | How long one attempt can wait, from 1 to 45 seconds. |
| **Overall time limit (seconds)** | The total time for all attempts and waits. |
| **Maximum retries** | Extra attempts after the first request. |
| **Retry rate-limited requests** | Try again when the service replies "too many requests". |
| **Retry other HTTP failures** | Try again for the error statuses you pick in **Retry on HTTP status codes**. |
| **Retry delay** | **Fixed interval**, or **Exponential backoff (increasing wait)**. |

The next step waits until the API node finishes, including retries. Only turn on retries for bookings, payments or new records after checking how the service avoids duplicates.

## See also

- [Select and insert variables](../using-variables.md)
- [Condition branch](condition-branch.md)
- [My API request fails](../../help/troubleshooting.md#my-api-request-fails)
