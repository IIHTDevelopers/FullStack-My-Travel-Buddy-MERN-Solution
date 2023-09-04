const UserServiceImpl = require('../service/impl/user.serviceImpl');
const userService = new UserServiceImpl();

class UserController {
    async createUser(req, res) {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                return res.status(400).json({ error: 'Username, email, and password are required.' });
            }
            const newUser = await userService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create user.' });
        }
    }

    async getUser(req, res) {
        try {
            const user = await userService.getUser(req.user._id);
            res.json(user);
        } catch (error) {
            res.status(404).json({ error: 'User not found.' });
        }
    }

    async updateUser(req, res) {
        try {
            const { email } = req.body;
            if (email) {
                const existingUserWithEmail = await userService.getUserByEmail(email);
                if (existingUserWithEmail) {
                    const updatedUser = await userService.updateUser(req.user._id, req.body);
                    res.json(updatedUser);
                } else {
                    return res.status(400).json({ error: 'Email cannot be updated.' });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to update user profile.' });
        }
    }

    async deleteUser(req, res) {
        try {
            const deletedUser = await userService.deleteUser(req.user._id);
            res.json(deletedUser);
        } catch (error) {
            res.status(404).json({ error: 'User not found.' });
        }
    }

    async getUpcomingTrips(req, res) {
        try {
            const upcomingTrips = await userService.getUpcomingTrips(req.user._id);
            res.json(upcomingTrips);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get user\'s upcoming trips.' });
        }
    }

    async getPastTrips(req, res) {
        try {
            const pastTrips = await userService.getPastTrips(req.user._id);
            res.json(pastTrips);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get user\'s past trips.' });
        }
    }

    async getTripPlans(req, res) {
        try {
            const tripPlans = await userService.getTripPlans(req.user._id);
            res.json(tripPlans);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get user\'s trip plans.' });
        }
    }

    async getUserBookings(req, res) {
        try {
            const bookings = await userService.getUserBookings(req.user._id);
            res.json(bookings);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get user\'s bookings.' });
        }
    }

    async getUserReviews(req, res) {
        try {
            const reviews = await userService.getUserReviews(req.body._id);
            res.json(reviews);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get user\'s reviews.' });
        }
    }
}

module.exports = UserController;
