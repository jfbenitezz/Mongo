const express = require('express');
const router = express.Router();
const controllers = require('../controllers/userController.js');

//router.get('/', controllers.getUser);
router.post('/', controllers.createUser);
router.get('/:id', controllers.readUser);
router.put('/:id', controllers.updateUser);
router.delete('/:id', controllers.deleteUser);

module.exports = router;
