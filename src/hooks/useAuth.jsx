import { useState } from "react";
import { Form } from "antd";
import { useAuthContext } from "../contexts/AuthContext";

const useAuth = (submitCallback) => {
	const [form] = Form.useForm();
	const { login } = useAuthContext();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const onSubmit = async (values) => {
		setLoading(true);
		setError(null);

		try {
			const userData = await submitCallback(values);
			if (userData) {
				sessionStorage.setItem("prUSER", JSON.stringify(userData.data));
				login(userData.data);
			}
			form.resetFields();
		} catch (err) {
			console.error(err.message);
			setError(err.message || "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	const handleInputChange = (name) => (e) => {
		form.setFieldsValue({ [name]: e.target.value });
	};

	return {
		form,
		onSubmit,
		handleInputChange,
		loading,
		error,
	};
};

export default useAuth;
