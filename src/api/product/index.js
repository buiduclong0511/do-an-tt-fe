import axiosClient from '../axiosClient';
import { serialize } from 'object-to-formdata';

const productApi = {
    getProducts(q = '', orderBy = '', sortDir = '') {
        const url = 'api/products';

        const params = {};

        if (q) {
            params.q = q;
        }
        if (orderBy) {
            params.orderBy = orderBy;
        }
        if (sortDir) {
            params.sortDir = sortDir;
        }

        return axiosClient.get(url, { params });
    },
    createProduct(body) {
        const url = 'api/products';

        return axiosClient.post(url, serialize(body));
    },
    deleteProduct(id) {
        const url = 'api/products/' + id;

        return axiosClient.delete(url);
    },
    updateProduct(id, body) {
        const url = 'api/products/' + id;

        return axiosClient.post(url, serialize(body), { params: { _method: 'PATCH' } });
    },
    getProductById(id) {
        const url = 'api/products/' + id;

        return axiosClient.get(url);
    },
};

export default productApi;
