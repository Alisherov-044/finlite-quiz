import type { FC } from "react";
import type { TTtranslation } from "@/i18n";
import { Icons, type IconProps } from "@/components/icons";

export type TSidebarLink = {
    id: number;
    link: string;
    title: TTtranslation;
    Icon: FC<IconProps>;
};

export type TSidebarLinks = Record<string, TSidebarLink[]>;

export const sidebarLinks: TSidebarLinks = {
    student: [
        {
            id: 1,
            link: "/materials",
            title: "materials",
            Icon: Icons.document,
        },
        {
            id: 2,
            link: "/practice",
            title: "practice",
            Icon: Icons.case,
        },
        {
            id: 3,
            link: "/exam",
            title: "exam",
            Icon: Icons.diploma,
        },
    ],
    teacher: [
        {
            id: 1,
            link: "/exams",
            title: "exams",
            Icon: Icons.plusCircle,
        },
        {
            id: 2,
            link: "/tests",
            title: "tests",
            Icon: Icons.plusCircleCut,
        },
    ],
    admin: [
        {
            id: 1,
            link: "/teachers",
            title: "teachers",
            Icon: Icons.user.plus,
        },
        {
            id: 2,
            link: "/students",
            title: "students",
            Icon: Icons.user.check,
        },
        {
            id: 3,
            link: "/groups",
            title: "groups",
            Icon: Icons.user.group,
        },
        {
            id: 4,
            link: "/exams",
            title: "exams",
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
