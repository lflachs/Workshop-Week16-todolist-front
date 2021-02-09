const { register, login, logout } = require('../controller/auth.controller');
const router = require('express').Router();

router.post('/register', register);
router.get('/logout', logout);
router.post('/login', login);

module.exports = router;
