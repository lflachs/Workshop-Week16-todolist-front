const { check, validationResult } = require('express-validator');
const db = require('../config/db');

const titleValidator = () => {
	return check('title')
		.isString()
		.withMessage('title should be a String')
		.not()
		.isEmpty()
		.withMessage('Title cannot be empty')
		.isLength({ min: 5, max: 100 })
		.withMessage('title should be between 5 and 100 characters');
};
exports.createTodolistValidator = [
	titleValidator,
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

// todolistId: Number - Title: Stirng - Todolist Exists
exports.updateTodolistValidator = [
	titleValidator(),
	check('todolistId')
		.toInt()
		.isNumeric()
		.withMessage('Todolist Id must be a number')
		.custom((value) => {
			return db.todolist
				.findUnique({ where: { id: value } })
				.then((todolist) => {
					if (!todolist) {
						return Promise.reject("Todolist Doesn't exist");
					}
				});
		}),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];
