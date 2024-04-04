export type TRole = "teacher" | "student" | "admin";

export enum Role {
    admin = Number(import.meta.env.VITE_ADMIN_ROLE_ID),
    teacher = Number(import.meta.env.VITE_TEACHER_ROLE_ID),
    student = Number(import.meta.env.VITE_STUDENT_ROLE_ID),
}

export enum TimeUnit {
    Millisecond = 1,
    Second = 1000,
    Minute = 60 * 1000,
    Hour = 60 * 60 * 1000,
}
