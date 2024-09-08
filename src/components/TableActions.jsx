import { PlayCircleFilled } from "@ant-design/icons";
import { Dropdown } from "antd";
import React from "react";
import { useModal } from "../contexts/ModalContext";
import { useStudentContext } from "../contexts/StudentContext";

const TableActions = ({ record }) => {
	const { openModal } = useModal();
	const { editStudent, deleteStudent } = useStudentContext();

	const handleOpenEditModal = () => {
		openModal({
			isOpen: true,
			title: "Edit Student",
			studentData: record,
			onSubmit: async (data) => {
				try {
					await editStudent(record._id, data);
				} catch (error) {
					throw new Error(error);
				}
			},
			loading: false,
		});
	};

	const handleMenuClick = (e) => {
		switch (e.key) {
			case "1":
				handleOpenEditModal();
				break;
			case "2":
				deleteStudent(record._id);
				break;
			default:
				break;
		}
	};

	const items = [
		{
			label: "Edit",
			key: "1",
		},
		{
			label: "Delete",
			key: "2",
		},
	];

	const menuProps = {
		items,
		onClick: handleMenuClick,
	};

	return (
		<>
			<Dropdown menu={menuProps}>
				<PlayCircleFilled className="rotate-90 m-auto" />
			</Dropdown>
		</>
	);
};

export default TableActions;
