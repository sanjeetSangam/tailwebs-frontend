import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";

export function PrivateRoute({ children }) {
	const { user } = useAuthContext();
	return user ? (
		<>
			<Navbar />
			{children}
		</>
	) : (
		<Navigate to="/login" />
	);
}
