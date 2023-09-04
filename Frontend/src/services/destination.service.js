import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8081/api/destinations';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // You may need to include authentication headers here if required
    },
});

const destinationService = {
    createDestination: async (destinationData) => {
        try {
            const response = await axiosInstance.post(`${API_BASE_URL}/create`, destinationData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getDestination: async (destinationId) => {
        try {
            const response = await axiosInstance.get(`/destinations/${destinationId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateDestination: async (destinationId, destinationData) => {
        try {
            const response = await axiosInstance.put(`/destinations/${destinationId}`, destinationData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteDestination: async (destinationId) => {
        try {
            const response = await axiosInstance.delete(`/destinations/${destinationId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    searchDestinations: async (searchParams) => {
        try {
            const response = await axiosInstance.get('/destinations/search', {
                params: searchParams,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    searchDestinationsByBudgetRange: async (min, max) => {
        try {
            const response = await axiosInstance.get('/destinations/search/budget', {
                params: { min, max },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getAllDestinations: async () => {
        try {
            const response = await axiosInstance.get();
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getTopRatedDestinations: async () => {
        try {
            const response = await axiosInstance.get('/destinations/top-rated');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default destinationService;
