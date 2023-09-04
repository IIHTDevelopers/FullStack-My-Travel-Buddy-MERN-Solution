const ReviewModel = require("../../dao/models/review.model");
const UserModel = require("../../../user/dao/models/user.model");
const ReviewService = require("../review.service");

class ReviewServiceImpl extends ReviewService {
    async createReview(reviewData) {
        try {
            const review = await ReviewModel.create(reviewData);
            await UserModel.findByIdAndUpdate(review.user, { $push: { reviews: review._id } });
            return review;
        } catch (error) {
            throw new Error('Failed to create review.');
        }
    }

    async getReview(reviewId) {
        try {
            const review = await ReviewModel.findById(reviewId);
            if (!review) {
                throw new Error('Review not found.');
            }
            return review;
        } catch (error) {
            throw new Error('Failed to get review details.');
        }
    }

    async updateReview(reviewId, updatedReview) {
        try {
            const review = await ReviewModel.findByIdAndUpdate(
                reviewId,
                updatedReview,
                { new: true }
            );
            if (!review) {
                throw new Error('Review not found.');
            }
            return review;
        } catch (error) {
            throw new Error('Failed to update review details.');
        }
    }

    async deleteReview(reviewId) {
        try {
            const review = await ReviewModel.findByIdAndDelete(reviewId);
            if (!review) {
                throw new Error('Review not found.');
            }
            await UserModel.findByIdAndUpdate(review.user, { $pull: { reviews: review._id } });
            return review;
        } catch (error) {
            throw new Error('Failed to delete review.');
        }
    }

    async searchReviewsByDestination(destinationName) {
        try {
            const reviews = await ReviewModel.aggregate([
                {
                    $lookup: {
                        from: 'destinations',
                        localField: 'destination',
                        foreignField: '_id',
                        as: 'destinationInfo',
                    },
                },
                {
                    $unwind: '$destinationInfo',
                },
                {
                    $match: {
                        'destinationInfo.name': {
                            $regex: destinationName,
                            $options: 'i',
                        },
                    },
                },
            ]);

            return reviews;
        } catch (error) {
            throw new Error('Failed to search reviews by destination name.');
        }
    }

    async searchReviewsByUser(userId) {
        try {
            const reviews = await ReviewModel.find({ user: userId });
            return reviews;
        } catch (error) {
            throw new Error('Failed to search reviews by user.');
        }
    }

    async searchReviewsByRating(minRating, maxRating) {
        try {
            const reviews = await ReviewModel.find({
                rating: { $gte: minRating, $lte: maxRating },
            });
            return reviews;
        } catch (error) {
            throw new Error('Failed to search reviews by rating.');
        }
    }

    async getAllReviews() {
        try {
            const reviews = await ReviewModel.find();
            return reviews;
        } catch (error) {
            throw new Error('Failed to get all reviews.');
        }
    }
}

module.exports = ReviewServiceImpl;