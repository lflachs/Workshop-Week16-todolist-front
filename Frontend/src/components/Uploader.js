const Uploader = () => {
	const [uploadFile, setUploadFile] = useState(null);

	const handleChangeUpload = (event) => {
		setUploadFile(event.target.files[0]);
	};
	const handleUpload = (event) => {
		console.log('upload');
		let formData = new FormData();
		formData.append('file', uploadFile);
		axios
			.post('/api/upload', formData)
			.then(({ data }) => setInputData({ ...inputData, picture: data.path }));
	};
	return (
		<>
			<input type='file' onChange={handleChangeUpload}></input>
			<p onClick={handleUpload}>Send file</p>
		</>
	);
};
