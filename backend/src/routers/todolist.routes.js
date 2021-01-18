const {
	createTodolist,
	updateTodolist,
	deleteTodolist,
	getAllTodoList,
	createTask,
	updateTask,
	getAllTask,
	deleteTask,
	getSingleTask,
	getTodoListById,
} = require('../controllers/todolist.controller');

const router = require('express').Router();

router.get('/', getAllTodoList);
router.get('/:id', getTodoListById);
router.post('/', createTodolist);
router.put('/:id', updateTodolist);
router.delete('/:id', deleteTodolist);

router.get('/:todolistId/task', getAllTask);
router.get('/:todolistId/task/:taskId', getSingleTask);

router.post('/:todolistId/task', createTask);
router.put('/:todolistId/task/:taskId', updateTask);
router.delete('/:todolistId/task/:taskId', deleteTask);

module.exports = router;
