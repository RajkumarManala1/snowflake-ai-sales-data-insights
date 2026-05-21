# Snowflake AI Sales Data Insights

A public AI-powered sales analytics project that turns curated Snowflake sales data into a natural-language chat interface. Users can ask questions such as **“What is the total revenue?”**, **“Top 5 products by revenue”**, **“Revenue by territory”**, and **“Average shipping days”**, and the app returns live answers from Snowflake using Cortex Analyst and Snowflake SQL APIs.

This project was inspired by Snowflake’s **Intro to Data Engineering using Python in Snowflake** quickstart, then extended into a complete data engineering, analytics, data science, semantic-modeling, and public AI chat application.

<img width="1928" height="794" alt="image" src="https://github.com/user-attachments/assets/7298ca62-05aa-4ef2-85f1-b77b51c7a2a6" />


## Project Story

I started this project after working through a Snowflake data engineering tutorial that showed how to build pipelines using Snowflake Notebooks, Snowpark pandas, Snowpark Python, transformations, aggregations, and scheduled tasks.

I extended that idea into a sales analytics use case where I built:

- a raw-to-curated data pipeline,
- enriched analytical sales tables,
- data quality checks,
- product, territory, customer, and trend analysis,
- data science outputs such as forecasting, segmentation, and anomaly detection,
- a Cortex Analyst semantic model,
- and a public Streamlit chat interface that allows users to ask questions in natural language.

The final goal was to make sales insights easy to access without writing SQL.

---

## What This Project Does

This project takes raw sales data and turns it into an interactive AI analytics experience.

### Main capabilities

- Loads and profiles raw sales, product, customer, geography, date, and budget data.
- Cleans and transforms raw data into curated analytical tables.
- Builds enriched sales features such as revenue, gross profit, profit margin, shipping days, income band, and product line.
- Creates analytical outputs for products, territories, models, customers, and daily sales trends.
- Adds data science analysis including forecasting, RFM segmentation, anomaly detection, and product classification.
- Defines a Snowflake Cortex Analyst semantic model so business users can ask questions in plain English.
- Deploys a public Streamlit app that calls Cortex Analyst and Snowflake SQL APIs.
- Uses a restricted Snowflake service user and Programmatic Access Token for public app access.

---

## Architecture

```text
Raw Sales Data
    ↓
Step 1 — Ingestion and Exploration
    ↓
Step 2 — Transformation and Curated Tables
    ↓
Step 3 — Data Science and ML Analysis
    ↓
Step 4 — Cortex Analyst Semantic Model
    ↓
Public Streamlit App
    ↓
Cortex Analyst REST API
    ↓
Generated SQL
    ↓
Snowflake SQL API
    ↓
Live Results, Tables, and Charts
```

---

## Tech Stack

| Area | Tools / Technologies |
|---|---|
| Cloud Data Platform | Snowflake |
| Data Engineering | Snowflake Notebooks, Snowpark Python, Snowpark pandas |
| Transformation | Python, SQL, Snowpark DataFrames |
| Data Analysis | SQL, pandas, curated analytical tables |
| Data Science | Forecasting, RFM segmentation, anomaly detection, classification |
| Semantic Layer | Snowflake Cortex Analyst semantic model YAML |
| AI Interface | Cortex Analyst REST API |
| Web App | Streamlit Community Cloud |
| Deployment | GitHub, Streamlit secrets |
| Security | Snowflake service user, restricted role, Programmatic Access Token |

---

## Repository Structure

```text
.
├── app.py
├── requirements.txt
├── README.md
├── .gitignore
├── .streamlit/
│   └── secrets.toml.example
├── notebooks/
│   ├── Step1_Ingestion_Exploration.ipynb
│   ├── Step2_Transformation.ipynb
│   ├── Step3_DataScience_ML.ipynb
│   └── Step4_Delivery_CortexAnalyst.ipynb
├── semantic_model/
│   └── sales_analytics_semantic_model.yaml
├── sql/
│   ├── 01_public_app_role_and_user_setup.sql
│   └── 02_disable_public_app_token.sql
├── apps/
│   ├── streamlit_in_snowflake_app.py
│   └── snowflake-ai-insights-mockup.jsx
├── docs/
│   ├── DEPLOYMENT_STEPS.md
│   ├── DEMO_SCRIPT.md
│   └── TROUBLESHOOTING.md
└── assets/
```

---

## Pipeline Notebooks

| Notebook | Purpose | Output |
|---|---|---|
| `Step1_Ingestion_Exploration.ipynb` | Loads and explores raw data, checks schema, profiles quality issues | Raw data understanding and validation |
| `Step2_Transformation.ipynb` | Cleans, enriches, joins, and transforms raw sales data | Curated fact and analytical tables |
| `Step3_DataScience_ML.ipynb` | Builds forecasting, segmentation, anomaly detection, and classification outputs | ML and analytics tables |
| `Step4_Delivery_CortexAnalyst.ipynb` | Prepares semantic model stage, validates YAML, and supports Cortex Analyst delivery | Semantic model and deployment setup |

---

## Curated Tables

The project creates curated sales analytics tables such as:

