const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');

// POST /api/chatbot - Send message to AI chatbot
router.post('/', chatbotController.handleMessage);

module.exports = router; 