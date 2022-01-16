import axiosClient from '../axiosClient';

const orderApi = {
    createOrder(body) {
        const url = 'api/orders';

        return axiosClient.post(url, body);
    },
    getOrders() {
        const url = 'api/orders';

        return axiosClient.get(url);
    },
};

export default orderApi;
