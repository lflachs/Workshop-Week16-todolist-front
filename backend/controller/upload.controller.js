exports.uploadFile = (req, res, next) => {
	try {
		const path = req.file.path;
		res.status(200).json({ path });
	} catch (err) {
		next(err);
	}
};
