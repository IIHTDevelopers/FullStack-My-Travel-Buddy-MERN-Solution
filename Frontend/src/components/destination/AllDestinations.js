import React, { useEffect, useState } from 'react';
import DestinationService from '../../services/destination.service';

function AllDestination() {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const data = await DestinationService.getAllDestinations();
                setDestinations(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDestinations();
    }, []);

    const refreshDestinations = async () => {
        try {
            const data = await DestinationService.getAllDestinations();
            setDestinations(data);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <h3>All Destinations</h3>
            <ul>
                {destinations.map((destination) => (
                    <li key={destination._id}>
                        <h4>{destination.name}</h4>
                        <p>Description: {destination.description}</p>
                        <p>Category: {destination.category}</p>
                        <p>Budget: {destination.budget}</p>
                        <p>Image URL: {destination.imageUrl}</p>
                        <p>Attractions:</p>
                        <ul>
                            {destination.attractions.map((attraction, index) => (
                                <li key={index}>{attraction}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AllDestination;
