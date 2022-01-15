import { Badge, Box, Button, colors, Container, IconButton, Stack, Typography } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import authApi from 'src/api/auth';
import { clearUserInfo, setCart } from 'src/redux/slices';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { cartApi, categoryApi } from 'src/api';

function Header() {
    const userInfo = useSelector((state) => state.auth).userInfo;
    const cart = useSelector((state) => state.cart).cart;
    const dispatch = useDispatch();

    const [categories, setCategories] = React.useState([]);

    const handleLogout = useCallback(() => {
        authApi.logout().then(() => {
            dispatch(clearUserInfo());
        });
    }, [dispatch]);

    useEffect(() => {
        if (userInfo) {
            cartApi.getUserCart().then((res) => dispatch(setCart(res.data)));
        }
    }, [dispatch, userInfo]);

    useEffect(() => {
        categoryApi.getCategories().then((res) => setCategories(res.data));
    }, []);

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
                        <Stack
                            direction="row"
                            ml={4}
                            sx={{
                                input: {
                                    outline: 'none',
                                    border: 'none',
                                    p: 1,
                                    width: '300px',
                                },
                            }}
                        >
                            <input placeholder="Nhập tên laptop cần tìm kiếm..." />
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
                                    badgeContent={cart?.products ? cart.products.length : 0}
                                    color="primary"
                                    sx={{ mr: 2, cursor: 'pointer' }}
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
