import { AdminLayout, ClientLayout } from 'src/layouts';
import {
    Cart,
    EditCategory,
    EditProduct,
    Home,
    ListCategories,
    ListProduct,
    Login,
    NewCategory,
    NewProduct,
    Order,
    ProductDetail,
    Register,
} from 'src/pages';

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
        path: '/product/:id',
        component: ProductDetail,
        layout: ClientLayout,
    },
    {
        path: '/cart',
        component: Cart,
        layout: ClientLayout,
    },
    {
        path: '/order',
        component: Order,
        layout: ClientLayout,
    },
    {
        path: '/list-products',
        component: ListProduct,
        layout: ClientLayout,
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
    {
        path: '/admin/edit-product/:id',
        component: EditProduct,
        layout: AdminLayout,
    },
    {
        path: '/admin/list-categories',
        component: ListCategories,
        layout: AdminLayout,
    },
    {
        path: '/admin/new-category',
        component: NewCategory,
        layout: AdminLayout,
    },
    {
        path: '/admin/edit-category/:id',
        component: EditCategory,
        layout: AdminLayout,
    },
];
