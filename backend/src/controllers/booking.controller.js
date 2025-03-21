const Booking = require('../models/booking.model');
const Class = require('../models/class.model');
const PaymentService = require('../services/payment.service');
const notificationService = require('../services/notification.service');
const schedulerService = require('../services/scheduler.service');
const asyncHandler = require('express-async-handler');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = asyncHandler(async (req, res) => {
  const { classId, bookingDate } = req.body;

  // Check if class exists and is active
  const gymClass = await Class.findById(classId);
  if (!gymClass || !gymClass.isActive) {
    return res.status(404).json({
      success: false,
      message: 'Class not found or inactive'
    });
  }

  // Check if class is full
  if (gymClass.isFull()) {
    // Add user to waitlist
    await gymClass.addToWaitlist(req.user._id);
    
    return res.status(200).json({
      success: true,
      message: 'Class is full. You have been added to the waitlist.',
      data: {
        waitlistPosition: gymClass.waitlist.length
      }
    });
  }

  // Create booking
  const booking = await Booking.create({
    user: req.user._id,
    class: classId,
    bookingDate,
    amount: gymClass.price
  });

  // Create payment intent
  const paymentIntent = await PaymentService.createPaymentIntent(booking._id);

  res.status(201).json({
    success: true,
    data: {
      booking,
      paymentIntent
    }
  });
});

// @desc    Get user's bookings
// @route   GET /api/bookings
// @access  Private
exports.getUserBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate('class')
    .sort('-createdAt');

  res.json({
    success: true,
    count: bookings.length,
    data: bookings
  });
});

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('class')
    .populate('user', 'name email');

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: 'Booking not found'
    });
  }

  // Check if user owns the booking
  if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to access this booking'
    });
  }

  res.json({
    success: true,
    data: booking
  });
});

// @desc    Cancel booking
// @route   POST /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('class');

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: 'Booking not found'
    });
  }

  // Check if user owns the booking
  if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to cancel this booking'
    });
  }

  // Cancel booking
  await booking.cancel(req.body.reason);

  // Process refund if applicable
  if (booking.refundAmount > 0) {
    await PaymentService.processRefund(booking._id);
  }

  // Send cancellation notification
  await notificationService.sendCancellationNotification(booking._id);

  // If there are users on waitlist, notify the next user
  if (booking.class.waitlist.length > 0) {
    const nextUser = booking.class.getNextWaitlistUser();
    await schedulerService.scheduleWaitlistNotification(booking.class._id, nextUser);
  }

  res.json({
    success: true,
    data: booking
  });
});

// @desc    Complete booking
// @route   POST /api/bookings/:id/complete
// @access  Private (Admin only)
exports.completeBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: 'Booking not found'
    });
  }

  await booking.complete();

  res.json({
    success: true,
    data: booking
  });
});

// @desc    Mark booking as no-show
// @route   POST /api/bookings/:id/no-show
// @access  Private (Admin only)
exports.markAsNoShow = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: 'Booking not found'
    });
  }

  await booking.markAsNoShow();

  res.json({
    success: true,
    data: booking
  });
});

// @desc    Add review to booking
// @route   POST /api/bookings/:id/review
// @access  Private
exports.addReview = asyncHandler(async (req, res) => {
  const { rating, review } = req.body;
  const booking = await Booking.findById(req.params.id)
    .populate('class');

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: 'Booking not found'
    });
  }

  // Check if user owns the booking
  if (booking.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to review this booking'
    });
  }

  // Update booking with review
  booking.rating = rating;
  booking.review = review;
  await booking.save();

  // Update class rating
  const classReviews = await Booking.find({
    class: booking.class._id,
    rating: { $exists: true }
  });

  const averageRating = classReviews.reduce((acc, curr) => acc + curr.rating, 0) / classReviews.length;
  booking.class.rating = averageRating;
  booking.class.totalReviews = classReviews.length;
  await booking.class.save();

  res.json({
    success: true,
    data: booking
  });
}); 