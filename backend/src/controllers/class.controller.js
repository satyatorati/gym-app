const Class = require('../models/class.model');
const asyncHandler = require('express-async-handler');

// @desc    Get all classes
// @route   GET /api/classes
// @access  Public
const getAllClasses = asyncHandler(async (req, res) => {
  const { type, level, day, isActive } = req.query;
  const query = {};

  if (type) {
    query.type = type;
  }

  if (level) {
    query.level = level;
  }

  if (day) {
    query['schedule.day'] = day;
  }

  if (isActive !== undefined) {
    query.isActive = isActive === 'true';
  }

  const classes = await Class.find(query)
    .populate('trainer', 'name specialization experience rating')
    .sort({ 'schedule.day': 1, 'schedule.startTime': 1 });

  res.json(classes);
});

// @desc    Get single class
// @route   GET /api/classes/:id
// @access  Public
const getClass = asyncHandler(async (req, res) => {
  const classData = await Class.findById(req.params.id)
    .populate('trainer', 'name specialization experience rating bio schedule');
  
  if (!classData) {
    res.status(404);
    throw new Error('Class not found');
  }

  res.json(classData);
});

// @desc    Create class
// @route   POST /api/classes
// @access  Private/Admin
const createClass = asyncHandler(async (req, res) => {
  const classData = await Class.create(req.body);
  res.status(201).json(classData);
});

// @desc    Update class
// @route   PUT /api/classes/:id
// @access  Private/Admin
const updateClass = asyncHandler(async (req, res) => {
  const classData = await Class.findById(req.params.id);
  
  if (!classData) {
    res.status(404);
    throw new Error('Class not found');
  }

  const updatedClass = await Class.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.json(updatedClass);
});

// @desc    Delete class
// @route   DELETE /api/classes/:id
// @access  Private/Admin
const deleteClass = asyncHandler(async (req, res) => {
  const classData = await Class.findById(req.params.id);
  
  if (!classData) {
    res.status(404);
    throw new Error('Class not found');
  }

  await classData.deleteOne();
  res.json({ message: 'Class removed' });
});

// @desc    Update class status
// @route   PUT /api/classes/:id/status
// @access  Private/Admin
const updateStatus = asyncHandler(async (req, res) => {
  const classData = await Class.findById(req.params.id);
  
  if (!classData) {
    res.status(404);
    throw new Error('Class not found');
  }

  classData.isActive = req.body.isActive;
  await classData.save();

  res.json(classData);
});

// @desc    Get classes by trainer
// @route   GET /api/classes/trainer/:trainerId
// @access  Public
const getClassesByTrainer = asyncHandler(async (req, res) => {
  const classes = await Class.find({ trainer: req.params.trainerId })
    .populate('trainer', 'name specialization experience rating')
    .sort({ 'schedule.day': 1, 'schedule.startTime': 1 });

  res.json(classes);
});

// @desc    Get featured classes
// @route   GET /api/classes/featured
// @access  Public
const getFeaturedClasses = asyncHandler(async (req, res) => {
  const classes = await Class.find({ isActive: true })
    .sort({ rating: -1, enrolled: -1 })
    .limit(6)
    .populate('trainer', 'name specialization experience rating');

  res.json(classes);
});

module.exports = {
  getAllClasses,
  getClass,
  createClass,
  updateClass,
  deleteClass,
  updateStatus,
  getClassesByTrainer,
  getFeaturedClasses
}; 