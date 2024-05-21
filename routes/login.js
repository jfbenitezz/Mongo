const express = require('express');
const router = express.Router();
const controllers = require('../controllers/loginController.js');

router.post('/', controllers.loginUser);
router.post('/refresh-token', controllers.refreshToken);
router.post('/logout', controllers.logoutUser);

module.exports = router;
