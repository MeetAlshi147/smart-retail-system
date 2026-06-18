import functions_framework
import json
import base64
from datetime import datetime

from google.cloud import bigquery
from google.cloud import storage

import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

client = bigquery.Client()
storage_client = storage.Client()

TABLE_ID = "retail-analytics-system.retail_analytics.orders"
ORDER_ITEMS_TABLE = "retail-analytics-system.retail_analytics.order_items"
BUCKET_NAME = "retail-orders-backup"

EMAIL_USER = "smartretail.team@gmail.com"
EMAIL_PASSWORD = "eteh vxhs zmaf vrbm"

@functions_framework.http
def write_to_bigquery(request):

    try:
        envelope = request.get_json()

        print("ENVELOPE:", envelope)

        message = envelope["message"]

        encoded_data = message["data"]

        decoded_data = base64.b64decode(
            encoded_data
        ).decode("utf-8")

        print("DECODED DATA:", decoded_data)

        order = json.loads(decoded_data)

        row = {
            "order_id": order.get("order_id", ""),
            "customer": order.get("customer", ""),
            "amount": float(order.get("amount", 0)),
            "timestamp": datetime.utcnow().isoformat(),
            "email": order.get("email", ""),
            "phone": order.get("phone", ""),
            "address": order.get("address", ""),
            "status": "PLACED",
            "product": ", ".join([item["product"] for item in order.get("items", [])]),
            "order_time": datetime.utcnow().isoformat()            
        }

        errors = client.insert_rows_json(
            TABLE_ID,
            [row]
        )

        if errors:
            print("BigQuery Error:", errors)
            return "BigQuery insert failed", 500

        order_items_rows = []

        for item in order.get("items", []):

            order_items_rows.append({
                "order_id": order["order_id"],
                "product": item["product"],
                "quantity": item["quantity"],
                "price": item["price"],
                "timestamp": datetime.utcnow().isoformat()
        })

        item_errors = client.insert_rows_json(
            ORDER_ITEMS_TABLE,
            order_items_rows
        )

        if item_errors:
            print("Order Items Error:", item_errors)

        bucket = storage_client.bucket(BUCKET_NAME)

        filename = (
            f"orders/"
            f"{datetime.utcnow().strftime('%Y-%m-%d')}/"
            f"order_{row['order_id']}.json"
        )

        blob = bucket.blob(filename)

        blob.upload_from_string(
            json.dumps(order, indent=2),
            content_type="application/json"
        )

        print("Saved to BigQuery and Cloud Storage")

        customer_name = order["customer"]
        customer_email = order["email"]
        order_id = order["order_id"]
        amount = order["amount"]
        items = order["items"]

        html_body = f"""
        <html>
        <body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">

        <div style="max-width:600px; margin:auto; background:white; border-radius:12px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.1);">

        <div style="background:#2563eb; color:white; padding:25px; text-align:center;">
        <h1>SmartRetail</h1>
        <h2>Order Confirmed ✅</h2>
        </div>

        <div style="padding:30px;">

        <h3>Hello {customer_name},</h3>

        <p>
        Thank you for shopping with SmartRetail.
        Your order has been successfully placed and is now being processed.
        </p>

        <div style="background:#f8fafc; padding:15px; border-radius:8px;">
        <h3>Order Details</h3>

        <p><strong>Order ID:</strong> {order_id}</p>
        <p><strong>Total Amount:</strong> ₹{amount}</p>
        </div>

        <h3>Items Ordered</h3>

        <ul>
        {''.join([f"<li>{item['product']} × {item['quantity']}</li>" for item in items])}
        </ul>

        <div style="margin-top:30px; padding:15px; background:#ecfdf5; border-left:4px solid #10b981;">
        Your order has been confirmed and will be processed shortly.
        </div>

        <br>

        <div style="text-align:center;">
        <a href="https://your-store-url.com"
        style="
        background:#2563eb;
        color:white;
        padding:12px 24px;
        text-decoration:none;
        border-radius:6px;
        display:inline-block;">
        Track Order
        </a>
        </div>

        </div>

        <div style="background:#111827; color:white; text-align:center; padding:20px;">
        © 2026 SmartRetail
        </div>

        </div>

        </body>
        </html>
        """

        msg = MIMEMultipart()
        msg["From"] = EMAIL_USER
        msg["To"] = customer_email
        msg["Subject"] = f"Order Confirmed - {order_id}"

        msg.attach(MIMEText(html_body, "html"))

        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()

        print(f"Email sent to {customer_email}")

        return "Success", 200

    except Exception as e:
        print("ERROR:", str(e))
        return f"Error: {str(e)}", 500