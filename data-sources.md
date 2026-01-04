# Silver Market Data Sources

## Data Sources to Scrape

### 1. COMEX Silver Inventory
- **URL**: https://www.cmegroup.com/delivery_reports/Silver_stocks.xls
- **Format**: Excel file (can be parsed as CSV)
- **Data**: Registered and Eligible silver inventory by depository
- **Update Frequency**: Daily
- **Current Total Registered**: ~102M oz (as of 1/2/2026)

### 2. Silver Spot Price
- **Primary**: https://www.jmbullion.com/charts/silver-prices/
- **Alternative**: https://www.apmex.com/silver-price
- **Alternative**: https://www.kitco.com/charts/livesilver.html
- **Data**: Current spot price in USD/oz
- **Update Frequency**: Real-time during market hours

### 3. Shanghai Silver Price
- **URL**: https://en.sge.com.cn/h5_data_SilverBenchmarkPrice
- **Data**: Shanghai Gold Exchange silver benchmark price
- **Update Frequency**: Daily benchmark auctions
- **Use**: Calculate Shanghai premium over COMEX

### 4. CME Margin Requirements
- **URL**: https://www.cmegroup.com/trading/metals/precious/silver.html
- **Data**: Initial margin and maintenance margin for silver futures
- **Update Frequency**: As changed (monitor for increases)

### 5. Silver News
- **Primary**: https://www.kitco.com/news/silver/
- **Alternative**: https://www.reuters.com/markets/commodities/
- **Data**: Latest silver market news and analysis
- **Update Frequency**: Multiple times daily

## Implementation Plan

1. Create server-side scrapers for each data source
2. Add caching to avoid rate limiting
3. Update tRPC endpoints to return real data
4. Add error handling for failed scrapes
5. Implement fallback data sources
