import { Badge, Box, Button, colors, Container, IconButton, Stack, Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import authApi from 'src/api/auth';
import { clearUserInfo, setCart, setOrder } from 'src/redux/slices';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { cartApi, categoryApi, orderApi, productApi } from 'src/api';

function Header() {
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.auth).userInfo;
    const cart = useSelector((state) => state.cart).cart;
    const orders = useSelector((state) => state.order).orders;
    const dispatch = useDispatch();

    const [categories, setCategories] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (userInfo) {
            cartApi.getUserCart().then((res) => dispatch(setCart(res.data)));
            orderApi.getOrders().then((res) => dispatch(setOrder(res.data || [])));
        }
    }, [dispatch, userInfo]);

    useEffect(() => {
        categoryApi.getCategories().then((res) => setCategories(res.data));
    }, []);

    const handleLogout = useCallback(() => {
        authApi.logout().then(() => {
            dispatch(clearUserInfo());
        });
    }, [dispatch]);

    const handleSearch = useCallback((q) => productApi.getProducts(q).then((res) => setProducts(res.data)), []);

    useEffect(() => {
        handleSearch(inputValue.trim());
    }, [handleSearch, inputValue]);

    return (
        <Box>
            <Container maxWidth="lg">
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ height: '56px', color: colors.common.white }}
                >
                    <Stack direction="row" alignItems="center">
                        <Typography component={Link} to="/" sx={{ color: colors.common.white, textDecoration: 'none' }}>
                            Minh Anh Shop
                        </Typography>
                        <Stack direction="row" ml={4}>
                            <Box sx={{ position: 'relative' }}>
                                <Box
                                    component="input"
                                    sx={{
                                        outline: 'none',
                                        border: 'none',
                                        p: 1,
                                        width: '300px',
                                    }}
                                    placeholder="Nhập tên laptop cần tìm kiếm..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value.trim())}
                                />
                                {!!inputValue.trim() && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: '100%',
                                            left: 0,
                                            width: '100%',
                                            backgroundColor: '#fff',
                                            color: '#000',
                                            boxShadow: (theme) => theme.shadows[4],
                                        }}
                                    >
                                        {products.map((product) => (
                                            <Box
                                                onClick={() => navigate(`/product/${product.id}`)}
                                                key={product.id}
                                                sx={{
                                                    p: 1,
                                                    borderTop: '1px solid #ccc',
                                                    cursor: 'pointer',
                                                    transition: '300ms',
                                                    '&:hover': {
                                                        color: colors.red[500],
                                                    },
                                                }}
                                            >
                                                <Box>{product.name}</Box>
                                                <Box sx={{ fontSize: '13px' }}>
                                                    {Number(product.price).toLocaleString()} VND
                                                </Box>
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                            <Box
                                component="button"
                                sx={{
                                    background: '#000',
                                    color: '#fff',
                                    outline: 'none',
                                    border: 'none',
                                    width: '31px',
                                    cursor: 'pointer',
                                }}
                            >
                                <SearchIcon />
                            </Box>
                        </Stack>
                    </Stack>
                    <Box>
                        {userInfo ? (
                            <Stack direction="row" alignItems="center">
                                <Badge
                                    badgeContent={orders.length}
                                    color="primary"
                                    sx={{ mr: 2, cursor: 'pointer' }}
                                    onClick={() => navigate('/order')}
                                >
                                    <LocalShippingIcon />
                                </Badge>
                                <Badge
                                    badgeContent={cart?.products ? cart.products.length : 0}
                                    color="primary"
                                    sx={{ mr: 2, cursor: 'pointer' }}
                                    onClick={() => navigate('/cart')}
                                >
                                    <ShoppingCartIcon />
                                </Badge>
                                <Typography>
                                    {userInfo.name}{' '}
                                    <IconButton sx={{ color: '#fff' }} onClick={handleLogout}>
                                        <PowerSettingsNewIcon />
                                    </IconButton>
                                </Typography>
                            </Stack>
                        ) : (
                            <Button component={Link} to="/login" variant="contained">
                                Đăng nhập
                            </Button>
                        )}
                    </Box>
                </Stack>
            </Container>
            <Box sx={{ background: '#000', py: 1, color: '#fff' }}>
                <Container maxWidth="lg">
                    <Stack direction="row">
                        {categories.map((category) => (
                            <Box key={category.id} mr={4} sx={{ cursor: 'pointer' }}>
                                {category.name}
                            </Box>
                        ))}
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}

export default Header;
