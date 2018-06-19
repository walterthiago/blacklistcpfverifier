const express = require('express');
const router = express.Router();

const cpfController = require('../controllers/cpf.controller');


router.post('/cpf', cpfController.putInBlacklist);

router.get('/cpf', cpfController.listBlacklist);

router.delete('/cpf', cpfController.removeFromBlacklist);

module.exports = exports = router;