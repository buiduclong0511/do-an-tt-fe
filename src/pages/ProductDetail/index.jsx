import { Button, colors, Container, Divider, Grid, Stack, Typography } from '@mui/material';
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

function ProductDetail() {
    const { id } = useParams();
    const cart = useSelector((state) => state.cart).cart;
    const userInfo = useSelector((state) => state.auth).userInfo;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [otherProducts, setOtherProducts] = useState([]);
    const [number, setNumber] = useState(0);

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

    const handleOrder = useCallback(() => {
        orderApi
            .createOrder({
                user_id: userInfo?.id,
                product_id: Number(id),
                number,
                price: (number * Number(product?.price)).toString(),
            })
            .then((res) => {
                toast.success('Đặt hàng thành công!');
                dispatch(setOrder(res.data));
                navigate('/order');
            });
    }, [dispatch, id, navigate, number, product?.price, userInfo?.id]);

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
                                Giá:{' '}
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
                            <Stack direction="row" alignItems="center">
                                <Typography mr={2}>Số lượng: </Typography>
                                <Box
                                    component="input"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value ? Number(e.target.value) : 0)}
                                    type="number"
                                />
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
                                        {isExistedInCart ? 'Sản phẩm đã có trong giỏ hàng' : 'Thêm vào giỏ hàng'}
                                    </Button>
                                ) : (
                                    <Button
                                        variant="contained"
                                        endIcon={<ShoppingCartIcon />}
                                        onClick={() => navigate('/login?path=' + window.location.pathname)}
                                    >
                                        Thêm vào giỏ hàng
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    color="error"
                                    endIcon={<AttachMoneyIcon />}
                                    disabled={!number}
                                    onClick={
                                        userInfo
                                            ? handleOrder
                                            : () => navigate(`/login?path=${window.location.pathname}`)
                                    }
                                >
                                    Đặt mua
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                </Stack>
                <Divider sx={{ my: 4 }} />
                <Box>
                    <Typography mb={2} fontSize="20px">
                        Một số sản phẩm liên quan
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
