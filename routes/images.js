const express = require('express');
const router = express.Router();
const controllers = require('../controllers/imageController');
const {upload} = require('../middleware/multer');
const auth = require('../middleware/authToken.js');

//Falta aplicar middleware para obtener id
router.post('/', upload.single('image'), controllers.createImages);
router.get('/', controllers.getImages);
router.delete('/', auth.verifyToken, controllers.deleteImages);
module.exports = router;
