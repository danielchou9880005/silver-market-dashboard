import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { callDataApi } from "./_core/dataApi";
import { z } from "zod";

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
    // Get current silver spot price
    getSpotPrice: publicProcedure.query(async () => {
      try {
        const response = await callDataApi("YahooFinance/get_stock_chart", {
          query: {
            symbol: "SI=F", // Silver futures
            region: "US",
            interval: "1d",
            range: "1d",
          },
        });

        const result = (response as any).chart?.result?.[0];
        if (!result) throw new Error("No data returned");

        const meta = result.meta;
        const price = meta.regularMarketPrice;
        const previousClose = meta.previousClose;
        const change = price - previousClose;
        const changePercent = (change / previousClose) * 100;

        return {
          price,
          change,
          changePercent,
          timestamp: Date.now(),
        };
      } catch (error) {
        console.error("Error fetching silver spot price:", error);
        throw error;
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
