# Smart Retail Analytics System 🚀

An end-to-end cloud-native retail analytics platform built on Google Cloud Platform (GCP) that processes retail orders in real time, stores analytics data in BigQuery, and uses BigQuery ML for AI-powered revenue forecasting.

---

## Architecture

```text
                        ┌─────────────┐
                        │    Users    │
                        └──────┬──────┘
                               │
                               ▼
                  ┌────────────────────────┐
                  │ Frontend (React + Vite)│
                  └──────────┬─────────────┘
                             │
                             ▼
                  ┌────────────────────────┐
                  │ Cloud Storage (Static) │
                  └──────────┬─────────────┘
                             │
                             ▼
                  ┌────────────────────────┐
                  │ Order API (Cloud Run)  │
                  └──────────┬─────────────┘
                             │
                             ▼
                  ┌────────────────────────┐
                  │     Pub/Sub Topic      │
                  └──────────┬─────────────┘
                             │
                             ▼
             ┌──────────────────────────────────┐
             │ BigQuery Writer (Cloud Run)      │
             │ - Transform Orders               │
             │ - Store Analytics Data           │
             │ - Backup JSON to Cloud Storage   │
             └───────────────┬──────────────────┘
                             │
                             ▼
                  ┌────────────────────────┐
                  │       BigQuery         │
                  │------------------------│
                  │ orders                 │
                  │ order_items            │
                  │ daily_sales            │
                  └──────────┬─────────────┘
                             │
                             ▼
                  ┌────────────────────────┐
                  │      BigQuery ML       │
                  │------------------------│
                  │ sales_forecast_model   │
                  │ ARIMA_PLUS Forecasting │
                  └──────────┬─────────────┘
                             │
                             ▼
                  ┌────────────────────────┐
                  │ Forecast API           │
                  │ (Cloud Run + Flask)    │
                  └──────────┬─────────────┘
                             │
             ┌───────────────┴───────────────┐
             ▼                               ▼
  ┌───────────────────┐         ┌───────────────────┐
  │ Admin Dashboard   │         │ Looker Studio     │
  │ Revenue Forecast  │         │ BI Analytics      │
  └───────────────────┘         └───────────────────┘


CI/CD Pipeline

GitHub
   │
   ▼
GitHub Actions
   │
   ├── frontend/**         → Cloud Storage
   ├── order-api/**        → Cloud Run
   ├── bigquery-writer/**  → Cloud Run
   └── forecast-api/**     → Cloud Run
```

---

## Key Features

### Retail Application

* Product Catalog
* Add to Cart
* Place Orders
* Order History
* Email Confirmation

### Real-Time Processing

* Event-Driven Architecture
* Pub/Sub Messaging
* Cloud Run Microservices
* Automated Order Processing

### Analytics

* Total Orders
* Total Revenue
* Top Products
* Customer Analytics
* Revenue Trends

### AI Forecasting

* BigQuery ML
* ARIMA_PLUS Model
* Tomorrow Revenue Prediction
* Next Week Revenue Prediction
* Forecast API

---

## Technology Stack

### Frontend

* React
* Vite
* JavaScript
* HTML
* CSS

### Backend

* Python
* Flask
* Cloud Run

### Data Engineering

* BigQuery
* BigQuery ML
* SQL

### Messaging

* Pub/Sub

### Storage

* Cloud Storage

### Analytics

* Looker Studio

### DevOps

* GitHub
* GitHub Actions
* CI/CD

---

## Google Cloud Services Used

| Service       | Purpose                |
| ------------- | ---------------------- |
| Cloud Storage | Static Website Hosting |
| Cloud Run     | API Hosting            |
| Pub/Sub       | Event Messaging        |
| BigQuery      | Data Warehouse         |
| BigQuery ML   | Forecasting            |
| IAM           | Security               |
| Cloud Logging | Monitoring             |
| Looker Studio | Dashboards             |

---

## AI Forecasting Pipeline

```text
Orders
   │
   ▼
daily_sales
   │
   ▼
CREATE MODEL sales_forecast_model
   │
   ▼
ML.FORECAST()
   │
   ▼
Forecast API
   │
   ▼
Admin Dashboard
```

Model Type:

```sql
ARIMA_PLUS
```

Forecast Horizon:

```text
7 Days
```

---

## Dashboard Metrics

### Operational KPIs

* Total Orders
* Total Revenue
* Top Product

### Forecast KPIs

* Tomorrow Revenue
* Next Week Revenue

### Business Intelligence

* Revenue Trends
* Product Performance
* Customer Insights
* AI Forecasting

---

## Benefits

✅ Serverless Architecture

✅ Event-Driven Design

✅ Real-Time Analytics

✅ AI-Powered Forecasting

✅ Automated CI/CD

✅ Cost Efficient

✅ Highly Scalable

---

## Future Enhancements

* Vertex AI Integration
* Demand Forecasting
* Inventory Prediction
* Customer Churn Prediction
* Recommendation Engine
* Real-Time Streaming Analytics

---

## Author

**Meet Alshi**

Cloud Engineer | Data Engineer | AI & Analytics Enthusiast
