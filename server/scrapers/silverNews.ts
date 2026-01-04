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
 * Scrape silver news from multiple sources
 */
async function scrapeSilverNews(): Promise<SilverNewsItem[]> {
  const news: SilverNewsItem[] = [];

  try {
    // Use search API to get recent silver news
    const searchQuery = 'silver market COMEX CME';
    const response = await axios.get(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&tbm=nws`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);

    // Extract news items from search results
    $('.SoaBEf, .WlydOe, article').each((i, elem) => {
      if (i >= 10) return false; // Limit to 10 items

      const title = $(elem).find('h3, .n0jPhd').text().trim();
      const link = $(elem).find('a').attr('href');
      const source = $(elem).find('.NUnG9d, .CEMjEf').text().trim();
      const snippet = $(elem).find('.GI74Re, .Y3v8qd').text().trim();

      if (title && link) {
        news.push({
          id: `news-${Date.now()}-${i}`,
          title,
          summary: snippet || title,
          source: source || 'Unknown Source',
          sourceUrl: link.startsWith('http') ? link : `https://google.com${link}`,
          publishedAt: new Date(),
          confidence: 'medium', // Will be analyzed by AI
          impact: 'neutral', // Will be analyzed by AI
          aiAnalysis: '',
          dataSource: 'live'
        });
      }
    });

    console.log(`[News] Scraped ${news.length} news items`);

  } catch (error) {
    console.error('[News] Error scraping news:', error);
  }

  return news;
}

/**
 * Analyze news item with AI to determine confidence and impact
 */
async function analyzeNewsWithAI(newsItem: SilverNewsItem): Promise<SilverNewsItem> {
  try {
    const prompt = `Analyze this silver market news article and provide:
1. Confidence level (HIGH/MEDIUM/LOW) - Is this verified fact, credible report, or rumor/speculation?
2. Market impact (BULLISH/BEARISH/NEUTRAL) - How does this affect silver prices?
3. Brief analysis (1-2 sentences)

Title: ${newsItem.title}
Summary: ${newsItem.summary}
Source: ${newsItem.source}

Respond in JSON format:
{
  "confidence": "high|medium|low",
  "impact": "bullish|bearish|neutral",
  "analysis": "brief explanation"
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a financial analyst specializing in precious metals markets. Analyze news credibility and market impact objectively.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 200
    });

    const result = completion.choices[0]?.message?.content;
    if (result) {
      const analysis = JSON.parse(result);
      newsItem.confidence = analysis.confidence;
      newsItem.impact = analysis.impact;
      newsItem.aiAnalysis = analysis.analysis;
      console.log(`[News AI] Analyzed: ${newsItem.title.substring(0, 50)}... -> ${analysis.confidence}/${analysis.impact}`);
    }

  } catch (error) {
    console.error('[News AI] Error analyzing news:', error);
    // Keep default values if AI analysis fails
  }

  return newsItem;
}

/**
 * Get silver news with AI analysis
 */
export async function getSilverNews(limit: number = 10): Promise<SilverNewsItem[]> {
  try {
    let newsItems = await scrapeSilverNews();

    if (newsItems.length === 0) {
      throw new Error('No news items scraped');
    }

    // Analyze each news item with AI (in parallel for speed)
    newsItems = await Promise.all(
      newsItems.slice(0, limit).map(item => analyzeNewsWithAI(item))
    );

    return newsItems;

  } catch (error) {
    console.error('[News] Error getting silver news:', error);
    console.warn('[News] ⚠️  Using fallback news data');

    // Return fallback news based on real recent events
    return [
      {
        id: 'fallback-1',
        title: 'CME Raises Silver Margins 30%',
        summary: 'Chicago Mercantile Exchange implements 30% margin hike on silver futures, maintenance margin increased from $25,000 to $32,500 per contract.',
        source: 'CME Group',
        sourceUrl: 'https://www.cmegroup.com/',
        publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        confidence: 'high',
        impact: 'bullish',
        aiAnalysis: 'Verified CME announcement. Margin hikes typically indicate exchange concerns about volatility and delivery pressure.',
        dataSource: 'fallback'
      },
      {
        id: 'fallback-2',
        title: 'Bloomberg Index Rebalancing May Trigger $3.8B Silver Selling',
        summary: 'J.P. Morgan analysts predict Bloomberg Commodity Index rebalancing from Jan 8-14 could trigger selling of $3.8-4.7 billion in silver futures.',
        source: 'J.P. Morgan / Barrons',
        sourceUrl: 'https://www.barrons.com/',
        publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        confidence: 'high',
        impact: 'bearish',
        aiAnalysis: 'Credible analyst report from major bank. Index rebalancing is scheduled event with predictable selling pressure.',
        dataSource: 'fallback'
      },
      {
        id: 'fallback-3',
        title: 'Silver Hits $82.67 Record High Before Pullback',
        summary: 'Silver reached record high of $82.67 per ounce before dropping to $71.30, marking largest single-day drop in almost five years.',
        source: 'Trading Economics / LiveMint',
        sourceUrl: 'https://tradingeconomics.com/commodity/silver',
        publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        confidence: 'high',
        impact: 'neutral',
        aiAnalysis: 'Verified price data from multiple exchanges. Extreme volatility indicates market stress and potential supply issues.',
        dataSource: 'fallback'
      }
    ];
  }
}

// Cache
let cachedNews: SilverNewsItem[] | null = null;
let lastFetch: number = 0;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

export async function getCachedSilverNews(limit: number = 10): Promise<SilverNewsItem[]> {
  const now = Date.now();

  if (cachedNews && (now - lastFetch) < CACHE_DURATION) {
    console.log('[News] Returning cached news');
    return cachedNews.map(item => ({ ...item, dataSource: 'cached' as const }));
  }

  cachedNews = await getSilverNews(limit);
  lastFetch = now;
  return cachedNews;
}
