import axios from 'axios';
import authService from './auth.service';

const API_BASE_URL = 'http://127.0.0.1:8081/api/destinations';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const destinationService = {
    createDestination: async (destinationData) => {
        try {
            const response = await axiosInstance.post(`${API_BASE_URL}`, destinationData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getDestination: async (destinationId) => {
        try {
            const response = await axiosInstance.get(`/${destinationId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateDestination: async (destinationId, destinationData) => {
        try {
            const token = authService.getToken();
            const response = await axiosInstance.put(
                `/${destinationId}`,
                destinationData,
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

    deleteDestination: async (destinationId) => {
        try {
            const token = authService.getToken();
            const response = await axiosInstance.delete(
                `/${destinationId}`,
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

    searchDestinations: async (searchParams) => {
        try {
            const response = await axiosInstance.get('/search', {
                params: searchParams,
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
            const response = await axiosInstance.get('/top-rated');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default destinationService;
