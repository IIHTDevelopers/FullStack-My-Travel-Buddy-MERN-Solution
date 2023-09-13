import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ReviewService from '../../services/review.service';

function AddReview() {
    const history = useHistory();
    const { id } = useParams();
    const destinationId = id;

    const [review, setReview] = useState({
        user: '64eca3aa636c9fd96a9b2924',
        destination: destinationId,
        rating: 0,
        comment: '',
        helpfulVotes: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReview((prevReview) => ({
            ...prevReview,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ReviewService.createReview(review);
            goToRoute();
        } catch (error) {
            console.error(error);
        }
    };

    const goToRoute = () => {
        history.push('/review');
    };

    return (
        <div>
            <h1>Add Review</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="rating">Rating:</label>
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        value={review.rating}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="comment">Comment:</label>
                    <textarea
                        id="comment"
                        name="comment"
                        value={review.comment}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="helpfulVotes">Helpful Votes:</label>
                    <input
                        type="number"
                        id="helpfulVotes"
                        name="helpfulVotes"
                        value={review.helpfulVotes}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default AddReview;
