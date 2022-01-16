import { Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { orderApi } from 'src/api';

function Order() {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        orderApi.getAllOrders(inputValue).then(console.log);
    }, [inputValue]);

    return (
        <Box p={2}>
            <Typography>Danh sách đơn hàng</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Khách hàng</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default Order;
