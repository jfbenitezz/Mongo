const express = require('express');
const router = express.Router();
const controllers = require('../controllers/propertiesController');

router.post('/', controllers.createProperty);
router.get('/:id', controllers.readProperty);
router.put('/:id', controllers.updateProperty); 
router.delete('/:id', controllers.deleteProperty);
module.exports = router;
