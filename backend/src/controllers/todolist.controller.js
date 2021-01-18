const { db } = require('../db');

const findTodolist = async (id) => {
	console.log('test2');
	const todolist = await db.todolist.findUnique({ where: { id } });

	if (!todolist) {
		throw { statusCode: 404, message: 'todolist Not Found' };
	}
	return todolist;
};

const findTask = async (todoId, taskId) => {
	const task = await db.todolistItem.findUnique({
		where: { id: taskId },
	});
	if (!task) {
		throw new Error({ statusCode: 404, message: 'task Not Found' });
	}
	return task;
};
exports.getAllTodoList = async (req, res, next) => {
	try {
		const todolist = await db.todolist.findMany();
		if (!todolist) {
			const error = new Error({
				statusCode: 404,
				message: 'todolist Not Found',
			});
			next(error);
		}
		res.status(200).json(todolist);
	} catch (err) {
		next(err);
	}
};

exports.getTodoListById = async (req, res, next) => {
	const id = Number(req.params.id);
	try {
		const todolist = await db.todolist.findUnique({
			where: { id },
			select: { id: true, title: true, todolistItems: true },
		});
		if (!todolist) {
			const error = new Error({
				statusCode: 404,
				message: 'todolist Not Found',
			});
			next(error);
		}
		res.status(200).json({ ...todolist });
	} catch (err) {
		next(err);
	}
};

exports.createTodolist = async (req, res, next) => {
	const { title } = req.body;
	try {
		const newTodo = await db.todolist.create({ data: { title } });
		res.status(200).json({ id: newTodo.id, title: newTodo.title });
	} catch (err) {
		next(err);
	}
};

exports.updateTodolist = async (req, res, next) => {
	const { title } = req.body;
	const id = Number(req.params.id);

	try {
		const todolist = await findTodolist(id);
		const updatedTodolist = await db.todolist.update({
			where: { id: id },
			data: { title },
		});
		res.status(200).json({
			id: updatedTodolist.id,
			title: updatedTodolist.title,
		});
	} catch (err) {
		next(err);
	}
};
exports.deleteTodolist = async (req, res, next) => {
	const id = Number(req.params.id);
	try {
		const todolist = await findTodolist(id);

		const deletedTodolist = await db.todolist.delete({
			where: { id: id },
		});
		res.status(200).json({ id: deletedTodolist.id });
	} catch (err) {
		next(err);
	}
};

exports.createTask = async (req, res, next) => {
	const todolistId = Number(req.params.todolistId);
	console.log(req.body);
	await findTodolist(todolistId);
	const { title } = req.body;
	try {
		const newTask = await db.todolistItem.create({
			data: { title, todolist: { connect: { id: todolistId } } },
		});
		res.status(200).json({ id: newTask.id, title: newTask.title });
	} catch (err) {
		next(err);
	}
};

exports.updateTask = async (req, res, next) => {
	console.log(req.body);
	const todolistId = Number(req.params.todolistId);
	const taskId = Number(req.params.taskId);
	await findTask(todolistId, taskId);
	const { title, done } = req.body;
	try {
		const updatedTask = await db.todolistItem.update({
			where: { id: taskId },
			data: { title, done },
		});
		res.status(200).json({
			id: updatedTask.id,
			title: updatedTask.title,
			done: updatedTask.done,
		});
	} catch (err) {
		next(err);
	}
};
exports.getAllTask = async (req, res, next) => {
	const id = Number(req.params.todolistId);

	try {
		await findTodolist(id);

		const allTasks = await db.todolistItem.findMany({
			where: { todolist: { id } },
		});
		res.status(200).json(allTasks);
	} catch (err) {
		next(err);
	}
};

exports.deleteTask = async (req, res, next) => {
	const todolistId = Number(req.params.todolistId);
	const taskId = Number(req.params.taskId);

	await findTask(todolistId, taskId);
	try {
		const updatedTask = await db.todolistItem.delete({
			where: { id: taskId },
		});
		res.status(200).json({
			id: updatedTask.id,
		});
	} catch (err) {
		next(err);
	}
};
exports.getSingleTask = async (req, res, next) => {
	const todolistId = Number(req.params.todolistId);
	const taskId = Number(req.params.taskId);
	try {
		const task = await db.todolistItem.findUnique({
			where: { id: taskId },
		});
		res.status(200).json({
			...task,
		});
	} catch (err) {
		next(err);
	}
};
