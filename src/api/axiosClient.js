import axios from 'axios';
import { store } from 'src/redux';

const queryString = require('query-string');

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,

    withCredentials: false,

    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use((config) => {
    const token = store.getState().auth.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },

    (error) => {
        // Handle errors
        // if (error.response && error.response.status === 401) {
        //     store.dispatch(logout());
        // }
        throw error;
    },
);

export default axiosClient;
