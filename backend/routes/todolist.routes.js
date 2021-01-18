const {
	getAllTodolist,
	createTodolist,
	updateTodolist,
	getTodolist,
	deleteTodolist,
	createTask,
	updateTask,
	deleteTask,
} = require('../controller/todolist.controller');
const {
	createTodolistValidator,
	updateTodolistValidator,
} = require('../validators/todolist.validators');
const authMiddleware = require('../middleware/auth.middleware');

const router = require('express').Router();

router.get('/', getAllTodolist);
router.get('/:todolistId', getTodolist);
router.post('/', createTodolist);
router.put('/:todolistId', updateTodolistValidator, updateTodolist);
router.put('/:todolistId/task/:taskId', updateTask);
router.delete('/:todolistId/task/:taskId', deleteTask);

router.delete('/:todolistId', deleteTodolist);

router.post('/:todolistId/task', authMiddleware, createTask);

module.exports = router;
