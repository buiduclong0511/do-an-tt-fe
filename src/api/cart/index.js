import axiosClient from '../axiosClient';

const cartApi = {
    getUserCart() {
        const url = 'api/carts';

        return axiosClient.get(url);
    },
    addToCart(body) {
        const url = 'api/carts';

        return axiosClient.post(url, body);
    },
    deleteProductFromCart(id) {
        const url = 'api/carts';

        return axiosClient.post(url, { product_id: id }, { params: { _method: 'PATCH' } });
    },
};

export default cartApi;
