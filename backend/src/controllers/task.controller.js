const { db } = require('../db');

const findtodolistItem = async (id) => {
	id = Number(id);
	const todolistItem = await db.todolistItem.findUnique({ where: { id } });
	if (!todolistItem) {
		throw new Error({ statusCode: 404, message: 'todolistItem Not Found' });
	}
	return todolistItem;
};
exports.getAlltodolistItem = async (req, res, next) => {
	try {
		const todolistItems = await db.todolistItem.findMany();
		if (!todolistItem) {
			const error = new Error({
				statusCode: 404,
				message: 'todolistItem Not Found',
			});
			next(error);
		}
		res.status(200).json({ todolistItems });
	} catch (err) {
		next(err);
	}
};

exports.createtodolistItem = async (req, res, next) => {
	const { title } = req.body;
	const todoListId = req.params.todolistId;
	try {
		const newTodo = await db.todolistItem.create({
			data: { title, done: false },
		});
		res.status(200).json({ id: newTodo.id, title: newTodo.title });
	} catch (err) {
		next(err);
	}
};

exports.updatetodolistItem = async (req, res, next) => {
	const { title } = req.body;
	const id = Number(req.params.id);
	try {
		const todolistItem = await findtodolistItem(id);
		const updatedtodolistItem = await db.todolistItem.update({
			where: { id: id },
			data: { title },
		});
		res.status(200).json({
			id: updatedtodolistItem.id,
			title: updatedtodolistItem.title,
		});
	} catch (err) {
		next(err);
	}
};
exports.deletetodolistItem = async (req, res, next) => {
	const id = Number(req.params.id);
	try {
		const todolistItem = await findtodolistItem(id);

		const deletedtodolistItem = await db.todolistItem.delete({
			where: { id: id },
		});
		res.status(200).json({ id: deletedtodolistItem.id });
	} catch (err) {
		next(err);
	}
};
