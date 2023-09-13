import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import ReviewService from '../../services/review.service';
import DestinationService from '../../services/destination.service';

const AllReview = () => {
    const [reviews, setReviews] = useState([]);
    const [destinationDetails, setDestinationDetails] = useState({});
    const [searchQuery, setSearchQuery] = useState({
        destinationName: '',
        minRating: '',
        maxRating: '',
    });

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await ReviewService.getAllReviews();
                setReviews(data);
                data.forEach((review) => {
                    fetchDestinationDetails(review.destination);
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
        fetchReviews();
    }, []);

    const renderReviews = () => {
        return reviews.map((review) => (
            <li key={review._id}>
                <h4>Destination: {destinationDetails[review.destination]?.name}</h4>
                <p>Rating: {review.rating}</p>
                <p>Comment: {review.comment}</p>
                <Link to={`/review/update/${review._id}`} > Update Review</Link>
            </li>
        ));
    };

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
            let data;
            if (searchQuery.destinationName) {
                data = await ReviewService.searchReviewsByDestination(searchQuery.destinationName);
            } else if (searchQuery.userId) {
                data = await ReviewService.searchReviewsByUser(searchQuery.userId);
            } else if (searchQuery.minRating || searchQuery.maxRating) {
                data = await ReviewService.searchReviewsByRating(
                    searchQuery.minRating || 0,
                    searchQuery.maxRating || 5
                );
            }
            setReviews(data);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <h1>Reviews</h1>
            <h3>Search Reviews</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="destinationName">Destination Name:</label>
                    <input
                        type="text"
                        id="destinationName"
                        name="destinationName"
                        value={searchQuery.destinationName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="minRating">Minimum Rating:</label>
                    <input
                        type="number"
                        id="minRating"
                        name="minRating"
                        value={searchQuery.minRating}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="maxRating">Maximum Rating:</label>
                    <input
                        type="number"
                        id="maxRating"
                        name="maxRating"
                        value={searchQuery.maxRating}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Search</button>
            </form>
            <ul>
                {reviews.length === 0 ? (
                    <p>No reviews available.</p>
                ) : (
                    renderReviews()
                )}
            </ul>
        </div>
    );
}

export default AllReview;
