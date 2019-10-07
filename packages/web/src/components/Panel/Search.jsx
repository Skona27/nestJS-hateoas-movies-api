import React from "react";

export const Search = ({ setQuery }) => {
  const previousValue = React.useRef(undefined);
  const [value, setValue] = React.useState("");

  const onChange = event => {
    const value = event.target.value;
    const shouldReset =
      previousValue.current && previousValue.current.length > value;

    setValue(value);

    if (value.length > 1) {
      setQuery(value);
    }
    if (shouldReset) {
      setQuery("");
    }

    previousValue.current = value;
  };

  return (
    <input
      style={{ padding: 3, width: 300, marginRight: "auto" }}
      type="text"
      value={value}
      placeholder="Search"
      onChange={onChange}
    />
  );
};
