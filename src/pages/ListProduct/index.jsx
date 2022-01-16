import { Button, Container, Divider, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryApi, productApi } from 'src/api';
import { useQuery } from 'src/hooks';
import { pathFile } from 'src/utils';

function ListProduct() {
    const category_id = useQuery().get('category_id');
    const q = useQuery().get('q');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (category_id) {
            categoryApi.getProductsCategory(category_id).then((res) => setProducts(res.data));
        }
        if (q) {
            productApi.getProducts(q).then((res) => setProducts(res.data));
        }
    }, [category_id, q]);

    return (
        <Box pt={3} pb={8}>
            <Container maxWidth="lg">
                {!!products.length ? (
                    <>
                        {products.map((product) => (
                            <Box key={product.id}>
                                <Stack direction="row" spacing={2}>
                                    <Box component="img" sx={{ width: '300px' }} src={pathFile(product.image)} alt="" />
                                    <Box sx={{ color: '#fff' }}>
                                        <Typography fontSize="30px" mb={1}>
                                            {product.name}
                                        </Typography>
                                        <Typography mb={1}>{Number(product.price).toLocaleString()} VND</Typography>
                                        <Typography>{product.orders_count} lượt mua</Typography>
                                        <Button
                                            onClick={() => navigate(`/product/${product.id}`)}
                                            variant="contained"
                                            sx={{ mt: 2 }}
                                        >
                                            Xem chi tiết sản phẩm
                                        </Button>
                                    </Box>
                                </Stack>
                                <Divider sx={{ my: 3 }} />
                            </Box>
                        ))}
                    </>
                ) : (
                    <Typography color="#fff">Không tìm thấy sản phẩm nào</Typography>
                )}
            </Container>
        </Box>
    );
}

export default ListProduct;
