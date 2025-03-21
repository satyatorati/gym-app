const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Class name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxLength: [1000, 'Description cannot be more than 1000 characters']
  },
  type: {
    type: String,
    required: [true, 'Class type is required'],
    enum: ['yoga', 'fitness', 'dance', 'martial-arts', 'swimming', 'other']
  },
  level: {
    type: String,
    required: [true, 'Difficulty level is required'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Trainer is required']
  },
  capacity: {
    type: Number,
    required: [true, 'Capacity is required'],
    min: [1, 'Capacity must be at least 1']
  },
  enrolled: {
    type: Number,
    default: 0
  },
  schedule: {
    day: {
      type: String,
      required: [true, 'Day is required'],
      enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    startTime: {
      type: String,
      required: [true, 'Start time is required'],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time (HH:MM)']
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
      min: [15, 'Duration must be at least 15 minutes'],
      max: [180, 'Duration cannot exceed 180 minutes']
    }
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamps before saving
classSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Calculate average rating when reviews are modified
classSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.rating = 0;
  } else {
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.rating = Math.round((sum / this.reviews.length) * 10) / 10;
  }
};

const Class = mongoose.model('Class', classSchema);

module.exports = Class; 