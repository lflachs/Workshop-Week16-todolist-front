import { useEffect, useState } from 'react';
import useAsyncError from '../hooks/useAsyncError';
import axios from 'axios';
export default function Profile() {
	const throwError = useAsyncError();
	const [user, setUser] = useState();
	const [file, setFile] = useState(null);
	const [progress, setProgress] = useState(0);

	const handleLoadFile = (event) => {
		console.log(event.target.files[0]);
		setFile(event.target.files[0]);
	};
	const handleSubmit = () => {
		const data = new FormData();
		data.append('file', file);
		axios
			.put('/api/user/current', data, {
				onUploadProgress: (ProgressEvent) => {
					setProgress((ProgressEvent.loaded / ProgressEvent.total) * 100);
				},
			})
			.then((user) => setUser(user));
	};
	useEffect(() => {
		fetch('/api/user/current')
			.then((resp) => {
				if (!resp.ok) {
					resp.json().then((json) => {
						const error = new Error(json.message);
						error.status = resp.status;
						throwError(error);
					});
				} else {
					return resp.json();
				}
			})
			.then((user) => setUser(user))
			.catch((err) => throwError(err));
	}, []);
	return user ? (
		<>
			<h1>Profile</h1>
			<img
				src={
					`/api${user.picture}` ||
					'https://img.icons8.com/carbon-copy/2x/camera--v2.png'
				}
			/>
			<br />

			<input type='file' name='file' onChange={handleLoadFile} />
			<button type='button' onClick={handleSubmit}>
				Upload
			</button>
		</>
	) : (
		<h1>Loading</h1>
	);
}
