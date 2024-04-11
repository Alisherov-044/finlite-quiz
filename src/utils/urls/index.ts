export const LOGIN_URL = "/login";
export const STUDENTS_URL = "/user?role=student";
export const STUDENTS_EDIT_URL = (id: number) => `/user/${id}`;
export const STUDENTS_DELETE_URL = (id: number) => `/user/${id}`;
export const TEACHERS_URL = "/user?role=teacher";
export const GROUPS_URL = "/group";
export const UPLOAD_URL = "/aws";
export const UPLOAD_DELETE_URL = "/aws/delete";
