import {
    Button,
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
import { useEffect, useState } from 'react';
import { productApi } from 'src/api';

function ListProduct() {
    const [products, setProducts] = useState([]);
    console.log('~ products', products);

    useEffect(() => {
        productApi.getProducts().then((res) => setProducts(res.data));
    }, []);

    return (
        <Box px={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography my={2} variant="h5">
                    Danh sách sản phẩm
                </Typography>
                <Box
                    component="input"
                    placeholder="Nhập tên sản phẩm hoặc id..."
                    sx={{
                        px: 2,
                        height: '35px',
                        width: '250px',
                        outline: 'none',
                        border: '1px solid #ccc',
                    }}
                />
            </Stack>
            <TableContainer>
                <Table sx={{ minWidth: '100%' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography fontWeight={600}>ID</Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography fontWeight={600}>Tên sản phẩm</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography fontWeight={600}>Thao tác</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell align="center">
                                    <Stack spacing={1} direction="row" justifyContent="center">
                                        <Button variant="contained">Sửa</Button>
                                        <Button variant="contained">Xóa</Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default ListProduct;
