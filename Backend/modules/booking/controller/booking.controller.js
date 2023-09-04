const BookingServiceImpl = require('../service/impl/booking.serviceImpl');
const bookingService = new BookingServiceImpl();

class BookingController {
    async createBooking(req, res) {
        try {
            const { user, destination } = req.body;
            if (!user || !destination) {
                return res.status(400).json({ error: 'User and destination are required.' });
            }
            const newBooking = await bookingService.createBooking(req.body);
            res.status(201).json(newBooking);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create booking.' });
        }
    }

    async getBooking(req, res) {
        try {
            const booking = await bookingService.getBooking(req.params.bookingId);
            res.json(booking);
        } catch (error) {
            res.status(404).json({ error: 'Booking not found.' });
        }
    }

    async updateBooking(req, res) {
        try {
            const updatedBooking = await bookingService.updateBooking(
                req.params.bookingId,
                req.body
            );
            res.json(updatedBooking);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update booking details.' });
        }
    }

    async deleteBooking(req, res) {
        try {
            const deletedBooking = await bookingService.deleteBooking(req.params.bookingId);
            res.json(deletedBooking);
        } catch (error) {
            res.status(404).json({ error: 'Booking not found.' });
        }
    }

    async searchBookings(req, res) {
        if (req.query.status) {
            try {
                const status = req.query.status;
                const bookings = await bookingService.searchBookingsByStatus(status);
                res.json(bookings);
            } catch (error) {
                res.status(500).json({ error: 'Failed to search bookings by status.' });
            }
        } else {
            try {
                const destinationId = req.query.destinationName;
                const bookings = await bookingService.getBookingsByDestination(destinationId);
                res.json(bookings);
            } catch (error) {
                res.status(500).json({ error: 'Failed to get bookings by destination.' });
            }
        }
    }

    async getAllBookings(req, res) {
        try {
            const bookings = await bookingService.searchBookingsByUser(req.user._id);
            res.json(bookings);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get all bookings.' });
        }
    }

    async getUpcomingBookingsForUser(req, res) {
        try {
            const userId = req.user._id;
            const upcomingBookings = await bookingService.getUpcomingBookingsForUser(userId);
            res.json(upcomingBookings);
        } catch (error) {
            res.status(500).json({ error: 'Failed to get upcoming bookings for user.' });
        }
    }
}

module.exports = BookingController;
