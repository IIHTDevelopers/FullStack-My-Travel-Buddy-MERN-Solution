import axios from 'axios';
import authService from './auth.service';

const API_BASE_URL = 'http://127.0.0.1:8081/api';
const token = authService.getToken();
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
});

const bookingService = {
    createBooking: async (bookingData) => {
        try {
            const response = await axiosInstance.post('/bookings', bookingData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getBooking: async (bookingId) => {
        try {
            const response = await axiosInstance.get(`/bookings/${bookingId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateBooking: async (bookingId, bookingData) => {
        try {
            const response = await axiosInstance.put(`/bookings/${bookingId}`, bookingData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteBooking: async (bookingId) => {
        try {
            const response = await axiosInstance.delete(`/bookings/${bookingId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    searchBookings: async (status, destinationName) => {
        try {
            if (status) {
                const response = await axiosInstance.get(`/bookings/search?status=${status}`);
                return response.data;
            } else if (destinationName) {
                const response = await axiosInstance.get(`/bookings/search?destinationName=${destinationName}`);
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    },

    getAllBookings: async () => {
        try {
            const response = await axiosInstance.get('/bookings');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getUpcomingBookingsForUser: async () => {
        try {
            const response = await axiosInstance.get('/bookings/upcoming');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default bookingService;
