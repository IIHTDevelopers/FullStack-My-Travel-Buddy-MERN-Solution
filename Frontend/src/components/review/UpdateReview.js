import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ReviewService from '../../services/review.service';

const UpdateReview = () => {
    const history = useHistory();
    const { id } = useParams();

    const [review, setReview] = useState({
        user: '',
        destination: '',
        rating: 0,
        comment: '',
        helpfulVotes: 0,
    });

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const data = await ReviewService.getReview(id);
                setReview(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchReview();
    }, [id]);

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
            await ReviewService.updateReview(id, review);
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
            <h1>Edit Review</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="rating">Rating:</label>
                    <input
                        type="number"
                        name="rating"
                        id="rating" // Add the id attribute
                        value={review.rating}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="comment">Comment:</label>
                    <textarea
                        name="comment"
                        id="comment" // Add the id attribute
                        value={review.comment}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="helpfulVotes">Helpful Votes:</label>
                    <input
                        type="number"
                        name="helpfulVotes"
                        id="helpfulVotes" // Add the id attribute
                        value={review.helpfulVotes}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default UpdateReview;
