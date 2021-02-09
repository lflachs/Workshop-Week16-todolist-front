const express = require('express');
const router = express.Router();
const { uploadImage } = require('../middleware/upload.middleware');
const { uploadFile } = require('../controller/upload.controller');
router.post('/', uploadImage, uploadFile);
router.use('/', express.static('uploads'));

module.exports = router;
