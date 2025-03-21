import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';

function MainLayout() {
  return (
    <Box component="main" sx={{ flexGrow: 1, minHeight: '100vh', pt: 2 }}>
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </Box>
  );
}

export default MainLayout; 