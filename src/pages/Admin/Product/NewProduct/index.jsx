import { Button, colors, FormLabel, MenuItem, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { categoryApi, productApi } from 'src/api';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import * as _ from 'lodash';
import { pathFile } from 'src/utils';

function NewProduct({ editMode = false }) {
    const navigate = useNavigate();
    const { id } = useParams();

    const initialValues = useMemo(
        () => ({
            name: '',
            category_id: '',
            description: '',
            price: '',
            image: null,
        }),
        [],
    );
    const [categories, setCategories] = useState([]);

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            try {
                const body = { ...values };

                if (_.isString(values.image)) {
                    delete body.image;
                }

                let res;
                if (editMode) {
                    res = await productApi.updateProduct(id, body);
                } else {
                    res = await productApi.createProduct(body);
                }
                navigate(`/admin/edit-product/${res.data.id}`);
                toast.success('Lưu thành công!');
            } catch (err) {
                toast.error('Có lỗi xảy ra!');
            }
        },
        validationSchema: yup.object().shape({
            name: yup.string().required('Trường này không được để trống!'),
            category_id: yup.number().required('Trường này không được để trống!'),
            description: yup.string().required('Trường này không được để trống!'),
            price: yup.number().required('Trường này không được để trống!'),
            image: yup.mixed().test({
                name: 'Validate required',
                message: 'Trường này không được bỏ trống!',
                test: (value) => !!value,
            }),
        }),
    });

    useEffect(() => {
        categoryApi.getCategories().then((res) => setCategories(res.data));
    }, []);

    useEffect(() => {
        if (editMode) {
            productApi.getProductById(id).then((res) => {
                formik.setValues({
                    name: res.data.name,
                    category_id: res.data.category_id,
                    description: res.data.description,
                    price: res.data.price,
                    image: res.data.image,
                });
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editMode, id]);

    const handleChangeImage = useCallback((e) => {
        const file = e.target.files[0];

        formik.setFieldValue('image', file);
        e.target.value = '';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const clearImage = useCallback(() => formik.setFieldValue('image', null), []);

    return (
        <Box p={2}>
            <Typography mb={2} variant="h5">
                {editMode ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
            </Typography>

            <Box width="500px" mb={3}>
                <TextField
                    label="Tên sản phẩm"
                    required
                    size="small"
                    fullWidth
                    value={formik.values.name}
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && !!formik.errors.name}
                    helperText={formik.touched.name && !!formik.errors.name ? formik.errors.name : ''}
                    placeholder="Nhập tên sản phẩm..."
                />
            </Box>

            <Box width="500px" mb={3}>
                <FormLabel>Ảnh</FormLabel>
                <br />
                {formik.values.image ? (
                    <Box sx={{ position: 'relative' }}>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                color: '#fff',
                                backgroundColor: colors.red[500],
                                width: '20px',
                                height: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                transform: 'translate(50%, -50%)',
                                cursor: 'pointer',
                            }}
                            onClick={clearImage}
                        >
                            &times;
                        </Box>
                        <Box
                            component="img"
                            width="100%"
                            src={
                                _.isString(formik.values.image)
                                    ? pathFile(formik.values.image)
                                    : URL.createObjectURL(formik.values.image)
                            }
                            alt=""
                        />
                    </Box>
                ) : (
                    <TextField
                        type="file"
                        name="image"
                        onBlur={formik.handleBlur}
                        onChange={handleChangeImage}
                        accept="image/*"
                        size="small"
                        fullWidth
                        error={formik.touched.image && !!formik.errors.image}
                        helperText={formik.touched.image && !!formik.errors.image ? formik.errors.image : ''}
                    />
                )}
            </Box>

            <Box width="500px" mb={3}>
                <TextField
                    label="Danh mục"
                    required
                    size="small"
                    fullWidth
                    value={formik.values.category_id}
                    name="category_id"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.category_id && !!formik.errors.category_id}
                    helperText={
                        formik.touched.category_id && !!formik.errors.category_id ? formik.errors.category_id : ''
                    }
                    select
                >
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>

            <Box width="500px" mb={3}>
                <TextField
                    label="Mô tả"
                    required
                    multiline
                    rows={5}
                    fullWidth
                    value={formik.values.description}
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && !!formik.errors.description}
                    helperText={
                        formik.touched.description && !!formik.errors.description ? formik.errors.description : ''
                    }
                    placeholder="Nhập mô tả sản phẩm..."
                />
            </Box>

            <Box width="500px" mb={3}>
                <TextField
                    label="Giá"
                    required
                    size="small"
                    fullWidth
                    value={formik.values.price}
                    name="price"
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.price && !!formik.errors.price}
                    helperText={formik.touched.price && !!formik.errors.price ? formik.errors.price : ''}
                />
            </Box>

            <Box mt={3} mb={6}>
                <Button variant="contained" onClick={formik.handleSubmit}>
                    Lưu
                </Button>
            </Box>
        </Box>
    );
}

export default NewProduct;
