const router = require('express').Router();
const {
	getCurrentUser,
	updateCurrentUser,
} = require('../controller/user.controller');
const { uploadImage } = require('../middleware/upload.middleware');

router.get('/current', getCurrentUser);
router.put('/current', uploadImage, updateCurrentUser);

module.exports = router;
