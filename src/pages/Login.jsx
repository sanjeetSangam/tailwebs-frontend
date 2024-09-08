import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Form, message } from "antd";
import { UnlockOutlined, UserOutlined } from "@ant-design/icons";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { useAuthContext } from "../contexts/AuthContext";
import { capitalize } from "../utils/capitalize";
import { USER_LOGIN_API } from "../utils/Apis";

const Login = () => {
	const navigate = useNavigate();
	const { user } = useAuthContext();
	const { form, onSubmit, loading, error } = useAuth(async (inputData) => {
		try {
			const { data } = await axios.post(USER_LOGIN_API, inputData);
			message.info(`Welcome ${capitalize(data.data.user.fullName)}!`);
			navigate("/");
			return data;
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
						Login
					</Button>
				</Form.Item>

				<Form.Item>
					<Link to={"/register"}>
						<Button type="default" className="w-full">
							Not registered? Register
						</Button>
					</Link>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Login;
