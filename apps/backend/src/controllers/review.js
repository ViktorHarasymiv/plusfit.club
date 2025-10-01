import { allReviews, createReview } from '../services/review.js';

// GET

export const allReviewsController = async (req, res) => {
  try {
    const query = req.query || {};
    const { data, error } = await allReviews(query);

    if (error) {
      return res.status(500).json({ error });
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully found reviews!',
      data,
    });
  } catch (error) {
    console.error('allReviewsController error:', error);
    res.status(500).json({ error: 'Unexpected server error' });
  }
};

// CREATE

export const createReviewsController = async (req, res) => {
  const reviewData = {
    ...req.body,
  };
  const review = await createReview(reviewData);

  res.status(201).json({
    status: 201,
    message: 'Відгук успішно створений!',
    data: review,
  });
};
