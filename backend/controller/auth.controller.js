const client = require('../config/db');
const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const findUserByEmail = async (email) => {
	const user = await client.user.findUnique({ where: { email } });
	return user;
};
exports.register = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const userExist = await findUserByEmail(email);
		if (userExist) {
			throw createError(422, 'User already registered');
		}
		const hashedPassword = await bcrypt.hash(password, 12);
		const newUser = await client.user.create({
			data: {
				email,
				password: hashedPassword,
			},
		});
		res.status(201).json({ message: 'User Created', userId: newUser.id });
	} catch (err) {
		next(err);
	}
};
exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await client.user.findUnique({ where: { email } });
		if (!user) {
			throw createError(401, 'Wrong Email');
		}
		const isPasswordEqual = await bcrypt.compare(password, user.password);
		if (!isPasswordEqual) {
			throw createError(401, 'Wrong Password');
		}
		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: '1h',
		});
		res
			.status(200)
			.cookie('token', token, { httpOnly: true })
			.json({ token, userId: user.id });
	} catch (err) {
		next(err);
	}
};
