import axios from 'axios';

const API_BASE_URL = 'http://your-api-url-here'; // Replace with your actual API base URL

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // You may need to include authentication headers here if required
    },
});

const reviewService = {
    createReview: async (reviewData) => {
        try {
            const response = await axiosInstance.post('/reviews', reviewData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getReview: async (reviewId) => {
        try {
            const response = await axiosInstance.get(`/reviews/${reviewId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateReview: async (reviewId, reviewData) => {
        try {
            const response = await axiosInstance.put(`/reviews/${reviewId}`, reviewData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteReview: async (reviewId) => {
        try {
            const response = await axiosInstance.delete(`/reviews/${reviewId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    searchReviewsByDestination: async (destinationName) => {
        try {
            const response = await axiosInstance.get(`/reviews/search?destinationName=${destinationName}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    searchReviewsByUser: async (userId) => {
        try {
            const response = await axiosInstance.get(`/reviews/search/user/${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    searchReviewsByRating: async (minRating, maxRating) => {
        try {
            const response = await axiosInstance.get(`/reviews/search/rating?min=${minRating}&max=${maxRating}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getAllReviews: async () => {
        try {
            const response = await axiosInstance.get('/reviews');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default reviewService;
