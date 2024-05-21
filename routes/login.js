const express = require('express');
const router = express.Router();
const controllers = require('../controllers/loginController.js');

router.post('/', controllers.loginUser);

module.exports = router;
