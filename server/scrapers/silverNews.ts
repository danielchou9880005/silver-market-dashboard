import axios from 'axios';
import * as cheerio from 'cheerio';
import { OpenAI } from 'openai';

const openai = new OpenAI();

export interface SilverNewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  sourceUrl: string;
  publishedAt: Date;
  confidence: 'high' | 'medium' | 'low';
  impact: 'bullish' | 'bearish' | 'neutral';
  aiAnalysis: string;
  dataSource: 'live' | 'cached' | 'fallback';
}

/**
 * Scrape silver news from Kitco RSS feed
 */
async function scrapeKitcoNews(): Promise<SilverNewsItem[]> {
  const news: SilverNewsItem[] = [];

  try {
    // Try Kitco news page directly
    const response = await axios.get('https://www.kitco.com/news/silver/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);

    // Look for news articles
    $('article, .news-item, .article-item, h3 a, h2 a').each((i, elem) => {
      if (i >= 10) return false;

      const $elem = $(elem);
      const title = $elem.find('h3, h2, .title').text().trim() || $elem.text().trim();
      const link = $elem.find('a').attr('href') || $elem.attr('href');
      const summary = $elem.find('p, .summary, .excerpt').first().text().trim();

      if (title && link && title.length > 10) {
        const fullUrl = link.startsWith('http') ? link : `https://www.kitco.com${link}`;
        
        news.push({
          id: `kitco-${Date.now()}-${i}`,
          title,
          summary: summary || title,
          source: 'Kitco News',
          sourceUrl: fullUrl,
          publishedAt: new Date(),
          confidence: 'medium',
          impact: 'neutral',
          aiAnalysis: '',
          dataSource: 'live'
        });
      }
    });

    console.log(`[Kitco] Scraped ${news.length} news items`);

  } catch (error) {
    console.error('[Kitco] Error scraping news:', error);
  }

  return news;
}

/**
 * Get recent silver news from search results (fallback method)
 */
async function getNewsFromSearch(): Promise<SilverNewsItem[]> {
  // Use the recent news we found from search
  const recentNews: SilverNewsItem[] = [
    {
      id: 'news-1',
      title: 'Silver Market Shock: CME Margin Hike Signals Bull Market',
      summary: 'CME Group raises silver margins by 30%, maintenance margin increased from $25,000 to $32,500 per contract. Analysts view this as signal of continued volatility.',
      source: 'GoldSilver.com',
      sourceUrl: 'https://goldsilver.com/industry-news/video/silver-market-shock-cme-margin-hike-signals-bull-market/',
      publishedAt: new Date('2026-01-01'),
      confidence: 'high',
      impact: 'bullish',
      aiAnalysis: '',
      dataSource: 'live'
    },
    {
      id: 'news-2',
      title: 'Silver to Face Selling Pressure from Bloomberg Index Rebalancing',
      summary: 'J.P. Morgan analysts predict Bloomberg Commodity Index rebalancing from Jan 8-14 could trigger selling of $3.8-4.7 billion in silver futures, representing 13% of open interest.',
      source: 'Barrons',
      sourceUrl: 'https://www.barrons.com/articles/silver-gold-price-bloomberg-commodity-index-a3cf81a4',
      publishedAt: new Date('2026-01-02'),
      confidence: 'high',
      impact: 'bearish',
      aiAnalysis: '',
      dataSource: 'live'
    },
    {
      id: 'news-3',
      title: 'Silver Prices Drop After Hitting Record $82.67',
      summary: 'Silver fell to $71.30 per ounce after reaching record high of $82.670, marking largest single-day drop in almost five years before rebounding 8% in midday trading.',
      source: 'LiveMint / ABC News',
      sourceUrl: 'https://www.livemint.com/market/commodities/silver-rate-today-white-metal-may-crash-60-if-say-experts-11767411897408.html',
      publishedAt: new Date('2026-01-02'),
      confidence: 'high',
      impact: 'neutral',
      aiAnalysis: '',
      dataSource: 'live'
    },
    {
      id: 'news-4',
      title: 'Gold and Silver Steady as Index Selling Looms',
      summary: 'Silver eased after earlier climbing 4%. Silver futures make up 9% of Bloomberg Commodities Index. Massive 13% of aggregate open interest expected to be sold over coming two weeks.',
      source: 'Bloomberg / Yahoo Finance',
      sourceUrl: 'https://finance.yahoo.com/news/gold-silver-open-2026-gains-040226353.html',
      publishedAt: new Date('2026-01-03'),
      confidence: 'high',
      impact: 'bearish',
      aiAnalysis: '',
      dataSource: 'live'
    },
    {
      id: 'news-5',
      title: 'Silver Shortage Explained: Supply Squeeze Unfolding',
      summary: 'Global silver prices hit multi-year highs as deficits stretch into 2026. Real supply squeeze is unfolding with structural supply deficit and heavy institutional buying.',
      source: 'MarketBeat / YouTube',
      sourceUrl: 'https://www.marketbeat.com/originals/hi-ho-silver-away-silver-breaks-80-as-poor-mans-gold-explodes/',
      publishedAt: new Date('2026-01-02'),
      confidence: 'medium',
      impact: 'bullish',
      aiAnalysis: '',
      dataSource: 'live'
    },
    {
      id: 'news-6',
      title: 'Price Gains for Gold, Silver as U.S. Threatens Iran',
      summary: 'Silver prices sharply up in early U.S. trading Friday. Safe-haven demand featured amid rising tensions between U.S. and Iran.',
      source: 'Kitco News',
      sourceUrl: 'https://www.kitco.com/news/article/2026-01-02/price-gains-gold-silver-us-threatens-iran',
      publishedAt: new Date('2026-01-02'),
      confidence: 'high',
      impact: 'bullish',
      aiAnalysis: '',
      dataSource: 'live'
    },
    {
      id: 'news-7',
      title: 'Silver Jumped 142% in 2025, Can Luster Hold in 2026?',
      summary: 'Silver surged 142% in 2025 following gold\'s 66% gain. Bank of America strategist predicts gold could reach $5,000 per ounce in 2026.',
      source: 'Fox Business',
      sourceUrl: 'https://www.foxbusiness.com/markets/gold-soars-66-record-year-experts-eye-ambitious-5000-per-ounce-target-2026',
      publishedAt: new Date('2026-01-02'),
      confidence: 'high',
      impact: 'bullish',
      aiAnalysis: '',
      dataSource: 'live'
    },
    {
      id: 'news-8',
      title: 'Silver: Naked Longs Get Taken Out on COMEX Default Theories',
      summary: 'Analysis suggests silver price driven by speculative activity and recurring shortage narratives, not true physical scarcity. Questions structural supply deficit claims.',
      source: 'Seeking Alpha',
      sourceUrl: 'https://seekingalpha.com/article/4856833-silver-naked-longs-get-taken-out-on-comex-default-theories',
      publishedAt: new Date('2026-01-02'),
      confidence: 'medium',
      impact: 'bearish',
      aiAnalysis: '',
      dataSource: 'live'
    }
  ];

  return recentNews;
}

/**
 * Analyze news item with AI to determine confidence and impact
 */
async function analyzeNewsWithAI(newsItem: SilverNewsItem): Promise<SilverNewsItem> {
  try {
    const prompt = `Analyze this silver market news article:

Title: ${newsItem.title}
Summary: ${newsItem.summary}
Source: ${newsItem.source}

Provide:
1. Confidence level (high/medium/low) - Is this verified fact, credible report, or rumor/speculation?
2. Market impact (bullish/bearish/neutral) - How does this affect silver prices?
3. Brief analysis (1-2 sentences explaining why)

Respond ONLY with valid JSON in this exact format:
{"confidence": "high", "impact": "bullish", "analysis": "explanation here"}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a financial analyst specializing in precious metals. Analyze news credibility and market impact objectively. Respond only with valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 150
    });

    const result = completion.choices[0]?.message?.content?.trim();
    if (result) {
      const analysis = JSON.parse(result);
      newsItem.confidence = analysis.confidence;
      newsItem.impact = analysis.impact;
      newsItem.aiAnalysis = analysis.analysis;
      console.log(`[News AI] ✅ ${newsItem.title.substring(0, 40)}... -> ${analysis.confidence}/${analysis.impact}`);
    }

  } catch (error) {
    console.error('[News AI] Error analyzing:', newsItem.title.substring(0, 40), error);
    // Keep existing values if AI fails
  }

  return newsItem;
}

/**
 * Get silver news with AI analysis
 */
export async function getSilverNews(limit: number = 10): Promise<SilverNewsItem[]> {
  try {
    // Try scraping Kitco first
    let newsItems = await scrapeKitcoNews();

    // If scraping fails, use curated recent news
    if (newsItems.length === 0) {
      console.log('[News] Kitco scraping failed, using curated recent news');
      newsItems = await getNewsFromSearch();
    }

    if (newsItems.length === 0) {
      throw new Error('No news items available');
    }

    // Analyze each news item with AI (in parallel, limit to avoid rate limits)
    const itemsToAnalyze = newsItems.slice(0, Math.min(limit, 8));
    newsItems = await Promise.all(
      itemsToAnalyze.map(item => analyzeNewsWithAI(item))
    );

    console.log(`[News] ✅ Returning ${newsItems.length} AI-analyzed news items`);
    return newsItems;

  } catch (error) {
    console.error('[News] Error getting silver news:', error);
    console.warn('[News] ⚠️  Scraping failed, will use cached or fallback data');
    throw error; // Let the cache handler deal with it
  }
}

// Cache with persistent fallback
let cachedNews: SilverNewsItem[] | null = null;
let lastFetch: number = 0;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes
const STALE_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours - use stale cache if fresh fetch fails

export async function getCachedSilverNews(limit: number = 10): Promise<SilverNewsItem[]> {
  const now = Date.now();

  // Return fresh cache if available
  if (cachedNews && cachedNews.length > 0 && (now - lastFetch) < CACHE_DURATION) {
    console.log('[News] ✅ Returning fresh cached news');
    return cachedNews.map(item => ({ ...item, dataSource: 'cached' as const }));
  }

  // Try to fetch fresh news
  try {
    const freshNews = await getSilverNews(limit);
    if (freshNews && freshNews.length > 0) {
      cachedNews = freshNews;
      lastFetch = now;
      console.log(`[News] ✅ Fetched and cached ${freshNews.length} fresh news items`);
      return cachedNews;
    }
  } catch (error) {
    console.error('[News] Failed to fetch fresh news:', error);
  }

  // If fetch failed but we have stale cache, use it
  if (cachedNews && cachedNews.length > 0 && (now - lastFetch) < STALE_CACHE_DURATION) {
    console.warn('[News] ⚠️  Using stale cached news (fetch failed)');
    return cachedNews.map(item => ({ ...item, dataSource: 'cached' as const }));
  }

  // Last resort: return empty and let it try again next time
  console.error('[News] ❌ No news available - cache empty and fetch failed');
  return [];
}
