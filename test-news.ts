import { getCachedSilverNews } from './server/scrapers/silverNews';

async function testNews() {
  console.log('=== Testing Silver News Scraper with AI Analysis ===\n');

  try {
    const news = await getCachedSilverNews(5);
    
    console.log(`✅ Retrieved ${news.length} news items\n`);

    news.forEach((item, i) => {
      console.log(`${i + 1}. ${item.title}`);
      console.log(`   Source: ${item.source}`);
      console.log(`   URL: ${item.sourceUrl}`);
      console.log(`   Confidence: ${item.confidence.toUpperCase()}`);
      console.log(`   Impact: ${item.impact.toUpperCase()}`);
      console.log(`   AI Analysis: ${item.aiAnalysis || 'Pending...'}`);
      console.log(`   Published: ${item.publishedAt.toLocaleDateString()}`);
      console.log(`   Data Source: ${item.dataSource}`);
      console.log('');
    });

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testNews();
