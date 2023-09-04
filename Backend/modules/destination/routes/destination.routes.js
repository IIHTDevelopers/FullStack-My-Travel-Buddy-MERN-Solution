const express = require('express');
const router = express.Router();

const DestinationController = require('../controller/destination.controller');
const destinationController = new DestinationController();

const authGuard = require('../../auth/middleware/auth.guard');

router.get('/', destinationController.getAllDestinations);
router.get('/top-rated', destinationController.getTopRatedDestinations);
router.post('/create', destinationController.createDestination);
router.get('/search', destinationController.searchDestinations);
router.get('/search/budget', destinationController.searchDestinationsByBudgetRange);
router.get('/:destinationId', destinationController.getDestination);

router.use(authGuard);

router.put('/:destinationId', destinationController.updateDestination);
router.delete('/:destinationId', destinationController.deleteDestination);

module.exports = router;