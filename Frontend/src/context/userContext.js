import { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAsyncError from '../hooks/useAsyncError';
import { toast } from 'react-toastify';
export const userContext = createContext(null); // Create a context object

export const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const history = useHistory();
	const throwError = useAsyncError();
	console.log('context re-render');
	useEffect(() => {
		fetch('/api/user/current')
			.then((resp) => {
				if (!resp.ok) {
					setUser(null);
					setLoading(false);
				} else {
					return resp.json();
				}
			})
			.then((user) => {
				setUser(user);
				setLoading(false);
			})
			.catch((err) => toast.error(err));
		return () => setUser(null);
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
					toast.error(json.message);
				});
			} else {
				resp.json().then((user) => {
					setUser(user);
					setLoading(false);
					toast.success('Welcome');
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
					toast.success('👋 Logout successful');
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
			setError('password must match');
			toast.error('🛑 Password must match');
		}
		fetch(`/api/auth/register`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ email, password }),
		}).then((resp) => {
			if (!resp.ok) {
				resp.json().then((json) => {
					setError(json.message);
					toast.error(json.message);
				});
			} else {
				toast.success('🎉 Registration completed!');

				history.push('/login');
			}
		});
	};
	return (
		<userContext.Provider
			value={{
				user,
				login: handleLogin,
				logout: handleLogout,
				register: handleRegister,
				error,
				loading,
			}}
		>
			{loading ? <h1>loading...</h1> : children}
		</userContext.Provider>
	);
};
