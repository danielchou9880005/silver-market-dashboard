// Template news items for dynamic generation
export interface NewsTemplate {
  title: string;
  summary: string;
  confidence: "high" | "medium" | "low";
  source: string;
  sourceUrl?: string;
  impact: "bullish" | "bearish" | "neutral";
}

export const newsTemplates: NewsTemplate[] = [
  // Bullish news
  {
    title: "COMEX Silver Inventories Hit New Low",
    summary: "Registered silver inventories at COMEX drop to fresh multi-year lows as physical demand continues to exceed supply.",
    confidence: "high",
    source: "COMEX Warehouse Reports",
    sourceUrl: "https://www.cmegroup.com/markets/metals/precious/silver.html",
    impact: "bullish"
  },
  {
    title: "Major Bank Raises Silver Price Target",
    summary: "Leading investment bank increases 12-month silver price forecast citing supply constraints and industrial demand.",
    confidence: "high",
    source: "Investment Bank Research",
    sourceUrl: "https://www.kitco.com/news/silver/",
    impact: "bullish"
  },
  {
    title: "Solar Panel Demand Drives Silver Consumption",
    summary: "Global solar panel manufacturing surge leads to record silver consumption in photovoltaic applications.",
    confidence: "high",
    source: "Silver Institute",
    sourceUrl: "https://www.silverinstitute.org/",
    impact: "bullish"
  },
  {
    title: "Retail Investors Increase Silver Holdings",
    summary: "Retail demand for physical silver reaches highest level in 18 months as investors seek inflation hedge.",
    confidence: "medium",
    source: "Bullion Dealer Reports",
    impact: "bullish"
  },
  {
    title: "Mining Strike Disrupts Silver Production",
    summary: "Labor dispute at major South American silver mine threatens to reduce global supply by 2-3%.",
    confidence: "medium",
    source: "Mining News Network",
    impact: "bullish"
  },
  {
    title: "Central Bank Adds Silver to Reserves",
    summary: "Emerging market central bank announces addition of silver to strategic reserves for first time.",
    confidence: "medium",
    source: "Central Bank Statement",
    impact: "bullish"
  },
  {
    title: "EV Battery Breakthrough Requires More Silver",
    summary: "New solid-state battery technology shows 40% increase in silver content per unit compared to current designs.",
    confidence: "medium",
    source: "Battery Technology Journal",
    impact: "bullish"
  },
  {
    title: "Shanghai Premium Widens Further",
    summary: "Physical silver premium in Shanghai expands as Chinese buyers compete for limited available supply.",
    confidence: "high",
    source: "Shanghai Gold Exchange",
    impact: "bullish"
  },
  {
    title: "Silver ETF Sees Record Inflows",
    summary: "Major silver ETF reports largest single-day inflow in 6 months as institutional interest grows.",
    confidence: "high",
    source: "ETF Provider Data",
    impact: "bullish"
  },
  {
    title: "Industrial Silver Demand Exceeds Forecasts",
    summary: "Q1 industrial silver consumption surpasses analyst estimates by 15% driven by electronics and 5G infrastructure.",
    confidence: "high",
    source: "Metals Focus Report",
    impact: "bullish"
  },
  
  // Bearish news
  {
    title: "Dollar Strength Pressures Silver Prices",
    summary: "US Dollar index rallies to multi-week highs, creating headwinds for precious metals including silver.",
    confidence: "high",
    source: "Currency Markets",
    impact: "bearish"
  },
  {
    title: "New Silver Mine Comes Online",
    summary: "Major mining company announces successful commissioning of new silver mine with annual capacity of 15M oz.",
    confidence: "high",
    source: "Mining Company Press Release",
    impact: "bearish"
  },
  {
    title: "Profit-Taking Hits Silver Markets",
    summary: "Technical traders book profits after recent rally, triggering short-term price consolidation.",
    confidence: "medium",
    source: "Trading Desk Reports",
    impact: "bearish"
  },
  {
    title: "Industrial Demand Concerns Emerge",
    summary: "Slower than expected manufacturing PMI data raises questions about near-term industrial silver consumption.",
    confidence: "medium",
    source: "Economic Data",
    impact: "bearish"
  },
  {
    title: "Silver Recycling Rates Increase",
    summary: "Higher prices incentivize increased silver recycling from industrial scrap and electronic waste.",
    confidence: "medium",
    source: "Recycling Industry Data",
    impact: "bearish"
  },
  
  // Neutral/Mixed news
  {
    title: "Analysts Divided on Silver Outlook",
    summary: "Market analysts show mixed views on silver direction with bullish and bearish cases both gaining support.",
    confidence: "medium",
    source: "Analyst Survey",
    impact: "neutral"
  },
  {
    title: "Silver Market Consolidates in Range",
    summary: "Silver prices trade sideways as market participants await fresh catalysts and directional clarity.",
    confidence: "high",
    source: "Market Analysis",
    impact: "neutral"
  },
  {
    title: "Options Activity Suggests Uncertainty",
    summary: "Silver options market shows elevated implied volatility but no clear directional bias from positioning.",
    confidence: "medium",
    source: "Options Market Data",
    impact: "neutral"
  },
  
  // High-impact events
  {
    title: "Fed Policy Decision Impacts Silver",
    summary: "Federal Reserve monetary policy announcement influences precious metals sentiment and positioning.",
    confidence: "high",
    source: "Federal Reserve",
    impact: "neutral"
  },
  {
    title: "Geopolitical Tensions Boost Safe Haven Demand",
    summary: "Rising international tensions drive investors toward precious metals as portfolio insurance.",
    confidence: "high",
    source: "International News",
    impact: "bullish"
  },
  {
    title: "China Manufacturing Data Beats Expectations",
    summary: "Stronger Chinese industrial output supports silver demand outlook from world's largest manufacturer.",
    confidence: "high",
    source: "China National Bureau of Statistics",
    impact: "bullish"
  },
  {
    title: "Silver Warehouse Stocks Show Unusual Activity",
    summary: "Large movements in COMEX warehouse stocks spark speculation about supply dynamics and delivery intentions.",
    confidence: "medium",
    source: "Warehouse Monitoring",
    impact: "bullish"
  },
  {
    title: "Hedge Fund Increases Silver Long Position",
    summary: "Major commodity hedge fund reportedly builds significant long position in silver futures and options.",
    confidence: "low",
    source: "Trading Sources",
    impact: "bullish"
  },
  {
    title: "Silver-Gold Ratio Reaches Key Technical Level",
    summary: "Silver-gold ratio tests important support/resistance level watched by technical traders and chartists.",
    confidence: "medium",
    source: "Technical Analysis",
    impact: "neutral"
  },
  {
    title: "Jewelry Demand Shows Seasonal Strength",
    summary: "Silver jewelry demand picks up ahead of wedding season in key Asian markets.",
    confidence: "medium",
    source: "Jewelry Industry Reports",
    impact: "bullish"
  }
];

// Function to get a random news template
export function getRandomNewsTemplate(): NewsTemplate {
  const randomIndex = Math.floor(Math.random() * newsTemplates.length);
  return newsTemplates[randomIndex];
}
