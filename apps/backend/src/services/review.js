import { ReviewsCollection } from '../db/models/review.js';

export const allReviews = async (query) => {
  try {
    const data = await ReviewsCollection.find(query).lean();

    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error('getAllReviews error:', error);
    return {
      data: [],
      error: 'Failed to fetch reviews',
    };
  }
};

export const createReview = async (payload) => {
  const review = await ReviewsCollection.create(payload);
  return review;
};
