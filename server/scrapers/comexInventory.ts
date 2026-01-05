import axios from 'axios';
import * as XLSX from 'xlsx';

interface ComexInventoryData {
  registered: number; // Million oz
  eligible: number; // Million oz
  total: number; // Million oz
  timestamp: number;
  dataSource: 'live' | 'cached' | 'fallback';
  reportDate?: string;
}

/**
 * Scrape COMEX silver inventory from CME Group Excel file
 */
async function scrapeComexInventory(): Promise<ComexInventoryData | null> {
  try {
    const url = 'https://www.cmegroup.com/delivery_reports/Silver_stocks.xls';
    
    console.log('[COMEX] Downloading Excel file...');
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 30000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    console.log('[COMEX] Parsing Excel file...');
    const workbook = XLSX.read(response.data, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON to make parsing easier
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
    
    let totalRegistered = 0;
    let totalEligible = 0;
    let reportDate = '';
    
    // Find report date
    for (const row of data) {
      const text = row.join(' ');
      if (text.includes('Report Date:')) {
        const match = text.match(/Report Date:\s*([0-9\/]+)/);
        if (match) {
          reportDate = match[1];
        }
      }
    }
    
    // Parse inventory data
    // Look for rows with "Registered" or "Eligible" in them
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      if (!row || row.length < 2) continue;
      
      const firstCol = String(row[0] || '').trim();
      
      // Check if this is a "Registered" row
      if (firstCol === 'Registered') {
        // The last column should be "TOTAL TODAY"
        // Find the rightmost number that looks like an inventory value
        for (let j = row.length - 1; j >= 0; j--) {
          const val = row[j];
          if (typeof val === 'number' && val > 100000) {
            totalRegistered += val;
            console.log(`[COMEX] Found Registered: ${val.toLocaleString()} oz`);
            break;
          }
        }
      }
      
      // Check if this is an "Eligible" row
      if (firstCol === 'Eligible') {
        for (let j = row.length - 1; j >= 0; j--) {
          const val = row[j];
          if (typeof val === 'number' && val > 100000) {
            totalEligible += val;
            console.log(`[COMEX] Found Eligible: ${val.toLocaleString()} oz`);
            break;
          }
        }
      }
    }
    
    // Validate the data
    if (totalRegistered < 1000000 || totalRegistered > 500000000) {
      console.error(`[COMEX] Invalid registered inventory: ${totalRegistered}`);
      return null;
    }
    
    // Convert to millions
    const registeredM = totalRegistered / 1000000;
    const eligibleM = totalEligible / 1000000;
    const totalM = registeredM + eligibleM;
    
    console.log(`[COMEX] ✅ Total Registered: ${registeredM.toFixed(2)}M oz`);
    console.log(`[COMEX] ✅ Total Eligible: ${eligibleM.toFixed(2)}M oz`);
    console.log(`[COMEX] ✅ Report Date: ${reportDate}`);
    
    return {
      registered: registeredM,
      eligible: eligibleM,
      total: totalM,
      timestamp: Date.now(),
      dataSource: 'live',
      reportDate
    };
    
  } catch (error) {
    console.error('[COMEX] Scraping failed:', error);
    return null;
  }
}

// Cache
let cachedInventory: ComexInventoryData | null = null;
let lastFetch = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour (inventory updates once per day)

/**
 * Get COMEX inventory with caching
 */
export async function getComexInventory(): Promise<ComexInventoryData> {
  const now = Date.now();

  // Return fresh cache
  if (cachedInventory && (now - lastFetch) < CACHE_DURATION) {
    console.log('[COMEX] ✅ Returning cached inventory');
    return { ...cachedInventory, dataSource: 'cached' };
  }

  // Try to fetch fresh data
  const inventoryData = await scrapeComexInventory();
  
  if (inventoryData) {
    cachedInventory = inventoryData;
    lastFetch = now;
    return inventoryData;
  }

  // Use stale cache if available
  if (cachedInventory) {
    console.warn('[COMEX] ⚠️  Scraping failed, using stale cache');
    return { ...cachedInventory, dataSource: 'cached' };
  }

  // Last resort - throw error instead of using fake fallback data
  console.error('[COMEX] ❌ No data available');
  throw new Error('Unable to fetch COMEX inventory data');
}
