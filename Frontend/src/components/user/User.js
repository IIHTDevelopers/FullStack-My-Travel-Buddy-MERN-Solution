import React, { useState, useEffect } from 'react';
import UserService from '../../services/user.service';
import DestinationService from '../../services/destination.service';

function User() {
    const [user, setUser] = useState(null);
    const [showTrips, setShowTrips] = useState(false);
    const [showBookings, setShowBookings] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const [showUpcomingTrips, setShowUpcomingTrips] = useState(false);
    const [showPastTrips, setShowPastTrips] = useState(false);
    const [trips, setTrips] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [upcomingTrips, setUpcomingTrips] = useState([]);
    const [pastTrips, setPastTrips] = useState([]);
    const [destinationDetails, setDestinationDetails] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await UserService.getUser();
                setUser(userData);

                const tripsData = await UserService.getTripPlans();
                setTrips(tripsData);

                const bookingsData = await UserService.getUserBookings();
                setBookings(bookingsData);

                const reviewsData = await UserService.getUserReviews();
                setReviews(reviewsData);

                const upcomingTripsData = await UserService.getUpcomingTrips();
                setUpcomingTrips(upcomingTripsData);

                const pastTripsData = await UserService.getPastTrips();
                setPastTrips(pastTripsData);

                // Fetch destination details for all trips, bookings, and upcoming/past trips
                const allTripIds = [...tripsData, ...bookingsData, ...upcomingTripsData, ...pastTripsData].map(
                    (item) => item.destination
                );

                const uniqueTripIds = [...new Set(allTripIds)];

                const destinationDetailsData = await Promise.all(
                    uniqueTripIds.map((destinationId) => DestinationService.getDestination(destinationId))
                );

                const destinationDetailsMap = destinationDetailsData.reduce((map, destination) => {
                    map[destination._id] = destination.name;
                    return map;
                }, {});

                setDestinationDetails(destinationDetailsMap);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {user && (
                <div>
                    <h1>User Details</h1>
                    <div>
                        <label>Username:</label>
                        <input type="text" value={user.username} readOnly />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={user.email} readOnly />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={user.password} readOnly />
                    </div>
                    <div>
                        <button onClick={() => setShowTrips(!showTrips)}>
                            {showTrips ? 'Hide Trips' : 'Show Trips'}
                        </button>
                        {showTrips && (
                            <div>
                                <h2>User's Trips</h2>
                                <ul>
                                    {trips.map((trip) => (
                                        <li key={trip._id}>
                                            {destinationDetails[trip.destination]} - {trip.startDate} to {trip.endDate}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div>
                        <button onClick={() => setShowBookings(!showBookings)}>
                            {showBookings ? 'Hide Bookings' : 'Show Bookings'}
                        </button>
                        {showBookings && (
                            <div>
                                <h2>User's Bookings</h2>
                                <ul>
                                    {bookings.map((booking) => (
                                        <li key={booking._id}>
                                            {destinationDetails[booking.destination]}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div>
                        <button onClick={() => setShowReviews(!showReviews)}>
                            {showReviews ? 'Hide Reviews' : 'Show Reviews'}
                        </button>
                        {showReviews && (
                            <div>
                                <h2>User's Reviews</h2>
                                <ul>
                                    {reviews.map((review) => (
                                        <li key={review._id}>{review.comment}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div>
                        <button onClick={() => setShowUpcomingTrips(!showUpcomingTrips)}>
                            {showUpcomingTrips ? 'Hide Upcoming Trips' : 'Show Upcoming Trips'}
                        </button>
                        {showUpcomingTrips && (
                            <div>
                                <h2>User's Upcoming Trips</h2>
                                <ul>
                                    {upcomingTrips.map((trip) => (
                                        <li key={trip._id}>
                                            {destinationDetails[trip.destination]} - {trip.startDate} to {trip.endDate}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div>
                        <button onClick={() => setShowPastTrips(!showPastTrips)}>
                            {showPastTrips ? 'Hide Past Trips' : 'Show Past Trips'}
                        </button>
                        {showPastTrips && (
                            <div>
                                <h2>User's Past Trips</h2>
                                <ul>
                                    {pastTrips.map((trip) => (
                                        <li key={trip._id}>
                                            {destinationDetails[trip.destination]} - {trip.startDate} to {trip.endDate}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default User;
