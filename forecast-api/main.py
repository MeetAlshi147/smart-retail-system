from flask import Flask, jsonify, request
from google.cloud import bigquery

app = Flask(__name__)

client = bigquery.Client()

@app.route("/forecast", methods=["GET", "OPTIONS"])
def forecast():

    # CORS Preflight Request
    if request.method == "OPTIONS":
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        }
        return ("", 204, headers)

    query = """
    SELECT
      forecast_timestamp,
      forecast_value
    FROM ML.FORECAST(
      MODEL `retail-analytics-system.retail_analytics.sales_forecast_model`,
      STRUCT(7 AS horizon)
    )
    """

    rows = client.query(query).result()

    forecasts = []
    total = 0

    for row in rows:
        forecasts.append({
            "date": str(row.forecast_timestamp),
            "revenue": round(row.forecast_value, 2)
        })
        total += row.forecast_value

    response = jsonify({
        "tomorrowRevenue": forecasts[0]["revenue"],
        "nextWeekRevenue": round(total, 2),
        "forecast": forecasts
    })

    # CORS Headers
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"

    return response

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
