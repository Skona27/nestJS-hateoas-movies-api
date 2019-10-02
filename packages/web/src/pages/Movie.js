import React from "react";

import { fetchMovies } from "../helpers";

export const Movie = ({ match }) => {
  const id = match.params.id;

  const [movieData, setMovieData] = React.useState(null);

  React.useEffect(() => {
    const effect = async () => {
      const data = await fetchMovies(`http://localhost:3001/movies/${id}`);
      setMovieData(data);
    };
    effect();
  }, [id]);

  console.log(movieData);

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: 40 }}>Single Movie</h1>
    </div>
  );
};
