import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  MenuItem,
  Container,
  Chip,
  Alert,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocationIcon from '@mui/icons-material/LocationOn';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import { classes } from '../data/classes';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';

const Booking = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenDialog = (classItem) => {
    if (!user) {
      navigate('/login');
      return;
    }
    setSelectedClass(classItem);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedClass(null);
    setBookingDate('');
    setBookingTime('');
    setBookingError('');
    setBookingSuccess('');
  };

  const handleBooking = async () => {
    try {
      if (!bookingDate || !bookingTime) {
        setBookingError('Please select both date and time');
        return;
      }

      setIsLoading(true);
      setBookingError('');

      const response = await api.post('/bookings', {
        classId: selectedClass.id,
        date: bookingDate,
        time: bookingTime
      });

      setBookingSuccess('Booking successful! Redirecting to My Bookings...');
      setTimeout(() => {
        handleCloseDialog();
        navigate('/my-bookings');
      }, 2000);
    } catch (error) {
      console.error('Booking error:', error);
      setBookingError(error.response?.data?.message || 'Failed to create booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom align="center">
          Book Classes & Activities
        </Typography>

        {bookingError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {bookingError}
          </Alert>
        )}

        <Grid container spacing={3}>
          {classes.map((classItem) => (
            <Grid item key={classItem.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={classItem.image}
                  alt={classItem.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {classItem.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {classItem.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      icon={<LocationIcon />}
                      label={classItem.location}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                    <Chip
                      icon={<FitnessCenterIcon />}
                      label={classItem.level}
                      size="small"
                      sx={{ mb: 1 }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body2" color="success.main">
                      Free with membership
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {classItem.spotsLeft}/{classItem.capacity} spots available
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog(classItem)}
                    fullWidth
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
          aria-labelledby="booking-dialog-title"
          aria-describedby="booking-dialog-description"
        >
          {selectedClass && (
            <>
              <DialogTitle id="booking-dialog-title">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5">Book {selectedClass.name}</Typography>
                  <IconButton 
                    onClick={handleCloseDialog}
                    aria-label="close"
                    edge="end"
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
              </DialogTitle>
              <DialogContent dividers>
                {bookingSuccess && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    {bookingSuccess}
                  </Alert>
                )}
                {bookingError && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {bookingError}
                  </Alert>
                )}
                <Box sx={{ mb: 3 }} id="booking-dialog-description">
                  <Typography variant="body1" paragraph>
                    {selectedClass.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Instructor: {selectedClass.instructor}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Location: {selectedClass.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Level: {selectedClass.level}
                  </Typography>
                </Box>

                <TextField
                  select
                  fullWidth
                  label="Select Date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  sx={{ mb: 2 }}
                  disabled={isLoading}
                >
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <MenuItem key={day} value={day}>
                      {day}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  fullWidth
                  label="Select Time"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  disabled={isLoading}
                >
                  {['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'].map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </TextField>
              </DialogContent>
              <DialogActions>
                <Button 
                  onClick={handleCloseDialog}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleBooking} 
                  variant="contained" 
                  color="primary"
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Confirm Booking'}
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Box>
    </Container>
  );
};

export default Booking; 