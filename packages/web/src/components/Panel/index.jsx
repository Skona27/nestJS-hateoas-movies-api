import React from "react";

import { Search } from "./Search";
import { SortFields } from "./SortFields";

export const Panel = ({ dispatch }) => {
  const handleSetQuery = query => {
    dispatch({ type: "setQuery", payload: query });
  };

  return (
    <div
      style={{
        marginBottom: 40,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
      }}
    >
      <Search setQuery={handleSetQuery} />
      <SortFields dispatch={dispatch} />
    </div>
  );
};
