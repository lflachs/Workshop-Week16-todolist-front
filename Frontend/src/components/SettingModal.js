import { Fragment } from 'react';
import axios from 'axios';
import { TextInput } from './Inputs';
import { useState } from 'react';
import Modal from './Modal';
import { Button } from './Buttons';

const SettingModal = ({ data, showModal, onSubmit, onClose }) => {
	const [inputData, setInputData] = useState(data);
	const [items, setItems] = useState(Object.keys(data));
	const [uploadFile, setUploadFile] = useState(null);
	const handleChange = (event) => {
		setInputData({ ...inputData, [event.target.name]: event.target.value });
	};

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
	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(inputData);
		onSubmit(inputData);
	};
	return showModal ? (
		<Modal>
			<form onSubmit={handleSubmit}>
				<p onClick={onClose}>x</p>
				{/* <h1>{inputData.title}</h1> */}
				{items.map((prop, index) => {
					return (
						<Fragment key={index}>
							<label htmlFor={prop}>{prop}: </label>
							<input
								type='text'
								value={inputData[prop]}
								onChange={handleChange}
								name={prop}
							/>
							<br />
						</Fragment>
					);
				})}
				<img src={`/api/${data.picture}`} style={{ width: '300px' }} />
				<input type='file' onChange={handleChangeUpload}></input>
				<p onClick={handleUpload}>Send file</p>
				<Button type='submit'>Send</Button>;
			</form>
		</Modal>
	) : null;
};

export default SettingModal;
