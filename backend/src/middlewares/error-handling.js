module.exports = (err, req, res, next) => {
	console.error(err.message);
	try {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		if (err.statusCode === 500) {
			err.message = 'Internal server Error';
		}
		res.status(err.statusCode).json({ message: err.message });
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};
