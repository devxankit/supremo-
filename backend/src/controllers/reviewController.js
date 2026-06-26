import Review from "../models/Review.js";
import Settings from "../models/Settings.js";

// @desc    Get reviews for a product slug
// @route   GET /api/reviews/:productSlug
// @access  Public
export const getReviews = async (req, res, next) => {
  try {
    const { productSlug } = req.params;
    const reviews = await Review.find({ productSlug }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};

// @desc    Submit a review for a product slug
// @route   POST /api/reviews/:productSlug
// @access  Public
export const createReview = async (req, res, next) => {
  try {
    const { productSlug } = req.params;
    const { name, rating, comment } = req.body;

    // Verify settings check
    const settings = await Settings.findOne();
    if (settings && !settings.productReviews) {
      res.status(403);
      throw new Error("Product reviews submission is currently disabled by administrator.");
    }

    if (!name || !rating || !comment) {
      res.status(400);
      throw new Error("Please fill in all required fields (name, rating, comment).");
    }

    const numericRating = Number(rating);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      res.status(400);
      throw new Error("Rating must be a valid number between 1 and 5.");
    }

    const review = await Review.create({
      productSlug,
      name,
      rating: numericRating,
      comment
    });

    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};
