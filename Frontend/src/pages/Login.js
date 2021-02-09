import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useAsyncError from '../hooks/useAsyncError';
import useAuth from '../hooks/useAuth';
import { userContext } from '../context/userContext';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const throwError = useAsyncError();
	const { login, error } = useContext(userContext);
	const history = useHistory();
	const handleLogin = (e) => {
		e.preventDefault();
		login({ email, password });
	};
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<h1>Login</h1>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<form onSubmit={handleLogin}>
				<label htmlFor='email'>Email: </label>
				<input
					type='email'
					placeholder='john@doe.com'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				></input>
				<br />
				<label htmlFor='password'>Password: </label>
				<input
					type='password'
					placeholder='Type your password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				></input>
				<br />

				<input type='submit' value='Login'></input>
			</form>
		</div>
	);
}
