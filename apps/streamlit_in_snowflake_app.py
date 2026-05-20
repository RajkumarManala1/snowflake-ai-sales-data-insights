# Snowflake AI Sales Data Insights — Chat Interface
# Streamlit in Snowflake app powered by Cortex Analyst REST API.

import json
import streamlit as st
import _snowflake
from snowflake.snowpark.context import get_active_session

# ─── Configuration ───
SEMANTIC_MODEL_STAGE = "SALES_ANALYTICS_2025.RAW_DATA.SEMANTIC_MODELS"
SEMANTIC_MODEL_FILE = "sales_analytics_semantic_model.yaml"
SEMANTIC_MODEL_PATH = f"@{SEMANTIC_MODEL_STAGE}/{SEMANTIC_MODEL_FILE}"
API_ENDPOINT = "/api/v2/cortex/analyst/message"

# ─── Page Config ───
st.set_page_config(
    page_title="Snowflake AI Sales Data Insights",
    page_icon="❄️",
    layout="wide",
)

# ─── Session Setup ───
session = get_active_session()

# ─── Sidebar ───
with st.sidebar:
    st.image("https://upload.wikimedia.org/wikipedia/commons/f/ff/Snowflake_Logo.svg", width=180)
    st.title("AI Data Insights")
    st.caption("SALES_ANALYTICS_2025 · Curated")

    st.divider()
    st.markdown("**Quick Questions:**")

    suggested = [
        "What is the total revenue?",
        "Top 5 products by revenue",
        "Revenue by territory",
        "Compare Mountain vs Road bikes",
        "Daily sales trend",
        "Which model has the best margin?",
        "What is the 2023 budget?",
        "Average shipping days",
    ]

    for idx, q in enumerate(suggested):
        if st.button(q, key=f"btn_{idx}", use_container_width=True):
            st.session_state.active_suggestion = q
            st.rerun()

    st.divider()
    st.markdown(
        """
        **Pipeline:**  
        Ingestion → Transformation → Delivery

        **Data:** 100 sales orders  
        **Period:** Dec 2010 – Jan 2011  
        **Products:** 16 bike variants  
        **Territories:** 7 regions  

        ---
        *Built by Raj Manala*
        """
    )


# ─── Cortex Analyst REST API Call ───
def send_message(prompt: str) -> dict:
    """Send a user question to Cortex Analyst through the Snowflake REST API."""

    request_body = {
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": prompt,
                    }
                ],
            }
        ],
        "semantic_model_file": SEMANTIC_MODEL_PATH,
    }

    resp = _snowflake.send_snow_api_request(
        "POST",
        API_ENDPOINT,
        {},
        {},
        request_body,
        {},
        30000,
    )

    if resp.get("status", 500) >= 400:
        raise RuntimeError(f"Cortex Analyst API failed: {resp}")

    return json.loads(resp["content"])


def process_analyst_message(response: dict, message_index: int = 0):
    """Display Cortex Analyst text, SQL, suggestions, and SQL results."""

    content = response.get("message", {}).get("content", [])

    if not content:
        st.warning("Cortex Analyst returned an empty response.")
        st.json(response)
        return

    for item_index, item in enumerate(content):
        item_type = item.get("type")

        if item_type == "text":
            st.markdown(item.get("text", ""))

        elif item_type == "suggestions":
            with st.expander("💡 Suggested follow-up questions", expanded=True):
                for suggestion_index, suggestion in enumerate(item.get("suggestions", [])):
                    key = f"sug_{message_index}_{item_index}_{suggestion_index}"
                    if st.button(suggestion, key=key):
                        st.session_state.active_suggestion = suggestion
                        st.rerun()

        elif item_type == "sql":
            sql_query = item.get("statement", "")

            with st.expander("📊 Generated SQL", expanded=False):
                st.code(sql_query, language="sql")

            try:
                df = session.sql(sql_query).to_pandas()

                if df.empty:
                    st.info("Query returned no results.")
                    continue

                st.dataframe(df, use_container_width=True)

                # Auto-generate a simple bar chart for small categorical result sets.
                if len(df) > 1 and len(df.columns) >= 2:
                    numeric_cols = df.select_dtypes(include=["number"]).columns.tolist()
                    label_cols = [col for col in df.columns if col not in numeric_cols]

                    if numeric_cols and label_cols and len(df) <= 20:
                        chart_col = numeric_cols[0]
                        label_col = label_cols[0]
                        st.bar_chart(df.set_index(label_col)[chart_col])

            except Exception as e:
                st.error(f"Error executing generated SQL: {e}")

        else:
            st.info(f"Unsupported response item type: {item_type}")
            st.json(item)


def run_prompt(prompt: str):
    """Add the user prompt and Cortex response to the chat history."""

    st.session_state.messages.append({"role": "user", "content": prompt})

    with st.chat_message("user"):
        st.markdown(prompt)

    with st.chat_message("assistant"):
        with st.spinner("Querying your Snowflake data..."):
            try:
                response = send_message(prompt)
                process_analyst_message(response, message_index=len(st.session_state.messages))
                st.session_state.messages.append({"role": "assistant", "content": response})
            except Exception as e:
                st.error(str(e))


# ─── Main Chat Interface ───
st.title("❄️ Snowflake AI Sales Data Insights")
st.caption("Ask questions about your sales data in natural language. Powered by Cortex Analyst.")
st.caption(f"Semantic model: `{SEMANTIC_MODEL_PATH}`")

if "messages" not in st.session_state:
    st.session_state.messages = []

if "active_suggestion" not in st.session_state:
    st.session_state.active_suggestion = None

# Display existing chat history.
for idx, message in enumerate(st.session_state.messages):
    with st.chat_message(message["role"]):
        if message["role"] == "user":
            st.markdown(message["content"])
        else:
            process_analyst_message(message["content"], message_index=idx)

# Run sidebar suggestion after history is rendered.
if st.session_state.active_suggestion:
    suggestion = st.session_state.active_suggestion
    st.session_state.active_suggestion = None
    run_prompt(suggestion)

# Chat input.
if user_input := st.chat_input("Ask about your sales data..."):
    run_prompt(user_input)
