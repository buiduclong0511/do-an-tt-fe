import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
    Button,
    colors,
    IconButton,
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
import { confirmAlert } from 'react-confirm-alert';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { productApi } from 'src/api';

function ListProduct() {
    const [products, setProducts] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    const getProducts = useCallback((q) => productApi.getProducts(q).then((res) => setProducts(res.data)), []);

    useEffect(() => {
        getProducts(inputValue.trim());
    }, [getProducts, inputValue]);

    const handleClickDeleteButton = useCallback(
        (id) =>
            confirmAlert({
                title: 'Xác nhận xóa',
                message: 'Bạn có muốn xóa sản phẩm này ?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () =>
                            productApi.deleteProduct(id).then(() => {
                                getProducts();
                                toast.success('Xóa thành công!');
                            }),
                    },
                    {
                        label: 'No',
                    },
                ],
            }),
        [getProducts],
    );

    const handleClickEditButton = useCallback((id) => navigate(`/admin/edit-product/${id}`), [navigate]);

    return (
        <Box px={2}>
            <IconButton
                component={Link}
                to="/admin/new-product"
                sx={{ color: colors.blue[500], position: 'fixed', bottom: '30px', right: '30px' }}
            >
                <AddCircleIcon fontSize="large" />
            </IconButton>
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
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value.trim())}
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
                                        <Button variant="contained" onClick={() => handleClickEditButton(product.id)}>
                                            Sửa
                                        </Button>
                                        <Button variant="contained" onClick={() => handleClickDeleteButton(product.id)}>
                                            Xóa
                                        </Button>
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
