const { PrismaClient } = require('@prisma/client');
const client = new PrismaClient();
const createError = require('http-errors');

exports.getCurrentUser = async (req, res, next) => {
	try {
		const user = await client.user.findUnique({
			where: { id: req.userId },
			select: { id: true, email: true, picture: true },
		});
		res.status(200).json(user);
	} catch (err) {
		next(err);
	}
};
exports.updateCurrentUser = async (req, res, next) => {
	try {
		const { email, picture } = req.body;
		// console.log(req.file);
		const updatedUser = await client.user.update({
			where: { id: req.userId },
			data: { email, picture },
			select: { id: true, email: true, picture: true },
		});
		res.status(200).json(updatedUser);
	} catch (err) {
		next(err);
	}
};