| Table | Description |
|---|---|
| `FACT_SALES_ENRICHED` | Main enriched sales fact table with revenue, profit, margin, shipping, product, customer, and territory fields |
| `PRODUCT_PERFORMANCE` | Product-level revenue, profit, and order performance |
| `TERRITORY_PERFORMANCE` | Sales performance by territory |
| `MODEL_COMPARISON` | Product model comparison by revenue, margin, and volume |
| `DAILY_SALES_TREND` | Daily sales trend for time-series analysis |
| `CUSTOMER_SEGMENTATION` | Customer-level behavioral and demographic grouping |
| `SALES_FORECAST` | Forecasting output |
| `CUSTOMER_RFM` | Recency, frequency, and monetary segmentation |
| `DAILY_WITH_ANOMALIES` | Daily trend with anomaly detection flags |
| `PRODUCT_CLASSIFICATION` | Product grouping and classification outputs |

---

## Semantic Model

The semantic model file is located at:

```text
semantic_model/sales_analytics_semantic_model.yaml
```

It tells Cortex Analyst how to understand the sales data by defining:

- logical tables,
- dimensions,
- time dimensions,
- measures,
- synonyms,
- business descriptions,
- and verified SQL queries for common questions.

Example business terms supported:

| Business term | Mapped meaning |
|---|---|
| Revenue / sales amount | `sales_amount` |
| Profit | `gross_profit` |
| Margin | `profit_margin_pct` |
| Territory / region | `territory_name` |
| Delivery time / shipping days | `shipping_days` |
| Budget / target | `budget` |

---

## Public Streamlit Chat App

The public app is implemented in:

```text
app.py
```

The app:

- accepts natural-language business questions,
- calls Cortex Analyst through the REST API,
- receives generated SQL,
- validates that SQL is read-only,
- executes it through Snowflake SQL API,
- displays results in tables,
- and creates simple charts when appropriate.

The public app does **not** use `snowflake-connector-python`. It uses REST APIs with `requests`, which keeps deployment simpler on Streamlit Community Cloud.

---

## Example Questions

Try asking:

```text
What is the total revenue?
Top 5 products by revenue
Revenue by territory
Compare Mountain vs Road bikes
Daily sales trend
Which model has the best margin?
What is the 2023 budget?
Average shipping days
```

---

## Key Results

Example KPIs from the curated sales dataset:

| Metric | Value |
|---|---:|
| Total Orders | 100 |
| Total Revenue | ~$328K |
| Total Profit | ~$132K |
| Average Shipping Days | ~7 days |
| Products | 16 bike variants |
| Territories | 7 regions |
| Date Range | Dec 2010 – Jan 2011 |

---

## How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/RajkumarManala1/snowflake-ai-sales-data-insights.git
cd snowflake-ai-sales-data-insights
```

### 2. Create a virtual environment

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Add local Streamlit secrets

Create this file locally:

```text
.streamlit/secrets.toml
```

Use this format:

```toml
[snowflake]
account_url = "https://YOUR_ACCOUNT_IDENTIFIER.snowflakecomputing.com"
user = "CORTEX_PUBLIC_APP_USER"
pat = "YOUR_SNOWFLAKE_PAT_TOKEN"
role = "SALES_PUBLIC_APP_ROLE"
warehouse = "COMPUTE_WH"
database = "SALES_ANALYTICS_2025"
schema = "RAW_DATA"
semantic_model_file = "@SALES_ANALYTICS_2025.RAW_DATA.SEMANTIC_MODELS/sales_analytics_semantic_model.yaml"
```

Do not commit the real `secrets.toml` file.

### 5. Run the app

```bash
streamlit run app.py
```

---

## Public Deployment

This project is designed to run publicly on Streamlit Community Cloud.

High-level deployment steps:

1. Push this repository to GitHub.
2. Deploy `app.py` from Streamlit Community Cloud.
3. Add Snowflake credentials in Streamlit Cloud secrets.
4. Reboot the app.
5. Test common business questions.
6. Share the public Streamlit URL.

Detailed deployment steps are available in:

```text
docs/DEPLOYMENT_STEPS.md
```

---

## Security Notes

This app is public, so Snowflake access is restricted using:

- a dedicated service user,
- a limited Snowflake role,
- read-only table access,
- stage read access only for the semantic model,
- and a Programmatic Access Token.

The app also blocks non-read SQL and only executes `SELECT` or `WITH` queries.

Never commit:

```text
.streamlit/secrets.toml
PAT tokens
Snowflake passwords
Private keys
```

After the demo, disable or remove the PAT using:

```text
sql/02_disable_public_app_token.sql
```

---

## What I Learned

Through this project, I practiced:

- building a Snowflake data engineering pipeline,
- using Snowflake Notebooks for step-by-step data work,
- transforming raw data into curated analytics-ready tables,
- applying data quality checks,
- building analytical and data science outputs,
- designing a semantic model for natural-language analytics,
- deploying a public AI-powered Streamlit application,
- and securing public access through a restricted Snowflake service user.

---

## Future Enhancements

Possible next improvements:

- Add screenshots or GIFs of the chat app.
- Add a dashboard page with KPI cards and charts.
- Add more verified Cortex Analyst queries.
- Add CI checks for Python formatting.
- Add automated semantic model validation.
- Add more detailed observability for query logs and app usage.
- Add user-friendly error messages for token expiry or Snowflake permission issues.

---

## Author

**Raj Kumar Manala**

- Portfolio: https://rajkumarmanala.com
- LinkedIn: https://www.linkedin.com/in/raj-kumar-manala-ab1b78134
- GitHub: https://github.com/RajkumarManala1

---

## Acknowledgment

This project was inspired by Snowflake’s data engineering quickstart using Python and Snowflake Notebooks. I extended the tutorial idea into a full sales analytics project with transformation, analysis, data science, semantic modeling, and a public AI chat interface.
