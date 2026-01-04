import { getSilverPrice } from './server/scrapers/silverPrice';
import { getComexInventory } from './server/scrapers/comexInventory';

async function testScrapers() {
  console.log('=== Testing Silver Market Data Scrapers ===\n');

  // Test silver price scraper
  console.log('1. Testing Silver Price Scraper...');
  try {
    const priceData = await getSilverPrice();
    console.log('✅ Silver Price Data:');
    console.log(`   Bid: $${priceData.bid.toFixed(2)}`);
    console.log(`   Ask: $${priceData.ask.toFixed(2)}`);
    console.log(`   Change: ${priceData.change >= 0 ? '+' : ''}${priceData.change.toFixed(2)} (${priceData.changePercent.toFixed(2)}%)`);
    console.log(`   Day Range: $${priceData.dayLow.toFixed(2)} - $${priceData.dayHigh.toFixed(2)}`);
    console.log(`   Last Update: ${priceData.lastUpdate.toLocaleString()}\n`);
  } catch (error) {
    console.error('❌ Silver Price Scraper Failed:', error);
  }

  // Test COMEX inventory scraper
  console.log('2. Testing COMEX Inventory Scraper...');
  try {
    const inventory = await getComexInventory();
    console.log('✅ COMEX Inventory Data:');
    console.log(`   Registered: ${inventory.registered.toFixed(2)} M oz`);
    console.log(`   Eligible: ${inventory.eligible.toFixed(2)} M oz`);
    console.log(`   Total: ${inventory.total.toFixed(2)} M oz`);
    console.log(`   Last Update: ${inventory.lastUpdate.toLocaleString()}\n`);
  } catch (error) {
    console.error('❌ COMEX Inventory Scraper Failed:', error);
  }

  console.log('=== Testing Complete ===');
}

testScrapers().catch(console.error);
