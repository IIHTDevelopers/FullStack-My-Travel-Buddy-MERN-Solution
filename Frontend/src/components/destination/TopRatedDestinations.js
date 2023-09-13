import React, { useState, useEffect } from 'react';
import DestinationService from 'src/services/destination.service';

const TopRatedDestinations = () => {
    const [allDestinations, setAllDestinations] = useState([]);

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const data = await DestinationService.getTopRatedDestinations();
                setAllDestinations(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDestinations();
    }, []);

    return (
        <div>
            <h1>All Destinations</h1>
            {allDestinations.length === 0 ? (
                <p>No Destination</p>
            ) : (
                <ul>
                    {allDestinations.map((destination) => (
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
            )}
        </div>
    );
}

export default TopRatedDestinations;
