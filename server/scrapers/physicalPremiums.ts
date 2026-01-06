import axios from 'axios';
import * as cheerio from 'cheerio';

interface PremiumData {
  premium: number;
  dataSource: 'live' | 'fallback';
  error?: string;
  timestamp: Date;
}

/**
 * Scrape APMEX for physical silver premium
 * They explicitly state "As low as $X.XX per round over spot"
 */
async function scrapeAPMEX(): Promise<number | null> {
  try {
    const response = await axios.get(
      'https://www.apmex.com/product/23/1-oz-silver-round-secondary-market',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 10000
      }
    );

    const $ = cheerio.load(response.data);
    
    // Look for text like "As low as $7.49 per round over spot"
    const bodyText = $('body').text();
    const premiumMatch = bodyText.match(/As low as \$(\d+\.?\d*) per round over spot/i);
    
    if (premiumMatch && premiumMatch[1]) {
      const premium = parseFloat(premiumMatch[1]);
      if (!isNaN(premium) && premium > 0 && premium < 50) {
        console.log(`APMEX premium: $${premium}`);
        return premium;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error scraping APMEX:', error);
    return null;
  }
}

/**
 * Scrape JM Bullion for physical silver premium
 * Calculate from: Lowest Product Price - Spot Price
 */
async function scrapeJMBullion(): Promise<number | null> {
  try {
    const response = await axios.get(
      'https://www.jmbullion.com/silver/silver-rounds/1-oz-silver-rounds/',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 10000
      }
    );

    const $ = cheerio.load(response.data);
    
    // Get spot price from header
    const spotText = $('a:contains("Silver Ask")').text();
    const spotMatch = spotText.match(/\$(\d+\.?\d*)/);
    
    if (!spotMatch) {
      console.error('Could not find JM Bullion spot price');
      return null;
    }
    
    const spotPrice = parseFloat(spotMatch[1]);
    
    // Find lowest product price
    let lowestPrice = Infinity;
    $('body').text().match(/As Low As:\s*\$(\d+\.?\d*)/gi)?.forEach(match => {
      const priceMatch = match.match(/\$(\d+\.?\d*)/);
      if (priceMatch) {
        const price = parseFloat(priceMatch[1]);
        if (price < lowestPrice && price > spotPrice) {
          lowestPrice = price;
        }
      }
    });
    
    if (lowestPrice !== Infinity && !isNaN(spotPrice)) {
      const premium = lowestPrice - spotPrice;
      if (premium > 0 && premium < 50) {
        console.log(`JM Bullion premium: $${premium.toFixed(2)} (Lowest: $${lowestPrice}, Spot: $${spotPrice})`);
        return premium;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error scraping JM Bullion:', error);
    return null;
  }
}

/**
 * Get physical silver premiums by averaging multiple dealer sources
 */
export async function getPhysicalPremiums(): Promise<PremiumData> {
  try {
    // Scrape both dealers in parallel
    const [apmexPremium, jmBullionPremium] = await Promise.all([
      scrapeAPMEX(),
      scrapeJMBullion()
    ]);

    const validPremiums: number[] = [];
    
    if (apmexPremium !== null) {
      validPremiums.push(apmexPremium);
    }
    
    if (jmBullionPremium !== null) {
      validPremiums.push(jmBullionPremium);
    }

    // If we got at least one valid premium, average them
    if (validPremiums.length > 0) {
      const avgPremium = validPremiums.reduce((a, b) => a + b, 0) / validPremiums.length;
      
      return {
        premium: parseFloat(avgPremium.toFixed(2)),
        dataSource: 'live',
        timestamp: new Date()
      };
    }

    // If both failed, return error
    return {
      premium: 0,
      dataSource: 'fallback',
      error: 'Failed to scrape physical premiums from dealers',
      timestamp: new Date()
    };

  } catch (error) {
    console.error('Error getting physical premiums:', error);
    return {
      premium: 0,
      dataSource: 'fallback',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date()
    };
  }
}
