# Demo Script

Use this script when showing the project.

## 30-second project intro

This project builds an AI-powered analytics chat interface on top of Snowflake. The data pipeline ingests raw sales data, transforms it into curated analytics tables, adds ML outputs, and then exposes the data through a Cortex Analyst semantic model. The public Streamlit app lets users ask business questions in natural language and get live SQL-backed answers from Snowflake.

## Questions to ask in the demo

1. What is the total revenue?
2. Top 5 products by revenue
3. Revenue by territory
4. Compare Mountain vs Road bikes
5. Which model has the best margin?
6. What is the 2023 budget?
7. Average shipping days

## What to highlight

- The app is not answering from static text.
- Cortex Analyst generates SQL from the semantic model.
- The SQL is executed against Snowflake curated tables.
- The app shows the generated SQL, result table, and chart.
- The semantic model defines business meaning, synonyms, metrics, and verified queries.
