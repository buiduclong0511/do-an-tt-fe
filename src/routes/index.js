import { AdminLayout, ClientLayout } from 'src/layouts';
import { Home, ListProduct, Login, NewProduct, Register } from 'src/pages';

export const routes = [
    {
        path: '/',
        component: Home,
        layout: ClientLayout,
    },
    {
        path: '/login',
        component: Login,
        layout: null,
    },
    {
        path: '/register',
        component: Register,
        layout: null,
    },
    {
        path: '/admin/new-product',
        component: NewProduct,
        layout: AdminLayout,
    },
    {
        path: '/admin/list-products',
        component: ListProduct,
        layout: AdminLayout,
    },
];
