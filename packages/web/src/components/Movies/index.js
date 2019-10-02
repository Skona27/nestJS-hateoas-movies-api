import React from "react";

import { Spinner } from "../Spinner";
import { Movie } from "./Movie";

export const Movies = ({ movies }) => {
  if (!movies) {
    return <Spinner />;
  }

  return (
    <>
      {movies.map(movie => (
        <Movie key={movie.id} {...movie} />
      ))}
    </>
  );
};
