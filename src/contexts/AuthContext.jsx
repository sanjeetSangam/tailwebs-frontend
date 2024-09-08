import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("prUSER")));

	const login = (userData) => {
		setUser(userData);
	};

	const logout = async () => {
		try {
			await axios.get("http://localhost:2000/auth/v1/user/logout");
			sessionStorage.removeItem("prUSER");
		} catch (error) {}
		setUser(null);
	};

	return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
	return useContext(AuthContext);
};
