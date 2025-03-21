require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user.model');

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Admin user details
    const adminData = {
      name: 'Admin User',
      email: 'admin@gym.com',
      password: 'admin123',
      role: 'admin'
    };

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create(adminData);
    console.log('Admin user created successfully:', {
      name: admin.name,
      email: admin.email,
      role: admin.role
    });

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin(); 