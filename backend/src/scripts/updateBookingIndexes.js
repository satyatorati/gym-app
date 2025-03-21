require('dotenv').config();
const mongoose = require('mongoose');
const Booking = require('../models/booking.model');

async function updateIndexes() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Drop the old index
    await mongoose.connection.collection('bookings').dropIndex('user_1_class_1_date_1');
    console.log('Old index dropped');

    // Create the new index
    await Booking.syncIndexes();
    console.log('New index created');

    console.log('Successfully updated booking indexes');
  } catch (error) {
    console.error('Error updating indexes:', error);
  } finally {
    await mongoose.disconnect();
  }
}

updateIndexes(); 