import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
  CircularProgress,
  CardMedia,
} from '@mui/material';
import {
  Event as EventIcon,
  AccessTime as TimeIcon,
  Cancel as CancelIcon,
  LocationOn as LocationIcon,
  FitnessCenter as FitnessCenterIcon,
} from '@mui/icons-material';
import api from '../utils/api';
import { useAuth } from '../hooks/useAuth';
import { classes as classesData } from '../data/classes';

const MyBookings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelDialog, setCancelDialog] = useState({
    open: false,
    bookingId: null,
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchBookings();
  }, [user, navigate]);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings/my-bookings');
      setBookings(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to fetch your bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = (bookingId) => {
    setCancelDialog({
      open: true,
      bookingId,
    });
  };

  const handleCancelClose = () => {
    setCancelDialog({
      open: false,
      bookingId: null,
    });
  };

  const handleCancelBooking = async () => {
    try {
      await api.delete(`/bookings/${cancelDialog.bookingId}`);
      await fetchBookings();
      handleCancelClose();
    } catch (err) {
      console.error('Error canceling booking:', err);
      setError('Failed to cancel booking');
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  const getClassDetails = (classId) => {
    // Convert string ID to number for matching
    const numericId = parseInt(classId, 10);
    return classesData.find(c => c.id === numericId) || {
      name: 'Unknown Class',
      description: 'Class details not found',
      location: 'Unknown Location',
      level: 'Unknown Level',
      image: 'https://via.placeholder.com/400x200?text=Class+Image'
    };
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Bookings
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {bookings.length === 0 ? (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              No bookings found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You haven't made any bookings yet.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => navigate('/booking')}
            >
              Browse Classes
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {bookings.map((booking) => {
            const classDetails = getClassDetails(booking.classId);
            return (
              <Grid item xs={12} sm={6} md={4} key={booking._id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={classDetails.image}
                    alt={classDetails.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {classDetails.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <EventIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="body1">
                        {booking.date}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <TimeIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        {booking.time}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        {classDetails.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <FitnessCenterIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        {classDetails.level}
                      </Typography>
                    </Box>
                    {booking.status === 'confirmed' && (
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<CancelIcon />}
                        onClick={() => handleCancelClick(booking._id)}
                        fullWidth
                      >
                        Cancel Booking
                      </Button>
                    )}
                    {booking.status === 'cancelled' && (
                      <Typography variant="body2" color="error" align="center">
                        Cancelled
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Dialog
        open={cancelDialog.open}
        onClose={handleCancelClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="cancel-dialog-title"
        aria-describedby="cancel-dialog-description"
      >
        <DialogTitle id="cancel-dialog-title">Cancel Booking</DialogTitle>
        <DialogContent>
          <DialogContentText id="cancel-dialog-description">
            Are you sure you want to cancel this booking? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClose}>
            No, Keep Booking
          </Button>
          <Button 
            onClick={handleCancelBooking} 
            color="error" 
            variant="contained"
            autoFocus
          >
            Yes, Cancel Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyBookings; 