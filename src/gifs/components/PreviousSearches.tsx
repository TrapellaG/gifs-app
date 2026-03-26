import type { FC } from "react";

interface Props {
  searches: string[];
  onLabelClick: (search: string) => void;
}

export const PreviousSearches: FC<Props> = ({ searches, onLabelClick }) => {
  return (
    <div className="previous-searches">
      <h2>Búsquedas previas</h2>
      <ul className="previous-searches-list">
        {searches.map((search) => (
          <li onClick={() => onLabelClick(search)} key={search}>
            {search}
          </li>
        ))}
        ;
      </ul>
    </div>
  );
};
