// StudentContext.js
import React, { createContext, useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { useAuthContext } from "../contexts/AuthContext";
import { message } from "antd";
import {
	STUDENT_CREATE_API,
	STUDENT_DELETE_API,
	STUDENT_EDIT_API,
	STUDENT_GET_API,
} from "../utils/Apis";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { user } = useAuthContext();

	const fetchStudents = useCallback(async () => {
		if (!user?.token) return;

		try {
			const { data } = await axios.get(STUDENT_GET_API, {
				headers: { Authorization: `Bearer ${user.token}` },
			});
			setStudents(data.data);
		} catch (error) {
			const msg = error?.response?.data?.message || error.message;
			message.error(`Failed to fetch students: ${msg}`);
			setError(msg);
		} finally {
			setLoading(false);
		}
	}, [user?.token]);

	const addStudent = useCallback(
		async (student) => {
			if (!user?.token) return;

			try {
				const { data } = await axios.post(STUDENT_CREATE_API, student, {
					headers: { Authorization: `Bearer ${user.token}` },
				});
				message.success(data.message);
				setStudents((prevStudents) => {
					const existingStudentIndex = prevStudents.findIndex(
						(s) => s._id === data.data._id
					);

					if (existingStudentIndex > -1) {
						const updatedStudents = [...prevStudents];
						updatedStudents[existingStudentIndex] = data.data;
						return updatedStudents;
					} else {
						return [...prevStudents, data.data];
					}
				});
			} catch (error) {
				const msg = error?.response?.data?.message || error.message;
				message.error(`Failed to add student: ${msg}`);
				setError(msg);
				throw new Error(msg);
			}
		},
		[user?.token]
	);

	const editStudent = useCallback(
		async (id, updatedStudent) => {
			if (!user?.token) return;

			try {
				const { data } = await axios.patch(`${STUDENT_EDIT_API}/${id}`, updatedStudent, {
					headers: { Authorization: `Bearer ${user.token}` },
				});
				message.success(data.message);
				setStudents((prevStudents) =>
					prevStudents.map((student) =>
						student._id === id ? { ...student, ...data.data } : student
					)
				);
			} catch (error) {
				const msg = error?.response?.data?.message || error.message;
				message.error(`Failed to edit student: ${msg}`);
				setError(msg);
				throw new Error(msg);
			}
		},
		[user?.token]
	);

	const deleteStudent = useCallback(
		async (id) => {
			if (!user?.token) return;

			try {
				const { data } = await axios.delete(`${STUDENT_DELETE_API}/${id}`, {
					headers: { Authorization: `Bearer ${user.token}` },
				});
				message.success(data.message);
				setStudents((prevStudents) => prevStudents.filter((student) => student._id !== id));
			} catch (error) {
				const msg = error?.response?.data?.message || error.message;
				message.error(`Failed to delete student: ${msg}`);
				setError(msg);
				throw new Error(msg);
			}
		},
		[user?.token]
	);

	useEffect(() => {
		fetchStudents();
	}, [user?.token]);

	return (
		<StudentContext.Provider
			value={{
				students,
				fetchStudents,
				addStudent,
				editStudent,
				deleteStudent,
				loading,
				error,
			}}
		>
			{children}
		</StudentContext.Provider>
	);
};

export const useStudentContext = () => {
	const context = useContext(StudentContext);
	if (!context) {
		throw new Error("useStudentContext must be used within a StudentProvider");
	}
	return context;
};
