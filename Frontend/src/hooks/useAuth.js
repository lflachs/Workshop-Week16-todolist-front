import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const useAuth = () => {
	const history = useHistory();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const login = (userData) => {
		axios
			.post(`api/auth/login`, userData)
			.then((resp) => {
				history.push('/');
				toast.success('welcome');
				console.log(resp.data);
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};
	const register = (userData) => {
		setError('');
		const { repeatPassword, password, email } = userData;
		if (repeatPassword !== password) {
			setError('password should match');
		}
		axios.post(`/api/auth/register`, { email, password });
	};
	return { register, login, error };
};

export default useAuth;
