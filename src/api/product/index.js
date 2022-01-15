import axiosClient from '../axiosClient';

const productApi = {
    getProducts() {
        const url = 'api/products';

        return axiosClient.get(url);
    },
};

export default productApi;
