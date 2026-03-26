import type { FC } from "react";
import type { Gif } from "../../mock-data/gifs.mock";

interface Props {
  Gifs: Gif[];
}

//FC es un functional component donde se pueden definir las props
export const Gifs: FC<Props> = ({ Gifs }) => {
  return (
    <div className="gifs-container">
      {Gifs.map((gif) => (
        <div key={gif.id} className="gif-card">
          <img src={gif.url} alt={gif.title} />
          <h3>{gif.title}</h3>
          <p>
            {gif.width}x{gif.height} (1.5mb)
          </p>
        </div>
      ))}
    </div>
  );
};
