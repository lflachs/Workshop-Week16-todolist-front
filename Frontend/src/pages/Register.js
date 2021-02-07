import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { userContext } from '../context/userContext';

export default function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');

	const { register, error } = useContext(userContext);
	const handleRegister = (e) => {
		e.preventDefault();
		register({ email, password, repeatPassword });
	};
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			{error && <p>{error}</p>}
			<h1>Register</h1>
			<form onSubmit={handleRegister}>
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
				<label htmlFor='password'>Repeat Password: </label>
				<input
					type='password'
					placeholder='Type your password'
					value={repeatPassword}
					onChange={(e) => setRepeatPassword(e.target.value)}
				></input>
				<br />
				<input type='submit' value='Register'></input>
			</form>
		</div>
	);
}
