import { Outlet } from 'react-router-dom';
import { Box, Container, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: '400px',
  margin: '0 auto',
}));

function AuthLayout() {
  return (
    <StyledContainer>
      <StyledPaper elevation={3}>
        <Typography component="h1" variant="h5" gutterBottom>
          Welcome to UB Recreation Center
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" paragraph>
          Please sign in or create an account to continue
        </Typography>
        <Outlet />
      </StyledPaper>
    </StyledContainer>
  );
}

export default AuthLayout; 