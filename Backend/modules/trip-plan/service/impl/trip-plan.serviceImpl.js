const DestinationModel = require("../../../destination/dao/models/destination.model");
const TripPlanModel = require("../../dao/models/trip-plan.model");
const UserModel = require("../../../user/dao/models/user.model");
const TripPlanService = require("../trip-plan.service");

class TripPlanServiceImpl extends TripPlanService {
    async createTripPlan(tripPlanData) {
        try {
            const tripPlan = await TripPlanModel.create(tripPlanData);
            await UserModel.findByIdAndUpdate(tripPlan.user, { $push: { trips: tripPlan._id } });
            return tripPlan;
        } catch (error) {
            throw new Error('Failed to create trip plan.');
        }
    }

    async getTripPlan(tripPlanId) {
        try {
            const tripPlan = await TripPlanModel.findById(tripPlanId);
            if (!tripPlan) {
                throw new Error('Trip plan not found.');
            }
            return tripPlan;
        } catch (error) {
            throw new Error('Failed to get trip plan details.');
        }
    }

    async updateTripPlan(tripPlanId, updatedTripPlan) {
        try {
            const tripPlan = await TripPlanModel.findByIdAndUpdate(
                tripPlanId,
                updatedTripPlan,
                { new: true }
            );
            if (!tripPlan) {
                throw new Error('Trip plan not found.');
            }
            return tripPlan;
        } catch (error) {
            throw new Error('Failed to update trip plan details.');
        }
    }

    async deleteTripPlan(tripPlanId) {
        try {
            const tripPlan = await TripPlanModel.findByIdAndDelete(tripPlanId);
            if (!tripPlan) {
                throw new Error('Trip plan not found.');
            }
            await UserModel.findByIdAndUpdate(tripPlan.user, { $pull: { trips: tripPlan._id } });
            return tripPlan;
        } catch (error) {
            throw new Error('Failed to delete trip plan.');
        }
    }

    async searchTripPlansByDestination(destinationName) {
        try {
            const regex = new RegExp(destinationName, 'i');
            const destinations = await DestinationModel.find({ name: regex });
            if (destinations.length === 0) {
                throw new Error('Destinations not found.');
            }
            const destinationIds = destinations.map(destination => destination._id);
            const tripPlans = await TripPlanModel.find({ destination: { $in: destinationIds } });
            return tripPlans;
        } catch (error) {
            throw new Error('Failed to search trip plans by destination.');
        }
    }

    async searchTripPlansByBudgetRange(minBudget, maxBudget) {
        try {
            const tripPlans = await TripPlanModel.find({
                budget: { $gte: minBudget, $lte: maxBudget },
            });
            return tripPlans;
        } catch (error) {
            throw new Error('Failed to search trip plans by budget range.');
        }
    }

    async getAllTripPlans() {
        try {
            const tripPlans = await TripPlanModel.find();
            return tripPlans;
        } catch (error) {
            throw new Error('Failed to get all trip plans.');
        }
    }

    async getTripPlansByUser(userId) {
        try {
            const tripPlans = await TripPlanModel.find({ user: userId });
            return tripPlans;
        } catch (error) {
            throw new Error('Failed to get trip plans by user.');
        }
    }

    async getPopularTripPlans() {
        try {
            const tripPlans = await TripPlanModel.aggregate([
                {
                    $lookup: {
                        from: "bookings",
                        localField: "_id",
                        foreignField: "tripPlan",
                        as: "bookings",
                    },
                },
                {
                    $project: {
                        _id: 1,
                        destination: 1,
                        user: 1,
                        startDate: 1,
                        endDate: 1,
                        activities: 1,
                        accommodations: 1,
                        popularity: { $size: "$bookings" },
                    },
                },
                {
                    $sort: { popularity: -1 },
                },
                {
                    $limit: 10,
                },
            ]);
            return tripPlans;
        } catch (error) {
            throw new Error('Failed to get popular trip plans.');
        }
    }
}

module.exports = TripPlanServiceImpl;
