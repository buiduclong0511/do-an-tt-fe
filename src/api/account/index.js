import axiosClient from '../axiosClient';

const AccountApi = {
    getList() {
        const url = '/api/users';

        return axiosClient.get(url);
    },
    changeRole(id) {
        const url = '/api/users/' + id;

        return axiosClient.post(
            url,
            {},
            {
                params: {
                    _method: 'PATCH',
                },
            },
        );
    },
    delete(id) {
        const url = '/api/users/' + id;

        return axiosClient.delete(url);
    },
};

export default AccountApi;
