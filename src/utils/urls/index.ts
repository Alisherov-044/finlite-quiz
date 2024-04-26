export const baseURL = import.meta.env.VITE_BASE_URL;
export const mediaBaseURL = import.meta.env.VITE_MEDIA_BASE_URL;

export const LOGIN_URL = "/auth/login";

export const STUDENTS_URL = "/user?role=student";
export const STUDENTS_EDIT_URL = (id: number) => `/user/${id}`;
export const STUDENTS_DELETE_URL = (id: number) => `/user/${id}`;

export const TEACHERS_URL = "/user?role=teacher";
export const TEACHERS_EDIT_URL = (id: number) => `/user/${id}`;
export const TEACHERS_DELETE_URL = (id: number) => `/user/${id}`;

export const GROUPS_URL = "/group";

export const UPLOAD_URL = "/aws";
export const UPLOAD_DELETE_URL = "/aws/delete";

export const TESTS_URL = "/question";

export const DEPARTMENTS_URL = "/question/category";

export const EXAMS_URL = "/exam";
export const EXAM_CATEGORIES_URL = "/exam/category";
export const EXAM_ANSWER_URL = "/exam/answer";
export const EXAM_URL = (id: number) => `/exam/${id}`;
export const EXAMS_EDIT_URL = (id: number) => `/exam/${id}`;
export const EXAM_QUESTIONS_URL = (id: number) =>
    `/exam/question?exam_id=${id}&page=1&take=50`;

export const PRACTICE_URL = "/practice";
export const PRACTICE_HISTORY_URL = (id: number) => `/practice?user_id=${id}`;
export const PRACTICE_CONTENT_URL = (id: number) => `/practice/${id}`;
export const PRACTICE_ANSWER_URL = "/practice/answer";
