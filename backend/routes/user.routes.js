const {
	getCurrentUser,
	updateCurrentUser,
} = require('../controller/user.controller');

const authMiddleware = require('../middleware/auth.middleware');
const { uploadImage } = require('../middleware/upload.midddleware');

const router = require('express').Router();

router.get('/current', authMiddleware, getCurrentUser);
router.put('/current', uploadImage, updateCurrentUser);

module.exports = router;
