import { useEffect, useState, createContext } from 'react';
import useAsyncError from './useAsyncError';
import { useHistory } from 'react-router-dom';

const useAuth = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const history = useHistory();
	const throwError = useAsyncError();

	console.log('hook re-render', user);
	useEffect(() => {
		fetch('/api/user/current')
			.then((resp) => {
				if (!resp.ok) {
					setUser(null);
					setLoading(false);
					throw new Error('please login');
				}
				return resp.json();
			})
			.then((user) => {
				setUser(user);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	const handleLogin = (userData) => {
		setLoading(true);
		fetch(`/api/auth/login`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(userData),
		}).then((resp) => {
			if (!resp.ok) {
				resp.json().then((json) => {
					setError(json.message);
					setLoading(false);
				});
			} else {
				resp.json().then((user) => {
					setUser(user);
					setLoading(false);
					history.push('/');
				});
			}
		});
	};
	const handleLogout = () => {
		fetch('/api/auth/logout')
			.then((resp) => {
				if (!resp.ok) {
					resp.json().then((json) => throwError(json));
				} else {
					resp.json().then((json) => console.log(json));
					setUser(null);
					history.push('/');
				}
			})
			.catch((err) => {
				throwError(err);
			});
	};
	const handleRegister = (userData) => {
		const { email, password, repeatPassword } = userData;
		setError('');
		if (repeatPassword !== password) {
			setError('password should match');
		}
		fetch(`/api/auth/register`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ email, password }),
		}).then((resp) => {
			if (!resp.ok) {
				resp.json().then((json) => setError(json.message));
			} else {
				history.push('/login');
			}
		});
	};

	return {
		user,
		loading,
		onLogin: handleLogin,
		onLogout: handleLogout,
		onRegister: handleRegister,
		error,
	};
};

export default useAuth;
