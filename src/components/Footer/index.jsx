import { colors, Container, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    const links = useMemo(
        () => [
            'Giới thiệu về công ty',
            'Câu hỏi thường gặp khi mua hàng',
            'Chính sách bảo mật',
            'Quy chế hoạt động',
            'Kiểm tra hóa đơn điện tử',
            'Tra cứu thông tin bảo hành',
        ],
        [],
    );

    const links2 = useMemo(
        () => [
            'Tin tuyển dụng',
            'Tin khuyến mãi',
            'Hướng dẫn mua online',
            'Hướng dẫn mua trả góp',
            'Chính sách trả góp',
        ],
        [],
    );

    return (
        <Box mt={8} sx={{ backgroundColor: '#fff' }}>
            <Container maxWidth="lg">
                <Stack direction="row" py={3}>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {links.map((link, index) => (
                            <Typography
                                sx={{ color: colors.lightBlue[500], textDecoration: 'none' }}
                                key={index + 'link'}
                                component={Link}
                                to="/"
                                fontWeight={400}
                            >
                                {link}
                            </Typography>
                        ))}
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {links2.map((link, index) => (
                            <Typography
                                sx={{ color: colors.lightBlue[500], textDecoration: 'none' }}
                                key={index + 'link2'}
                                component={Link}
                                to="/"
                                fontWeight={400}
                            >
                                {link}
                            </Typography>
                        ))}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Box component="img" src="images/footer.jpg" alt="" sx={{ width: '100%' }} />
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}

export default Footer;
