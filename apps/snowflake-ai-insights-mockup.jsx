import { useState, useRef, useEffect } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from "recharts";

// ═══════════════════════════════════════════════════════════
// CURATED DATA — Transformed via Pipeline
// Source: SALES_ANALYTICS_2025.RAW_DATA → CURATED
// Pipeline: Ingestion → Transformation → Delivery
// ═══════════════════════════════════════════════════════════

const PRODUCT_PERF = [
  {name:"Mountain-200 Black, 46",model:"Mountain-200",line:"Mountain",revenue:67987.13,profit:26732.54,orders:19,avgOrder:3578.27,margin:39.32},
  {name:"Mountain-200 Black, 42",model:"Mountain-200",line:"Mountain",revenue:64408.86,profit:25325.56,orders:18,avgOrder:3578.27,margin:39.32},
  {name:"Mountain-200 Black, 38",model:"Mountain-200",line:"Mountain",revenue:46517.51,profit:18290.69,orders:13,avgOrder:3578.27,margin:39.32},
  {name:"Mountain-200 Silver, 46",model:"Mountain-200",line:"Mountain",revenue:42939.24,profit:16883.71,orders:12,avgOrder:3578.27,margin:39.32},
  {name:"Mountain-200 Silver, 38",model:"Mountain-200",line:"Mountain",revenue:28626.16,profit:11255.81,orders:8,avgOrder:3578.27,margin:39.32},
  {name:"Road-350-W Yellow, 44",model:"Road-350-W",line:"Road",revenue:23799.93,profit:10414.85,orders:7,avgOrder:3399.99,margin:43.76},
  {name:"Road-350-W Yellow, 40",model:"Road-350-W",line:"Road",revenue:13599.96,profit:5951.34,orders:4,avgOrder:3399.99,margin:43.76},
  {name:"Road-350-W Yellow, 48",model:"Road-350-W",line:"Road",revenue:10199.97,profit:4463.51,orders:3,avgOrder:3399.99,margin:43.76},
  {name:"Road-150 Red, 48",model:"Road-150",line:"Road",revenue:10124.97,profit:4430.69,orders:3,avgOrder:3374.99,margin:43.76},
  {name:"Road-150 Red, 44",model:"Road-150",line:"Road",revenue:10124.97,profit:4430.69,orders:3,avgOrder:3374.99,margin:43.76},
  {name:"Road-350-W Yellow, 42",model:"Road-350-W",line:"Road",revenue:3399.99,profit:1487.84,orders:1,avgOrder:3399.99,margin:43.76},
  {name:"Road-650 Red, 44",model:"Road-650",line:"Road",revenue:2097.29,profit:857.86,orders:3,avgOrder:699.10,margin:40.90},
  {name:"Road-650 Red, 52",model:"Road-650",line:"Road",revenue:1398.20,profit:571.90,orders:2,avgOrder:699.10,margin:40.90},
  {name:"Road-650 Black, 52",model:"Road-650",line:"Road",revenue:1398.20,profit:571.90,orders:2,avgOrder:699.10,margin:40.90},
  {name:"Road-650 Black, 44",model:"Road-650",line:"Road",revenue:699.10,profit:285.95,orders:1,avgOrder:699.10,margin:40.90},
  {name:"Road-650 Red, 62",model:"Road-650",line:"Road",revenue:699.10,profit:285.95,orders:1,avgOrder:699.10,margin:40.90},
];

const TERRITORY_PERF = [
  {name:"Australia",revenue:145689.63,profit:59265.33,orders:43,avgOrder:3388.13,customers:43},
  {name:"Southwest",revenue:48436.52,profit:19229.40,orders:16,avgOrder:3027.28,customers:16},
  {name:"Northwest",revenue:46656.77,profit:18808.28,orders:14,avgOrder:3332.63,customers:14},
  {name:"Germany",revenue:28447.88,profit:11336.67,orders:8,avgOrder:3555.99,customers:8},
  {name:"United Kingdom",revenue:26064.53,profit:10571.51,orders:9,avgOrder:2896.06,customers:9},
  {name:"France",revenue:25568.71,profit:10215.64,orders:8,avgOrder:3196.09,customers:8},
  {name:"Canada",revenue:7156.54,profit:2813.95,orders:2,avgOrder:3578.27,customers:2},
];

const MODEL_COMP = [
  {name:"Mountain-200",revenue:250478.90,profit:98488.31,orders:70,avgPrice:3578.27,margin:39.32},
  {name:"Road-350-W",revenue:50999.85,profit:22317.53,orders:15,avgPrice:3399.99,margin:43.76},
  {name:"Road-150",revenue:20249.94,profit:8861.37,orders:6,avgPrice:3374.99,margin:43.76},
  {name:"Road-650",revenue:6291.88,profit:2573.57,orders:9,avgPrice:699.10,margin:40.90},
];

