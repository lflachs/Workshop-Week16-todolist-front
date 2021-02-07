import { userContext } from '../context/userContext';
import { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
const Profile = () => {
	const history = useHistory();
	const { onLogout } = useAuth();
	const { user, logout } = useContext(userContext);
	console.log(user.picture);
	return (
		<>
			<header style={{ display: 'flex' }}>
				<button onClick={() => history.goBack()}>{'<'}</button>
				<h1>Profile</h1>
			</header>
			<h2>{user.email}</h2>
			<img
				src={user.picture}
				alt='profile picture'
				style={{ borderRadius: '50%', width: '200px', height: '200px' }}
			/>
			<input type='file'></input>
			<button onClick={logout}>Logout</button>
		</>
	);
};

export default Profile;
