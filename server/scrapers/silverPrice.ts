import axios from 'axios';

interface SilverPriceData {
  price: number;
  change: number;
  changePercent: number;
  timestamp: number;
  dataSource: 'live' | 'cached' | 'fallback';
  error?: string;
}

// Cache for silver price data
let priceCache: SilverPriceData | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get silver price from Yahoo Finance API (more reliable than scraping)
 */
async function getYahooFinancePrice(): Promise<SilverPriceData | null> {
  try {
    // Yahoo Finance API for silver futures (SI=F)
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/SI=F?interval=1d&range=5d`;
    
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const data = response.data;
    const result = data?.chart?.result?.[0];
    
    if (!result) {
      console.error('[Yahoo] No result data');
      return null;
    }

    const meta = result.meta;
    const currentPrice = meta.regularMarketPrice;
    const previousClose = meta.chartPreviousClose || meta.previousClose;
    
    if (!currentPrice || !previousClose) {
      console.error('[Yahoo] Missing price data');
      return null;
    }

    const change = currentPrice - previousClose;
    const changePercent = (change / previousClose) * 100;

    // Validate price is reasonable
    if (currentPrice < 10 || currentPrice > 200) {
      console.error(`[Yahoo] Invalid price: ${currentPrice}`);
      return null;
    }

    return {
      price: Number(currentPrice.toFixed(2)),
      change: Number(change.toFixed(2)),
      changePercent: Number(changePercent.toFixed(2)),
      timestamp: Date.now(),
      dataSource: 'live'
    };
  } catch (error) {
    console.error('[Yahoo] Error fetching price:', error);
    return null;
  }
}

/**
 * Get current silver spot price with caching and fallback
 */
export async function getSilverPrice(): Promise<SilverPriceData> {
  const now = Date.now();
  
  // Return fresh cache if available
  if (priceCache && (now - lastFetchTime) < CACHE_DURATION) {
    return { ...priceCache, dataSource: 'cached' };
  }

  // Try to fetch fresh data
  const freshData = await getYahooFinancePrice();
  
  if (freshData) {
    priceCache = freshData;
    lastFetchTime = now;
    console.log(`[SilverPrice] Fresh data: $${freshData.price}`);
    return freshData;
  }

  // Return stale cache if available
  if (priceCache) {
    console.warn('[SilverPrice] Using stale cache');
    return { ...priceCache, dataSource: 'cached' };
  }

  // Final fallback
  console.error('[SilverPrice] All sources failed, using fallback');
  return {
    price: 76.03,
    change: 2.78,
    changePercent: 3.79,
    timestamp: now,
    dataSource: 'fallback',
    error: 'All data sources unavailable'
  };
}