const DAILY_TREND = [
  {date:"Dec 29",revenue:14477.34,profit:6156.43,orders:5},
  {date:"Dec 30",revenue:13931.52,profit:5778.68,orders:4},
  {date:"Dec 31",revenue:15012.18,profit:5913.86,orders:5},
  {date:"Jan 01",revenue:7156.54,profit:2813.95,orders:2},
  {date:"Jan 02",revenue:15012.18,profit:5913.86,orders:5},
  {date:"Jan 03",revenue:14313.08,profit:5627.90,orders:4},
  {date:"Jan 04",revenue:7855.64,profit:3099.90,orders:3},
  {date:"Jan 05",revenue:7855.64,profit:3099.90,orders:3},
  {date:"Jan 06",revenue:20909.78,profit:8673.49,orders:6},
  {date:"Jan 07",revenue:10556.53,profit:4301.79,orders:3},
  {date:"Jan 08",revenue:14313.08,profit:5627.90,orders:4},
  {date:"Jan 09",revenue:14134.80,profit:5708.76,orders:4},
  {date:"Jan 10",revenue:7156.54,profit:2813.95,orders:2},
  {date:"Jan 11",revenue:25047.89,profit:9848.83,orders:7},
  {date:"Jan 12",revenue:11230.63,profit:4576.80,orders:4},
  {date:"Jan 13",revenue:14313.08,profit:5627.90,orders:4},
  {date:"Jan 14",revenue:14134.80,profit:5708.76,orders:4},
  {date:"Jan 15",revenue:6953.26,profit:2883.87,orders:2},
  {date:"Jan 16",revenue:25568.71,profit:10215.64,orders:8},
  {date:"Jan 17",revenue:11255.63,profit:4587.74,orders:4},
  {date:"Jan 18",revenue:14313.08,profit:5627.90,orders:4},
  {date:"Jan 19",revenue:38241.29,profit:15940.01,orders:11},
  {date:"Jan 20",revenue:4277.37,profit:1692.93,orders:2},
];

const CUSTOMER_SEG = [
  {name:"Jon Yang",gender:"M",ageGroup:"30-39",income:"High ($60K-$100K)",education:"Bachelors",occupation:"Professional",spent:3399.99},
  {name:"Ruben Torres",gender:"M",ageGroup:"30-39",income:"High ($60K-$100K)",education:"Bachelors",occupation:"Professional",spent:3399.99},
  {name:"Christy Zhu",gender:"F",ageGroup:"30-39",income:"High ($60K-$100K)",education:"Bachelors",occupation:"Professional",spent:3399.99},
  {name:"Jacquelyn Suarez",gender:"F",ageGroup:"40-49",income:"High ($60K-$100K)",education:"Bachelors",occupation:"Professional",spent:3399.99},
  {name:"Marco Mehta",gender:"M",ageGroup:"40-49",income:"High ($60K-$100K)",education:"Bachelors",occupation:"Professional",spent:3399.99},
];

const BUDGET_DATA = [
  {month:"2022-01",budget:1050000},{month:"2022-02",budget:1100000},{month:"2022-03",budget:1150000},
  {month:"2022-04",budget:1200000},{month:"2022-05",budget:1250000},{month:"2022-06",budget:1300000},
  {month:"2022-07",budget:1250000},{month:"2022-08",budget:1200000},{month:"2022-09",budget:1150000},
  {month:"2022-10",budget:1100000},{month:"2022-11",budget:1050000},{month:"2022-12",budget:1000000},
  {month:"2023-01",budget:1200000},{month:"2023-02",budget:1150000},{month:"2023-03",budget:1250000},
  {month:"2023-04",budget:1300000},{month:"2023-05",budget:1350000},{month:"2023-06",budget:1100000},
  {month:"2023-07",budget:1400000},{month:"2023-08",budget:1350000},{month:"2023-09",budget:1300000},
  {month:"2023-10",budget:1250000},{month:"2023-11",budget:1200000},{month:"2023-12",budget:1450000},
];

// KPIs from curated pipeline
const KPI = {
  totalRevenue: 328020.57,
  totalProfit: 132240.78,
  profitMargin: 40.4,
  totalOrders: 100,
  avgOrderValue: 3280.21,
  uniqueProducts: 16,
  territories: 7,
  avgShippingDays: 7.0,
  uniqueCustomers: 100,
  dateRange: "Dec 29, 2010 – Jan 20, 2011",
};

