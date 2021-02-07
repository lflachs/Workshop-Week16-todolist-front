import { Checkbox, TextInputMain } from './components/Inputs';
import Todolist from './pages/Todolist';
import Login from './pages/Login';
import ErrorBoundary from './pages/ErrorBoundary';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Link,
	Redirect,
} from 'react-router-dom';
import Register from './pages/Register';
import { useEffect, useState, useContext } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import Logout from './pages/Logout';
import useAuth from './hooks/useAuth';
import { userContext } from './context/userContext';
import Badge from './components/Badge';
import Profile from './pages/Profile';
import { Button, AddButton, RoundButton } from './components/Buttons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodolistDetails from './pages/TodolistDetails';
function App() {
	const { user } = useContext(userContext);
	console.log('myuser', user);
	return (
		<div>
			<ErrorBoundary>
				{/* We could protect the route by storing a value in the localStorage or isLogged in. 
                This will not add more security to the app but for UX purpose,the user will not see the 
                Page title if he/she can't access to it  */}
				{/* <Route path="/todolist" exact component={isAuth ? <Todolist /> : <Redirect path="/" />} ></Route> */}

				<ToastContainer />
				{user && (
					<Link to='/profile'>
						<Badge>{user.email[0]}</Badge>
					</Link>
				)}
				<Switch>
					<ProtectedRoute path='/' exact component={Todolist} user={user} />
					<Route
						path='/login'
						exact
						render={() => (user ? <Redirect to='/' /> : <Login />)}
					/>
					<Route path='/register' exact component={Register} />
					<ProtectedRoute
						path='/profile'
						exact
						component={Profile}
						user={user}
					/>
					<ProtectedRoute
						path='/todolist/:todolistId'
						exact
						component={TodolistDetails}
						user={user}
					/>
				</Switch>
			</ErrorBoundary>
		</div>
	);
}

export default App;
