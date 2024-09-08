import React, { createContext, useContext, useState } from "react";
import StudentFormModal from "../components/StudentFormModal";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [modalProps, setModalProps] = useState({});

	const openModal = (props) => {
		setModalProps(props);
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
		setModalProps({});
	};

	return (
		<ModalContext.Provider value={{ isModalOpen, modalProps, openModal, closeModal }}>
			{children}
			{isModalOpen && <StudentFormModal {...modalProps} onClose={closeModal} />}
		</ModalContext.Provider>
	);
};

export const useModal = () => useContext(ModalContext);
