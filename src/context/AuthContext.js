import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const signin = (user) => {
		sessionStorage.setItem('user', user);
		setUser(user);
	};

	const signedIn = sessionStorage.getItem('user');

	return (
		<AuthContext.Provider value={{ user, signin, signedIn }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
