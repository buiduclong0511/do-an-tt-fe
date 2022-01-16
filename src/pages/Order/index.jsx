import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const cellStyle = {
    color: '#fff',
};

function Order() {
    const orders = useSelector((state) => state.order).orders;

    return (
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
                                        status = 'Đã nhân hàng';
                                        break;
                                    default:
                                }

                                return (
                                    <TableRow key={order.id}>
                                        <TableCell sx={cellStyle}>{order.id}</TableCell>
                                        <TableCell sx={cellStyle}>{order.product.name}</TableCell>
                                        <TableCell sx={cellStyle}>{order.number}</TableCell>
                                        <TableCell sx={cellStyle}>{Number(order.price).toLocaleString()} VND</TableCell>
                                        <TableCell sx={cellStyle}>{status}</TableCell>
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
    );
}

export default Order;
