import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
export const userContext = createContext(null);
// userContext.Provider
// userContext.Consumer
// const { user } = useContext(userContext)
export const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const history = useHistory();
	useEffect(() => {
		axios
			.get('/api/user/current')
			.then((resp) => {
				setUser(resp.data);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
			});
	}, []);
	const login = (userData) => {
		setLoading(true);
		axios
			.post(`api/auth/login`, userData)
			.then((resp) => {
				console.log(resp);
				toast.success('welcome');
				setUser(resp.data);
				setLoading(false);
			})
			.catch((err) => {
				toast.error(err.message);
				setLoading(false);
			});
	};
	const logout = () => {
		setLoading(true);
		axios
			.get('/api/auth/logout')
			.then((resp) => {
				setUser(null);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				toast('Error while logout');
			});
	};
	const register = (userData) => {
		setLoading(true);

		const { repeatPassword, password, email } = userData;
		if (repeatPassword !== password) {
			toast.error('password must match');
		}
		axios
			.post(`/api/auth/register`, { email, password })
			.then(() => {
				setLoading(false);
				history.push('/login');
			})
			.catch((err) => {
				console.log('test');
				toast.error(err.message);
				setLoading(false);
			});
	};

	return (
		<userContext.Provider value={{ user, login, logout, register, error }}>
			{!loading ? children : <h1>Loading...</h1>}
		</userContext.Provider>
	);
};

{
	/* <UserContextProvider>
	<h1>hello</h1>
</UserContextProvider>; */
}
