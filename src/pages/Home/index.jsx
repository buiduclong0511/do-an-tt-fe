import { Box, colors, Container, Grid, Stack, Typography } from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import React, { useEffect } from 'react';
import { productApi } from 'src/api';

function Home() {
    const [products, setProducts] = React.useState([]);
    console.log('~ products', products);

    useEffect(() => {
        productApi.getProducts().then((res) => setProducts(res.data.slice(0, 4)));
    }, []);

    return (
        <Box sx={{ backgroundImage: 'url(images/background_banner.png)', flex: 1, backgroundSize: 'cover' }}>
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
                        {products.map((product) => (
                            <Grid item xs={3} key={product.id}>
                                <Box>
                                    <Box
                                        component="img"
                                        sx={{ width: '100%' }}
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
                                    <Typography
                                        fontSize="13px"
                                        fontWeight={400}
                                        mt={1}
                                        component="p"
                                        color={colors.grey[700]}
                                    >
                                        {product.description
                                            .split('\n')
                                            .map((item) => `- ${item}`)
                                            .slice(0, 3)
                                            .join('\n')}
                                    </Typography>
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
