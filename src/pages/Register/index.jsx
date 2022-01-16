import { Button, colors, Divider, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authApi } from 'src/api';
import { setUserInfo } from 'src/redux/slices';
import * as yup from 'yup';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialValues = useMemo(
        () => ({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        }),
        [],
    );

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            try {
                const res = await authApi.register({
                    name: values.name,
                    email: values.email,
                    password: values.password,
                });
                console.log('~ res', res);
                toast.success('Đăng ký thành công!');
                dispatch(setUserInfo({ token: res.token, userInfo: res.user }));
                navigate('/', { replace: true });
            } catch (err) {
                toast.error('Có lỗi xảy ra!');
            }
        },
        validationSchema: yup.object().shape({
            name: yup.string().required('Bạn chưa nhập tên!'),
            email: yup.string().required('Bạn chưa nhập email!').email('Email không hợp lệ!'),
            password: yup.string().required('Bạn chưa nhập mật khẩu!'),
            confirmPassword: yup
                .string()
                .required('Bạn chưa nhập lại mật khẩu!')
                .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp!'),
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
                    Đăng ký
                </Typography>
                <TextField
                    fullWidth
                    label="Tên người dùng"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.onBlur}
                    value={formik.values.name}
                    size="small"
                    placeholder="Nhập tên người dùng"
                    sx={{ mb: 3 }}
                    error={formik.touched.name && !!formik.errors.name}
                    helperText={formik.touched.name && !!formik.errors.name ? formik.errors.name : ''}
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.onBlur}
                    value={formik.values.email}
                    size="small"
                    placeholder="Nhập email"
                    sx={{ mb: 3 }}
                    error={formik.touched.email && !!formik.errors.email}
                    helperText={formik.touched.email && !!formik.errors.email ? formik.errors.email : ''}
                />
                <TextField
                    fullWidth
                    type="password"
                    label="Mật khẩu"
                    onChange={formik.handleChange}
                    onBlur={formik.onBlur}
                    value={formik.values.password}
                    name="password"
                    size="small"
                    placeholder="Nhập mật khẩu"
                    sx={{ mb: 3 }}
                    error={formik.touched.password && !!formik.errors.password}
                    helperText={formik.touched.password && !!formik.errors.password ? formik.errors.password : ''}
                />
                <TextField
                    fullWidth
                    type="password"
                    label="Xác thực mật khẩu"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    onBlur={formik.onBlur}
                    name="confirmPassword"
                    size="small"
                    placeholder="Nhập lại mật khẩu"
                    sx={{ mb: 3 }}
                    error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                    helperText={
                        formik.touched.confirmPassword && !!formik.errors.confirmPassword
                            ? formik.errors.confirmPassword
                            : ''
                    }
                />
                <Divider orientation="horizontal" sx={{ width: '100%' }} />
                <Button variant="contained" sx={{ mt: 3 }} fullWidth onClick={formik.handleSubmit}>
                    Đăng ký
                </Button>
                <Typography mt={1}>
                    Bạn đã có tài khoản?{' '}
                    <Box component={Link} to="/login" sx={{ color: colors.deepOrange[500], textDecoration: 'none' }}>
                        Đăng nhập
                    </Box>
                </Typography>
            </Stack>
        </Box>
    );
}

export default Register;
