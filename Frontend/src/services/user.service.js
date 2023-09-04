import axios from 'axios';

const API_BASE_URL = 'http://your-api-url-here'; // Replace with your actual API base URL

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // You may need to include authentication headers here if required
    },
});

const userService = {
    createUser: async (userData) => {
        try {
            const response = await axiosInstance.post('/users', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getUser: async () => {
        try {
            const response = await axiosInstance.get('/users');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateUser: async (userData) => {
        try {
            const response = await axiosInstance.put('/users', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteUser: async () => {
        try {
            const response = await axiosInstance.delete('/users');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getUpcomingTrips: async () => {
        try {
            const response = await axiosInstance.get('/users/upcoming-trips');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getPastTrips: async () => {
        try {
            const response = await axiosInstance.get('/users/past-trips');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getTripPlans: async () => {
        try {
            const response = await axiosInstance.get('/users/all-trips');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getUserBookings: async () => {
        try {
            const response = await axiosInstance.get('/users/bookings');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getUserReviews: async () => {
        try {
            const response = await axiosInstance.get('/users/reviews');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default userService;
