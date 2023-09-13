import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import TripPlanService from '../../services/trip-plan.service';
import DestinationService from '../../services/destination.service';

const AddTrip = () => {
    const history = useHistory();
    const { id } = useParams();
    const [trip, setTrip] = useState({
        destination: '',
        startDate: '',
        endDate: '',
        activities: [''],
        accommodations: {
            hotel: '',
            checkInDate: '',
            checkOutDate: '',
        },
    });
    const [destinationDetails, setDestinationDetails] = useState({});
    const [destinationOptions, setDestinationOptions] = useState([]);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const destinations = await DestinationService.getAllDestinations();
                setDestinationOptions(destinations);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDestinations();
    }, []);

    useEffect(() => {
        if (id && id.length > 3) {
            const fetchTripDetails = async () => {
                try {
                    const data = await TripPlanService.getTripPlan(id);
                    setTrip(data);
                    fetchDestinationDetails(data.destination);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchTripDetails();
        }
    }, [id]);

    const fetchDestinationDetails = async (destinationId) => {
        try {
            const details = await DestinationService.getDestination(destinationId);
            setDestinationDetails(details);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTrip((prevTrip) => ({
            ...prevTrip,
            [name]: value,
        }));
    };

    const handleDestinationChange = (e) => {
        const selectedDestinationId = e.target.value;
        setTrip((prevTrip) => ({
            ...prevTrip,
            destination: selectedDestinationId,
        }));
    };

    const handleActivitiesChange = (e, index) => {
        const { value } = e.target;
        const updatedActivities = [...trip.activities];
        updatedActivities[index] = value;
        setTrip((prevTrip) => ({
            ...prevTrip,
            activities: updatedActivities,
        }));
    };

    const handleAddActivityField = () => {
        setTrip((prevTrip) => ({
            ...prevTrip,
            activities: [...prevTrip.activities, ''],
        }));
    };

    const handleAccommodationsChange = (e) => {
        const { name, value } = e.target;
        setTrip((prevTrip) => ({
            ...prevTrip,
            accommodations: {
                ...prevTrip.accommodations,
                [name]: value,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id && id.length > 3) {
                await TripPlanService.updateTripPlan(id, trip);
            } else {
                await TripPlanService.createTripPlan(trip);
            }
            goToRoute();
        } catch (error) {
            console.error(error);
        }
    };

    const goToRoute = () => {
        history.push('/trips/all');
    };

    return (
        <div>
            <h1>{id && id.length > 3 ? 'Edit Trip' : 'Add Trip'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Destination:</label>
                    <select name="destination" value={trip.destination} onChange={handleDestinationChange}>
                        <option value="">Select a destination</option>
                        {destinationOptions.map((destination) => (
                            <option key={destination._id} value={destination._id}>
                                {destination.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Start Date:</label>
                    <input type="date" name="startDate" value={trip.startDate.slice(0, 10)} onChange={handleChange} />
                </div>
                <div>
                    <label>End Date:</label>
                    <input type="date" name="endDate" value={trip.endDate.slice(0, 10)} onChange={handleChange} />
                </div>
                <div>
                    <label>Activities:</label>
                    {trip.activities.map((activity, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                name="activity"
                                value={activity}
                                onChange={(e) => handleActivitiesChange(e, index)}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddActivityField}>
                        + Add Activity
                    </button>
                </div>
                <div>
                    <label>Accommodations:</label>
                    <input
                        type="text"
                        name="hotel"
                        placeholder="Hotel Name"
                        value={trip.accommodations.hotel}
                        onChange={handleAccommodationsChange}
                    />
                    <input
                        type="date"
                        name="checkInDate"
                        placeholder="Check-in Date"
                        value={trip.accommodations.checkInDate.slice(0, 10)}
                        onChange={handleAccommodationsChange}
                    />
                    <input
                        type="date"
                        name="checkOutDate"
                        placeholder="Check-out Date"
                        value={trip.accommodations.checkOutDate.slice(0, 10)}
                        onChange={handleAccommodationsChange}
                    />
                </div>
                <button type="submit">{(id && id.length > 3) ? 'Update Trip' : 'Create Trip'}</button>
            </form>
        </div>
    );
}

export default AddTrip;
