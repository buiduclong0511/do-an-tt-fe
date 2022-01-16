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
    getAllOrders(q) {
        const url = 'api/orders/all';

        return axiosClient.get(url, { params: { q } });
    },
};

export default orderApi;
