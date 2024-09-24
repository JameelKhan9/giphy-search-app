import { z } from "zod";
import { GiphyFetch, type GifsResult } from "@giphy/js-fetch-api"; // Import the GifsResult type
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env";

const giphyFetch = new GiphyFetch(env.NEXT_PUBLIC_GIPHY_API_KEY);

export const giphyRouter = createTRPCRouter({
  trending: publicProcedure
    .input(z.object({ limit: z.number().optional(), offset: z.number().optional() }))
    .query(async ({ input }): Promise<GifsResult> => {
      const { limit = 10, offset = 0 } = input;

      try {
        const result = await giphyFetch.trending({ limit, offset });
        return result;
      } catch (error) {
        console.error("Error fetching trending GIFs:", error);
        throw new Error("Failed to fetch trending GIFs");
      }
    }),

  search: publicProcedure
    .input(z.object({ query: z.string(), limit: z.number().optional(), offset: z.number().optional() }))
    .query(async ({ input }): Promise<GifsResult> => {
      const { query, limit = 10, offset = 0 } = input;

      try {
        const result = await giphyFetch.search(query, { limit, offset });
        return result;
      } catch (error) {
        console.error("Error searching GIFs:", error);
        throw new Error("Failed to search GIFs");
      }
    }),
});
