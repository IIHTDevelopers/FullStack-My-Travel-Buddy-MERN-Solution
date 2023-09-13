import React, { useState, useEffect } from 'react';
import TripPlanService from '../../services/trip-plan.service';
import DestinationService from '../../services/destination.service';

const PopularTrips = () => {
    const [popularTrips, setPopularTrips] = useState([]);
    const [destinationDetails, setDestinationDetails] = useState({});

    useEffect(() => {
        const fetchPopularTrips = async () => {
            try {
                const data = await TripPlanService.getPopularTripPlans();
                setPopularTrips(data);
                data.forEach((trip) => {
                    fetchDestinationDetails(trip.destination);
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

        fetchPopularTrips();
    }, []);

    const renderPopularTrips = () => {
        return popularTrips.map((trip) => (
            <li key={trip._id}>
                <h4>Destination: {destinationDetails[trip.destination]?.name}</h4>
                <p>User: {trip.user}</p>
                <p>Start Date: {trip.startDate}</p>
                <p>End Date: {trip.endDate}</p>
                {trip.activities.length > 0 && (
                    <div>
                        <h5>Activities:</h5>
                        <ul>
                            {trip.activities.map((activity, index) => (
                                <li key={index}>{activity}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {Object.keys(trip.accommodations).length > 0 && (
                    <div>
                        <h5>Accommodations:</h5>
                        <ul>
                            {Object.entries(trip.accommodations).map(([location, details]) => (
                                <li key={location}>
                                    <strong>Location:</strong> {location}
                                    <br />
                                    <strong>Details:</strong> {details}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </li>
        ));
    };

    return (
        <div>
            <h1>Popular Trips</h1>
            <ul>
                {popularTrips && popularTrips.length === 0 ? (
                    <p>No popular trips available.</p>
                ) : (
                    renderPopularTrips()
                )}
            </ul>
        </div>
    );
}

export default PopularTrips;
