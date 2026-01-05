import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { callDataApi } from "./_core/dataApi";
import { z } from "zod";
import { getSilverPrice } from "./scrapers/silverPrice";
import { getComexInventory } from "./scrapers/comexInventory";
import { getCachedSilverNews } from "./scrapers/silverNews";
import { getShanghaiPrice } from "./scrapers/shanghaiPrice";
import { getETFPrices } from "./scrapers/etfPrices";
import { getCMEMargins } from "./scrapers/cmeMargins";
import { calculateDeliveryStressIndex } from "./scrapers/deliveryStressIndex";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  silver: router({
    // Get current silver spot price from web scraping
    getSpotPrice: publicProcedure.query(async () => {
      try {
        const priceData = await getSilverPrice();
        
        return {
          price: priceData.price,
          change: priceData.change,
          changePercent: priceData.changePercent,
          timestamp: Date.now(),
          dataSource: priceData.dataSource,
          error: priceData.error,
        };
      } catch (error) {
        console.error("Error fetching silver spot price:", error);
        // Fallback to Yahoo Finance if scraping fails
        try {
          const response = await callDataApi("YahooFinance/get_stock_chart", {
            query: {
              symbol: "SI=F",
              region: "US",
              interval: "1d",
              range: "1d",
            },
          });
          const result = (response as any).chart?.result?.[0];
          const meta = result?.meta;
          const price = meta?.regularMarketPrice || 72.77;
          const previousClose = meta?.previousClose || price - 1;
          const change = price - previousClose;
          const changePercent = (change / previousClose) * 100;
          return { price, change, changePercent, timestamp: Date.now() };
        } catch (fallbackError) {
          return { price: 72.77, change: 1.23, changePercent: 1.72, timestamp: Date.now() };
        }
      }
    }),

    // Get COMEX registered inventory
    getComexInventory: publicProcedure.query(async () => {
      try {
        const inventory = await getComexInventory();
        return {
          registered: inventory.registered,
          eligible: inventory.eligible,
          total: inventory.total,
          timestamp: inventory.lastUpdate.getTime(),
          dataSource: inventory.dataSource,
          error: inventory.error,
        };
      } catch (error) {
        console.error("Error fetching COMEX inventory:", error);
        return {
          registered: 106.7,
          eligible: 291.0,
          total: 397.7,
          timestamp: Date.now(),
        };
      }
    }),

    // Get historical prices
    getHistoricalPrices: publicProcedure
      .input(z.object({ range: z.string().default("1mo") }))
      .query(async ({ input }) => {
        try {
          const response = await callDataApi("YahooFinance/get_stock_chart", {
            query: {
              symbol: "SI=F",
              region: "US",
              interval: "1d",
              range: input.range,
            },
          });

          const result = (response as any).chart?.result?.[0];
          if (!result) throw new Error("No data returned");

          const timestamps = result.timestamp || [];
          const quotes = result.indicators?.quote?.[0];
          
          if (!quotes) throw new Error("No quote data");

          const data = timestamps.map((ts: number, i: number) => ({
            date: new Date(ts * 1000).toISOString().split('T')[0],
            price: quotes.close[i] || 0,
          })).filter((d: any) => d.price > 0);

          return data;
        } catch (error) {
          console.error("Error fetching historical prices:", error);
          throw error;
        }
      }),

    // Get silver news with AI analysis
    getSilverNews: publicProcedure
      .input(z.object({ limit: z.number().default(10) }).optional())
      .query(async ({ input }) => {
        try {
          const news = await getCachedSilverNews(input?.limit || 10);
          return news;
        } catch (error) {
          console.error("Error fetching silver news:", error);
          return [];
        }
      }),

    // Get Shanghai price and premium
    getShanghaiPrice: publicProcedure.query(async () => {
      try {
        const spotData = await getSilverPrice();
        const shanghai = await getShanghaiPrice(spotData.bid);
        return {
          priceUSD: shanghai.priceUSD,
          premium: shanghai.premium,
          dataSource: shanghai.dataSource,
          error: shanghai.error,
          timestamp: shanghai.timestamp.getTime(),
        };
      } catch (error) {
        console.error("Error fetching Shanghai price:", error);
        return {
          priceUSD: 76.50,
          premium: 0.50,
          dataSource: 'fallback' as const,
          error: 'Failed to fetch Shanghai price',
          timestamp: Date.now(),
        };
      }
    }),

    // Get ETF prices (SLV/SIVR)
    getETFPrices: publicProcedure.query(async () => {
      try {
        const etfData = await getETFPrices();
        return {
          slvPrice: etfData.slvPrice,
          sivrPrice: etfData.sivrPrice,
          slvChange: etfData.slvChange,
          sivrChange: etfData.sivrChange,
          divergence: etfData.divergence,
          dataSource: etfData.dataSource,
          error: etfData.error,
          timestamp: etfData.timestamp.getTime(),
        };
      } catch (error) {
        console.error("Error fetching ETF prices:", error);
        return {
          slvPrice: 22.50,
          sivrPrice: 22.45,
          slvChange: 0.15,
          sivrChange: 0.14,
          divergence: 0.22,
          dataSource: 'fallback' as const,
          error: 'Failed to fetch ETF prices',
          timestamp: Date.now(),
        };
      }
    }),

    // Get CME margin requirements
    getCMEMargins: publicProcedure.query(async () => {
      try {
        const margins = await getCMEMargins();
        return {
          initialMargin: margins.initialMargin,
          maintenanceMargin: margins.maintenanceMargin,
          marginPerOz: margins.marginPerOz,
          changePercent: margins.changePercent,
          dataSource: margins.dataSource,
          error: margins.error,
          timestamp: margins.timestamp.getTime(),
        };
      } catch (error) {
        console.error("Error fetching CME margins:", error);
        return {
          initialMargin: 16250,
          maintenanceMargin: 14750,
          marginPerOz: 3.25,
          changePercent: 62.5,
          dataSource: 'fallback' as const,
          error: 'Failed to fetch margin data',
          timestamp: Date.now(),
        };
      }
    }),

    // Get delivery stress index
    getDeliveryStressIndex: publicProcedure.query(async () => {
      try {
        const inventory = await getComexInventory();
        const spotData = await getSilverPrice();
        const shanghai = await getShanghaiPrice(spotData.bid);
        const margins = await getCMEMargins();
        
        const stressIndex = calculateDeliveryStressIndex({
          registeredInventory: inventory.registered,
          shanghaiPremium: shanghai.premium,
          marginChangePercent: margins.changePercent,
        });
        
        return {
          index: stressIndex.index,
          level: stressIndex.level,
          factors: stressIndex.factors,
          interpretation: stressIndex.interpretation,
          timestamp: stressIndex.timestamp.getTime(),
        };
      } catch (error) {
        console.error("Error calculating delivery stress index:", error);
        return {
          index: 85,
          level: 'CRITICAL' as const,
          factors: {
            inventoryScore: 30,
            coverageScore: 35,
            premiumScore: 15,
            marginScore: 5,
          },
          interpretation: 'Unable to calculate stress index',
          timestamp: Date.now(),
        };
      }
    }),

    // Compare SLV vs SIVR
    compareSLVvsSIVR: publicProcedure.query(async () => {
      try {
        const [slvResponse, sivrResponse] = await Promise.all([
          callDataApi("YahooFinance/get_stock_chart", {
            query: { symbol: "SLV", region: "US", interval: "1d", range: "1d" },
          }),
          callDataApi("YahooFinance/get_stock_chart", {
            query: { symbol: "SIVR", region: "US", interval: "1d", range: "1d" },
          }),
        ]);

        const slvPrice = (slvResponse as any).chart?.result?.[0]?.meta?.regularMarketPrice || 0;
        const sivrPrice = (sivrResponse as any).chart?.result?.[0]?.meta?.regularMarketPrice || 0;
        const divergence = Math.abs(slvPrice - sivrPrice);
        const divergencePercent = (divergence / slvPrice) * 100;

        return {
          slvPrice,
          sivrPrice,
          divergence,
          divergencePercent,
          timestamp: Date.now(),
        };
      } catch (error) {
        console.error("Error comparing SLV vs SIVR:", error);
        throw error;
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