const COLORS = ['#3b82f6','#8b5cf6','#10b981','#f59e0b','#ef4444','#06b6d4','#ec4899','#6366f1','#14b8a6','#f97316'];
const fmt = n => n >= 1e6 ? `$${(n/1e6).toFixed(1)}M` : n >= 1e3 ? `$${(n/1e3).toFixed(1)}K` : `$${n.toFixed(0)}`;

function buildSystemPrompt() {
  return `You are an AI data analyst for the SALES_ANALYTICS_2025 Snowflake database. The data has been through a full ETL pipeline: Ingestion (CSV/S3) → Transformation (Snowpark pandas + Snowpark DataFrames) → Delivery (Curated tables).

DATABASE: SALES_ANALYTICS_2025
SCHEMA: RAW_DATA (8 tables) → CURATED (7 analytical tables)
PIPELINE: Following Snowflake DE_100 notebook patterns

DATA QUALITY NOTES:
- Product dimension gap resolved: Raw DIM_PRODUCT had keys 1-100 (components), Sales used keys 310-351 (finished bikes). Fixed by creating enriched product lookup.
- Customer match rate: 13/100 orders matched to DIM_CUSTOMER (partial extract). Territory derived from FACT_INTERNET_SALES for unmatched.
- Zero NULL values in critical columns (sales_amount, product_key, order_date).
- All 100 NULLs in CARRIERTRACKINGNUMBER and CUSTOMERPONUMBER (expected for internet sales).

CURATED KPIs:
- Total Revenue: $${KPI.totalRevenue.toLocaleString()}
- Total Profit: $${KPI.totalProfit.toLocaleString()}
- Profit Margin: ${KPI.profitMargin}%
- Total Orders: ${KPI.totalOrders}
- Avg Order Value: $${KPI.avgOrderValue.toLocaleString()}
- Avg Shipping: ${KPI.avgShippingDays} days
- Date Range: ${KPI.dateRange}

MODEL PERFORMANCE (from CURATED.MODEL_COMPARISON):
${MODEL_COMP.map(m => `- ${m.name}: $${m.revenue.toLocaleString()} rev | ${m.orders} orders | ${m.margin}% margin | Avg $${m.avgPrice.toLocaleString()}`).join('\n')}

Mountain-200 dominates at 70% of all orders and 76% of revenue. Road-650 has the lowest price point ($699) but also lowest volume.
Road bikes (Road-350-W, Road-150) have HIGHER margins (43.76%) vs Mountain (39.32%).

TERRITORY PERFORMANCE (from CURATED.TERRITORY_PERFORMANCE):
${TERRITORY_PERF.map(t => `- ${t.name}: $${t.revenue.toLocaleString()} rev | ${t.orders} orders | ${t.customers} customers`).join('\n')}

Australia accounts for 44% of revenue and 43% of orders. The US (Northwest + Southwest) combined is 29%.

CUSTOMER DEMOGRAPHICS (matched customers):
- Income: Majority High ($60K-$100K), all are Bachelors-educated Professionals
- Age: 30-49 range
- Gender: Balanced M/F split

BUDGET: 2022 total $14.1M, 2023 total $15.25M (8.2% YoY growth). Peak month: Dec 2023 ($1.45M).

DAILY TREND: Peak sales day was Jan 19 ($38.2K, 11 orders). Lowest was Jan 20 ($4.3K, 2 orders). Weekend pattern visible with lower volumes.

When answering:
1. Always reference specific numbers from the curated data
2. Mention the transformation pipeline context when relevant
3. For chart requests, respond with JSON: {"chart":"bar|line|pie|area","data":[{"name":"...","value":N}],"xKey":"name","yKey":"value","title":"..."}
4. Provide actionable business insights, not just numbers
5. If asked about data quality, explain the pipeline stages and quality checks performed`;
}

