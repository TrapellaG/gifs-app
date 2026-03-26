import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { Gifs } from "./gifs/components/Gifs";
import { useGifs } from "./gifs/hooks/useGifs";

export const GifsApp = () => {
  const {
    gifs,
    handleSearch,
    previousSearches,
    handlePreviousSearchesClicked,
  } = useGifs();

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
