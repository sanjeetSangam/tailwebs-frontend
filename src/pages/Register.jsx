import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Form } from "antd";
import { MailOutlined, UnlockOutlined, UserOutlined } from "@ant-design/icons";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { useAuthContext } from "../contexts/AuthContext";
import { USER_REGISTER_API } from "../utils/Apis";

const Register = () => {
	const navigate = useNavigate();
	const { user } = useAuthContext();
	const { form, onSubmit, loading, error } = useAuth(async (inputData) => {
		try {
			await axios.post(USER_REGISTER_API, inputData);
			navigate("/login");
		} catch (error) {
			throw new Error(error?.response?.data?.message || "Something went wrong!");
		}
	});

	useEffect(() => {
		if (user) navigate("/");
	}, [user, navigate]);

	return (
		<div className="h-screen w-full grid place-items-center">
			<Form
				form={form}
				onFinish={onSubmit}
				layout="vertical"
				className="bg-white !text-gray-800 p-11 border rounded-lg sm:w-[400px] w-[300px] flex flex-col"
			>
				{error && <span className="text-red-700 text-sm mb-4">{error}</span>}
				<Form.Item
					name="username"
					label="Username"
					rules={[{ required: true, message: "Username is required" }]}
				>
					<Input
						prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
						placeholder="Enter your username"
					/>
				</Form.Item>

				<Form.Item
					name="fullName"
					label="Full Name"
					rules={[{ required: true, message: "Full name is required" }]}
				>
					<Input
						prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
						placeholder="Enter your full name"
					/>
				</Form.Item>

				<Form.Item
					name="email"
					label="Email"
					rules={[{ required: true, type: "email", message: "Email is required" }]}
				>
					<Input
						type="email"
						prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
						placeholder="Input email"
					/>
				</Form.Item>

				<Form.Item
					name="password"
					label="Password"
					rules={[{ required: true, message: "Password is required" }]}
				>
					<Input.Password
						prefix={<UnlockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
						placeholder="Input password"
					/>
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" className="w-full" loading={loading}>
						Register
					</Button>
				</Form.Item>

				<Form.Item>
					<Link to={"/login"}>
						<Button className="w-full" type="default">
							Already a user? Login
						</Button>
					</Link>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Register;