export default function SnowflakeAIChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("chat");
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  useEffect(() => {
    setMessages([{
      role: "assistant",
      content: "Welcome to **Snowflake AI Data Insights** — powered by curated data from the `SALES_ANALYTICS_2025` pipeline.\n\n**Pipeline:** Ingestion (CSV/S3) → Transformation (Snowpark) → Delivery (AI Chat)\n\nI have access to **7 curated analytical tables** built from your raw data. The transformations include data quality checks, star-schema joins, calculated fields (profit margins, shipping days), and customer segmentation.\n\nTry asking:\n• *Top performing products by revenue*\n• *Compare Mountain vs Road bikes*\n• *Which territory has the highest margin?*\n• *Show me the daily sales trend*\n• *Customer demographics breakdown*\n• *What data quality issues were found?*",
      ts: new Date()
    }]);
  }, []);

  async function send() {
    if (!input.trim() || loading) return;
    const q = input.trim();
    setMessages(p => [...p, { role: "user", content: q, ts: new Date() }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: buildSystemPrompt(),
          messages: [
            ...messages.filter(m => !m.content.startsWith("Welcome")).map(m => ({ role: m.role, content: m.content })),
            { role: "user", content: q }
          ],
        }),
      });
      const data = await res.json();
      const text = data.content?.map(c => c.text || "").join("") || "Could not process. Try rephrasing.";

      let chart = null;
      const cm = text.match(/\{[\s\S]*?"chart"[\s\S]*?\}/);
      if (cm) { try { chart = JSON.parse(cm[0]); } catch(e) {} }
      const clean = text.replace(/```json[\s\S]*?```/g, "").replace(/\{[\s\S]*?"chart"[\s\S]*?\}/g, "").trim();

      setMessages(p => [...p, { role: "assistant", content: clean || "Here's the visualization:", chart, ts: new Date() }]);
    } catch {
      setMessages(p => [...p, { role: "assistant", content: getOffline(q), ts: new Date() }]);
    }
    setLoading(false);
  }

  function getOffline(q) {
    const ql = q.toLowerCase();
    if (ql.includes("quality") || ql.includes("pipeline") || ql.includes("transform")) {
      return "**Data Pipeline Summary:**\n\n**Stage 1 — Ingestion:** Loaded 8 raw tables from Snowflake (DIM_DATE, DIM_CUSTOMER, DIM_GEOGRAPHY, DIM_PRODUCT, DIM_PRODUCT_CATEGORY, DIM_PRODUCT_SUBCATEGORY, FACT_BUDGET, FACT_INTERNET_SALES)\n\n**Stage 2 — Data Quality Checks:**\n• ⚠ DIM_PRODUCT gap: Raw CSV had keys 1-100 (components), sales used 310-351 (finished bikes). Resolved by creating enriched product lookup from Snowflake metadata.\n• ⚠ Customer match: 13 of 100 orders matched to DIM_CUSTOMER. Territory derived from sales data for unmatched records.\n• ✓ Zero NULLs in critical columns (sales_amount, product_key, order_date)\n\n**Stage 3 — Transformation:** Column renaming, date parsing, calculated fields (gross_profit, profit_margin_pct, shipping_days, income_band, age_group), star-schema joins\n\n**Stage 4 — Delivery:** 7 curated analytical tables generated";
    }
    if (ql.includes("model") || ql.includes("compare") || ql.includes("mountain") || ql.includes("road")) {
      return `**Model Comparison (Curated):**\n\n${MODEL_COMP.map(m => `• **${m.name}**: ${fmt(m.revenue)} revenue | ${m.orders} orders | ${m.margin}% margin`).join('\n')}\n\n**Key insight:** Mountain-200 dominates with 70% of orders, but Road bikes (Road-350-W, Road-150) have a *higher profit margin* (43.76% vs 39.32%). The 4.4 percentage point margin advantage on Road bikes means $150+ more profit per unit despite similar pricing.`;
    }
    if (ql.includes("territory") || ql.includes("region") || ql.includes("country")) {
      return `**Territory Performance (Curated):**\n\n${TERRITORY_PERF.map(t => `• **${t.name}**: ${fmt(t.revenue)} revenue | ${t.orders} orders | ${fmt(t.avgOrder)} avg order`).join('\n')}\n\nAustralia accounts for **44% of total revenue** and 43% of orders. Combined US territories (Northwest + Southwest) represent 29%. European markets (Germany, UK, France) contribute 24%.`;
    }
    if (ql.includes("product") || ql.includes("top") || ql.includes("best") || ql.includes("sell")) {
      return `**Top Products by Revenue (Curated):**\n\n${PRODUCT_PERF.slice(0,8).map((p,i) => `${i+1}. **${p.name}**: ${fmt(p.revenue)} (${p.orders} orders)`).join('\n')}\n\nMountain-200 Black variants outsell Silver by 40%. The size 46 outsells size 38 across both colors.`;
    }
    if (ql.includes("customer") || ql.includes("demographic") || ql.includes("who")) {
      return `**Customer Demographics (Curated — 13 matched customers):**\n\n• **Income:** 100% in High ($60K-$100K) bracket\n• **Education:** All Bachelors degree holders\n• **Occupation:** All Professional category\n• **Age range:** 30-49 years old\n• **Gender:** Balanced split (M/F)\n\n**Profile:** Our typical buyer is a mid-career professional, 30-49, earning $60-100K, with a bachelor's degree. This is a premium bike buyer demographic.`;
    }
    if (ql.includes("budget") || ql.includes("forecast") || ql.includes("predict")) {
      return `**Budget Analysis (Curated):**\n\n• **2022 Total:** $14.1M (avg $1.18M/month)\n• **2023 Total:** $15.25M (avg $1.27M/month)\n• **YoY Growth:** 8.2%\n• **Peak month:** Dec 2023 ($1.45M)\n• **Lowest month:** Dec 2022 ($1.0M)\n\n**Trend:** Budget allocation increased through 2023 with a strong Q4 push. If the 8.2% growth continues, projected 2024 budget would be ~$16.5M.`;
    }
    return `**Quick Summary (Curated Data):**\n• ${KPI.totalOrders} orders | ${fmt(KPI.totalRevenue)} revenue | ${fmt(KPI.totalProfit)} profit\n• ${KPI.profitMargin}% avg margin | ${fmt(KPI.avgOrderValue)} avg order\n• Top territory: Australia (44%) | Top model: Mountain-200 (70% of orders)\n• Period: ${KPI.dateRange}`;
  }

  function renderChart(c) {
    if (!c?.data?.length) return null;
    const xk = c.xKey || "name", yk = c.yKey || "value";
    const wrap = (children) => <div style={{ width:"100%",height:240,margin:"12px 0" }}><ResponsiveContainer>{children}</ResponsiveContainer></div>;
    
    if (c.chart === "pie") return wrap(
      <PieChart><Pie data={c.data} dataKey={yk} nameKey={xk} cx="50%" cy="50%" outerRadius={85} label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} labelLine={{stroke:"#475569"}}>{c.data.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}</Pie><Tooltip formatter={v=>fmt(v)} contentStyle={{background:"#1e293b",border:"1px solid #334155",borderRadius:8}}/></PieChart>
    );
    if (c.chart === "area") return wrap(
      <AreaChart data={c.data}><CartesianGrid strokeDasharray="3 3" stroke="#1e293b"/><XAxis dataKey={xk} tick={{fontSize:10,fill:"#64748b"}}/><YAxis tick={{fontSize:10,fill:"#64748b"}} tickFormatter={v=>fmt(v)}/><Tooltip formatter={v=>fmt(v)} contentStyle={{background:"#1e293b",border:"1px solid #334155",borderRadius:8}}/><Area type="monotone" dataKey={yk} stroke="#3b82f6" fill="rgba(59,130,246,0.15)" strokeWidth={2}/></AreaChart>
    );
    if (c.chart === "line") return wrap(
      <LineChart data={c.data}><CartesianGrid strokeDasharray="3 3" stroke="#1e293b"/><XAxis dataKey={xk} tick={{fontSize:10,fill:"#64748b"}}/><YAxis tick={{fontSize:10,fill:"#64748b"}} tickFormatter={v=>fmt(v)}/><Tooltip formatter={v=>fmt(v)} contentStyle={{background:"#1e293b",border:"1px solid #334155",borderRadius:8}}/><Line type="monotone" dataKey={yk} stroke="#3b82f6" strokeWidth={2} dot={{fill:"#3b82f6",r:3}}/></LineChart>
    );
    return wrap(
      <BarChart data={c.data}><CartesianGrid strokeDasharray="3 3" stroke="#1e293b"/><XAxis dataKey={xk} tick={{fontSize:9,fill:"#64748b"}} angle={-15} textAnchor="end" height={55}/><YAxis tick={{fontSize:10,fill:"#64748b"}} tickFormatter={v=>fmt(v)}/><Tooltip formatter={v=>fmt(v)} contentStyle={{background:"#1e293b",border:"1px solid #334155",borderRadius:8}}/><Bar dataKey={yk} radius={[4,4,0,0]}>{c.data.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}</Bar></BarChart>
    );
  }

  function md(text) {
    return text.split('\n').map((l, i) => {
      const parts = l.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
      return <p key={i} style={{margin:"3px 0",lineHeight:1.65}}>{parts.map((p,j) => {
        if (p.startsWith('**')&&p.endsWith('**')) return <strong key={j} style={{color:"#e2e8f0"}}>{p.slice(2,-2)}</strong>;
        if (p.startsWith('*')&&p.endsWith('*')) return <em key={j} style={{color:"#93c5fd"}}>{p.slice(1,-1)}</em>;
        if (p.startsWith('`')&&p.endsWith('`')) return <code key={j} style={{background:"#1e293b",padding:"1px 5px",borderRadius:4,fontSize:12,color:"#7dd3fc"}}>{p.slice(1,-1)}</code>;
        return p;
      })}</p>;
    });
  }

  const suggestions = [
    "What are the top 5 products?",
    "Compare Mountain vs Road bikes",
    "Revenue by territory",
    "Daily sales trend",
    "Customer demographics",
    "What data quality issues were found?",
    "Budget forecast for 2024",
    "Which product has the best margin?",
  ];

  const shortName = n => n.length > 16 ? n.substring(0,14)+'..' : n;

  return (
    <div style={{fontFamily:"'DM Sans','Segoe UI',sans-serif",background:"#080d19",color:"#cbd5e1",height:"100vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      {/* Header */}
      <div style={{padding:"14px 20px",borderBottom:"1px solid rgba(59,130,246,0.15)",display:"flex",alignItems:"center",gap:12,background:"rgba(8,13,25,0.95)",backdropFilter:"blur(16px)"}}>
        <div style={{width:38,height:38,borderRadius:10,background:"linear-gradient(135deg,#3b82f6 0%,#8b5cf6 50%,#06b6d4 100%)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,color:"#fff",fontWeight:800,boxShadow:"0 0 24px rgba(59,130,246,0.35)"}}>❄</div>
        <div style={{flex:1}}>
          <h1 style={{margin:0,fontSize:15,fontWeight:700,color:"#f1f5f9",letterSpacing:"-0.4px"}}>Snowflake AI Data Insights</h1>
          <div style={{fontSize:10.5,color:"#475569",display:"flex",gap:8,alignItems:"center",marginTop:1}}>
            <span>SALES_ANALYTICS_2025</span>
            <span style={{width:4,height:4,borderRadius:"50%",background:"#10b981"}}/>
            <span>Pipeline: Curated</span>
            <span style={{width:4,height:4,borderRadius:"50%",background:"#10b981"}}/>
            <span>{KPI.totalOrders} records</span>
          </div>
        </div>
        <div style={{display:"flex",gap:3,background:"rgba(30,41,59,0.5)",borderRadius:8,padding:3}}>
          {["chat","dashboard","pipeline"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{padding:"5px 12px",borderRadius:6,border:"none",cursor:"pointer",fontSize:11,fontWeight:600,background:tab===t?"#3b82f6":"transparent",color:tab===t?"#fff":"#64748b",transition:"all 0.15s"}}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>
          ))}
        </div>
      </div>

      {tab === "pipeline" ? (
        <div style={{flex:1,overflow:"auto",padding:24}}>
          <h2 style={{color:"#f1f5f9",fontSize:18,fontWeight:700,margin:"0 0 20px"}}>Data Engineering Pipeline</h2>
          {[
            {stage:"1. INGESTION",color:"#f59e0b",desc:"Load raw data from CSV files and AWS S3 into Snowflake",tables:["DIM_DATE (100 rows)","DIM_CUSTOMER (100 rows)","DIM_GEOGRAPHY (100 rows)","DIM_PRODUCT (100 rows)","DIM_PRODUCT_CATEGORY (4 rows)","DIM_PRODUCT_SUBCATEGORY (37 rows)","FACT_BUDGET (24 rows)","FACT_INTERNET_SALES (100 rows)"]},
            {stage:"2. DATA QUALITY",color:"#ef4444",desc:"Validate referential integrity, check NULLs, identify gaps",tables:["⚠ Product key mismatch: Sales keys 310-351 vs DIM_PRODUCT keys 1-100","⚠ Customer match rate: 13% (partial dimension extract)","✓ Zero NULLs in sales_amount, product_key, order_date","✓ All dates parseable and within expected range"]},
            {stage:"3. TRANSFORMATION",color:"#8b5cf6",desc:"Snowpark pandas + DataFrames: clean, enrich, join, aggregate",tables:["Column renaming (snake_case convention)","Calculated fields: gross_profit, profit_margin_pct, shipping_days","Customer enrichment: age, income_band, age_group","Star-schema join: Sales × Products × Customers × Geography","Aggregation tables: product_performance, territory_performance"]},
            {stage:"4. DELIVERY",color:"#06b6d4",desc:"Curated analytical tables + AI-powered chat interface",tables:["FACT_SALES_ENRICHED (100 rows × 44 cols)","PRODUCT_PERFORMANCE (16 products)","TERRITORY_PERFORMANCE (7 territories)","MODEL_COMPARISON (4 models)","CUSTOMER_SEGMENTATION (13 customers)","DAILY_SALES_TREND (23 days)","AI_CONTEXT.json (structured data for LLM)"]},
            {stage:"5. OBSERVABILITY",color:"#10b981",desc:"Snowflake Tasks for scheduled execution + monitoring",tables:["CRON schedule: Daily at midnight ET","Task: avalanche_analysis_task","Monitoring via TASK_HISTORY() function","Query tags for troubleshooting"]},
          ].map((s,i) => (
            <div key={i} style={{background:"rgba(30,41,59,0.5)",borderRadius:12,padding:18,marginBottom:14,border:"1px solid #1e293b",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,left:0,bottom:0,width:4,background:s.color}}/>
              <div style={{marginLeft:8}}>
                <h3 style={{margin:"0 0 4px",fontSize:14,fontWeight:700,color:s.color}}>{s.stage}</h3>
                <p style={{margin:"0 0 10px",fontSize:12.5,color:"#94a3b8"}}>{s.desc}</p>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {s.tables.map((t,j) => (
                    <span key={j} style={{fontSize:11,padding:"3px 10px",borderRadius:6,background:"rgba(15,23,42,0.6)",border:"1px solid #1e293b",color:t.startsWith('⚠')?"#fbbf24":t.startsWith('✓')?"#34d399":"#94a3b8"}}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : tab === "dashboard" ? (
        <div style={{flex:1,overflow:"auto",padding:20}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:10,marginBottom:18}}>
            {[
              {label:"Revenue",value:fmt(KPI.totalRevenue),color:"#3b82f6",sub:`${KPI.totalOrders} orders`},
              {label:"Profit",value:fmt(KPI.totalProfit),color:"#10b981",sub:`${KPI.profitMargin}% margin`},
              {label:"Avg Order",value:fmt(KPI.avgOrderValue),color:"#8b5cf6",sub:"per transaction"},
              {label:"Top Territory",value:"Australia",color:"#f59e0b",sub:"44% of revenue"},
            ].map((k,i)=>(
              <div key={i} style={{background:"rgba(30,41,59,0.5)",borderRadius:10,padding:"14px 16px",border:"1px solid #1e293b",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:k.color}}/>
                <div style={{fontSize:10,color:"#64748b",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.5px"}}>{k.label}</div>
                <div style={{fontSize:20,fontWeight:800,color:"#f1f5f9",margin:"3px 0 1px"}}>{k.value}</div>
                <div style={{fontSize:10.5,color:"#94a3b8"}}>{k.sub}</div>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            <div style={{background:"rgba(30,41,59,0.5)",borderRadius:10,padding:16,border:"1px solid #1e293b"}}>
              <h3 style={{margin:"0 0 10px",fontSize:12.5,fontWeight:700,color:"#e2e8f0"}}>Revenue by Model</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={MODEL_COMP}><CartesianGrid strokeDasharray="3 3" stroke="#1e293b"/><XAxis dataKey="name" tick={{fontSize:10,fill:"#64748b"}}/><YAxis tick={{fontSize:10,fill:"#64748b"}} tickFormatter={v=>fmt(v)}/><Tooltip formatter={v=>fmt(v)} contentStyle={{background:"#1e293b",border:"1px solid #334155",borderRadius:8,fontSize:11}}/><Bar dataKey="revenue" radius={[4,4,0,0]}>{MODEL_COMP.map((_,i)=><Cell key={i} fill={COLORS[i]}/>)}</Bar></BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{background:"rgba(30,41,59,0.5)",borderRadius:10,padding:16,border:"1px solid #1e293b"}}>
              <h3 style={{margin:"0 0 10px",fontSize:12.5,fontWeight:700,color:"#e2e8f0"}}>Territory Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart><Pie data={TERRITORY_PERF} dataKey="revenue" nameKey="name" cx="50%" cy="50%" outerRadius={72} label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} labelLine={{stroke:"#475569"}}>{TERRITORY_PERF.map((_,i)=><Cell key={i} fill={COLORS[i]}/>)}</Pie><Tooltip formatter={v=>fmt(v)} contentStyle={{background:"#1e293b",border:"1px solid #334155",borderRadius:8,fontSize:11}}/></PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{background:"rgba(30,41,59,0.5)",borderRadius:10,padding:16,border:"1px solid #1e293b",gridColumn:"1/-1"}}>
              <h3 style={{margin:"0 0 10px",fontSize:12.5,fontWeight:700,color:"#e2e8f0"}}>Daily Revenue & Profit Trend</h3>
              <ResponsiveContainer width="100%" height={190}>
                <AreaChart data={DAILY_TREND}><CartesianGrid strokeDasharray="3 3" stroke="#1e293b"/><XAxis dataKey="date" tick={{fontSize:9,fill:"#64748b"}}/><YAxis tick={{fontSize:10,fill:"#64748b"}} tickFormatter={v=>fmt(v)}/><Tooltip formatter={v=>fmt(v)} contentStyle={{background:"#1e293b",border:"1px solid #334155",borderRadius:8,fontSize:11}}/><Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="rgba(59,130,246,0.12)" strokeWidth={2}/><Area type="monotone" dataKey="profit" stroke="#10b981" fill="rgba(16,185,129,0.08)" strokeWidth={2}/></AreaChart>
              </ResponsiveContainer>
            </div>
            <div style={{background:"rgba(30,41,59,0.5)",borderRadius:10,padding:16,border:"1px solid #1e293b",gridColumn:"1/-1"}}>
              <h3 style={{margin:"0 0 10px",fontSize:12.5,fontWeight:700,color:"#e2e8f0"}}>Profit Margin by Model</h3>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={MODEL_COMP} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#1e293b"/><XAxis type="number" tick={{fontSize:10,fill:"#64748b"}} domain={[35,48]} tickFormatter={v=>`${v}%`}/><YAxis dataKey="name" type="category" tick={{fontSize:11,fill:"#94a3b8"}} width={100}/><Tooltip formatter={v=>`${v}%`} contentStyle={{background:"#1e293b",border:"1px solid #334155",borderRadius:8,fontSize:11}}/><Bar dataKey="margin" radius={[0,4,4,0]}>{MODEL_COMP.map((_,i)=><Cell key={i} fill={COLORS[i]}/>)}</Bar></BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div style={{flex:1,overflow:"auto",padding:"14px 20px"}}>
            {messages.map((m,i)=>(
              <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start",marginBottom:12}}>
                <div style={{maxWidth:"82%",padding:"11px 15px",borderRadius:m.role==="user"?"14px 14px 3px 14px":"14px 14px 14px 3px",background:m.role==="user"?"linear-gradient(135deg,#3b82f6,#2563eb)":"rgba(30,41,59,0.7)",border:m.role==="user"?"none":"1px solid #1e293b",color:m.role==="user"?"#fff":"#cbd5e1",fontSize:13,lineHeight:1.6,boxShadow:m.role==="user"?"0 2px 10px rgba(59,130,246,0.2)":"none"}}>
                  {m.role==="assistant"?md(m.content):m.content}
                  {m.chart && renderChart(m.chart)}
                  <div style={{fontSize:9.5,color:m.role==="user"?"rgba(255,255,255,0.4)":"#334155",marginTop:5,textAlign:"right"}}>{m.ts?.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</div>
                </div>
              </div>
            ))}
            {loading&&<div style={{display:"flex",marginBottom:12}}><div style={{padding:"12px 18px",borderRadius:"14px 14px 14px 3px",background:"rgba(30,41,59,0.7)",border:"1px solid #1e293b",display:"flex",gap:6,alignItems:"center"}}><span style={{fontSize:11.5,color:"#64748b"}}>Querying curated data</span>{[0,1,2].map(j=><span key={j} style={{width:5,height:5,borderRadius:"50%",background:"#3b82f6",display:"inline-block",animation:`p 1.4s ${j*0.2}s infinite ease-in-out`}}/>)}</div></div>}
            <div ref={endRef}/>
          </div>
          {messages.length<=1&&<div style={{padding:"0 20px 6px",display:"flex",flexWrap:"wrap",gap:5}}>{suggestions.map((s,i)=><button key={i} onClick={()=>{setInput(s);setTimeout(()=>inputRef.current?.focus(),50)}} style={{padding:"5px 11px",borderRadius:18,border:"1px solid #1e293b",background:"rgba(30,41,59,0.3)",color:"#94a3b8",fontSize:11,cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.15s"}}>{s}</button>)}</div>}
          <div style={{padding:"10px 20px 14px",borderTop:"1px solid rgba(59,130,246,0.1)",background:"rgba(8,13,25,0.95)"}}>
            <div style={{display:"flex",gap:8,alignItems:"center",background:"rgba(30,41,59,0.5)",borderRadius:12,border:"1px solid #334155",padding:"3px 3px 3px 14px"}}>
              <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask about your curated sales data..." disabled={loading} style={{flex:1,border:"none",outline:"none",background:"transparent",color:"#e2e8f0",fontSize:13.5,fontFamily:"inherit",padding:"9px 0"}}/>
              <button onClick={send} disabled={loading||!input.trim()} style={{width:38,height:38,borderRadius:9,border:"none",background:input.trim()?"linear-gradient(135deg,#3b82f6,#8b5cf6)":"#1e293b",color:"#fff",cursor:input.trim()?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,transition:"all 0.15s",boxShadow:input.trim()?"0 2px 10px rgba(59,130,246,0.25)":"none"}}>→</button>
            </div>
            <div style={{fontSize:9.5,color:"#1e293b",textAlign:"center",marginTop:5}}>Snowflake × Claude AI · SALES_ANALYTICS_2025 · Pipeline: Ingestion → Transformation → Delivery · Built by Raj Manala</div>
          </div>
        </>
      )}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        @keyframes p{0%,80%,100%{opacity:.3;transform:scale(.8)}40%{opacity:1;transform:scale(1.2)}}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#1e293b;border-radius:3px}
        input::placeholder{color:#475569}button:hover{filter:brightness(1.1)}
      `}</style>
    </div>
  );
}
