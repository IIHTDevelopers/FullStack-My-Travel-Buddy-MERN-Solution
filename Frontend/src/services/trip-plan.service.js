import axios from 'axios';

const API_BASE_URL = 'http://your-api-url-here'; // Replace with your actual API base URL

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // You may need to include authentication headers here if required
    },
});

const tripPlanService = {
    createTripPlan: async (tripPlanData) => {
        try {
            const response = await axiosInstance.post('/trip-plans', tripPlanData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getTripPlan: async (tripPlanId) => {
        try {
            const response = await axiosInstance.get(`/trip-plans/${tripPlanId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateTripPlan: async (tripPlanId, tripPlanData) => {
        try {
            const response = await axiosInstance.put(`/trip-plans/${tripPlanId}`, tripPlanData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteTripPlan: async (tripPlanId) => {
        try {
            const response = await axiosInstance.delete(`/trip-plans/${tripPlanId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    searchTripPlansByDestination: async (destinationName) => {
        try {
            const response = await axiosInstance.get(`/trip-plans/search?destinationName=${destinationName}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    searchTripPlansByBudgetRange: async (minBudget, maxBudget) => {
        try {
            const response = await axiosInstance.get(`/trip-plans/search?min=${minBudget}&max=${maxBudget}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getAllTripPlans: async () => {
        try {
            const response = await axiosInstance.get('/trip-plans');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getTripPlansByUser: async () => {
        try {
            const response = await axiosInstance.get('/trip-plans/me');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getPopularTripPlans: async () => {
        try {
            const response = await axiosInstance.get('/trip-plans/popular');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default tripPlanService;
