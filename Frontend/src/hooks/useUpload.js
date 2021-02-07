const useUpload = () => {
	const [uploadFile, setUploadFile] = useState(null);

	const handleUpload = (event) => {
		console.log('upload');
		let formData = new FormData();
		formData.append('file', event.target.file[0]);
		axios
			.post('/api/upload', formData)
			.then(({ data }) => setUploadedFile(data.path);
	};

	return [uploadFile, handleUpload];
};

export default useUpload;