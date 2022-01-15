import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { categoryApi } from 'src/api';
import * as yup from 'yup';

function NewCategory({ editMode = false }) {
    const navigate = useNavigate();
    const { id } = useParams();

    const initialValues = useMemo(
        () => ({
            name: '',
        }),
        [],
    );

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            try {
                let res;
                if (editMode) {
                    res = await categoryApi.updateCategory(id, values);
                } else {
                    res = await categoryApi.createCategory(values);
                }
                toast.success('Lưu lại thành công!');
                navigate(`/admin/edit-category/${res.data.id}`);
            } catch (err) {
                toast.error('Có lỗi xảy ra!');
            }
        },
        validationSchema: yup.object().shape({
            name: yup.string().required('Trường này không được để trống!'),
        }),
    });

    useEffect(() => {
        if (editMode) {
            categoryApi.getCategoryById(id).then((res) =>
                formik.setValues({
                    name: res.data.name,
                }),
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editMode, id]);

    return (
        <Box p={2}>
            <Typography mb={2} variant="h5">
                {editMode ? 'Sửa danh mục' : 'Thêm danh mục mới'}
            </Typography>
            <Box width="500px" mb={3}>
                <TextField
                    label="Tên danh mục"
                    required
                    fullWidth
                    size="small"
                    value={formik.values.name}
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && !!formik.errors.name}
                    helperText={formik.touched && !!formik.errors.name ? formik.errors.name : ''}
                />
            </Box>
            <Button variant="contained" onClick={formik.handleSubmit}>
                Lưu lại
            </Button>
        </Box>
    );
}

export default NewCategory;
