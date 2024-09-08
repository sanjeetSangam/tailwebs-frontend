import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import logo from "../assets/logo.png";

const Navbar = () => {
	const { logout } = useAuthContext();
	return (
		<nav className="flex justify-between py-5 px-10 items-center">
			<img src={logo} className="w-[2rem]" />

			<div className="nav-actions flex gap-4">
				<Link to={"/"}>Home</Link>
				<button
					className="cursor-pointer"
					onClick={() => {
						logout();
					}}
				>
					Logout
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
