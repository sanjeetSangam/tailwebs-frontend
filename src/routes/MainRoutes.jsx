import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Homepage, Login, Register } from "../pages";
import { PrivateRoute } from "./PrivateRoute";

const MainRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="/"
					element={
						<PrivateRoute>
							<Homepage />
						</PrivateRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default MainRoutes;
