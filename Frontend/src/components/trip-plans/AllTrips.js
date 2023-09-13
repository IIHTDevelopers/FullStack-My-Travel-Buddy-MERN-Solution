import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TripPlanService from '../../services/trip-plan.service';
import DestinationService from '../../services/destination.service';

const AllTrips = () => {
    const [allTrips, setAllTrips] = useState([]);
    const [destinationDetails, setDestinationDetails] = useState({});

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const data = await TripPlanService.getAllTripPlans();
                setAllTrips(data);
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
        fetchTrips();
    }, []);

    const renderAllTrips = () => {
        return allTrips.map((trip) => (
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
                <Link to={`/trips/add/${trip._id}`} > Update Trip</Link>
            </li>
        ));
    };

    return (
        <div>
            <h1>All Trips</h1>
            <ul>
                {allTrips.length === 0 ? (
                    <p>No trips available.</p>
                ) : (
                    renderAllTrips()
                )}
            </ul>
        </div>
    );
}

export default AllTrips;
