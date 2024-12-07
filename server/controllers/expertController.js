const Expert = require('../models/Expert');

// Get all experts
exports.getAllExperts = async (req, res) => {
  try {
    const experts = await Expert.find({ active: true });
    res.json(experts);
  } catch (error) {
    console.error('Error fetching experts:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get expert by ID
exports.getExpertById = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);
    if (!expert) {
      return res.status(404).json({ message: 'Expert not found' });
    }
    res.json(expert);
  } catch (error) {
    console.error('Error fetching expert:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};