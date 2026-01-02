export const timeFormatted = (time, variable) => {
  const date = new Date(time);

  const formatted = date.toLocaleString("en", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    ...(variable && {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });

  return formatted;
};
