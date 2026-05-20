# Deployment Steps — From Stage 6

You already completed Snowflake setup through PAT creation. Continue from here.

## Stage 6 — Create the GitHub repository

1. Go to GitHub.
2. Click **New repository**.
3. Repository name: `snowflake-ai-sales-data-insights`.
4. Visibility: choose **Public** if you want Streamlit Community Cloud to deploy publicly.
5. Do not add a README from GitHub if you are uploading this prepared repo folder.
6. Click **Create repository**.

## Stage 7 — Upload the repository files

Upload the complete contents of this folder to GitHub.

Important root files:

```text
app.py
requirements.txt
README.md
```

Important folders:

```text
notebooks/
semantic_model/
sql/
docs/
.streamlit/secrets.toml.example
```

Do not upload a real `.streamlit/secrets.toml` file with your PAT token.

## Stage 8 — Deploy on Streamlit Community Cloud

1. Go to Streamlit Community Cloud.
2. Click **New app**.
3. Select the GitHub repository.
4. Branch: `main`.
5. Main file path: `app.py`.
6. Deploy.

## Stage 9 — Add secrets in Streamlit Cloud

Open the deployed app settings and paste this into **Secrets**:

```toml
[snowflake]
account_url = "https://pka30578.east-us-2.azure.snowflakecomputing.com"
account = "pka30578.east-us-2.azure"
user = "CORTEX_PUBLIC_APP_USER"
pat = "PASTE_YOUR_PAT_TOKEN_SECRET_HERE"
role = "SALES_PUBLIC_APP_ROLE"
warehouse = "COMPUTE_WH"
database = "SALES_ANALYTICS_2025"
schema = "RAW_DATA"
semantic_model_file = "@SALES_ANALYTICS_2025.RAW_DATA.SEMANTIC_MODELS/sales_analytics_semantic_model.yaml"
```

Replace only `PASTE_YOUR_PAT_TOKEN_SECRET_HERE` with the actual PAT token secret.

## Stage 10 — Reboot and test

After adding secrets:

1. Click **Reboot app**.
2. Ask: `What is the total revenue?`
3. Ask: `Top 5 products by revenue`.
4. Ask: `Revenue by territory`.
5. Ask: `Average shipping days`.

If these work, copy the public Streamlit URL and share it.

## After demo

Disable the PAT token using:

```sql
ALTER USER CORTEX_PUBLIC_APP_USER
MODIFY PROGRAMMATIC ACCESS TOKEN PUBLIC_STREAMLIT_PAT
SET DISABLED = TRUE;
```
