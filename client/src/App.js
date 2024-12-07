const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const officerRoutes = require('./routes/officers');
const expertController = require('../routes/experts');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/gramodyama', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/officers', officerRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Server Error',
    error: err.message 
  });
});

app.get('/api/experts/all', async (req, res) => {
  try {
      const experts = await Expert.find({ active: true }); // Ensure this query is correct
      res.json(experts);
  } catch (error) {
      console.error('Error fetching experts:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

module.exports = app;
