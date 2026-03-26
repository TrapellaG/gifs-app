import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { Gifs } from "./gifs/components/Gifs";
import { mockGifs } from "./mock-data/gifs.mock";
import { useState } from "react";
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action";
import type { Gif } from "./gifs/interfaces/gif.interface";

export const GifsApp = () => {
  const [previousSearches, setPreviousSearches] = useState<string[]>([]);

  const [gifs, setGifs] = useState<Gif[]>(mockGifs);

  const handlePreviousSearchesClicked = (search: string) => {
    console.log({ search });
  };

  const handleSearch = async (query: string) => {
    const lowerCaseQuery = query.trim().toLowerCase().split(" ").join("");
    if (query.length === 0) return;
    if (!previousSearches.includes(lowerCaseQuery)) {
      setPreviousSearches([query, ...previousSearches].splice(0, 8));
    }
    const gifs = await getGifsByQuery(query);
    setGifs(gifs);
  };

  return (
    <>
      {/*Header*/}
      <CustomHeader
        title="Búscador de Gifs"
        description="Descubre y comparte el Gif perfecto"
      />
      {/*Search*/}
      <SearchBar placeholder="Buscar gifs" onQuery={handleSearch} />
      {/*previous Search*/}
      <PreviousSearches
        searches={previousSearches}
        onLabelClick={handlePreviousSearchesClicked}
      />
      {/*previous Search*/}
      <Gifs Gifs={gifs} />
    </>
  );
};
