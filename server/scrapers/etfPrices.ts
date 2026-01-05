import axios from 'axios';

interface ETFPriceData {
  slvPrice: number;
  sivrPrice: number;
  slvChange: number;
  sivrChange: number;
  divergence: number; // Percentage difference between SLV and SIVR
  dataSource: 'live' | 'cached' | 'fallback';
  error?: string;
  timestamp: Date;
}

let cache: ETFPriceData | null = null;
let cacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const STALE_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function getETFPrices(): Promise<ETFPriceData> {
  const now = Date.now();
  
  // Return fresh cache
  if (cache && (now - cacheTime) < CACHE_DURATION) {
    console.log('[ETF] Returning fresh cached data');
    return cache;
  }

  try {
    // Fetch SLV price from Yahoo Finance
    const slvResponse = await axios.get('https://query1.finance.yahoo.com/v8/finance/chart/SLV', {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    // Fetch SIVR price from Yahoo Finance
    const sivrResponse = await axios.get('https://query1.finance.yahoo.com/v8/finance/chart/SIVR', {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const slvData = slvResponse.data.chart.result[0];
    const sivrData = sivrResponse.data.chart.result[0];

    const slvPrice = slvData.meta.regularMarketPrice;
    const slvPrevClose = slvData.meta.previousClose;
    const slvChange = slvPrice - slvPrevClose;

    const sivrPrice = sivrData.meta.regularMarketPrice;
    const sivrPrevClose = sivrData.meta.previousClose;
    const sivrChange = sivrPrice - sivrPrevClose;

    // Calculate divergence (should be minimal for similar ETFs)
    const divergence = ((slvPrice - sivrPrice) / sivrPrice) * 100;

    // Validate data
    if (slvPrice < 10 || slvPrice > 200 || sivrPrice < 10 || sivrPrice > 200) {
      throw new Error('Invalid ETF price data');
    }

    const result: ETFPriceData = {
      slvPrice,
      sivrPrice,
      slvChange,
      sivrChange,
      divergence,
      dataSource: 'live',
      timestamp: new Date()
    };

    cache = result;
    cacheTime = now;
    console.log('[ETF] Successfully scraped prices - SLV:', slvPrice, 'SIVR:', sivrPrice);
    return result;

  } catch (error) {
    console.error('[ETF] Scraping failed:', error);

    // Return stale cache if available
    if (cache && (now - cacheTime) < STALE_CACHE_DURATION) {
      console.log('[ETF] Returning stale cached data');
      return { ...cache, dataSource: 'cached' };
    }

    // Fallback data
    const fallbackResult: ETFPriceData = {
      slvPrice: 22.50,
      sivrPrice: 22.45,
      slvChange: 0.15,
      sivrChange: 0.14,
      divergence: 0.22,
      dataSource: 'fallback',
      error: 'Using fallback ETF prices',
      timestamp: new Date()
    };

    console.log('[ETF] Using fallback data');
    return fallbackResult;
  }
}
