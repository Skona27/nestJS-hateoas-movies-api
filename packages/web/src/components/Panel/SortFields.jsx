import React from "react";

const sortableFields = ["year", "length", "rate"];

export const SortFields = ({ dispatch }) => {
  const [isOrderDisabled, setIsOrderDisabled] = React.useState(true);

  const onSortFieldChange = event => {
    if (event.target.value === "None") {
      dispatch({ type: "setSortBy", payload: null });
      setIsOrderDisabled(true);
      return;
    }

    dispatch({ type: "setSortBy", payload: event.target.value });
    dispatch({ type: "setOrder", payload: "asc" });
    setIsOrderDisabled(false);
  };

  const onOrderFieldChange = event => {
    dispatch({ type: "setOrder", payload: event.target.value });
  };

  return (
    <>
      <div style={{ alignSelf: "stretch" }}>
        <span style={{ marginRight: 4 }}>Sort by: </span>

        <select style={{ height: "100%" }} onChange={onSortFieldChange}>
          <option>None</option>

          {sortableFields.map(field => (
            <option key={field} style={{ textTransform: "capitalize" }}>
              {field}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginLeft: 15, alignSelf: "stretch" }}>
        <span style={{ marginRight: 4 }}>Order: </span>

        <select
          style={{ height: "100%" }}
          onChange={onOrderFieldChange}
          disabled={isOrderDisabled}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </>
  );
};
