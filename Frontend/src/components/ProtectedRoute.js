import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
	console.log('thisisuser', user);
	return (
		<Route
			{...rest}
			render={(props) => {
				if (user) {
					console.log('yes');
					return <Component {...rest} {...props} />;
				} else {
					return (
						<Redirect
							to={{
								pathname: '/login',
								state: {
									from: props.location,
								},
							}}
						/>
					);
				}
			}}
		/>
	);
};

export default ProtectedRoute;
