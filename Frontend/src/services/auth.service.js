import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8081/api/auth';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const authService = {
    login: async (email, password) => {
        try {
            const response = await axiosInstance.post('/login', { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            return token;
        } catch (error) {
            throw error;
        }
    },

    changePassword: async (userId, newPassword) => {
        try {
            await axiosInstance.post('/changePassword', { userId, newPassword });
            // Password changed successfully
        } catch (error) {
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
    },

    isLoggedIn: () => {
        const token = localStorage.getItem('token');
        return !!token;
    },

    getToken: () => {
        const token = localStorage.getItem('token');
        return token ? `${token}` : '';
    },
};

export default authService;
