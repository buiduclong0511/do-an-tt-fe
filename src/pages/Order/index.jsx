import {
    Box,
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
import { useCallback } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useDispatch, useSelector } from 'react-redux';
import { orderApi } from 'src/api';
import { setOrder } from 'src/redux/slices';

const cellStyle = {
    color: '#fff',
};

function Order() {
    const orders = useSelector((state) => state.order).orders;
    const dispatch = useDispatch();

    const handleCancelOrder = useCallback(
        (id) => {
            confirmAlert({
                title: 'Xác nhận xóa',
                message: 'Bạn có muốn hủy đơn hàng này ?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => orderApi.cancelOrder(id).then((res) => dispatch(setOrder(res.data))),
                    },
                    {
                        label: 'No',
                    },
                ],
            });
        },
        [dispatch],
    );

    return (
        <Box pt={3} pb={6}>
            <Container maxWidth="lg">
                {orders.length ? (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={cellStyle}>ID</TableCell>
                                    <TableCell sx={cellStyle}>Tên sản phẩm</TableCell>
                                    <TableCell sx={cellStyle}>Số lượng</TableCell>
                                    <TableCell sx={cellStyle}>Giá</TableCell>
                                    <TableCell sx={cellStyle}>Trạng thái</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order) => {
                                    let status;
                                    switch (order.status) {
                                        case 0:
                                            status = 'Đang chờ xác nhận';
                                            break;
                                        case 1:
                                            status = 'Đang giao hàng';
                                            break;
                                        case 2:
                                            status = 'Đã nhận hàng';
                                            break;
                                        default:
                                    }

                                    return (
                                        <TableRow key={order.id}>
                                            <TableCell sx={cellStyle}>{order.id}</TableCell>
                                            <TableCell sx={cellStyle}>{order.product.name}</TableCell>
                                            <TableCell sx={cellStyle}>{order.number}</TableCell>
                                            <TableCell sx={cellStyle}>
                                                {Number(order.price).toLocaleString()} VND
                                            </TableCell>
                                            <TableCell sx={cellStyle}>{status}</TableCell>
                                            <TableCell>
                                                <Button
                                                    disabled={!!order.status}
                                                    variant="contained"
                                                    onClick={() => handleCancelOrder(order.id)}
                                                >
                                                    Hủy đơn hàng
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
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

export default Order;
