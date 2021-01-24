import { useState } from 'react';

export default function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [error, setError] = useState('');
	const handleRegister = (e) => {
		setError('');
		e.preventDefault();
		if (repeatPassword !== password) {
			setError('password should match');
		}
		fetch(`/api/auth/register`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});
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
