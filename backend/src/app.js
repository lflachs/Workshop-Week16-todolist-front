const express = require('express');
const errorHandler = require('./middlewares/error-handling');
const router = require('./routers');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use(cors());
app.use('/api', router);
app.use('*', (req, res, next) => {
	res.status(404).json({ message: 'Page not found' });
});

if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, () => {
		console.log(`app is running on ${PORT}`);
	});
}
app.use(errorHandler);
module.exports = app;
