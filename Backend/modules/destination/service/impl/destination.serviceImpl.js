const DestinationService = require("../destination.service");
const DestinationModel = require("../../dao/models/destination.model");

class DestinationServiceImpl extends DestinationService {
    async createDestination(destinationData) {
        try {
            const destination = await DestinationModel.create(destinationData);
            return destination;
        } catch (error) {
            throw new Error('Failed to create destination.');
        }
    }

    async getDestination(destinationId) {
        try {
            const destination = await DestinationModel.findById(destinationId);
            if (!destination) {
                throw new Error('Destination not found.');
            }
            return destination;
        } catch (error) {
            throw new Error('Failed to get destination.');
        }
    }

    async updateDestination(destinationId, updatedDestination) {
        try {
            const destination = await DestinationModel.findByIdAndUpdate(
                destinationId,
                updatedDestination,
                { new: true }
            );
            if (!destination) {
                throw new Error('Destination not found.');
            }
            return destination;
        } catch (error) {
            throw new Error('Failed to update destination.');
        }
    }

    async deleteDestination(destinationId) {
        try {
            const destination = await DestinationModel.findByIdAndDelete(destinationId);
            if (!destination) {
                throw new Error('Destination not found.');
            }
            return destination;
        } catch (error) {
            throw new Error('Failed to delete destination.');
        }
    }

    async searchDestinationsByName(name) {
        try {
            const destinations = await DestinationModel.find({ name: { $regex: name, $options: 'i' } });
            return destinations;
        } catch (error) {
            throw new Error('Failed to search destinations by name.');
        }
    }

    async searchDestinationsByCategory(category) {
        try {
            const destinations = await DestinationModel.find({ category });
            return destinations;
        } catch (error) {
            throw new Error('Failed to search destinations by category.');
        }
    }

    async searchDestinationsByBudgetRange(minBudget, maxBudget) {
        try {
            const destinations = await DestinationModel.find({
                budget: { $gte: minBudget, $lte: maxBudget },
            });
            return destinations;
        } catch (error) {
            throw new Error('Failed to search destinations by budget range.');
        }
    }

    async getAllDestinations() {
        try {
            const destinations = await DestinationModel.find();
            return destinations;
        } catch (error) {
            throw new Error('Failed to get all destinations.');
        }
    }

    async getDestinationsByCategory(category) {
        try {
            const destinations = await DestinationModel.find({ category });
            return destinations;
        } catch (error) {
            throw new Error('Failed to get destinations by category.');
        }
    }

    async getTopRatedDestinations() {
        try {
            const topRatedDestinations = await DestinationModel.aggregate([
                {
                    $lookup: {
                        from: 'reviews',
                        localField: 'reviews',
                        foreignField: '_id',
                        as: 'reviewDetails',
                    },
                },
                {
                    $unwind: '$reviewDetails',
                },
                {
                    $group: {
                        _id: '$_id',
                        averageRating: { $avg: '$reviewDetails.rating' },
                    },
                },
                {
                    $match: {
                        averageRating: { $gte: 4 },
                    },
                },
            ]);
            const destinationIds = topRatedDestinations.map(dest => dest._id);
            const destinations = await DestinationModel.find({
                _id: { $in: destinationIds },
            });
            return destinations;
        } catch (error) {
            throw new Error('Failed to get top-rated destinations.');
        }
    }
}

module.exports = DestinationServiceImpl;