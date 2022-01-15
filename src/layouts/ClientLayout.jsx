import { Container } from '@mui/material';
import { Header } from 'src/components';
import styles from './Layout.module.scss';

function ClientLayout({ children }) {
    return (
        <div className={styles.clientLayout}>
            <Header />
            <Container maxWidth="lg">{children}</Container>
        </div>
    );
}

export default ClientLayout;
