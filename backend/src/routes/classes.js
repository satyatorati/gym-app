const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Class = require('../models/class.model');

// Get all classes
router.get('/', async (req, res) => {
  try {
    const classes = await Class.find()
      .populate('instructor', 'name email');
    res.json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single class
router.get('/:id', async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id)
      .populate('instructor', 'name email');
    
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }
    
    res.json(classItem);
  } catch (error) {
    console.error('Error fetching class:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create class (admin only)
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('instructor').notEmpty().withMessage('Instructor is required'),
  body('capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be non-negative'),
  body('schedule').isArray().withMessage('Schedule must be an array'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const classItem = new Class(req.body);
    await classItem.save();
    res.status(201).json(classItem);
  } catch (error) {
    console.error('Error creating class:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update class (admin only)
router.put('/:id', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('instructor').notEmpty().withMessage('Instructor is required'),
  body('capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be non-negative'),
  body('schedule').isArray().withMessage('Schedule must be an array'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const classItem = await Class.findById(req.params.id);
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }

    Object.assign(classItem, req.body);
    await classItem.save();
    res.json(classItem);
  } catch (error) {
    console.error('Error updating class:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete class (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }

    await classItem.remove();
    res.json({ message: 'Class deleted successfully' });
  } catch (error) {
    console.error('Error deleting class:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 