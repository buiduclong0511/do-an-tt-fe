import { ClientLayout } from 'src/layouts';
import { Home, Login, Register } from 'src/pages';

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
];
