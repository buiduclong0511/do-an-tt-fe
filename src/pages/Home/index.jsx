import { Box, colors, Container, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Link } from 'react-router-dom';
import { productApi } from 'src/api';

function Home() {
    const [hotProducts, setHotProducts] = React.useState([]);
    const [newProducts, setNewHotProducts] = React.useState([]);

    useEffect(() => {
        productApi.getProducts('', 'orders_count').then((res) => setHotProducts(res.data.slice(0, 4)));
        productApi.getProducts('', 'created_at').then((res) => setNewHotProducts(res.data.slice(0, 4)));
    }, []);

    return (
        <Box sx={{ backgroundImage: 'url(images/background_banner.png)', flex: 1, backgroundSize: 'cover', pb: 6 }}>
            <Container maxWidth="lg">
                <Stack direction="row" justifyContent="center" sx={{ pt: 4 }}>
                    <img src="images/background_banner_2.png" alt="" />
                </Stack>
                <Box sx={{ backgroundColor: '#fff', padding: '3px', borderRadius: '4px' }}>
                    <Carousel infiniteLoop autoPlay emulateTouch showStatus={false} showThumbs={false}>
                        <Box>
                            <img src="images/banner_1.jpeg" alt="" />
                        </Box>
                        <Box>
                            <img src="images/banner_2.jpeg" alt="" />
                        </Box>
                        <Box>
                            <img src="images/banner_3.jpeg" alt="" />
                        </Box>
                        <Box>
                            <img src="images/banner_4.jpeg" alt="" />
                        </Box>
                    </Carousel>
                </Box>
                <Box mt={4} p={2} sx={{ background: '#fff', borderRadius: '8px' }}>
                    <Typography variant="h3" fontSize="25px" mb={3} color="#cd1818">
                        Sản phẩm nổi bật
                    </Typography>
                    <Grid container spacing={2}>
                        {hotProducts.map((product) => (
                            <Grid item xs={3} key={product.id}>
                                <Box
                                    component={Link}
                                    to={`/product/${product.id}`}
                                    sx={{ cursor: 'pointer', textDecoration: 'none', color: '#000' }}
                                >
                                    <Box
                                        component="img"
                                        sx={{ width: '100%', height: '150px' }}
                                        src={`${process.env.REACT_APP_BASE_URL}/${product.image}`}
                                    />
                                    <Typography>{product.name}</Typography>
                                    {!!product.orders_count && (
                                        <Typography fontSize="13px" color="#333">
                                            {product.orders_count} lượt mua
                                        </Typography>
                                    )}
                                    <Typography
                                        sx={{
                                            color: '#fff',
                                            backgroundColor: '#cd1818',
                                            display: 'inline-block',
                                            px: 1,
                                            borderRadius: '10px',
                                            mt: 1,
                                        }}
                                    >
                                        {Number(product.price).toLocaleString()} VND
                                    </Typography>
                                    {product.description
                                        .split('\n')
                                        .map((item) => `- ${item}`)
                                        .slice(0, 3)
                                        .map((description, index) => (
                                            <Typography
                                                fontSize="13px"
                                                fontWeight={400}
                                                mt={1}
                                                component="p"
                                                color={colors.grey[700]}
                                                key={`description-${index}-${product.id}`}
                                            >
                                                {description}
                                            </Typography>
                                        ))}
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box mt={4} p={2} sx={{ background: '#fff', borderRadius: '8px' }}>
                    <Typography variant="h3" fontSize="25px" mb={3} color="#cd1818">
                        Sản phẩm mới
                    </Typography>
                    <Grid container spacing={2}>
                        {newProducts.map((product) => (
                            <Grid item xs={3} key={product.id}>
                                <Box
                                    component={Link}
                                    to={`/product/${product.id}`}
                                    sx={{ cursor: 'pointer', textDecoration: 'none', color: '#000' }}
                                >
                                    <Box
                                        component="img"
                                        sx={{ width: '100%', height: '150px' }}
                                        src={`${process.env.REACT_APP_BASE_URL}/${product.image}`}
                                    />
                                    <Typography>{product.name}</Typography>
                                    <Typography
                                        sx={{
                                            color: '#fff',
                                            backgroundColor: '#cd1818',
                                            display: 'inline-block',
                                            px: 1,
                                            borderRadius: '10px',
                                            mt: 1,
                                        }}
                                    >
                                        {Number(product.price).toLocaleString()} VND
                                    </Typography>
                                    {product.description
                                        .split('\n')
                                        .map((item) => `- ${item}`)
                                        .slice(0, 3)
                                        .map((description, index) => (
                                            <Typography
                                                fontSize="13px"
                                                fontWeight={400}
                                                mt={1}
                                                component="p"
                                                color={colors.grey[700]}
                                                key={`description-${index}-${product.id}`}
                                            >
                                                {description}
                                            </Typography>
                                        ))}
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}

export default Home;
