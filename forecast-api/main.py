from flask import Flask, jsonify
from google.cloud import bigquery
#trial
app = Flask(__name__)

client = bigquery.Client()

@app.route("/forecast")
def forecast():

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

    return jsonify({
        "tomorrowRevenue": forecasts[0]["revenue"],
        "nextWeekRevenue": round(total, 2),
        "forecast": forecasts
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
