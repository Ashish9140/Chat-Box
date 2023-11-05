import axios from 'axios';

const api = axios.create({
    baseURL: 'https://wlone.onrender.com',
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
})

// List of all the end point 
export const signUpUser = (data) => api.post('/user/signup', data);
export const loginUser = (data) => api.post('/user/login', data);
export const refreshUser = (data) => api.post('/user/refresh', data);
export const updateUser = (data) => api.post('/user/update', data);
export const forgetPassword = (data) => api.post('/user/forget-password', data);

// Handle All users or groups
export const getUsers = (data) => api.post('/allrooms', data);
export const getChats = (data) => api.post('/chats', data);

export default api;