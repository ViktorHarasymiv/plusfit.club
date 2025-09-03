const parseFavourite = (favourite) => {
  if (typeof favourite === 'string') {
    const cleaned = favourite.replace(/"/g, '').toLowerCase();
    if (cleaned === 'true') return true;
    if (cleaned === 'false') return false;
  }
  return undefined;
};

export const parseFilterParams = (query) => {
  const { isFavourite } = query;

  const parsedisFavourite = parseFavourite(isFavourite);

  return {
    isFavourite: parsedisFavourite,
  };
};
