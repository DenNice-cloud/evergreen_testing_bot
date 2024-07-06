const express = require('express');
const router = express.Router();
const botController = require('../controllers/botController');

router.post('/webhook', botController.handleWebhook);

module.exports = router;
