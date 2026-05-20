# Snowflake AI Sales Data Insights — Public Chat Interface

A public Streamlit chat app that connects to Snowflake Cortex Analyst and lets users ask natural-language questions over curated sales analytics data.

## What this project includes

- **Public Streamlit app**: `app.py`
- **Snowflake semantic model**: `semantic_model/sales_analytics_semantic_model.yaml`
- **Pipeline notebooks**: `notebooks/`
- **Snowflake setup SQL**: `sql/`
- **Deployment guide**: `docs/DEPLOYMENT_STEPS.md`
- **Demo script**: `docs/DEMO_SCRIPT.md`

## Architecture

```text
Raw sales data
    ↓
Step 1 — Ingestion and exploration
    ↓
Step 2 — Transformation and curated tables
    ↓
Step 3 — ML / analytics outputs
    ↓
Step 4 — Cortex Analyst semantic model setup
    ↓
Public Streamlit app
    ↓
Cortex Analyst REST API
    ↓
Generated SQL + live Snowflake results
```

## Repository structure

```text
.
├── app.py
├── requirements.txt
├── .gitignore
├── .streamlit/
│   └── secrets.toml.example
├── semantic_model/
│   └── sales_analytics_semantic_model.yaml
├── notebooks/
│   ├── Step1_Ingestion_Exploration.ipynb
│   ├── Step2_Transformation.ipynb
│   ├── Step3_DataScience_ML.ipynb
│   └── Step4_Delivery_CortexAnalyst.ipynb
├── sql/
│   ├── 01_public_app_role_and_user_setup.sql
│   └── 02_disable_public_app_token.sql
├── apps/
│   ├── streamlit_in_snowflake_app.py
│   └── snowflake-ai-insights-mockup.jsx
└── docs/
    ├── DEPLOYMENT_STEPS.md
    ├── DEMO_SCRIPT.md
    └── TROUBLESHOOTING.md
```

## Public deployment summary

1. Confirm the Snowflake Streamlit version works.
2. Create a limited Snowflake role and service user.
3. Generate a Programmatic Access Token.
4. Push this repository to GitHub.
5. Deploy `app.py` on Streamlit Community Cloud.
6. Add secrets in Streamlit Cloud app settings.
7. Test the public app.

Full steps are in `docs/DEPLOYMENT_STEPS.md`.

## Security notes

Never commit real Snowflake credentials or PAT tokens to GitHub. Use Streamlit Community Cloud secrets.

This repo includes only `.streamlit/secrets.toml.example`. The real `.streamlit/secrets.toml` is ignored by `.gitignore`.

After the demo, disable or remove the Programmatic Access Token using `sql/02_disable_public_app_token.sql`.
