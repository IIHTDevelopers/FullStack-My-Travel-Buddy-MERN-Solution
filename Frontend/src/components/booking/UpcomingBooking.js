import React, { useState, useEffect } from 'react';
import BookingService from '../../services/booking.service';

const UpcomingBooking = () => {
    const [upcomingBookings, setUpcomingBookings] = useState([]);

    useEffect(() => {
        const fetchUpcomingBookings = async () => {
            try {
                const data = await BookingService.getUpcomingBookingsForUser();
                setUpcomingBookings(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUpcomingBookings();
    }, []);

    const renderUpcomingBookings = () => {
        return upcomingBookings.map((booking) => (
            <li key={booking._id}>
                <h4>Destination: {booking.destinationName}</h4>
                <p>Date: {booking.date}</p>
                <p>Status: {booking.status}</p>
            </li>
        ));
    };

    return (
        <div>
            <h1>Upcoming Bookings</h1>
            <ul>
                {upcomingBookings.length === 0 ? (
                    <p>No upcoming bookings available.</p>
                ) : (
                    renderUpcomingBookings()
                )}
            </ul>
        </div>
    );
}

export default UpcomingBooking;
