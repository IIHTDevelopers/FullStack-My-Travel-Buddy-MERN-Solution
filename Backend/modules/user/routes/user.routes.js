const express = require('express');
const router = express.Router();

const UserController = require('../controller/user.controller');
const userController = new UserController();

const authGuard = require("../../auth/middleware/auth.guard");

router.post('/', userController.createUser);
router.get('/upcoming-trips', authGuard, userController.getUpcomingTrips);
router.get('/past-trips', authGuard, userController.getPastTrips);
router.get('/all-trips', authGuard, userController.getTripPlans);
router.get('/bookings', authGuard, userController.getUserBookings);
router.get('/reviews', authGuard, userController.getUserReviews);
router.get('/', authGuard, userController.getUser);
router.put('/', authGuard, userController.updateUser);
router.delete('/', authGuard, userController.deleteUser);

module.exports = router;
