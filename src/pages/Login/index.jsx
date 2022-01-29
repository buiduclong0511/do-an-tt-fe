import { Button, colors, Divider, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authApi from 'src/api/auth';
import { useQuery } from 'src/hooks';
import { setUserInfo } from 'src/redux/slices';
import * as yup from 'yup';

function Login() {
    const navigate = useNavigate();
    const currentPath = useQuery().get('path');

    const initialValues = useMemo(
        () => ({
            email: 'ngodiep222@gmail.com',
            password: '123456',
        }),
        [],
    );
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            try {
                const res = await authApi.login(values);
                dispatch(setUserInfo({ userInfo: res.user, token: res.token }));

                toast.success('Đăng nhập thành công!');
                if (currentPath) {
                    navigate(currentPath, { replace: true });
                } else {
                    navigate('/', { replace: true });
                }
            } catch (err) {
                toast.error('Đăng nhập thất bại!');
            }
        },
        validationSchema: yup.object().shape({
            email: yup.string().required('Bạn chưa nhập email!').email('Email không hợp lệ!'),
            password: yup.string().required('Bạn chưa nhập mật khẩu!'),
        }),
    });

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Stack
                direction="column"
                alignItems="center"
                sx={{ minWidth: '400px', border: `1px solid ${colors.grey[500]}`, padding: 3, borderRadius: '4px' }}
            >
                <Typography mb={2} variant="h1" fontSize="25px" fontWeight={400}>
                    Đăng nhập
                </Typography>
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.onBlur}
                    size="small"
                    placeholder="Nhập email"
                    sx={{ mb: 3 }}
                    error={formik.touched.email && !!formik.errors.email}
                    helperText={formik.touched.email && !!formik.errors.email ? formik.errors.email : ''}
                />
                <TextField
                    fullWidth
                    type="password"
                    value={formik.values.password}
                    label="Mật khẩu"
                    onChange={formik.handleChange}
                    onBlur={formik.onBlur}
                    name="password"
                    size="small"
                    placeholder="Nhập mật khẩu"
                    sx={{ mb: 3 }}
                    error={formik.touched.password && !!formik.errors.password}
                    helperText={formik.touched.password && !!formik.errors.password ? formik.errors.password : ''}
                />
                <Divider orientation="horizontal" sx={{ width: '100%' }} />
                <Button variant="contained" sx={{ mt: 3 }} fullWidth onClick={formik.handleSubmit}>
                    Đăng nhập
                </Button>
                <Typography mt={1}>
                    Bạn chưa có tài khoản?{' '}
                    <Box component={Link} to="/register" sx={{ color: colors.deepOrange[500], textDecoration: 'none' }}>
                        Đăng ký
                    </Box>
                </Typography>
            </Stack>
        </Box>
    );
}

export default Login;
