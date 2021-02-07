const {
	getAllTodolist,
	createTodolist,
	updateTodolist,
	getTodolist,
	deleteTodolist,
	createTask,
	updateTask,
	deleteTask,
	getTodolistTasks,
} = require('../controller/todolist.controller');
const {
	createTodolistValidator,
	updateTodolistValidator,
} = require('../validators/todolist.validators');
const authMiddleware = require('../middleware/auth.middleware');

const router = require('express').Router();

router.get('/', authMiddleware, getAllTodolist);
router.get('/:todolistId', getTodolist);
router.get('/:todolistId/tasks', getTodolistTasks);
router.post('/', authMiddleware, createTodolist);
router.put('/:todolistId', updateTodolistValidator, updateTodolist);
router.put('/:todolistId/tasks/:taskId', updateTask);
router.delete('/:todolistId/tasks/:taskId', deleteTask);

router.delete('/:todolistId', deleteTodolist);

router.post('/:todolistId/tasks', authMiddleware, createTask);

module.exports = router;
