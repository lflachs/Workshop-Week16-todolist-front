const { updateUser, deleteUser } = require('../controllers/user.controller');
const router = require('express').Router();

router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
