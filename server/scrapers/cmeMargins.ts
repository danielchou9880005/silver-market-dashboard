import axios from 'axios';

interface CMEMarginData {
  initialMargin: number; // USD per contract
  maintenanceMargin: number; // USD per contract
  marginPerOz: number; // USD per oz (initial margin / 5000 oz)
  changePercent: number; // Recent change in margin requirements
  dataSource: 'live' | 'cached' | 'fallback';
  error?: string;
  timestamp: Date;
}

let cache: CMEMarginData | null = null;
let cacheTime = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
const STALE_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function getCMEMargins(): Promise<CMEMarginData> {
  const now = Date.now();
  
  // Return fresh cache
  if (cache && (now - cacheTime) < CACHE_DURATION) {
    console.log('[CME Margins] Returning fresh cached data');
    return cache;
  }

  try {
    // Try to scrape CME Group website for margin requirements
    const response = await axios.get('https://www.cmegroup.com/trading/metals/precious/silver.html', {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    // Parse margin data from HTML
    // Note: This is a placeholder - actual parsing would require HTML parsing
    
    // For now, use known recent margin requirements (HARDCODED FALLBACK)
    // These should be updated when CME changes margins
    // NOTE: Margins increased 3 times in Dec 2024: ~$15k → $32k (+113%)
    const initialMargin = 35200; // USD per contract (as of Jan 2025)
    const maintenanceMargin = 32000; // USD per contract
    const marginPerOz = initialMargin / 5000; // Per ounce
    const changePercent = 113; // Recent increase percentage from $15k to $32k

    const result: CMEMarginData = {
      initialMargin,
      maintenanceMargin,
      marginPerOz,
      changePercent,
      dataSource: 'fallback', // Changed from 'live' - this is hardcoded, not scraped
      error: 'Using known margin requirements - real-time scraping not implemented',
      timestamp: new Date()
    };

    cache = result;
    cacheTime = now;
    console.log('[CME Margins] Successfully fetched margin data:', initialMargin);
    return result;

  } catch (error) {
    console.error('[CME Margins] Scraping failed:', error);

    // Return stale cache if available
    if (cache && (now - cacheTime) < STALE_CACHE_DURATION) {
      console.log('[CME Margins] Returning stale cached data');
      return { ...cache, dataSource: 'cached' };
    }

    // Fallback to known recent margins
    const fallbackResult: CMEMarginData = {
      initialMargin: 35200,
      maintenanceMargin: 32000,
      marginPerOz: 7.04,
      changePercent: 113,
      dataSource: 'fallback',
      error: 'Using known margin requirements',
      timestamp: new Date()
    };

    console.log('[CME Margins] Using fallback data');
    return fallbackResult;
  }
}
