const express = require('express');
const router = express.Router();
const controllers = require('../controllers/imageController');

//Aply image Middleware to request
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('image'), controllers.createImages);
router.get('/', controllers.getImages);
router.delete('/', controllers.deleteImages);
module.exports = router;
