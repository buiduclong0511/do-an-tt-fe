import { Button, colors, Container, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { cartApi, orderApi, productApi } from 'src/api';
import { pathFile } from 'src/utils';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCart, setOrder } from 'src/redux/slices';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';

function ProductDetail() {
    const { id } = useParams();
    const cart = useSelector((state) => state.cart).cart;
    const userInfo = useSelector((state) => state.auth).userInfo;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [otherProducts, setOtherProducts] = useState([]);
    const [isShowFormOrder, setIsShowFormOrder] = useState(false);

    const isExistedInCart = useMemo(
        () => !!cart && cart.products.some((_product) => _product.id === product?.id),
        [cart, product?.id],
    );

    useEffect(() => {
        productApi.getProductById(id).then((res) => setProduct(res.data));
        productApi.getProducts().then((res) => setOtherProducts(res.data.slice(0, 4)));
    }, [id]);

    const handleAddToCart = useCallback(
        () =>
            cartApi.addToCart({ product_id: id }).then((res) => {
                dispatch(setCart(res.data));
            }),
        [dispatch, id],
    );

    const formik = useFormik({
        initialValues: {
            receiver: userInfo?.name || '',
            phone: '',
            address: '',
            number: 1,
        },
        onSubmit: async (values) => {
            try {
                const res = await orderApi.createOrder({
                    ...values,
                    price: (values.number * product?.price).toString(),
                    product_id: product?.id,
                });
                dispatch(setOrder(res.data));
                navigate('/order');
                toast.success('?????t h??ng th??nh c??ng!');
            } catch (err) {
                toast.error('C?? l???i x???y ra!');
            }
        },
        validationSchema: yup.object().shape({
            receiver: yup.string().required('Tr?????ng n??y kh??ng ???????c ????? tr???ng!'),
            phone: yup
                .string()
                .required('Tr?????ng n??y kh??ng ???????c ????? tr???ng!')
                .matches(/^0[0-9]{9}$/, 'S??? ??i???n tho???i kh??ng h???p l???!'),
            address: yup.string().required('Tr?????ng n??y kh??ng ???????c ????? tr???ng!'),
            number: yup
                .number()
                .required('Tr?????ng n??y kh??ng ???????c ????? tr???ng!')
                .test({
                    name: 'sdfsd',
                    message: 'S??? l?????ng ph???i l???n h??n 1!',
                    test: (value) => !!Number(value),
                }),
        }),
    });

    const handleShowForm = useCallback(() => setIsShowFormOrder(true), []);

    if (!product) {
        return null;
    }

    return (
        <Box sx={{ flex: 1, background: '#fff', pt: 3, pb: 8 }}>
            <Container maxWidth="lg">
                <Stack direction="row" spacing={2}>
                    <Box sx={{ flex: 1 }}>
                        <Box component="img" sx={{ width: '100%' }} src={pathFile(product.image)} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Box>
                            <Typography variant="h1" fontSize="30px" fontWeight={500}>
                                {product.name}
                            </Typography>
                            {product.description
                                .split('\n')
                                .map((item) => `- ${item}`)
                                .map((description, index) => (
                                    <Typography
                                        fontSize="13px"
                                        fontWeight={400}
                                        mt={1}
                                        component="p"
                                        color={colors.grey[700]}
                                        key={`description-${index}-${product.id}`}
                                    >
                                        {description}
                                    </Typography>
                                ))}
                            <Divider sx={{ my: 2 }} />
                            <Stack direction="row" alignItems="center">
                                Gi??:{' '}
                                <Box
                                    sx={{
                                        background: colors.red[500],
                                        p: 1,
                                        ml: 2,
                                        color: '#fff',
                                        borderRadius: '10px',
                                    }}
                                >
                                    {Number(product.price).toLocaleString()} VND
                                </Box>
                            </Stack>
                            <Divider sx={{ my: 2 }} />
                            <Stack direction="row" spacing={2}>
                                {userInfo ? (
                                    <Button
                                        disabled={isExistedInCart}
                                        variant="contained"
                                        endIcon={<ShoppingCartIcon />}
                                        onClick={handleAddToCart}
                                    >
                                        {isExistedInCart ? 'S???n ph???m ???? c?? trong gi??? h??ng' : 'Th??m v??o gi??? h??ng'}
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        endIcon={<ShoppingCartIcon />}
                                        onClick={() => navigate('/login?path=' + window.location.pathname)}
                                    >
                                        Th??m v??o gi??? h??ng
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    color="error"
                                    endIcon={<AttachMoneyIcon />}
                                    onClick={
                                        userInfo
                                            ? handleShowForm
                                            : () => navigate(`/login?path=${window.location.pathname}`)
                                    }
                                >
                                    ?????t mua
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                </Stack>
                {isShowFormOrder && (
                    <Stack direction="row" justifyContent="center" mt={4}>
                        <Box width="500px">
                            <Typography fontSize="25px" mb={2}>
                                Nh???p th??ng tin ????n h??ng
                            </Typography>
                            <TextField
                                label="T??n ng?????i nh???n"
                                required
                                value={formik.values.receiver}
                                placeholder="Nh???p t??n ng?????i nh??n..."
                                name="receiver"
                                helperText={
                                    !!formik.errors.receiver && formik.touched.receiver ? formik.errors.receiver : ''
                                }
                                error={!!formik.errors.receiver && formik.touched.receiver}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                fullWidth
                                size="small"
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="S??? ??i???n tho???i"
                                required
                                value={formik.values.phone}
                                placeholder="Nh???p s??? ??i???n tho???i..."
                                name="phone"
                                helperText={!!formik.errors.phone && formik.touched.phone ? formik.errors.phone : ''}
                                error={!!formik.errors.phone && formik.touched.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                fullWidth
                                size="small"
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Nh???p ?????a ch???"
                                required
                                value={formik.values.address}
                                placeholder="Nh???p ?????a ch???..."
                                name="address"
                                helperText={
                                    !!formik.errors.address && formik.touched.address ? formik.errors.address : ''
                                }
                                error={!!formik.errors.address && formik.touched.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                fullWidth
                                size="small"
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="S??? l?????ng"
                                required
                                type="number"
                                value={formik.values.number}
                                placeholder="Nh???p s??? l?????ng..."
                                name="number"
                                helperText={!!formik.errors.number && formik.touched.number ? formik.errors.number : ''}
                                error={!!formik.errors.number && formik.touched.number}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                fullWidth
                                size="small"
                                sx={{ mb: 2 }}
                            />
                            <Button sx={{ mr: 2 }} onClick={formik.handleSubmit} variant="contained">
                                ?????t h??ng
                            </Button>
                            <Button variant="contained" color="error">
                                H???y
                            </Button>
                        </Box>
                    </Stack>
                )}
                <Divider sx={{ my: 4 }} />
                <Box>
                    <Typography mb={2} fontSize="20px">
                        M???t s??? s???n ph???m li??n quan
                    </Typography>
                    <Grid container spacing={2}>
                        {otherProducts.map((product) => (
                            <Grid item xs={3} key={product.id}>
                                <Box
                                    component={Link}
                                    to={`/product/${product.id}`}
                                    sx={{ cursor: 'pointer', textDecoration: 'none', color: '#000' }}
                                >
                                    <Box
                                        component="img"
                                        sx={{ width: '100%', height: '150px' }}
                                        src={`${process.env.REACT_APP_BASE_URL}/${product.image}`}
                                    />
                                    <Typography>{product.name}</Typography>
                                    <Typography
                                        sx={{
                                            color: '#fff',
                                            backgroundColor: '#cd1818',
                                            display: 'inline-block',
                                            px: 1,
                                            borderRadius: '10px',
                                            mt: 1,
                                        }}
                                    >
                                        {Number(product.price).toLocaleString()} VND
                                    </Typography>
                                    {product.description
                                        .split('\n')
                                        .map((item) => `- ${item}`)
                                        .slice(0, 3)
                                        .map((description, index) => (
                                            <Typography
                                                fontSize="13px"
                                                fontWeight={400}
                                                mt={1}
                                                component="p"
                                                color={colors.grey[700]}
                                                key={`description-${index}-${product.id}`}
                                            >
                                                {description}
                                            </Typography>
                                        ))}
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}

export default ProductDetail;
