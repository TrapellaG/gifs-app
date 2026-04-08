import { useRef, useState } from "react";
import type { Gif } from "../interfaces/gif.interface";
//import { mockGifs } from "../../mock-data/gifs.mock";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";

//const gifsCache: Record<string, Gif[]> = {};

export const useGifs = () => {
  const [previousSearches, setPreviousSearches] = useState<string[]>([]);
  const [gifs, setGifs] = useState<Gif[]>([]);

  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handlePreviousSearchesClicked = async (search: string) => {
    if (gifsCache.current[search]) {
      setGifs(gifsCache.current[search]);
      return;
    }
    const gifs = await getGifsByQuery(search);
    setGifs(gifs);
    gifsCache.current[search] = gifs;
  };

  const handleSearch = async (query: string) => {
    const lowerCaseQuery = query.trim().toLowerCase().split(" ").join("");
    if (query.length === 0) return;
    if (!previousSearches.includes(lowerCaseQuery)) {
      setPreviousSearches([query, ...previousSearches].splice(0, 8));
    }
    const gifs = await getGifsByQuery(query);
    setGifs(gifs);
    gifsCache.current[query] = gifs;
  };

  return {
    //properties / values
    previousSearches,
    gifs,
    //methods / actions
    handlePreviousSearchesClicked,
    handleSearch,
  };
};
