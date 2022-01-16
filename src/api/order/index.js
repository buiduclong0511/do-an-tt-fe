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
    cancelOrder(id) {
        const url = 'api/orders/' + id;

        return axiosClient.delete(url);
    },
};

export default orderApi;
