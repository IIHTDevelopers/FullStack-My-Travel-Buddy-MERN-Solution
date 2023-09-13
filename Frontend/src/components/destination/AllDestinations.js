import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import DestinationService from '../../services/destination.service';
import authService from 'src/services/auth.service';

function AllDestination() {
    const [allDestinations, setAllDestinations] = useState([]);
    const [searchQuery, setSearchQuery] = useState({
        name: '',
        category: '',
        minBudget: '',
        maxBudget: '',
    });

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const data = await DestinationService.getAllDestinations();
                setAllDestinations(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDestinations();
    }, []);

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
            if (Object.entries(queryParams).length === 0) {
                const data = await DestinationService.getAllDestinations();
                setAllDestinations(data);
            } else {
                const data = await DestinationService.searchDestinations(queryParams);
                setAllDestinations(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (destinationId) => {
        try {
            await DestinationService.deleteDestination(destinationId);
            const updatedData = await DestinationService.getAllDestinations();
            setAllDestinations(updatedData);
        } catch (error) {
            console.error(error);
        }
    };

    const isLoggedIn = authService.isLoggedIn();

    return (
        <div>
            <h1>All Destinations</h1>
            <h3>Search Destination</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" value={searchQuery.name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="category">Category:</label>
                    <input type="text" name="category" id="category" value={searchQuery.category} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="minBudget">Min Budget:</label>
                    <input type="number" name="minBudget" id="minBudget" value={searchQuery.minBudget} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="maxBudget">Max Budget:</label>
                    <input type="number" name="maxBudget" id="maxBudget" value={searchQuery.maxBudget} onChange={handleChange} />
                </div>
                <button type="submit">Search</button>
            </form>
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
                            <Link to={`/destination/add/${destination._id}`}>Edit</Link>
                            <button onClick={() => handleDelete(destination._id)}>Delete</button>
                            {isLoggedIn && (
                                <Link to={`/review/add/${destination._id}`} > Add Review</Link>
                            )}
                        </li>
                    ))}
                </ul>
            )
            }
        </div >
    );
}

export default AllDestination;
