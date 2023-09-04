import axios from 'axios';

const API_BASE_URL = 'http://your-api-url-here'; // Replace with your actual API base URL

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const authService = {
    login: async (email, password) => {
        try {
            const response = await axiosInstance.post('/auth/login', { email, password });
            const { token } = response.data;
            // You can save the token to localStorage or a secure storage mechanism here.
            return token;
        } catch (error) {
            throw error;
        }
    },

    changePassword: async (userId, newPassword) => {
        try {
            await axiosInstance.post('/auth/changePassword', { userId, newPassword });
            // Password changed successfully
        } catch (error) {
            throw error;
        }
    },
};

export default authService;
