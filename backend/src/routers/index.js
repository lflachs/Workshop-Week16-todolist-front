const router = require('express').Router();
const userRouter = require('./user.routes');
const authRouter = require('./auth.routes');
const todolistRouter = require('./todolist.routes');

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/todolist', todolistRouter);

router.get('/', (req, res) => {
	res.status(200).json({ version: 0.1 });
});
module.exports = router;
