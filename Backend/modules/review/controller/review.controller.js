const ReviewServiceImpl = require('../service/impl/review.serviceImpl');
const reviewService = new ReviewServiceImpl();

class ReviewController {
    async createReview(req, res) {
        try {
            const { user, destination, rating } = req.body;
            if (!user || !destination || !rating) {
                return res.status(400).json({ error: 'User, destination and rating are required.' });
            }
            const newReview = await reviewService.createReview(req.body);
            res.status(201).json(newReview);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create review.' });
        }
    }

    async getReview(req, res) {
        try {
            const review = await reviewService.getReview(req.params.reviewId);
            res.json(review);
        } catch (error) {
            res.status(404).json({ error: 'Review not found...' });
        }
    }

    async updateReview(req, res) {
        try {
            const updatedReview = await reviewService.updateReview(
                req.params.reviewId,
                req.body
            );
            res.json(updatedReview);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update review details.' });
        }
    }

    async deleteReview(req, res) {
        try {
            const deletedReview = await reviewService.deleteReview(req.params.reviewId);
            res.json(deletedReview);
        } catch (error) {
            res.status(404).json({ error: 'Review not found.' });
        }
    }

    async searchReviewsByDestination(req, res) {
        try {
            const destinationName = req.query.destinationName;
            const reviews = await reviewService.searchReviewsByDestination(destinationName);
            res.json(reviews);
        } catch (error) {
            res.status(500).json({ error: 'Failed to search reviews by destination.' });
        }
    }

    async searchReviewsByUser(req, res) {
        try {
            const userId = req.params.userId;
            const reviews = await reviewService.searchReviewsByUser(userId);
            res.json(reviews);
        } catch (error) {
            res.status(500).json({ error: 'Failed to search reviews by user.' });
        }
    }

    async searchReviewsByRating(req, res) {
        try {
            const minRating = parseFloat(req.query.min);
            const maxRating = parseFloat(req.query.max);
            if(!minRating || !maxRating) {
                return res.status(400).json({ error: 'Min and max rating are required.' });
            }
            const reviews = await reviewService.searchReviewsByRating(minRating, maxRating);
            res.json(reviews);
        } catch (error) {
            res.status(500).json({ error: 'Failed to search reviews by rating.' });
        }
    }

    async getAllReviews(req, res) {
        try {
            const reviews = await reviewService.getAllReviews();
            res.json(reviews);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get all reviews.' });
        }
    }
}

module.exports = ReviewController;
