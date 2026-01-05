import axios from 'axios';
import * as cheerio from 'cheerio';

interface SilverPriceData {
  price: number;
  bid: number;
  ask: number;
  change: number;
  changePercent: number;
  dayHigh: number;
  dayLow: number;
  timestamp: number;
  dataSource: 'live' | 'cached' | 'fallback';
  error?: string;
}

/**
 * Scrape real silver spot price from JM Bullion
 */
async function scrapeJMBullion(): Promise<SilverPriceData | null> {
  try {
    const url = 'https://www.jmbullion.com/charts/silver-prices/';
    
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    
    // Find the price in the text "the live Silver spot price for 1 ounce of Silver in U.S. dollars (USD) is $76.02"
    const text = $('body').text();
    const priceMatch = text.match(/live Silver spot price for 1 ounce of Silver in U\.S\. dollars \(USD\) is \$([0-9,.]+)/i);
    
    if (!priceMatch) {
      console.error('[JMBullion] Could not find price in page');
      return null;
    }

    const price = parseFloat(priceMatch[1].replace(/,/g, ''));
    
    // Try to find change value from the table
    let change = 0;
    $('table tr').each((i, row) => {
      const cells = $(row).find('td');
      if (cells.length >= 2) {
        const label = $(cells[0]).text().trim();
        if (label.includes('Silver Price Per Ounce')) {
          const changeText = $(cells[2]).text().trim();
          const changeMatch = changeText.match(/([+-]?\$?[0-9.]+)/);
          if (changeMatch) {
            change = parseFloat(changeMatch[1].replace('$', ''));
          }
        }
      }
    });

    if (price < 10 || price > 200) {
      console.error(`[JMBullion] Invalid price: ${price}`);
      return null;
    }

    console.log(`[JMBullion] ✅ Scraped price: $${price} (change: ${change >= 0 ? '+' : ''}${change})`);

    return {
      price,
      bid: price,
      ask: price + 0.10, // Approximate spread
      change,
      changePercent: price > 0 ? (change / (price - change)) * 100 : 0,
      dayHigh: price + Math.abs(change) * 0.5,
      dayLow: price - Math.abs(change) * 0.5,
      timestamp: Date.now(),
      dataSource: 'live'
    };

  } catch (error) {
    console.error('[JMBullion] Scraping failed:', error);
    return null;
  }
}

/**
 * Scrape silver price from APMEX as backup
 */
async function scrapeAPMEX(): Promise<SilverPriceData | null> {
  try {
    const url = 'https://www.apmex.com/silver-price';
    
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    
    // Look for price in various possible locations
    let price = 0;
    
    // Try meta tags first
    const priceMetaContent = $('meta[property="og:price:amount"]').attr('content');
    if (priceMetaContent) {
      price = parseFloat(priceMetaContent);
    }
    
    // Try structured data
    if (!price) {
      $('script[type="application/ld+json"]').each((i, elem) => {
        try {
          const json = JSON.parse($(elem).html() || '{}');
          if (json.offers && json.offers.price) {
            price = parseFloat(json.offers.price);
          }
        } catch (e) {
          // Ignore JSON parse errors
        }
      });
    }

    if (price < 10 || price > 200) {
      console.error(`[APMEX] Invalid price: ${price}`);
      return null;
    }

    console.log(`[APMEX] ✅ Scraped price: $${price}`);

    return {
      price,
      bid: price,
      ask: price + 0.10,
      change: 0, // APMEX doesn't always show change
      changePercent: 0,
      dayHigh: price,
      dayLow: price,
      timestamp: Date.now(),
      dataSource: 'live'
    };

  } catch (error) {
    console.error('[APMEX] Scraping failed:', error);
    return null;
  }
}

// Cache
let cachedPrice: SilverPriceData | null = null;
let lastFetch = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get real silver spot price with caching and fallback
 */
export async function getSilverPrice(): Promise<SilverPriceData> {
  const now = Date.now();

  // Return fresh cache if available
  if (cachedPrice && (now - lastFetch) < CACHE_DURATION) {
    console.log('[SilverPrice] ✅ Returning cached price');
    return { ...cachedPrice, dataSource: 'cached' };
  }

  // Try JM Bullion first
  let priceData = await scrapeJMBullion();
  
  // Try APMEX as backup
  if (!priceData) {
    console.warn('[SilverPrice] JM Bullion failed, trying APMEX...');
    priceData = await scrapeAPMEX();
  }

  // If we got real data, cache it
  if (priceData) {
    cachedPrice = priceData;
    lastFetch = now;
    return priceData;
  }

  // Use stale cache if available
  if (cachedPrice) {
    console.warn('[SilverPrice] ⚠️  All sources failed, using stale cache');
    return { ...cachedPrice, dataSource: 'cached' };
  }

  // Last resort fallback - DO NOT USE unless absolutely necessary
  console.error('[SilverPrice] ❌ All sources failed and no cache available');
  throw new Error('Unable to fetch silver price from any source');
}
