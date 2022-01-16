import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { colors, IconButton, MenuItem, MenuList, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from 'src/api';
import { clearUserInfo } from 'src/redux/slices';

function AdminLayout({ children }) {
    const userInfo = useSelector((state) => state.auth).userInfo;
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogout = useCallback(() => {
        authApi.logout().then(() => {
            dispatch(clearUserInfo());
        });
    }, [dispatch]);

    useEffect(() => {
        if (!userInfo || userInfo?.role === 0) {
            navigate('/', { replace: true });
        }
    }, [navigate, userInfo]);

    useEffect(() => {
        if (!userInfo || userInfo?.role !== 1) {
            handleLogout();
            navigate(`/login`, { replace: true });
        }
    }, [handleLogout, navigate, userInfo]);

    return (
        <Stack direction="column" minHeight="100vh">
            <Stack direction="row" sx={{ background: colors.blue[500], color: '#fff', height: '50px' }}>
                <Box width="200px" sx={{ display: 'flex', alignItems: 'center', pl: 2 }}>
                    Minh Anh Shop
                </Box>
                <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ flex: 1 }}>
                    <Typography pr={4}>
                        {userInfo.name}{' '}
                        <IconButton onClick={handleLogout} sx={{ color: '#fff' }}>
                            <PowerSettingsNewIcon />
                        </IconButton>
                    </Typography>
                </Stack>
            </Stack>
            <Stack direction="row" sx={{ flex: 1 }}>
                <Box width="200px" sx={{ borderRight: '1px solid #ccc' }}>
                    <MenuList>
                        <MenuItem>
                            <Typography
                                component={Link}
                                to="/admin/list-categories"
                                sx={{ width: '100%', textDecoration: 'none', color: colors.common.black }}
                            >
                                Quản lý danh mục
                            </Typography>
                        </MenuItem>
                        <MenuItem>
                            <Typography
                                component={Link}
                                to="/admin/list-products"
                                sx={{ width: '100%', textDecoration: 'none', color: colors.common.black }}
                            >
                                Quản lý sản phẩm
                            </Typography>
                        </MenuItem>
                        <MenuItem>
                            <Typography
                                component={Link}
                                to="/admin/list-orders"
                                sx={{ width: '100%', textDecoration: 'none', color: colors.common.black }}
                            >
                                Quản lý đơn hàng
                            </Typography>
                        </MenuItem>
                    </MenuList>
                </Box>
                <Box sx={{ flex: 1 }}>{children}</Box>
            </Stack>
        </Stack>
    );
}

export default AdminLayout;
