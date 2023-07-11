import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PreventSignin = ({ children }) => {
	const auth = useAuth();
	if (auth.signedIn) {
		return <Navigate to='/' />;
	}
	return children;
};

export default PreventSignin;
