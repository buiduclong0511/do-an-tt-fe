import { Box, Container, Stack } from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function Home() {
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
            </Container>
        </Box>
    );
}

export default Home;
