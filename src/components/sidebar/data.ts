import type { FC } from "react";
import { Icons, type IconProps } from "@/components/icons";

export type TSidebarLink = {
    id: number;
    link: string;
    title: string;
    Icon: FC<IconProps>;
};

export type TSidebarLinks = Record<string, TSidebarLink[]>;

export const sidebarLinks: TSidebarLinks = {
    student: [
        {
            id: 1,
            link: "/materials",
            title: "Materiallar",
            Icon: Icons.document,
        },
        {
            id: 2,
            link: "/practice",
            title: "Amaliyot",
            Icon: Icons.case,
        },
        {
            id: 3,
            link: "/exams",
            title: "Imtihon",
            Icon: Icons.diploma,
        },
    ],
    teacher: [
        {
            id: 1,
            link: "/exams",
            title: "Imtihon natijalari",
            Icon: Icons.list,
        },
    ],
    admin: [
        {
            id: 1,
            link: "/teachers",
            title: "O'qituvchilar",
            Icon: Icons.user.plus,
        },
        {
            id: 2,
            link: "/students",
            title: "O'quvchilar",
            Icon: Icons.user.check,
        },
        {
            id: 3,
            link: "/groups",
            title: "Guruhlar",
            Icon: Icons.user.group,
        },
        {
            id: 4,
            link: "/exams",
            title: "Imtihonlar",
            Icon: Icons.plusCircle,
        },
        {
            id: 5,
            link: "/tests",
            title: "tests",
            Icon: Icons.plusCircleCut,
        },
    ],
};
