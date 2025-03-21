import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="80vh"
          textAlign="center"
          p={3}
        >
          <ErrorIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Something went wrong
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            We apologize for the inconvenience. Please try refreshing the page or
            contact support if the problem persists.
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Refresh Page
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 