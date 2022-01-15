import { Box, Button, colors, Container, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Header() {
    const userInfo = useSelector((state) => state.auth).userInfo;

    return (
        <Box>
            <Container maxWidth="lg">
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ height: '56px' }}>
                    <Box>
                        <Typography component={Link} to="/" sx={{ color: colors.common.white, textDecoration: 'none' }}>
                            Minh Anh Shop
                        </Typography>
                    </Box>
                    <Box>search</Box>
                    <Box>
                        {userInfo ? (
                            <div>cart</div>
                        ) : (
                            <Button component={Link} to="/login" variant="contained">
                                Đăng nhập
                            </Button>
                        )}
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}

export default Header;
