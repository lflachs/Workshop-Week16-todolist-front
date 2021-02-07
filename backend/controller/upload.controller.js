exports.uploadFile = (req, res, next) => {
	try {
		const file = req.file;
		res.status(200).json({ path: file.path });
	} catch (err) {
		next(err);
	}
};
