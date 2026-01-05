/**
 * Direct Yahoo Finance API integration (no API key required)
 * Uses Yahoo's public chart API endpoint
 */

interface YahooChartResponse {
  chart: {
    result: Array<{
      meta: {
        regularMarketPrice: number;
        previousClose: number;
        symbol: string;
      };
      timestamp: number[];
      indicators: {
        quote: Array<{
          close: number[];
          open: number[];
          high: number[];
          low: number[];
          volume: number[];
        }>;
      };
    }>;
    error: any;
  };
}

export interface HistoricalPrice {
  timestamp: number;
  price: number;
  open: number;
  high: number;
  low: number;
  volume: number;
}

export async function getYahooFinanceChart(
  symbol: string,
  range: string = "1mo",
  interval: string = "1d"
): Promise<{
  currentPrice: number;
  previousClose: number;
  historicalPrices: HistoricalPrice[];
}> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=${range}&interval=${interval}`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Yahoo Finance API returned ${response.status}`);
    }

    const data: YahooChartResponse = await response.json();

    if (data.chart.error) {
      throw new Error(`Yahoo Finance error: ${data.chart.error.description}`);
    }

    const result = data.chart.result[0];
    if (!result) {
      throw new Error("No data returned from Yahoo Finance");
    }

    const timestamps = result.timestamp || [];
    const quotes = result.indicators.quote[0];
    
    const historicalPrices: HistoricalPrice[] = timestamps.map((ts, i) => ({
      timestamp: ts * 1000, // Convert to milliseconds
      price: quotes.close[i] || 0,
      open: quotes.open[i] || 0,
      high: quotes.high[i] || 0,
      low: quotes.low[i] || 0,
      volume: quotes.volume[i] || 0,
    })).filter(p => p.price > 0); // Filter out invalid data points

    return {
      currentPrice: result.meta.regularMarketPrice,
      previousClose: result.meta.previousClose,
      historicalPrices,
    };
  } catch (error) {
    console.error(`Error fetching Yahoo Finance data for ${symbol}:`, error);
    throw error;
  }
}

export async function getMultipleSymbols(
  symbols: string[],
  range: string = "1d",
  interval: string = "1d"
): Promise<Map<string, HistoricalPrice[]>> {
  const results = new Map<string, HistoricalPrice[]>();

  await Promise.all(
    symbols.map(async (symbol) => {
      try {
        const data = await getYahooFinanceChart(symbol, range, interval);
        results.set(symbol, data.historicalPrices);
      } catch (error) {
        console.error(`Failed to fetch ${symbol}:`, error);
        results.set(symbol, []);
      }
    })
  );

  return results;
}
