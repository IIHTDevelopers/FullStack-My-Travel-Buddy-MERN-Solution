const UserModel = require("../../dao/models/user.model");
const UserService = require("../user.service");

class UserServiceImpl extends UserService {
    async createUser(userData) {
        try {
            const existingUser = await UserModel.findOne({ email: userData.email });
            if (existingUser) {
                throw new Error('Email is already in use.');
            }
            const user = await UserModel.create(userData);
            return user;
        } catch (error) {
            throw new Error('Failed to create user.');
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await UserModel.findOne({ email });
            return user;
        } catch (error) {
            throw new Error('Failed to get user by email.');
        }
    }

    async getUser(userId) {
        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                throw new Error('User not found.');
            }
            return user;
        } catch (error) {
            throw new Error('Failed to get user profile.');
        }
    }

    async updateUser(userId, updatedUser) {
        try {
            const user = await UserModel.findByIdAndUpdate(
                userId,
                updatedUser,
                { new: true }
            );
            if (!user) {
                throw new Error('User not found.');
            }
            return user;
        } catch (error) {
            throw new Error('Failed to update user profile.');
        }
    }

    async deleteUser(userId) {
        try {
            const user = await UserModel.findByIdAndDelete(userId);
            if (!user) {
                throw new Error('User not found.');
            }
            return user;
        } catch (error) {
            throw new Error('Failed to delete user profile.');
        }
    }

    async getUpcomingTrips(userId) {
        try {
            const user = await UserModel.findById(userId).populate('trips');
            if (!user) {
                throw new Error('User not found.');
            }
            const upcomingTrips = user.trips.filter(trip => trip.startDate > new Date());
            return upcomingTrips;
        } catch (error) {
            throw new Error('Failed to get user\'s upcoming trips.');
        }
    }

    async getPastTrips(userId) {
        try {
            const user = await UserModel.findById(userId).populate('trips');
            if (!user) {
                throw new Error('User not found.');
            }
            const pastTrips = user.trips.filter(trip => trip.endDate < new Date());
            return pastTrips;
        } catch (error) {
            throw new Error('Failed to get user\'s past trips.');
        }
    }

    async getTripPlans(userId) {
        try {
            const user = await UserModel.findById(userId).populate('trips');
            if (!user) {
                throw new Error('User not found.');
            }
            return user.trips;
        } catch (error) {
            throw new Error('Failed to get user\'s trip plans.');
        }
    }

    async getUserBookings(userId) {
        try {
            const user = await UserModel.findById(userId).populate('bookings');
            if (!user) {
                throw new Error('User not found.');
            }
            return user.bookings;
        } catch (error) {
            throw new Error('Failed to get user\'s bookings.');
        }
    }

    async getUserReviews(userId) {
        try {
            const user = await UserModel.findById(userId).populate('reviews');
            if (!user) {
                throw new Error('User not found.');
            }
            return user.reviews;
        } catch (error) {
            throw new Error('Failed to get user\'s reviews.');
        }
    }
}

module.exports = UserServiceImpl;
