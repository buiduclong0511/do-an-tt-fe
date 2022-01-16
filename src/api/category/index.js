import axiosClient from '../axiosClient';
import { serialize } from 'object-to-formdata';

const categoryApi = {
    getCategories(q) {
        const url = 'api/categories';

        if (q) {
            return axiosClient.get(url, { params: { q } });
        }

        return axiosClient.get(url);
    },
    deleteCategory(id) {
        const url = 'api/categories/' + id;

        return axiosClient.delete(url);
    },
    createCategory(body) {
        const url = 'api/categories';

        return axiosClient.post(url, serialize(body));
    },
    getCategoryById(id) {
        const url = 'api/categories/' + id;

        return axiosClient.get(url);
    },
    updateCategory(id, body) {
        const url = 'api/categories/' + id;

        return axiosClient.post(url, serialize(body), { params: { _method: 'PATCH' } });
    },
    getProductsCategory(id) {
        const url = `api/categories/${id}/products`;

        return axiosClient.get(url);
    },
};

export default categoryApi;
