import { useContext, useState } from 'react';
import { userContext } from '../context/userContext';
import { Button } from '../components/Buttons';
import { toast } from 'react-toastify';
import axios from 'axios';
const Profile = () => {
	const { user } = useContext(userContext);
	const [userData, setUserData] = useState(user);
	const [file, setFile] = useState(null);

	const handleChange = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};
	const handleFileLoad = (e) => {
		setFile(e.target.files[0]);
	};
	const handleUpdate = () => {
		axios
			.put('/api/user/current', userData)
			.then((resp) => {
				toast.success('youhou!');
				setUserData(resp.data);
			})
			.catch((err) => toast.error(err));
	};
	const handleUpload = (e) => {
		if (!file) {
			toast.error('please provide a file.');
			return;
		}
		const formData = new FormData();
		formData.append('picture', file);
		axios
			.post('/api/uploads', formData)
			.then((resp) => {
				setUserData({ ...userData, picture: resp.data.path });
				toast.success('Uploaded :)');
			})
			.catch((err) => toast.error(err));
	};
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<h1>Hello {user.email} </h1>
			<img src={`/api/${user.picture}`} alt='user Profile' />
			<br />
			<br />
			<label htmlFor='email'>Email: </label>
			<input
				type='text'
				value={userData.email}
				name='email'
				onChange={handleChange}
			/>
			<br />
			<br />
			<label htmlFor='picture'>Picture: </label>

			<input type='file' onChange={handleFileLoad} />
			<button onClick={handleUpload}>Upload File</button>
			<br />
			<br />
			<Button onClick={handleUpdate}>Save User</Button>
		</div>
	);
};

export default Profile;
