const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Booking = require('../models/booking.model');
const { protect, authorize } = require('../middleware/auth.middleware');

// Protect all routes in this router
router.use(protect);
router.use(authorize('admin'));

// User management routes
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

router.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error: error.message });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting user', error: error.message });
  }
});

// Booking management routes
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user', 'name email');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
});

router.post('/bookings', async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: 'Error creating booking', error: error.message });
  }
});

router.put('/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: 'Error updating booking', error: error.message });
  }
});

router.delete('/bookings/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting booking', error: error.message });
  }
});

// Class management routes
router.get('/classes', async (req, res) => {
  try {
    // Since we're using a static JSON file for classes, we'll need to implement
    // this differently once we move to a database
    const classes = require('../data/classes.json');
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching classes', error: error.message });
  }
});

module.exports = router; 