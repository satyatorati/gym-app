const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  classId: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'confirmed'
  }
}, {
  timestamps: true
});

// Create a compound index for unique bookings per user, class, and date
bookingSchema.index({ user: 1, classId: 1, date: 1 }, { unique: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking; 