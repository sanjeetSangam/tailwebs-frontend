import { PlusOutlined } from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import TableActions from "../components/TableActions";
import { useModal } from "../contexts/ModalContext";
import { useStudentContext } from "../contexts/StudentContext";

const Homepage = () => {
	const { students, addStudent } = useStudentContext();
	const { openModal } = useModal();

	const handleOpenAddModal = () => {
		openModal({
			isOpen: true,
			title: "Add Student",
			studentData: null,
			onSubmit: async (data) => {
				try {
					await addStudent(data);
				} catch (error) {
					throw new Error(error);
				}
			},
			loading: false,
		});
	};

	return (
		<div className="py-5 px-10">
			<div className="dashboard-container bg-white rounded-lg">
				<Table columns={columns} dataSource={students} rowKey="_id" />
			</div>
			<Button
				type="primary"
				className="mt-5"
				onClick={handleOpenAddModal}
				icon={<PlusOutlined />}
			>
				Add Student
			</Button>
		</div>
	);
};

export default Homepage;

const columns = [
	{
		title: "Name",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "Subject",
		dataIndex: "subject",
		key: "subject",
	},
	{
		title: "Marks",
		dataIndex: "marks",
		key: "marks",
	},
	{
		title: "Action",
		key: "action",
		render: (_, record) => (
			<Space size="middle">
				<TableActions record={record} />
			</Space>
		),
	},
];
