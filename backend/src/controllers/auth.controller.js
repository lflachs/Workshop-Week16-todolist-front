const { db } = require('../db');

exports.register = async (req, res, next) => {
	const { email, name, password } = req.body;
	try {
		const newUser = await db.user.create({
			data: { email, name },
		});
		res.status(200).json({ id: newUser.id });
	} catch (err) {
		next(err);
	}
};
