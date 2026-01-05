import axios from 'axios';
import * as cheerio from 'cheerio';

interface SilverPriceData {
  bid: number;
  ask: number;
  change: number;
  changePercent: number;
  dayHigh: number;
  dayLow: number;
  lastUpdate: Date;
  dataSource: 'live' | 'cached' | 'fallback';
  error?: string;
}

/**
 * Scrape silver spot price from Kitco
 */
export async function scrapeSilverPrice(): Promise<SilverPriceData> {
  try {
    const url = 'https://www.kitco.com/charts/livesilver.html';
    
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);

    // Extract bid price (main price displayed)
    let bid = 0;
    let ask = 0;
    let change = 0;
    let changePercent = 0;
    let dayHigh = 0;
    let dayLow = 0;

    // Try to find the bid price - look for the large price display
    const bidText = $('h3').first().text().trim();
    bid = parseFloat(bidText.replace(/[^0-9.]/g, ''));

    // Look for change value (usually in format "+1.23 (+1.72%)")
    $('h3').each((i, elem) => {
      const text = $(elem).text();
      if (text.includes('+') || text.includes('-')) {
        const matches = text.match(/([+-]?[\d.]+)\s*\(([+-]?[\d.]+)%\)/);
        if (matches) {
          change = parseFloat(matches[1]);
          changePercent = parseFloat(matches[2]);
        }
      }
    });

    // Look for day's range
    const rangeText = $('.range, [class*="range"]').text() || '';
    const rangeMatch = rangeText.match(/([\d.]+)\s*([\d.]+)/);
    if (rangeMatch) {
      dayLow = parseFloat(rangeMatch[1]);
      dayHigh = parseFloat(rangeMatch[2]);
    }

    // Ask is typically bid + small spread
    ask = bid + 0.12; // Typical spread for silver

    // Validate we got reasonable data
    if (!bid || bid < 10 || bid > 200) {
      throw new Error(`Invalid bid price: ${bid}`);
    }

    console.log(`[Kitco] ✅ Scraped silver price - Bid: $${bid}, Change: ${change} (${changePercent}%)`);

    return {
      bid,
      ask,
      change,
      changePercent,
      dayHigh: dayHigh || bid + 2,
      dayLow: dayLow || bid - 2,
      lastUpdate: new Date(),
      dataSource: 'live'
    };

  } catch (error) {
    console.error('[Kitco] Error scraping silver price:', error);
    console.warn('[Kitco] ⚠️  Using fallback data - scraping failed');
    
    // Return fallback data with error indicator
    return {
      bid: 72.77,
      ask: 72.89,
      change: 1.23,
      changePercent: 1.72,
      dayHigh: 74.59,
      dayLow: 71.23,
      lastUpdate: new Date(),
      dataSource: 'fallback',
      error: error instanceof Error ? error.message : 'Failed to scrape price data'
    };
  }
}

// Alternative scraper using a different source
export async function scrapeSilverPriceFromApmex(): Promise<SilverPriceData> {
  try {
    const url = 'https://www.apmex.com/silver-price';
    
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);

    // APMEX has spot price in specific elements
    let bid = 0;
    
    // Look for price elements
    $('.spot-price, [data-price], .price-value').each((i, elem) => {
      const text = $(elem).text().trim();
      const price = parseFloat(text.replace(/[^0-9.]/g, ''));
      if (price > 10 && price < 200) {
        bid = price;
        return false; // break
      }
    });

    if (bid === 0) {
      throw new Error('Could not find price on APMEX');
    }

    console.log(`[APMEX] Scraped silver price - Bid: $${bid}`);

    return {
      bid,
      ask: bid + 0.12,
      change: 0,
      changePercent: 0,
      dayHigh: bid + 2,
      dayLow: bid - 2,
      lastUpdate: new Date(),
      dataSource: 'live'
    };

  } catch (error) {
    console.error('[APMEX] Error scraping silver price:', error);
    throw error;
  }
}

// Cache
let cachedPrice: SilverPriceData | null = null;
let lastFetch: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getSilverPrice(): Promise<SilverPriceData> {
  const now = Date.now();
  
  if (cachedPrice && (now - lastFetch) < CACHE_DURATION) {
    console.log('[Silver Price] Returning cached data');
    return {
      ...cachedPrice,
      dataSource: 'cached'
    };
  }

  try {
    // Try Kitco first
    cachedPrice = await scrapeSilverPrice();
  } catch (error) {
    console.log('[Silver Price] Kitco failed, trying APMEX...');
    try {
      cachedPrice = await scrapeSilverPriceFromApmex();
    } catch (error2) {
      console.error('[Silver Price] All sources failed');
      // Return last cached data or fallback
      if (cachedPrice) return cachedPrice;
      throw error2;
    }
  }

  lastFetch = now;
  return cachedPrice;
}
