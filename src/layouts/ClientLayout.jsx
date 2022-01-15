import { Box } from '@mui/material';
import { Header } from 'src/components';

function ClientLayout({ children }) {
    return (
        <Box sx={{ minHeight: '100vh', background: '#cd1818', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</Box>
        </Box>
    );
}

export default ClientLayout;
