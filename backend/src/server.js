require('dotenv').config();
const express = require('express');
const cors = require('cors');
const recoveryController = require('./controllers/recoveryController');
const logger = require('./utils/logger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/recover', recoveryController.processRecovery);

// Global Error Handler
app.use((err, req, res, next) => {
    logger.error('GlobalErrorHandler', err.stack);
    res.status(500).json({ intent: "error", response: "⚠️ Internal Server Error", intervention_triggered: true });
});

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    logger.info('Server', `Pragya Modular Backend is running on port ${PORT}`);
});
