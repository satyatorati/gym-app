const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.js');
const {
  register,
  login,
  getCurrentUser
} = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getCurrentUser);

module.exports = router; 