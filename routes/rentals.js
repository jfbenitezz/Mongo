const express = require('express');
const router = express.Router();
const controllers = require('../controllers/rentalController.js');

router.post('/', controllers.createRental);
router.get('/:id', controllers.readRental);
router.put('/:id', controllers.updateRental);   
router.delete('/:id', controllers.deleteRental);

module.exports = router;
