// Components
import { Checkbox, TextInputMain } from './components/Inputs';
import { Button, AddButton, RoundButton } from './components/Buttons';
import { useEffect } from 'react';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Todolist from './pages/Todolist';
import Login from './pages/Login';
import ErrorBoundary from './pages/ErrorBoundary';
import Register from './pages/Register';

// Dependencies
import { useState, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { userContext } from './context/userContext';
import { Redirect } from 'react-router-dom';
import Badge from './components/Badge';
import Profile from './pages/Profile';

function App() {
	const { user, logout } = useContext(userContext);
	// console.log(user);
	// useEffect(() => {
	// 	axios.get('/api/user/current').then((resp) => setUser(resp.data));
	// }, []);
	return (
		<div className='App'>
			<ErrorBoundary>
				{user && (
					<Badge
						onClick={() => {
							console.log('click');
							logout();
						}}
					>
						{user.email[0].toUpperCase()}
					</Badge>
				)}

				{/* We could protect the route by storing a value in the localStorage or isLogged in. 
                This will not add more security to the app but for UX purpose,the user will not see the 
                Page title if he/she can't access to it  */}
				{/* <Route path="/todolist" exact component={isAuth ? <Todolist /> : <Redirect path="/" />} ></Route> */}
				<ToastContainer />

				<Switch>
					<ProtectedRoute path='/' exact component={Todolist} user={user} />
					<Route
						path='/login'
						exact
						render={() => {
							return user ? <Redirect to='/' /> : <Login />;
						}}
					/>
					<Route path='/register' exact component={Register} />
					<ProtectedRoute
						path='/profile'
						exact
						component={Profile}
						user={user}
					/>
				</Switch>
			</ErrorBoundary>
			{/* <Login /> */}
		</div>
	);
}

export default App;
