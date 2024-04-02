export type TRole = "teacher" | "student" | "admin";

export enum Role {
    admin = Number(process.env.ADMIN_ROLE_ID),
    teacher = Number(process.env.TEACHER_ROLE_ID),
    student = Number(process.env.STUDENT_ROLE_ID),
}
