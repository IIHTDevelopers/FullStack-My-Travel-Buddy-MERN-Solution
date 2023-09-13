import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookingService from '../../services/booking.service';
import DestinationService from '../../services/destination.service';

const AllBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [destinationDetails, setDestinationDetails] = useState({});
    const [searchQuery, setSearchQuery] = useState({
        destinationName: '',
        status: '',
    });

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await BookingService.getAllBookings();
                setBookings(data);
                data.forEach((booking) => {
                    fetchDestinationDetails(booking.destination);
                });
            } catch (error) {
                console.error(error);
            }
        };

        const fetchDestinationDetails = async (destinationId) => {
            try {
                const details = await DestinationService.getDestination(destinationId);
                setDestinationDetails((prevDetails) => ({
                    ...prevDetails,
                    [destinationId]: details,
                }));
            } catch (error) {
                console.error(error);
            }
        };
        fetchBookings();
    }, []);

    const renderBookings = () => {
        return bookings.map((booking) => (
            <li key={booking._id}>
                <h4>Destination: {destinationDetails[booking.destination]?.name}</h4>
                <p>Date: {booking.date}</p>
                <p>Status: {booking.status}</p>
                <Link to={`/booking/add/${booking._id}`}>Update Booking</Link>
                <button onClick={() => handleDelete(booking._id)}>Delete Booking</button>
            </li>
        ));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchQuery((prevQuery) => ({
            ...prevQuery,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const queryParams = {};
            for (const key in searchQuery) {
                if (searchQuery[key] !== '') {
                    queryParams[key] = searchQuery[key];
                }
            }
            let data;
            if (searchQuery.destinationName) {
                data = await BookingService.searchBookings(searchQuery.destinationName);
            } else if (searchQuery.status) {
                data = await BookingService.searchBookings(searchQuery.status);
            }
            setBookings(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (bookingId) => {
        try {
            await BookingService.deleteBooking(bookingId);
            const updatedData = await BookingService.getAllBookings();
            setBookings(updatedData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Bookings</h1>
            <h3>Search Bookings</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="destinationName">Destination Name:</label>
                    <input
                        id="destinationName"
                        type="text"
                        name="destinationName"
                        value={searchQuery.destinationName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="status">Status:</label>
                    <input
                        id="status"
                        type="text"
                        name="status"
                        value={searchQuery.status}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Search</button>
            </form>
            <ul>
                {bookings.length === 0 ? (
                    <p>No bookings available.</p>
                ) : (
                    renderBookings()
                )}
            </ul>
        </div>
    );
}

export default AllBooking;
