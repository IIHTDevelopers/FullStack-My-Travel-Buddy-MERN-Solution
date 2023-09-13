const ObjectId = require('mongoose').Types.ObjectId;
const UserModel = require("../../../user/dao/models/user.model");
const DestinationModel = require("../../../destination/dao/models/destination.model");
const BookingModel = require("../../dao/models/booking.model");
const BookingService = require("../booking.service");

class BookingServiceImpl extends BookingService {
    async createBooking(bookingData) {
        try {
            const booking = await BookingModel.create(bookingData);
            await UserModel.findByIdAndUpdate(booking.user, { $push: { bookings: booking._id } });
            return booking;
        } catch (error) {
            throw new Error('Failed to create booking.');
        }
    }

    async getBooking(bookingId) {
        try {
            const booking = await BookingModel.findById(bookingId);
            if (!booking) {
                throw new Error('Booking not found.');
            }
            return booking;
        } catch (error) {
            throw new Error('Failed to get booking details.');
        }
    }

    async updateBooking(bookingId, updatedBooking) {
        try {
            const booking = await BookingModel.findByIdAndUpdate(
                bookingId,
                updatedBooking,
                { new: true }
            );
            if (!booking) {
                throw new Error('Booking not found.');
            }
            return booking;
        } catch (error) {
            throw new Error('Failed to update booking details.');
        }
    }

    async deleteBooking(bookingId) {
        try {
            const booking = await BookingModel.findByIdAndDelete(bookingId);
            if (!booking) {
                throw new Error('Booking not found.');
            }
            await UserModel.findByIdAndUpdate(booking.user, { $pull: { bookings: booking._id } });
            return booking;
        } catch (error) {
            throw new Error('Failed to delete booking.');
        }
    }

    async searchBookingsByUser(userId) {
        try {
            const bookings = await BookingModel.find({ user: userId });
            return bookings;
        } catch (error) {
            throw new Error('Failed to search bookings by user.');
        }
    }

    async searchBookingsByStatus(status) {
        try {
            const bookings = await BookingModel.find({ status });
            return bookings;
        } catch (error) {
            throw new Error('Failed to search bookings by status.');
        }
    }

    async getBookingsByDestination(destinationName) {
        try {
            const regex = new RegExp(destinationName, 'i');
            const destinations = await DestinationModel.find({ name: regex });
            if (destinations.length === 0) {
                throw new Error('Destination not found.');
            }
            const destinationIds = destinations.map(dest => dest._id.toString());
            const bookings = await BookingModel.find({ destination: { $in: destinationIds } });
            return bookings;
        } catch (error) {
            throw new Error('Failed to get bookings by destination.');
        }
    }

    async getUpcomingBookingsForUser(userId) {
        try {
            const currentDate = new Date();
            const bookings = await BookingModel.find({
                user: userId,
                startDate: { $gte: currentDate },
            });
            return bookings;
        } catch (error) {
            throw new Error('Failed to get upcoming bookings for user.');
        }
    }
}

module.exports = BookingServiceImpl;