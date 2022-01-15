import axiosClient from '../axiosClient';

const cartApi = {
    getUserCart() {
        const url = 'api/carts';

        return axiosClient.get(url);
    },
};

export default cartApi;
