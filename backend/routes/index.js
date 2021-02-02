const express = require('express');
const router = express.Router();
const todolistRoutes = require('./todolist.routes');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const authenticationMiddleware = require('../middleware/auth.middleware');
router.get('/', (req, res, next) => {
	res.json({ ok: 'yes' });
});
router.use('/uploads', express.static('uploads'));
router.use('/todolist', todolistRoutes);
router.use('/auth', authRoutes);
router.use('/user', authenticationMiddleware, userRoutes);

module.exports = router;
