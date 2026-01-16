import { ReviewsCollection } from '../db/models/review.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const allReviews = async ({ page = 1, perPage = 34 }) => {
  try {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const reviewQuery = ReviewsCollection.find();

    const reviewCount = await ReviewsCollection.find()
      .merge(reviewQuery)
      .countDocuments();

    const reviews = await reviewQuery.skip(skip).limit(limit).exec();

    const paginationData = calculatePaginationData(reviewCount, perPage, page);

    return {
      data: reviews,
      ...paginationData,
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
