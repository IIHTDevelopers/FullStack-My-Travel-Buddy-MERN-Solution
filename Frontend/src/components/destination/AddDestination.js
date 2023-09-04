import React, { useState } from 'react';
import DestinationService from '../../services/destination.service';

function AddDestination({ refreshDestinations }) {
    const [destination, setDestination] = useState({
        name: '',
        description: '',
        category: '',
        budget: 0,
        imageUrl: '',
        attractions: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDestination((prevDestination) => ({
            ...prevDestination,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await DestinationService.createDestination(destination);
            setDestination({
                name: '',
                description: '',
                category: '',
                budget: 0,
                imageUrl: '',
                attractions: [],
            });
            refreshDestinations();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h3>Add Destination</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={destination.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={destination.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={destination.category}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Budget:</label>
                    <input
                        type="number"
                        name="budget"
                        value={destination.budget}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={destination.imageUrl}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Attractions:</label>
                    <textarea
                        name="attractions"
                        value={destination.attractions}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Add Destination</button>
            </form>
        </div>
    );
}

export default AddDestination;
