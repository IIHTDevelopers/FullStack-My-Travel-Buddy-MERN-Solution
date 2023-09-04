const TripPlanServiceImpl = require('../service/impl/trip-plan.serviceImpl');
const tripPlanService = new TripPlanServiceImpl();

class TripPlanController {
    async createTripPlan(req, res) {
        try {
            const { user, destination } = req.body;
            if (!user || !destination) {
                return res.status(400).json({ error: 'User and destination are required.' });
            }
            const newTripPlan = await tripPlanService.createTripPlan(req.body);
            res.status(201).json(newTripPlan);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create trip plan.' });
        }
    }

    async getTripPlan(req, res) {
        try {
            const tripPlan = await tripPlanService.getTripPlan(req.params.tripPlanId);
            res.json(tripPlan);
        } catch (error) {
            res.status(404).json({ error: 'Trip plan not found.' });
        }
    }

    async updateTripPlan(req, res) {
        try {
            const updatedTripPlan = await tripPlanService.updateTripPlan(
                req.params.tripPlanId,
                req.body
            );
            res.json(updatedTripPlan);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update trip plan details.' });
        }
    }

    async deleteTripPlan(req, res) {
        try {
            const deletedTripPlan = await tripPlanService.deleteTripPlan(req.params.tripPlanId);
            res.json(deletedTripPlan);
        } catch (error) {
            res.status(404).json({ error: 'Trip plan not found.' });
        }
    }

    async searchTripPlansByDestination(req, res) {
        if (req.query.destinationName) {
            try {
                const destinationId = req.query.destinationName;
                const tripPlans = await tripPlanService.searchTripPlansByDestination(destinationId);
                res.json(tripPlans);
            } catch (error) {
                res.status(500).json({ error: 'Failed to search trip plans by destination.' });
            }
        } else {
            try {
                const minBudget = parseFloat(req.query.min);
                const maxBudget = parseFloat(req.query.max);
                const tripPlans = await tripPlanService.searchTripPlansByBudgetRange(minBudget, maxBudget);
                res.json(tripPlans);
            } catch (error) {
                res.status(500).json({ error: 'Failed to search trip plans by budget range.' });
            }
        }
    }

    async getAllTripPlans(req, res) {
        try {
            const tripPlans = await tripPlanService.getAllTripPlans();
            res.json(tripPlans);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get all trip plans.' });
        }
    }

    async getTripPlansByUser(req, res) {
        try {
            const userId = req.user._id;
            const tripPlans = await tripPlanService.getTripPlansByUser(userId);
            res.json(tripPlans);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get trip plans by user.' });
        }
    }

    async getPopularTripPlans(req, res) {
        try {
            const popularTripPlans = await tripPlanService.getPopularTripPlans();
            res.json(popularTripPlans);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get popular trip plans.' });
        }
    }
}

module.exports = TripPlanController;
