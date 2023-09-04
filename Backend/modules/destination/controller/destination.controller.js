const DestinationServiceImpl = require('../service/impl/destination.serviceImpl');

const destinationService = new DestinationServiceImpl();

class DestinationController {
    async createDestination(req, res) {
        try {
            if (!req.body.name) {
                return res.status(400).json({ error: 'Name is required.' });
            }
            const newDestination = await destinationService.createDestination(req.body);
            res.status(201).json(newDestination);
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to create destination.' });
        }
    }

    async getDestination(req, res) {
        try {
            const destination = await destinationService.getDestination(req.params.destinationId);
            res.json(destination);
        } catch (error) {
            res.status(404).json({ error: 'Destination not found.' });
        }
    }

    async updateDestination(req, res) {
        try {
            const updatedDestination = await destinationService.updateDestination(
                req.params.destinationId,
                req.body
            );
            res.json(updatedDestination);
        } catch (error) {
            res.status(404).json({ error: 'Destination not found.' });
        }
    }

    async deleteDestination(req, res) {
        try {
            const deletedDestination = await destinationService.deleteDestination(
                req.params.destinationId
            );
            res.json(deletedDestination);
        } catch (error) {
            res.status(404).json({ error: 'Destination not found.' });
        }
    }

    async searchDestinations(req, res) {
        if (req.query.name) {
            try {
                const name = req.query.name;
                const destinations = await destinationService.searchDestinationsByName(name);
                res.json(destinations);
            } catch (error) {
                res.status(500).json({ error: 'Failed to search destinations by name.' });
            }
        } else {
            try {
                const category = req.query.category;
                const destinations = await destinationService.searchDestinationsByCategory(category);
                res.json(destinations);
            } catch (error) {
                res.status(500).json({ error: 'Failed to search destinations by category.' });
            }
        }
    }

    async searchDestinationsByBudgetRange(req, res) {
        try {
            const minBudget = parseInt(req.query.min);
            const maxBudget = parseInt(req.query.max);
            const destinations = await destinationService.searchDestinationsByBudgetRange(
                minBudget,
                maxBudget
            );
            res.json(destinations);
        } catch (error) {
            res.status(500).json({ error: 'Failed to search destinations by budget range.' });
        }
    }

    async getAllDestinations(req, res) {
        try {
            const destinations = await destinationService.getAllDestinations();
            res.json(destinations);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get all destinations.' });
        }
    }

    async getDestinationsByCategory(req, res) {
        try {
            const category = req.params.category;
            const destinations = await destinationService.getDestinationsByCategory(category);
            res.json(destinations);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get destinations by category.' });
        }
    }

    async getTopRatedDestinations(req, res) {
        try {
            const topRatedDestinations = await destinationService.getTopRatedDestinations();
            res.json(topRatedDestinations);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get top-rated destinations.' });
        }
    }
}

module.exports = DestinationController;
