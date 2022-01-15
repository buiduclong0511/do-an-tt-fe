import axiosClient from '../axiosClient';

const authApi = {
    login(body) {
        const url = '/api/auth/login';

        return axiosClient.post(url, body);
    },
    register(body) {
        const url = '/api/auth/register';

        return axiosClient.post(url, body);
    },
    logout() {
        const url = '/api/auth/logout';

        return axiosClient.post(url);
    },
    getMe() {
        const url = '/api/auth/me';

        return axiosClient.get(url);
    },
};

export default authApi;
