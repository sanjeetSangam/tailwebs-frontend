import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import React from "react";

const { Option } = Select;

const StudentFormModal = ({ isOpen, onClose, title, studentData, onSubmit, loading }) => {
	const [form] = Form.useForm();

	React.useEffect(() => {
		if (studentData) {
			form.setFieldsValue(studentData);
		} else {
			form.resetFields();
		}
	}, [studentData, form]);

	const handleFormSubmit = async (values) => {
		try {
			await onSubmit(values);
			form.resetFields();
			onClose();
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<Modal title={title} centered open={isOpen} onCancel={onClose} footer={null}>
			<Form form={form} onFinish={handleFormSubmit} layout="vertical">
				<Form.Item
					name="name"
					label="Name"
					rules={[
						{ required: true, message: "Name is required" },
						{ min: 3, message: "Name must be 3 characters" },
						{ max: 50, message: "Name must not exceed 50 characters" },
					]}
				>
					<Input placeholder="Enter student name" />
				</Form.Item>

				<Form.Item
					name="subject"
					label="Subject"
					rules={[{ required: true, message: "Subject is required" }]}
				>
					<Select placeholder="Select a subject">
						<Option value="Math">Math</Option>
						<Option value="Science">Science</Option>
						<Option value="English">English</Option>
					</Select>
				</Form.Item>

				<Form.Item
					name="marks"
					label="Marks"
					rules={[
						{ required: true, message: "Marks are required" },
						{
							type: "number",
							min: 0,
							max: 100,
							message: "Marks must be between 0 and 100",
						},
					]}
				>
					<InputNumber type="number" className="w-full" placeholder="Enter marks" />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" loading={loading}>
						{studentData ? "Update" : "Add"}
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default StudentFormModal;
