import { HeroCollection } from '../db/models/heroSlider.js';

// GET

export const getAllSlide = async (query, sort = { createdAt: -1 }) => {
  const slide = await HeroCollection.find(query).sort(sort).lean();

  return {
    data: slide,
  };
};

// CREATE

export const createSlide = async (payload) => {
  const slide = await HeroCollection.create(payload);
  return slide;
};

// DELETE

export const deleteSlide = async (slideId) => {
  const slide = await HeroCollection.findOneAndDelete({ _id: slideId });
  return slide;
};
