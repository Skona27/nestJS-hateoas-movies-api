import React from "react";

const map = {
  next: "Next",
  prev: "Previous"
};

export const Link = ({ type, onClick }) => {
  const text = map[type] || "";

  return <button onClick={onClick}>{text}</button>;
};
