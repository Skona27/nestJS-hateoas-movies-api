import React from "react";
import { Link } from "./Link";

export const Pagination = ({
  links,
  perPage,
  pageNumber,
  changePage,
  totalCount
}) => {
  if (!links) {
    return null;
  }

  const start = perPage * (pageNumber - 1) + 1;
  const end =
    perPage * pageNumber < totalCount ? perPage * pageNumber : totalCount;

  return (
    <div style={{ marginTop: 40 }}>
      <p style={{ margin: 0 }}>Page {pageNumber}</p>

      <p style={{ margin: 0, marginBottom: 5 }}>
        Displaying <strong>{start}</strong> - <strong>{end}</strong>
        <span> from </span>
        <strong>{totalCount}</strong>
      </p>

      {links.map(link => (
        <Link
          key={link.rel}
          type={link.rel}
          onClick={() => {
            changePage(link.href);
          }}
        />
      ))}
    </div>
  );
};
