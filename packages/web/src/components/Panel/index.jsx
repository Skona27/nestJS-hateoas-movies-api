import React from "react";
import { Search } from "./Search";

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

      <div style={{ alignSelf: "stretch" }}>
        <span style={{ marginRight: 4 }}>Sort by: </span>

        <select style={{ height: "100%" }}>
          <option>None</option>
          <option>Year</option>
          <option>Rate</option>
        </select>
      </div>

      <div style={{ marginLeft: 15, alignSelf: "stretch" }}>
        <span style={{ marginRight: 4 }}>Order: </span>

        <select style={{ height: "100%" }} disabled>
          <option>Ascending</option>
          <option>Descending</option>
        </select>
      </div>
    </div>
  );
};
