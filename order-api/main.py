import functions_framework
from google.cloud import pubsub_v1
import json
# GitHub Actions test
project_id = "retail-analytics-system"
topic_id = "order-topic"

publisher = pubsub_v1.PublisherClient()


@functions_framework.http
def publish_order(request):

    # CORS preflight request
    if request.method == "OPTIONS":
        headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
}
        return ("", 204, headers)

    try:
        topic_path = publisher.topic_path(project_id, topic_id)

        order = request.get_json()

        message = json.dumps(order).encode("utf-8")

        future = publisher.publish(topic_path, message)

        message_id = future.result()

        headers = {
            "Access-Control-Allow-Origin": "*"
        }

        return (
            {
                "message": "Order received",
                "message_id": message_id
            },
            200,
            headers
        )

    except Exception as e:
        headers = {
            "Access-Control-Allow-Origin": "*"
        }

        return (
            {
                "error": str(e)
            },
            500,
            headers
        )
