const express = require('express');
const app = express();
const mainRouter = require('./routes');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/error-handling.middleware');
const db = require('./config/db');
const morgan = require('morgan');
const cors = require('cors');
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(morgan());
const user = {
	email: 'bob@gmail.com',
	password: 12345,
};

app.use('/api', mainRouter);

app.post('/register', (req, res, next) => {});

app.post('/login', (req, res, next) => {
	const { email, password } = req.body;
	if (email === user.email && password === user.password) {
		res
			.status(200)
			.cookie('login', true, { httpOnly: true })
			.json({ connected: true });
	} else {
		res.status(401).json({ message: 'wrong Crendentials' });
	}
});

const authenticationMiddleware = (req, res, next) => {
	if (req.cookies.login === 'true') {
		next();
	} else {
		res.status(403).json({ message: 'Unauthorized!' });
	}
};
app.get('/secret', authenticationMiddleware, (req, res, next) => {
	res.status(200).json({ message: 'You found the seret!' });
});

app.use('*', (req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use(errorMiddleware);

app.listen(PORT, () => {
	console.log(`app is running on ${PORT}`);
});
