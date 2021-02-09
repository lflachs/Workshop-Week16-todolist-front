import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
	// <Route component={<MyComp name="bob" />}
	return (
		<Route
			{...rest}
			render={(props) => {
				if (user) {
					console.log('user Connected');
					return <Component {...rest} {...props} />;
				} else {
					toast.error('please login');
					return <Redirect to='/login' />;
				}
			}}
		/>
	);
};

export default ProtectedRoute;
