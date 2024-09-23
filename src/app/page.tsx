"use client"

import { GiphyFetch } from "@giphy/js-fetch-api";
import { Grid } from '@giphy/react-components'
import { env } from "~/env";


export default async function Home() {
  // TODO: Security fix - convert to SSR to avoid client side api fetching with api key
  const giphyFetch = new GiphyFetch(env.NEXT_PUBLIC_GIPHY_API_KEY);

  // TODO: Loading State

  // TODO: Error Handling
  const fetchGifs = (offset: number) => giphyFetch.trending({ offset, limit: 10 })

  return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">Giphy</span> Search App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">

          </div>
          <Grid width={800} columns={3} fetchGifs={fetchGifs} />
        </div>
      </main>
  );
}
