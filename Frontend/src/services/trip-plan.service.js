import axios from 'axios';
import authService from './auth.service';

const API_BASE_URL = 'http://127.0.0.1:8081/api';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const tripPlanService = {
    createTripPlan: async (tripPlanData) => {
        try {
            const token = authService.getToken();
            const response = await axiosInstance.post(
                '/trips',
                tripPlanData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getTripPlan: async (tripPlanId) => {
        try {
            const response = await axiosInstance.get(`/trips/${tripPlanId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateTripPlan: async (tripPlanId, tripPlanData) => {
        try {
            const token = authService.getToken();
            const response = await axiosInstance.put(
                `/trips/${tripPlanId}`,
                tripPlanData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteTripPlan: async (tripPlanId) => {
        try {
            const token = authService.getToken();
            const response = await axiosInstance.delete(
                `/trips/${tripPlanId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    searchTripPlansByDestination: async (destinationName) => {
        try {
            const response = await axiosInstance.get(`/trips/search?destinationName=${destinationName}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    searchTripPlansByBudgetRange: async (minBudget, maxBudget) => {
        try {
            const response = await axiosInstance.get(`/trips/search?min=${minBudget}&max=${maxBudget}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getAllTripPlans: async () => {
        try {
            const response = await axiosInstance.get('/trips');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getTripPlansByUser: async () => {
        try {
            const token = authService.getToken();
            const response = await axiosInstance.get(
                '/trips/me',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getPopularTripPlans: async () => {
        try {
            const response = await axiosInstance.get('/trips/popular');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default tripPlanService;
