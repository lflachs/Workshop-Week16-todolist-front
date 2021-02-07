const express = require('express');
const router = express.Router();
const todolistRoutes = require('./todolist.routes');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const createError = require('http-errors');
const { upload } = require('../middleware/upload.midddleware');
const { route } = require('./todolist.routes');
const { uploadFile } = require('../controller/upload.controller');

router.use('/uploads', express.static('uploads'));

router.get('/', (req, res, next) => {
	res.json({ ok: 'yes' });
});
router.use('/todolist', todolistRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.post('/upload', upload, uploadFile);
router.use('*', (req, res, next) => {
	next(createError(404));
});

module.exports = router;
