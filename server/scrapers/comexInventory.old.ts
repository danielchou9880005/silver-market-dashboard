import axios from 'axios';
import * as XLSX from 'xlsx';

interface ComexInventoryData {
  registered: number;
  eligible: number;
  total: number;
  lastUpdate: Date;
  dataSource: 'live' | 'cached' | 'fallback';
  error?: string;
}

/**
 * Scrape COMEX silver inventory data from CME Group
 * Returns only REGISTERED inventory (available for delivery)
 */
export async function scrapeComexInventory(): Promise<ComexInventoryData> {
  try {
    const url = 'https://www.cmegroup.com/delivery_reports/Silver_stocks.xls';
    
    // Download the Excel file
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    // Parse Excel file
    const workbook = XLSX.read(response.data, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON with header row
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' }) as any[][];

    let totalRegistered = 0;
    let totalEligible = 0;
    let foundData = false;

    console.log('[COMEX] Parsing Excel file...');

    // The structure is:
    // DEPOSITORY NAME
    // Registered    [prev] [received] [withdrawn] [net change] [adjustment] [TOTAL TODAY]
    // Eligible      [prev] [received] [withdrawn] [net change] [adjustment] [TOTAL TODAY]
    // Total         ...
    
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      if (!row || row.length === 0) continue;

      const firstCell = String(row[0] || '').trim();
      
      // Look for "Registered" rows
      if (firstCell.toLowerCase() === 'registered') {
        // The last column (index 6) should have "TOTAL TODAY"
        const totalToday = row[6];
        if (totalToday) {
          const value = parseFloat(String(totalToday).replace(/,/g, ''));
          if (!isNaN(value) && value > 0) {
            totalRegistered += value;
            foundData = true;
            console.log(`[COMEX] Found Registered: ${value.toLocaleString()} oz`);
          }
        }
      }
      
      // Look for "Eligible" rows
      if (firstCell.toLowerCase() === 'eligible') {
        const totalToday = row[6];
        if (totalToday) {
          const value = parseFloat(String(totalToday).replace(/,/g, ''));
          if (!isNaN(value) && value > 0) {
            totalEligible += value;
            console.log(`[COMEX] Found Eligible: ${value.toLocaleString()} oz`);
          }
        }
      }

      // Also look for grand total rows
      if (firstCell.toLowerCase().includes('total') && firstCell.toLowerCase().includes('registered')) {
        const totalValue = row[1] || row[6];
        if (totalValue) {
          const value = parseFloat(String(totalValue).replace(/,/g, ''));
          if (!isNaN(value) && value > 1000000) { // Should be millions
            totalRegistered = value;
            foundData = true;
            console.log(`[COMEX] Found Grand Total Registered: ${value.toLocaleString()} oz`);
          }
        }
      }
    }

    if (!foundData) {
      throw new Error('Could not parse COMEX inventory data');
    }

    // Convert from troy ounces to millions of ounces
    const registeredMoz = totalRegistered / 1_000_000;
    const eligibleMoz = totalEligible / 1_000_000;
    const totalMoz = registeredMoz + eligibleMoz;

    console.log(`[COMEX] Total Registered: ${registeredMoz.toFixed(2)}M oz`);
    console.log(`[COMEX] Total Eligible: ${eligibleMoz.toFixed(2)}M oz`);

    // Sanity check - registered should be between 10M and 200M oz
    if (registeredMoz < 10 || registeredMoz > 200) {
      throw new Error(`Registered inventory ${registeredMoz}M oz is out of expected range`);
    }

    return {
      registered: registeredMoz,
      eligible: eligibleMoz,
      total: totalMoz,
      lastUpdate: new Date(),
      dataSource: 'live'
    };

  } catch (error) {
    console.error('[COMEX] Error scraping inventory:', error);
    console.warn('[COMEX] ⚠️  Using fallback data - scraping failed');
    
    // Return fallback data with error indicator
    return {
      registered: 30.2, // Last known value from market reports
      eligible: 290.0,
      total: 320.2,
      lastUpdate: new Date(),
      dataSource: 'fallback',
      error: error instanceof Error ? error.message : 'Failed to scrape COMEX data'
    };
  }
}

// Cache to avoid hammering the server
let cachedData: ComexInventoryData | null = null;
let lastFetch: number = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export async function getComexInventory(): Promise<ComexInventoryData> {
  const now = Date.now();
  
  if (cachedData && (now - lastFetch) < CACHE_DURATION) {
    console.log('[COMEX] Returning cached data');
    return {
      ...cachedData,
      dataSource: 'cached'
    };
  }

  cachedData = await scrapeComexInventory();
  lastFetch = now;
  return cachedData;
}
