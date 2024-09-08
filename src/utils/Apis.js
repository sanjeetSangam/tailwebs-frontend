const API_URL = import.meta.env.VITE_API_URL;

export const USER_LOGIN_API = `${API_URL}/user/login`;
export const USER_REGISTER_API = `${API_URL}/user/register`;
export const USER_LOGOUT_API = `${API_URL}/user/logout`;

export const STUDENT_CREATE_API = `${API_URL}/student/create`;
export const STUDENT_EDIT_API = `${API_URL}/student/edit`;
export const STUDENT_DELETE_API = `${API_URL}/student/delete`;
export const STUDENT_GET_API = `${API_URL}/student/get`;
