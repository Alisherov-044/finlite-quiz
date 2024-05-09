export const baseURL = import.meta.env.VITE_BASE_URL;
export const mediaBaseURL = import.meta.env.VITE_MEDIA_BASE_URL;

export const LOGIN_URL = "/auth/login";

export const STUDENTS_URL = (
    page: number = 1,
    query: string = "",
    size: number = 10
) => `/user?role=student&take=${size}&page=${page}&search=${query}`;
export const STUDENTS_EDIT_URL = (id: number) => `/user/${id}`;
export const STUDENTS_DELETE_URL = (id: number) => `/user/${id}`;

export const TEACHERS_URL = (query?: string) =>
    query ? `/user?role=teacher&&search=${query}` : "/user?role=teacher";
export const TEACHERS_EDIT_URL = (id: number) => `/user/${id}`;
export const TEACHERS_DELETE_URL = (id: number) => `/user/${id}`;

export const GROUPS_URL = (
    page: number = 1,
    query: string = "",
    size: number = 10
) => `/group?take=${size}&page=${page}&search=${query}`;

export const UPLOAD_URL = "/aws";
export const UPLOAD_DELETE_URL = "/aws/delete";

export const TESTS_URL = (
    page: number = 1,
    query: string = "",
    size: number = 10
) => `/question?take=${size}&page=${page}&search=${query}`;

export const DEPARTMENTS_URL = (
    page: number = 1,
    query: string = "",
    size: number = 10
) => `/question/category?take=${size}&page=${page}&search=${query}`;
export const DEPARTMENT_URL = (id: number) => `/question/category/${id}`;

export const EXAMS_URL = (page: number = 1, size: number = 10) =>
    `/exam?take=${size}&page=${page}`;
export const EXAM_CATEGORIES_URL = (
    page: number = 1,
    query: string = "",
    size: number = 10
) => `/exam/category?take=${size}&page=${page}&search=${query}`;
export const EXAM_ANSWER_URL = "/exam/answer";
export const EXAM_URL = (id: number) => `/exam/${id}`;
export const EXAMS_EDIT_URL = (id: number) => `/exam/${id}`;
export const EXAM_QUESTIONS_URL = (id: number) =>
    `/exam/question?exam_id=${id}&page=1&take=50`;
export const EXAM_RESULT_URL = (id: number, userId?: number) =>
    userId
        ? `/exam/result?exam_id=${id}&student_id=${userId}`
        : `/exam/result?exam_id=${id}`;

export const PRACTICE_URL = "/practice";
export const PRACTICE_HISTORY_URL = (id: number, page: number) =>
    `/practice?user_id=${id}&take=10&page=${page}`;
export const PRACTICE_CONTENT_URL = (id: number) => `/practice/${id}`;
export const PRACTICE_ANSWER_URL = "/practice/answer";
export const PRACTICE_RESULT_URL = (id: number) => `/practice/result/${id}`;
