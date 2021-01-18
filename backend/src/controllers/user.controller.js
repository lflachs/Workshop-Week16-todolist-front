const { db } = require('../db');

const findUser = async (id) => {
	id = Number(id);
	const user = await db.user.findUnique({ where: { id } });
	if (!user) {
		throw new Error({ statusCode: 404, message: 'user Not Found' });
	}
	return user;
};

exports.updateUser = async (req, res, next) => {
	const { email, name } = req.body;
	const id = Number(req.params.id);
	try {
		const user = await findUser(id);
		const updatedUser = await db.user.update({
			where: { id: id },
			data: { email, name },
		});
		res.status(200).json({
			id: updatedUser.id,
			name: updatedUser.name,
			email: updatedUser.email,
		});
	} catch (err) {
		next(err);
	}
};
exports.deleteUser = async (req, res, next) => {
	const { email, name } = req.body;
	const id = Number(req.params.id);
	try {
		const user = await findUser(id);

		const deletedUser = await db.user.delete({
			where: { id: id },
		});
		res.status(200).json({ id: deletedUser.id });
	} catch (err) {
		next(err);
	}
};
