import axiosClient from '../axiosClient';

const categoryApi = {
    getCategories() {
        const url = 'api/categories';

        return axiosClient.get(url);
    },
};

export default categoryApi;
