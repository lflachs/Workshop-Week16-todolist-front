const express = require('express');
const router = express.Router();
const todolistRoutes = require('./todolist.routes');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const uploadRoutes = require('./upload.routes');
const authenticationMiddleware = require('../middleware/auth.middleware');
router.get('/', (req, res, next) => {
	res.json({ ok: 'yes' });
});

router.use('/uploads', uploadRoutes);
router.use('/todolist', todolistRoutes);
router.use('/auth', authRoutes);
router.use('/user', authenticationMiddleware, userRoutes);

module.exports = router;
