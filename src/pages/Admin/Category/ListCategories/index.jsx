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
import { Link, useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useCallback, useEffect, useState } from 'react';
import { categoryApi } from 'src/api';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

function ListCategories() {
    const [categories, setCategories] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const navigate = useNavigate();

    const getCategories = useCallback((q) => categoryApi.getCategories(q).then((res) => setCategories(res.data)), []);

    useEffect(() => {
        getCategories(inputValue);
    }, [getCategories, inputValue]);

    const handleClickDeleteButton = useCallback(
        (id) =>
            confirmAlert({
                title: 'Xác nhận xóa',
                message: 'Bạn có muốn xóa danh mục này ?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () =>
                            categoryApi.deleteCategory(id).then(() => {
                                getCategories();
                                toast.success('Xóa thành công!');
                            }),
                    },
                    {
                        label: 'No',
                    },
                ],
            }),
        [getCategories],
    );

    const handleClickEditButton = useCallback((id) => navigate(`/admin/edit-category/${id}`), [navigate]);

    return (
        <Box px={2}>
            <IconButton
                component={Link}
                to="/admin/new-category"
                sx={{ color: colors.blue[500], position: 'fixed', bottom: '30px', right: '30px' }}
            >
                <AddCircleIcon fontSize="large" />
            </IconButton>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography my={2} variant="h5">
                    Danh mục
                </Typography>
                <Box
                    component="input"
                    placeholder="Nhập tên danh mục hoặc id..."
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
                                <Typography fontWeight={600}>Tên danh mục</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography fontWeight={600}>Thao tác</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id}>
                                <TableCell>{category.id}</TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableCell align="center">
                                    <Stack spacing={1} direction="row" justifyContent="center">
                                        <Button variant="contained" onClick={() => handleClickEditButton(category.id)}>
                                            Sửa
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={() => handleClickDeleteButton(category.id)}
                                        >
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

export default ListCategories;
