require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/gymdb');

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/classes', require('./routes/classes'));
app.use('/api/attendance', require('./routes/attendance'));

// Default route
app.get('/', (req, res) => {
    res.send('Gym Management System API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
