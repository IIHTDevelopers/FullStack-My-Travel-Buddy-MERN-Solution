import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import BookingService from '../../services/booking.service';
import DestinationService from '../../services/destination.service';

function AddBooking() {
    const history = useHistory();
    const { id } = useParams();

    const [booking, setBooking] = useState({
        user: '',
        destination: '',
        date: '',
        status: '',
        flightDetails: '',
        accommodationDetails: '',
    });

    const [destinationList, setDestinationList] = useState([]);

    useEffect(() => {
        if (id && id.length > 3) {
            const fetchBooking = async () => {
                try {
                    const data = await BookingService.getBooking(id);
                    const tempData = {
                        user: data.user,
                        destination: data.destination,
                        date: data.date,
                        status: data.status,
                        flightDetails: data.flightDetails.airline,
                        accommodationDetails: data.accommodationDetails.hotel
                    };
                    setBooking(tempData);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchBooking();
        }
        const fetchDestinations = async () => {
            try {
                const data = await DestinationService.getAllDestinations();
                setDestinationList(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDestinations();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBooking((prevBooking) => ({
            ...prevBooking,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id && id.length > 3) {
                await BookingService.updateBooking(id, booking);
            } else {
                await BookingService.createBooking(booking);
            }
            goToRoute();
        } catch (error) {
            console.error(error);
        }
    };

    const goToRoute = () => {
        history.push('/booking/all');
    };

    return (
        <div>
            <h1>{(id && id.length > 3) ? 'Edit Booking' : 'Add Booking'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={booking.date}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <input
                        type="text"
                        name="status"
                        value={booking.status}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Flight Details:</label>
                    <textarea
                        name="flightDetails"
                        value={booking.flightDetails}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Accommodation Details:</label>
                    <textarea
                        name="accommodationDetails"
                        value={booking.accommodationDetails}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Destination:</label>
                    <select
                        name="destination"
                        value={booking.destination}
                        onChange={handleChange}
                    >
                        <option value="">Select a destination</option>
                        {destinationList.map((destination) => (
                            <option key={destination._id} value={destination._id}>
                                {destination.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">{(id && id.length > 3) ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
}

export default AddBooking;
