const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const officerRoutes = require('./routes/officers');
const expertRoutes = require('./routes/experts');
const authRoutes = require('./routes/auth');

const app = express();
connectDB();


app.use(cors());
app.use(express.json());

app.use('/api/officers', officerRoutes);
app.use('/api/experts', expertRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Server Error',
    error: err.message 
  });
});

module.exports = app;

require('dotenv').config();
// Rest of your code...
