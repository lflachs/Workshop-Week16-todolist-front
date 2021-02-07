const client = require('../config/db');
const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const somethingRandom = require('some-random-cat').Random;

const findUserByEmail = async (email) => {
	const user = await client.user.findUnique({ where: { email } });
	return user;
};
exports.register = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const profilePic = await somethingRandom.getCat();
		const userExist = await findUserByEmail(email);
		if (userExist) {
			throw createError(422, 'User already registered');
		}
		const hashedPassword = await bcrypt.hash(password, 12);

		const newUser = await client.user.create({
			data: {
				email,
				password: hashedPassword,
				picture: profilePic,
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
			.json({ id: user.id, email: user.email, picture: user.picture });
	} catch (err) {
		next(err);
	}
};

exports.logout = async (req, res, next) => {
	try {
		res.status(200).clearCookie('token').json({ message: 'logout' });
	} catch (err) {
		next(err);
	}
};
