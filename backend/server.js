// Import dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
let dbConnected = false;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: 'majority',
    });
    dbConnected = true;
    console.log('✅ MongoDB connected');
  } catch (error) {
    dbConnected = false;
    console.error('❌ MongoDB error:', error.message);
  }
};

// Initial connection
connectDB();

// Handle MongoDB connection events
mongoose.connection.on('disconnected', () => {
  dbConnected = false;
  console.warn('⚠️ MongoDB disconnected');
});

mongoose.connection.on('connected', () => {
  dbConnected = true;
  console.log('✅ MongoDB reconnected');
});

// Import routes
const taskRoutes = require('./routes/taskRoutes');

// Routes
app.use('/api/tasks', taskRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    mongodb: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server error'
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
});
