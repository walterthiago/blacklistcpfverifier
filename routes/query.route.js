const express = require('express');
const router = express.Router();

const queryController = require('../controllers/query.controller');


router.get('/query', queryController.query);

module.exports = exports = router;