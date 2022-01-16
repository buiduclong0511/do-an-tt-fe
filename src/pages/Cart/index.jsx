import {
    Button,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartApi } from 'src/api';
import { setCart } from 'src/redux/slices';

const cellStyle = {
    color: '#fff',
};

function Cart() {
    const cart = useSelector((state) => state.cart).cart;
    const dispatch = useDispatch();
    const handleClickDeleteButton = useCallback(
        (id) => {
            cartApi.deleteProductFromCart(id).then((res) => {
                dispatch(setCart(res.data));
            });
        },
        [dispatch],
    );
    return (
        <Box>
            <Container maxWidth="lg">
                {cart && !!cart.products.length ? (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={cellStyle}>ID</TableCell>
                                    <TableCell sx={cellStyle}>Tên sản phẩm</TableCell>
                                    <TableCell sx={cellStyle}>Giá</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell sx={cellStyle}>{product.id}</TableCell>
                                        <TableCell sx={cellStyle}>{product.name}</TableCell>
                                        <TableCell sx={cellStyle}>
                                            {Number(product.price).toLocaleString()} VND
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                component={Link}
                                                to={`/product/${product.id}`}
                                                sx={{ mr: 2 }}
                                            >
                                                Chi tiết mặt hàng
                                            </Button>
                                            <Button
                                                variant="contained"
                                                onClick={() => handleClickDeleteButton(product.id)}
                                            >
                                                Xóa khỏi giỏ hàng
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Typography align="center" sx={{ color: '#fff' }}>
                        Chưa có sản phẩm nào trong giỏ hàng
                    </Typography>
                )}
            </Container>
        </Box>
    );
}

export default Cart;
