import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RequireAuth = ({ children }) => {
	const auth = useAuth();
	if (!auth.signedIn) {
		return <Navigate to='/signin' />;
	}
	return children;
};

export default RequireAuth;
