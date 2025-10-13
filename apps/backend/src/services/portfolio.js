import { PortfolioCollection } from '../db/models/portfolio.js';

// GET

export const getPortfolio = async (query, sort = { createdAt: -1 }) => {
  const portfolio = await PortfolioCollection.find(query).sort(sort).lean();
  return {
    data: portfolio,
  };
};

// CREATE

export const createPortfolio = async (payload) => {
  const portfolio = await PortfolioCollection.create(payload);
  return portfolio;
};

// DELETE

export const deletePhoto = async (photoId) => {
  const photo = await PortfolioCollection.findOneAndDelete({ _id: photoId });
  return photo;
};
