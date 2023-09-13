import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import DestinationService from '../../services/destination.service';
import authService from 'src/services/auth.service';

function AddDestination() {
    const history = useHistory();
    const { id } = useParams();

    const [destination, setDestination] = useState({
        name: '',
        description: '',
        category: '',
        budget: 0,
        imageUrl: '',
        attractions: [],
    });

    const goToRoute = () => {
        history.push('/destination/all');
    };

    useEffect(() => {
        if (id && id.length > 3) {
            const fetchDestination = async () => {
                try {
                    const data = await DestinationService.getDestination(id);
                    setDestination(data);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchDestination();
        }
    }, [id]);

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
            if (id) {
                if (!authService.isLoggedIn()) {
                    history.push('/login');
                    return;
                }
                await DestinationService.updateDestination(id, destination);
            } else {
                await DestinationService.createDestination(destination);
            }
            goToRoute();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>{id ? 'Edit Destination' : 'Add Destination'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" value={destination.name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" value={destination.description} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="category">Category:</label>
                    <input type="text" name="category" id="category" value={destination.category} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="budget">Budget:</label>
                    <input type="number" name="budget" id="budget" value={destination.budget} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="imageUrl">Image URL:</label>
                    <input type="text" name="imageUrl" id="imageUrl" value={destination.imageUrl} onChange={handleChange} />
                </div>
                <button type="submit">{id ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
}

export default AddDestination;
