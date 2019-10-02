import React from "react";
import { Link } from "react-router-dom";

export const Movie = ({
  id,
  title,
  description,
  year,
  rate,
  genre,
  director
}) => {
  return (
    <section style={{ marginBottom: 25 }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          borderBottom: "1px solid black"
        }}
      >
        <h2 style={{ margin: 0 }}>{title}</h2>
        <span style={{ marginLeft: 20 }}>Year: {year}</span>
        <span style={{ marginLeft: 20 }}>
          Rating: <strong>{rate}</strong>
        </span>
      </div>

      <p>{description}</p>

      <div>
        <span>
          Genre: <strong>{genre}</strong>
        </span>
        <span style={{ marginLeft: 20 }}>
          Director: <strong>{director}</strong>
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end"
        }}
      >
        <Link style={{ marginRight: 10 }} to={`/movie/${id}`}>
          See details
        </Link>

        <button>Add to cart</button>
      </div>
    </section>
  );
};
