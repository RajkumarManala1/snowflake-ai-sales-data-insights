# Troubleshooting

## Error: `Not an int64 value: "2025-05-20"`

The staged YAML still contains `verified_at: 2025-05-20`.

Fix:

```sql
REMOVE @SALES_ANALYTICS_2025.RAW_DATA.SEMANTIC_MODELS/sales_analytics_semantic_model.yaml;
```

Upload the corrected YAML from `semantic_model/sales_analytics_semantic_model.yaml`.

## Error: Cortex Analyst API failed with 401 or 403

Check:

- PAT token is correct.
- PAT was copied fully.
- PAT is not expired.
- PAT role restriction is `SALES_PUBLIC_APP_ROLE`.
- The service user has `SALES_PUBLIC_APP_ROLE`.

## Error: missing Streamlit secret

Check Streamlit Cloud app settings. The secrets block must include all values under `[snowflake]`.

## Error: no module named snowflake.connector

Make sure `requirements.txt` exists in the repository root and includes:

```text
snowflake-connector-python[pandas]
```

## Error: semantic model file not found

Verify the file exists in the Snowflake stage:

```sql
LIST @SALES_ANALYTICS_2025.RAW_DATA.SEMANTIC_MODELS;
```

Expected file:

```text
sales_analytics_semantic_model.yaml
```

## Error: generated SQL execution fails

Check the service role has SELECT access:

```sql
GRANT SELECT ON ALL TABLES IN SCHEMA SALES_ANALYTICS_2025.CURATED TO ROLE SALES_PUBLIC_APP_ROLE;
```
