const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { protect } = require('../middleware/auth');
const Booking = require('../models/booking.model');

// Get all bookings (admin only)
router.get('/', protect, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('class', 'name date time');
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's bookings
router.get('/my-bookings', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a booking
router.post('/', protect, async (req, res) => {
  try {
    const { classId, date, time } = req.body;

    if (!classId || !date || !time) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check for existing booking
    const existingBooking = await Booking.findOne({
      user: req.user.id,
      classId,
      date,
      status: { $ne: 'cancelled' } // Exclude cancelled bookings
    });

    if (existingBooking) {
      return res.status(400).json({ 
        message: 'You already have a booking for this class on this date' 
      });
    }

    const booking = new Booking({
      user: req.user.id,
      classId,
      date,
      time,
      status: 'confirmed'
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    
    // Handle duplicate key error specifically
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'You already have a booking for this class on this date' 
      });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
});

// Update booking status (admin only)
router.patch('/:id/status', protect, [
  body('status').isIn(['pending', 'confirmed', 'cancelled']).withMessage('Invalid status'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cancel booking
router.delete('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    booking.status = 'cancelled';
    await booking.save();
    
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 