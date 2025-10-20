import React from "react";

const FormattedDate = ({ isoDate }) => {
  if (!isoDate) return null;

  const date = new Date(isoDate);

  const formatter = new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "numeric",
    year: "numeric",
    timeZone: "Europe/Warsaw",
    hour12: false,
  });

  const formatted = formatter.format(date);

  return <span style={{ fontSize: "14px" }}>{formatted}</span>;
};

export default FormattedDate;
