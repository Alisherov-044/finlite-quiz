import { LoginPageSkeleton } from "@/components";
import {
    LoginPage,
    MaterialsPage,
    NotFoundPage,
    UnAuthorizedPage,
} from "@/pages";
import type { ReactNode } from "react";

export type TRoute = {
    id: number;
    path: string;
    element: ReactNode;
    fallback?: ReactNode;
};

export type TPublicRoute = TRoute;
export type TPrivateRoute = TRoute & {
    roles: number[];
};

export type TRoutes = {
    public: TPublicRoute[];
    private: TPrivateRoute[];
};

export const routes: TRoutes = {
    public: [
        {
            id: 1,
            path: "/login",
            element: <LoginPage />,
            fallback: <LoginPageSkeleton />,
        },
        {
            id: 2,
            path: "/un-authorized",
            element: <UnAuthorizedPage />,
        },
        {
            id: 3,
            path: "*",
            element: <NotFoundPage />,
        },
    ],
    private: [
        {
            id: 4,
            path: "/materials",
            element: <MaterialsPage />,
            roles: [3216],
        },
    ],
};
