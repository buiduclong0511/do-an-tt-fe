import { Button, colors, Divider, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

function Register() {
    const initialValues = useMemo(
        () => ({
            email: '',
            password: '',
            confirmPassword: '',
        }),
        [],
    );

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            console.log(values);
        },
        validationSchema: yup.object().shape({
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
                background: colors.grey[300],
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
                    label="Email"
                    name="email"
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
                <TextField
                    fullWidth
                    type="password"
                    label="Xác thực mật khẩu"
                    onChange={formik.handleChange}
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
