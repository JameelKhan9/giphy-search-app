"use client";

import Image from "next/image";
import { useState } from "react";
import { api } from "~/trpc/react";

export default function GiphySearchAPI() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: trendingGifs, isLoading: isTrendingLoading } =
    api.giphy.trending.useQuery({ limit: 10 }, { enabled: !searchQuery });

  const { data: searchGifs, isLoading: isSearchLoading } =
    api.giphy.search.useQuery(
      { query: searchQuery, limit: 10 },
      { enabled: !!searchQuery },
    );

  //TODO: Add pagination or infinite scroll
  //TODO: Add error handling

  const gifs = searchQuery ? searchGifs : trendingGifs;

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

        {(isTrendingLoading || isSearchLoading) && <p>Loading...</p>}

        <div className="grid grid-cols-2 gap-4">
          {/* TODO: Fix rendering of gifs into columns */}
          {gifs?.data.map((gif) => (
            <Image
              key={gif.id}
              src={gif.images.fixed_height.url}
              alt={gif.title}
              width={250}
              height={250}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
