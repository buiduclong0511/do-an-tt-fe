import {
    Box,
    Button,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { accountApi } from 'src/api';

function ListAccounts() {
    const [users, setUsers] = useState([]);

    const userInfo = useSelector((state) => state.auth).userInfo;

    const getListUsers = useCallback(
        () => accountApi.getList().then((res) => setUsers(res.data.filter((user) => user.id !== userInfo.id))),
        [userInfo.id],
    );

    useEffect(() => {
        getListUsers();
    }, [getListUsers]);

    const handleChangeRole = (id) => accountApi.changeRole(id).then(() => getListUsers());

    const handleDelete = (id) => accountApi.delete(id).then(() => getListUsers());
    return (
        <Box px={2}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography fontWeight={600}>ID</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography fontWeight={600}>Tên</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography fontWeight={600}>Email</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography fontWeight={600}>Quyền Admin</Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography fontWeight={600}>Thao tác</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Typography>{user.id}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{user.name}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{user.email}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Checkbox checked={!!user.role} onChange={() => handleChangeRole(user.id)} />
                                </TableCell>
                                <TableCell align="center">
                                    <Button onClick={() => handleDelete(user.id)} variant="contained">
                                        Xóa
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default ListAccounts;
