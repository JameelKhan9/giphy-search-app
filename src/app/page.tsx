"use client";

import { useState, useEffect, useCallback } from "react";
import { GiphyFetch, type GifsResult } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";
import { debounce } from "~/utils/debounce";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: Move to a NextAPI to avoid exposing the API to the client
  const giphyFetch = new GiphyFetch(process.env.NEXT_PUBLIC_GIPHY_API_KEY!);

  // TODO: Move from Giphy SDK to calling the API endpoints via NextAPI
  const fetchGifs = async (offset = 0): Promise<GifsResult> => {
    setIsSearching(true);
    try {
      return searchQuery
        ? await giphyFetch.search(searchQuery, { offset, limit: 10 }) // Search endpoint
        : await giphyFetch.trending({ offset, limit: 10 }); // Trending endpoint
    } finally {
      setIsSearching(false);
    }
  };

  const debouncedFetchGifs = useCallback(
    debounce(() => fetchGifs(0), 500),
    [searchQuery],
  );

  // Fetch GIFs when searchQuery changes
  useEffect(() => {
    debouncedFetchGifs();
    return () => {
      debouncedFetchGifs.cancel();
    };
  }, [searchQuery, debouncedFetchGifs]);

  const handleGifsFetchError = (err: Error) => {
    console.error("Error fetching GIFs:", err);
    setError("Failed to fetch GIFs. Please try again later.");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">Giphy</span> Search App
        </h1>

        <div className="flex items-center gap-4">
          {/* TODO: Move to an atomic component */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for GIFs..."
            className="rounded px-4 py-2 text-black"
          />
        </div>

        {/* TODO: Add Loading Indicator and fix page rerender size change */}
        {isSearching && <p>Loading...</p>}

        {error && <p className="text-red-500">{error}</p>}

        <Grid
          key={searchQuery}
          width={1000}
          columns={2}
          fetchGifs={fetchGifs}
          onGifsFetchError={handleGifsFetchError}
        />
      </div>
    </main>
  );
}
