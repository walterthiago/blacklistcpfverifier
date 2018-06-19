const express = require('express');
const router = express.Router();

const healthController = require('../controllers/health.controller');

router.use('/health', healthController.health);

module.exports = exports = router;