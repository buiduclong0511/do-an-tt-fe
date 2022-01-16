import {
    MenuItem,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import { orderApi } from 'src/api';

function Order() {
    const [inputValue, setInputValue] = useState('');
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        orderApi.getAllOrders(inputValue).then((res) => setOrders(res.data));
    }, [inputValue]);

    const handleChangStatus = useCallback(
        (e, id) =>
            orderApi.changeStatus(id, { status: e.target.value }).then(() => {
                orderApi.getAllOrders(inputValue).then((res) => setOrders(res.data));
            }),
        [inputValue],
    );

    return (
        <Box p={3}>
            <Stack direction="row" justifyContent="space-between">
                <Typography>Danh sách đơn hàng</Typography>
                <Box
                    component="input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Nhập tên khách hàng hoặc tên máy..."
                    sx={{ width: '250px', p: 1 }}
                />
            </Stack>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Khách hàng</TableCell>
                            <TableCell>Tên máy</TableCell>
                            <TableCell>Địa chỉ</TableCell>
                            <TableCell>Số điện thoại</TableCell>
                            <TableCell>Đơn giá</TableCell>
                            <TableCell>Trạng thái</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.receiver}</TableCell>
                                <TableCell>{order.product.name}</TableCell>
                                <TableCell>{order.address}</TableCell>
                                <TableCell>{order.phone}</TableCell>
                                <TableCell>{order.price}</TableCell>
                                <TableCell width="200px">
                                    <Box>
                                        <Select
                                            value={order.status}
                                            fullWidth
                                            size="small"
                                            onChange={(e) => handleChangStatus(e, order.id)}
                                        >
                                            <MenuItem value={0}>Đang chờ xác nhận</MenuItem>
                                            <MenuItem value={1}>Đang giao hàng</MenuItem>
                                            <MenuItem value={2}>Đã giao hàng</MenuItem>
                                        </Select>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default Order;
